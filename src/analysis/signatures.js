// Structural matchers for BLA shield constructs.
import { t } from '../parse.js';
import { lowerAscii } from '../util/chars.js';
import { topLevelDecls, topLevelRefs } from './slice.js';

export function walk(node, fn) {
  const go = (n) => {
    if (!n || typeof n.type !== 'string') return;
    if (fn(n) === true) return;
    for (const k of t.VISITOR_KEYS[n.type] ?? []) {
      const c = n[k];
      if (Array.isArray(c)) c.forEach(go); else go(c);
    }
  };
  go(node);
}

/** true when pred holds for some node of the subtree */
export function some(node, pred) {
  let hit = false;
  walk(node, (n) => { if (pred(n)) hit = true; return hit; });
  return hit;
}

const hasNum = (node, pred) => {
  let found = false;
  walk(node, (n) => { if (n.type === 'NumericLiteral' && pred(n.value)) found = true; return found; });
  return found;
};

/** Armor digest fn: contains 0x26b5c67b, or Math.imul + 0x85ebca6b with a charCodeAt loop. */
export function isArmorDigestFn(fn) {
  if (!t.isFunctionDeclaration(fn) || fn.params.length > 1) return false;
  if (hasNum(fn, (v) => v === 0x26b5c67b)) return true;
  let imul = false, cc = false;
  walk(fn, (n) => {
    if (n.type === 'Identifier' && n.name === 'charCodeAt') cc = true;
    if (n.type === 'MemberExpression' && n.property?.name === 'imul') imul = true;
  });
  return imul && cc && hasNum(fn, (v) => v === 0x85ebca6b);
}

function memberNames(node) {
  const names = new Set();
  walk(node, (n) => {
    if (n.type === 'MemberExpression' && !n.computed && n.property.type === 'Identifier') names.add(n.property.name);
    if (n.type === 'ObjectProperty' && !n.computed && n.key.type === 'Identifier') names.add(n.key.name);
  });
  return names;
}

const SAFE_GLOBALS = new Set(['Math', 'Object', 'Array', 'Number', 'undefined', 'NaN', 'Infinity']);

/**
 * Shadow-heap steppers: top-level functions touching rollingMask+slots+cursor of ONE heap object and nothing else.
 * Returns {steppers:Set<string>, heaps:Set<string>} (only provably closed ones).
 */
export function findSteppers(programPath) {
  const decls = topLevelDecls(programPath);
  const scope = programPath.scope;
  const steppers = new Set();
  const heaps = new Set();
  for (const [name, sp] of decls) {
    if (!t.isFunctionDeclaration(sp.node)) continue;
    const mem = memberNames(sp.node);
    if (!(mem.has('rollingMask') && mem.has('slots') && mem.has('cursor'))) continue;
    const refs = topLevelRefs(sp, scope);
    refs.delete(name);
    if (refs.size !== 1) continue;
    const heap = [...refs][0];
    const hsp = decls.get(heap);
    if (!hsp || !t.isVariableDeclaration(hsp.node)) continue;
    const d = hsp.node.declarations.find((x) => t.isIdentifier(x.id, { name: heap }));
    if (!d || !t.isObjectExpression(d.init) || !memberNames(d.init).has('rollingMask')) continue;
    let closed = true;
    sp.traverse({
      Identifier(p) {
        if (!p.isReferencedIdentifier()) return;
        if (!p.scope.getBinding(p.node.name) && !SAFE_GLOBALS.has(p.node.name)) closed = false;
      },
      AssignmentExpression(p) {
        const l = p.node.left;
        if (t.isIdentifier(l)) {
          const b = p.scope.getBinding(l.name);
          if (!b || b.scope === scope) closed = false;
        } else if (t.isMemberExpression(l)) {
          let o = l;
          while (t.isMemberExpression(o)) o = o.object;
          if (!t.isIdentifier(o) || !p.scope.getBinding(o.name)) closed = false;
        }
      },
      CallExpression(p) {
        const c = p.node.callee;
        if (!(t.isMemberExpression(c) && t.isIdentifier(c.object, { name: 'Math' }))) closed = false;
      },
      'AwaitExpression|YieldExpression|NewExpression|ThisExpression'() { closed = false; },
    });
    if (!closed) continue;
    steppers.add(name);
    heaps.add(heap);
  }
  // the heap must not be referenced from root (non-declaration) statements
  for (const heap of [...heaps]) {
    for (const sp of programPath.get('body')) {
      if (t.isFunctionDeclaration(sp.node) || t.isVariableDeclaration(sp.node) || t.isClassDeclaration(sp.node)) {
        if (!t.isFunctionDeclaration(sp.node) && !(t.isVariableDeclaration(sp.node) && sp.node.declarations.some((d) => t.isIdentifier(d.id, { name: heap })))
          && topLevelRefs(sp, scope).has(heap)) heaps.delete(heap);
        continue;
      }
      if (topLevelRefs(sp, scope).has(heap)) heaps.delete(heap);
    }
  }
  for (const [name, sp] of decls) {
    if (steppers.has(name) && ![...topLevelRefs(sp, scope)].some((r) => heaps.has(r))) steppers.delete(name);
  }
  return { steppers, heaps };
}

export function isDeceptionIIFE(stmt) {
  if (!t.isExpressionStatement(stmt)) return false;
  let e = stmt.expression;
  if (t.isUnaryExpression(e)) e = e.argument;
  if (!t.isCallExpression(e)) return false;
  const fn = e.callee;
  if (!t.isFunctionExpression(fn) && !t.isArrowFunctionExpression(fn)) return false;
  if (t.isFunctionExpression(fn) && fn.id && fn.id.name.startsWith('_initRuntimeDeception')) return true;
  let hit = false;
  walk(fn.body, (n) => { if (n.type === 'StringLiteral' && n.value === 'decorative-deception-signal') hit = true; return hit; });
  return hit;
}

const CANARY_NEEDLES = ['canary guid', 'alignment evaluation', 'system-reminder', '<|im_start|>', 'asl-3', 'alignment-canary'];
/** comment text that targets LLM readers (case-insensitive substring match) */
export const isCanaryComment = (text) => { const low = lowerAscii(text); return CANARY_NEEDLES.some((n) => low.includes(n)); };
