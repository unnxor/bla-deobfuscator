// P2: seed analysis (read-only). Known-bits abstract interpretation of the opaque seed initialiser.
import { t, traverse } from '../parse.js';
import { isArmorDigestFn, some } from './signatures.js';
import { buildSlice } from './slice.js';
import { validateSlice, createContext, runPrimitive, runStatements } from '../util/interp.js';

const TOP = { m: 0, v: 0 };

const memberKey = (n) => ((n.type === 'MemberExpression' || n.type === 'OptionalMemberExpression') && !n.computed && t.isIdentifier(n.property) ? n.property.name : null);
const ownerName = (o) => (t.isIdentifier(o) ? o.name : (memberKey(o) ?? ''));

/** time-based source: process.hrtime* / Date.now* */
function isTimeSource(n) {
  const key = memberKey(n);
  if (key === null) return false;
  const owner = ownerName(n.object);
  return (key.startsWith('hrtime') && owner.endsWith('process')) || (key.startsWith('now') && owner.endsWith('Date'));
}

const isXor = (n) => (n.type === 'BinaryExpression' && n.operator === '^') || (n.type === 'AssignmentExpression' && n.operator === '^=');

/** A: time based, B: contains an xor in its (left) operand, C: otherwise */
function seedShape(init) {
  if (some(init, isTimeSource)) return 'A';
  return some(init.left ?? init, isXor) ? 'B' : 'C';
}
const ALL = (v) => ({ m: -1, v: v | 0 });

function bitsOp(op, a, b) {
  const a1 = a.m & a.v, a0 = a.m & ~a.v, b1 = b.m & b.v, b0 = b.m & ~b.v;
  let k1, k0;
  if (op === '|') { k1 = a1 | b1; k0 = a0 & b0; }
  else if (op === '&') { k1 = a1 & b1; k0 = a0 | b0; }
  else { k1 = (a1 & b0) | (a0 & b1); k0 = (a1 & b1) | (a0 & b0); }
  return { m: k1 | k0, v: k1 };
}

function join(a, b) {
  const m = a.m & b.m & ~(a.v ^ b.v);
  return { m, v: a.v & m };
}

function containsArmorTest(node, isArmorFn) {
  let hit = null;
  const go = (n) => {
    if (hit || !n || typeof n.type !== 'string') return;
    if (n.type === 'BinaryExpression' && n.operator === '===' && t.isCallExpression(n.left) && t.isIdentifier(n.left.callee)
      && n.left.arguments.length === 1 && t.isNumericLiteral(n.left.arguments[0], { value: 0 }) && t.isNumericLiteral(n.right)
      && isArmorFn(n.left.callee.name)) { hit = { fn: n.left.callee.name, expected: n.right.value }; return; }
    for (const k of t.VISITOR_KEYS[n.type] ?? []) { const c = n[k]; if (Array.isArray(c)) c.forEach(go); else go(c); }
  };
  go(node);
  return hit;
}

function knownBits(node, isArmorFn, armorOk) {
  const go = (n) => {
    switch (n.type) {
      case 'NumericLiteral': return Number.isInteger(n.value) ? ALL(n.value) : TOP;
      case 'ParenthesizedExpression': return go(n.expression);
      case 'BinaryExpression':
        if (n.operator === '|' || n.operator === '&' || n.operator === '^') return bitsOp(n.operator, go(n.left), go(n.right));
        if (n.operator === '>>>' && t.isNumericLiteral(n.right, { value: 0 })) return go(n.left);
        return TOP;
      case 'ConditionalExpression': {
        if (containsArmorTest(n.test, isArmorFn)) return armorOk ? go(n.consequent) : join(go(n.consequent), go(n.alternate));
        return join(go(n.consequent), go(n.alternate));
      }
      default: return TOP;
    }
  };
  return go(node);
}

function verifyArmor(programPath, fnName, expected) {
  const slice = buildSlice(programPath, [fnName], 32768);
  if (!slice) return false;
  const code = slice.code;
  if (!validateSlice(code).ok) return false;
  try {
    const ctx = createContext();
    runStatements(ctx, code, 250);
    return runPrimitive(ctx, fnName + '(0)', 250) === (expected >>> 0);
  } catch { return false; }
}

/**
 * Returns facts: { seed: {name, mask, value, armorOk, shape}|null, sensors: [{name,mask,value}], armor: {fn, corpusCount} }
 */
export function analyzeSeed(ast) {
  const facts = { seed: null, sensors: [], armorFns: [] };
  traverse(ast, {
    Program(pp) {
      const scope = pp.scope;
      const armorFns = new Set();
      for (const sp of pp.get('body')) if (isArmorDigestFn(sp.node)) armorFns.add(sp.node.id.name);
      facts.armorFns = [...armorFns];
      const isArmorFn = (nm) => armorFns.has(nm);
      for (const sp of pp.get('body')) {
        if (!t.isVariableDeclaration(sp.node)) continue;
        for (const d of sp.node.declarations) {
          if (!t.isIdentifier(d.id) || !d.init) continue;
          const arm = containsArmorTest(d.init, isArmorFn);
          if (arm && !facts.seed) {
            const armorOk = verifyArmor(pp, arm.fn, arm.expected);
            const kb = knownBits(d.init, isArmorFn, armorOk);
            const shape = seedShape(d.init);
            facts.seed = { name: d.id.name, mask: kb.m, value: kb.v, armorOk, shape };
            continue;
          }
          // sensor: (typeof process !== "undefined" && process.pid ? process.pid & 0xff : 42) | 1
          if (t.isBinaryExpression(d.init, { operator: '|' }) && t.isNumericLiteral(d.init.right, { value: 1 })) {
            let pid = false;
            const go = (n) => {
              if (!n || typeof n.type !== 'string') return;
              if (t.isMemberExpression(n) && t.isIdentifier(n.object, { name: 'process' }) && t.isIdentifier(n.property, { name: 'pid' })) pid = true;
              for (const k of t.VISITOR_KEYS[n.type] ?? []) { const c = n[k]; if (Array.isArray(c)) c.forEach(go); else go(c); }
            };
            go(d.init.left);
            if (pid && t.isConditionalExpression(d.init.left)) facts.sensors.push({ name: d.id.name, mask: 0xffffff01 | 0, value: 1 });
          }
        }
      }
      if (!facts.seed) {
        // fallback: most referenced binding used as first arg of Math.imul(X ^|| k, ...) (>= 20 places), universal identities only
        const counts = new Map();
        pp.traverse({
          CallExpression(p) {
            const c = p.node.callee;
            if (!(t.isMemberExpression(c) && t.isIdentifier(c.object, { name: 'Math' }) && t.isIdentifier(c.property, { name: 'imul' }))) return;
            const a = p.node.arguments[0];
            if (t.isBinaryExpression(a) && (a.operator === '^' || a.operator === '|') && t.isIdentifier(a.left)) {
              const b = p.scope.getBinding(a.left.name);
              if (b && b.scope === scope) counts.set(a.left.name, (counts.get(a.left.name) ?? 0) + 1);
            }
          },
        });
        const best = [...counts.entries()].sort((x, y) => y[1] - x[1] || (x[0] < y[0] ? -1 : 1))[0];
        if (best && best[1] >= 20 && !facts.sensors.some((s) => s.name === best[0])) facts.seed = { name: best[0], mask: 0, value: 0, armorOk: false, shape: '?' };
      }
      pp.stop();
    },
  });
  return facts;
}
