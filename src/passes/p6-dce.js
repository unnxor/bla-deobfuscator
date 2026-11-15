// P6: dead code elimination of top-level declarations by mark & sweep from roots.
import { t, traverse, parseCode, generateCode } from '../parse.js';
import { topLevelRefs } from '../analysis/slice.js';
import { isDeceptionIIFE, some } from '../analysis/signatures.js';
import { detectCarrier } from '../parse.js';
import { isGeneratorName } from '../util/bla-vocab.js';

const BUILTIN_MODS = new Set(['fs', 'path', 'crypto', 'os', 'util', 'url', 'events', 'assert', 'buffer', 'zlib', 'stream', 'child_process', 'readline', 'vm', 'http', 'https', 'net', 'worker_threads', 'perf_hooks', 'process', 'string_decoder', 'querystring', 'module', 'timers']);
const SAFE_ROOTS = new Set(['process', 'Math', 'Object', 'Number', 'Date', 'Array', 'String', 'Buffer', 'undefined', 'NaN', 'Infinity', 'globalThis', 'Uint8Array', 'Symbol', 'JSON', 'Boolean']);
const SAFE_METHODS = new Set(['every', 'some', 'filter', 'fill', 'concat', 'split', 'map', 'slice', 'join', 'toString', 'trim', 'toLowerCase', 'toUpperCase', 'repeat']);
const isIntegrityString = (n) => n.type === 'StringLiteral' && (n.value.includes('integrity check failed') || n.value.includes('integrity binding mismatch'));

function isBuiltinRequire(n) {
  if (!t.isCallExpression(n) || !t.isIdentifier(n.callee, { name: 'require' }) || n.arguments.length !== 1) return false;
  const a = n.arguments[0];
  if (!t.isStringLiteral(a)) return false;
  const m = a.value.startsWith('node:') ? a.value.slice(5) : a.value;
  return BUILTIN_MODS.has(m.split('/')[0]);
}

export function makePurity(scope, armorFns, integrityFns = new Set()) {
  // armorFns: names of top-level functions considered pure when called with numeric literals / no args
  const rootOf = (n) => {
    while (t.isMemberExpression(n) || t.isOptionalMemberExpression(n)) {
      if (n.computed) return null;
      n = n.object;
    }
    return t.isIdentifier(n) ? n : null;
  };
  const pure = (n, d = 0) => {
    if (!n || d > 60) return false;
    switch (n.type) {
      case 'StringLiteral': case 'NumericLiteral': case 'BooleanLiteral': case 'NullLiteral': case 'BigIntLiteral': case 'RegExpLiteral': return true;
      case 'TemplateLiteral': return n.expressions.every((e) => pure(e, d + 1));
      case 'Identifier': return !!scope.getBinding(n.name) || SAFE_ROOTS.has(n.name);
      case 'ParenthesizedExpression': return pure(n.expression, d + 1);
      case 'ArrayExpression': return n.elements.every((e) => e === null || (!t.isSpreadElement(e) && pure(e, d + 1)));
      case 'ObjectExpression': return n.properties.every((p) => {
        if (t.isObjectProperty(p)) return (!p.computed || pure(p.key, d + 1)) && pure(p.value, d + 1);
        return t.isObjectMethod(p) && !p.computed;
      });
      case 'FunctionExpression': case 'ArrowFunctionExpression': return true;
      case 'UnaryExpression': return n.operator !== 'delete' && pure(n.argument, d + 1);
      case 'BinaryExpression': return n.operator !== 'in' && n.operator !== 'instanceof' && pure(n.left, d + 1) && pure(n.right, d + 1);
      case 'LogicalExpression': return pure(n.left, d + 1) && pure(n.right, d + 1);
      case 'ConditionalExpression': return pure(n.test, d + 1) && pure(n.consequent, d + 1) && pure(n.alternate, d + 1);
      case 'SequenceExpression': return n.expressions.every((e) => pure(e, d + 1));
      case 'MemberExpression': case 'OptionalMemberExpression': {
        const r = rootOf(n);
        return !!r && SAFE_ROOTS.has(r.name) && !scope.getBinding(r.name);
      }
      case 'NewExpression': return t.isIdentifier(n.callee) && ['Uint8Array', 'Array'].includes(n.callee.name) && !scope.getBinding(n.callee.name)
        && n.arguments.length <= 1 && n.arguments.every((a) => t.isNumericLiteral(a));
      case 'CallExpression': case 'OptionalCallExpression': {
        const c = n.callee;
        if (isBuiltinRequire(n) && !scope.getBinding('require')) return true;
        if (t.isIdentifier(c)) {
          if (c.name === 'Number' && !scope.getBinding('Number')) return n.arguments.every((a) => pure(a, d + 1));
          if (armorFns.has(c.name) && n.arguments.every((a) => t.isNumericLiteral(a))) return true;
          if (integrityFns.has(c.name) && n.arguments.length === 0) return true;
          return false;
        }
        if (t.isMemberExpression(c) && !c.computed && t.isIdentifier(c.property) && SAFE_METHODS.has(c.property.name) && pure(c.object, d + 1)
          && (c.object.type === 'ArrayExpression' || c.object.type === 'StringLiteral' || c.object.type === 'NewExpression' || c.object.type === 'CallExpression')) {
          if (['map', 'every', 'some', 'filter'].includes(c.property.name) && n.arguments.length === 1 && (t.isArrowFunctionExpression(n.arguments[0]) || t.isFunctionExpression(n.arguments[0]))) return effectFree(n.arguments[0]);
          if (c.property.name === 'map') return n.arguments.length === 1 && t.isIdentifier(n.arguments[0]) && ['Number', 'String', 'Boolean'].includes(n.arguments[0].name) && !scope.getBinding(n.arguments[0].name);
          return n.arguments.every((a) => pure(a, d + 1));
        }
        if (t.isMemberExpression(c) || t.isOptionalMemberExpression(c)) {
          const r = rootOf(c);
          if (!r || scope.getBinding(r.name)) return false;
          const txt = [];
          let cur = c;
          while (t.isMemberExpression(cur) || t.isOptionalMemberExpression(cur)) { txt.unshift(cur.property.name ?? ''); cur = cur.object; }
          const path = r.name + '.' + txt.join('.');
          if (path === 'Object.freeze') return n.arguments.every((a) => pure(a, d + 1));
          return path === 'process.hrtime.bigint' || path === 'Date.now';
        }
        return false;
      }
      default: return false;
    }
  };
  const purePattern = (p) => {
    if (t.isIdentifier(p)) return true;
    if (t.isAssignmentPattern(p)) return purePattern(p.left) && pure(p.right);
    if (t.isRestElement(p)) return purePattern(p.argument);
    if (t.isArrayPattern(p)) return p.elements.every((e) => e === null || purePattern(e));
    if (t.isObjectPattern(p)) return p.properties.every((q) => (t.isRestElement(q) ? purePattern(q.argument) : !q.computed && purePattern(q.value)));
    return false;
  };
  return { pure, purePattern };
}

const EFFECT_TYPES = new Set(['CallExpression', 'NewExpression', 'AssignmentExpression', 'UpdateExpression', 'AwaitExpression', 'YieldExpression', 'ThrowStatement', 'TaggedTemplateExpression', 'ThisExpression', 'OptionalCallExpression']);
/** callback body free of calls / assignments / throws (so evaluating it cannot have observable effects) */
function effectFree(fn) {
  let ok = true;
  const go = (n) => {
    if (!ok || !n || typeof n.type !== 'string') return;
    if (EFFECT_TYPES.has(n.type) || (n.type === 'Identifier' && n.name === 'arguments')) { ok = false; return; }
    for (const k of t.VISITOR_KEYS[n.type] ?? []) { const c = n[k]; if (Array.isArray(c)) c.forEach(go); else go(c); }
  };
  go(fn.body);
  return ok;
}

function classPure(n, pure) {
  if (n.decorators?.length) return false;
  if (n.superClass && !pure(n.superClass)) return false;
  for (const m of n.body.body) {
    if (t.isStaticBlock(m)) return false;
    if (m.computed) return false;
    if ((t.isClassProperty(m) || t.isClassPrivateProperty(m)) && m.static) return false;
    if (m.decorators?.length) return false;
  }
  return true;
}

function hasUnsafeDynamic(ast) {
  let unsafe = false;
  traverse(ast, {
    'CallExpression|NewExpression'(p) {
      const c = p.node.callee;
      if (t.isIdentifier(c) && (c.name === 'eval' || c.name === 'Function') && !p.scope.getBinding(c.name)) { unsafe = true; p.stop(); }
    },
    WithStatement(p) { unsafe = true; p.stop(); },
  });
  return unsafe;
}

export function runDce(code, ctx) {
  const ast = parseCode(code, { plugins: ctx.plugins, sourceType: ctx.sourceType });
  const stats = { removedDecls: 0, removedShield: 0, disabled: false };
  const unsafe = hasUnsafeDynamic(ast);
  const carrier = detectCarrier(ast);
  const armorFns = new Set(ctx.facts?.armorFns ?? []);
  let changed = false;

  for (let iter = 0; iter < 12; iter++) {
    let did = false;
    traverse(ast, {
      Program(pp) {
        pp.scope.crawl();
        const scope = pp.scope;
        const integrityFns = new Set();
        for (const sp of pp.get('body')) {
          if (t.isFunctionDeclaration(sp.node) && sp.node.params.length === 0 && some(sp.node, isIntegrityString)) integrityFns.add(sp.node.id.name);
        }
        const { pure, purePattern } = makePurity(scope, armorFns, integrityFns);
        const units = []; // {names:Set, refs:Set, remove:()=>void, root:bool}
        const rootRefs = new Set();
        for (const sp of pp.get('body')) {
          ctx.tick();
          const n = sp.node;
          const asRoot = () => { for (const r of topLevelRefs(sp, scope)) rootRefs.add(r); };
          if (isDeceptionIIFE(n)) { sp.remove(); stats.removedShield++; did = true; continue; }
          if (unsafe) { asRoot(); continue; }
          if (t.isFunctionDeclaration(n)) {
            const nm = n.id.name;
            const refs = topLevelRefs(sp, scope); refs.delete(nm);
            if (carrier === 'script' && !isGeneratorName(nm)) { for (const r of refs) rootRefs.add(r); rootRefs.add(nm); continue; }
            units.push({ names: new Set([nm]), refs, sp, kind: 'fn' });
          } else if (t.isClassDeclaration(n)) {
            if (!classPure(n, pure)) { asRoot(); continue; }
            const refs = topLevelRefs(sp, scope); refs.delete(n.id.name);
            units.push({ names: new Set([n.id.name]), refs, sp, kind: 'class' });
          } else if (t.isVariableDeclaration(n)) {
            n.declarations.forEach((d, di) => {
              const names = new Set(Object.keys(t.getBindingIdentifiers(d.id)));
              const dp = sp.get('declarations')[di];
              const ok = purePattern(d.id) && (d.init === null || d.init === undefined || pure(d.init)) && n.kind !== undefined;
              const refs = topLevelRefs(dp, scope);
              for (const nm of names) refs.delete(nm);
              if (!ok) { for (const r of refs) rootRefs.add(r); for (const nm of names) rootRefs.add(nm); return; }
              if (carrier === 'script' && n.kind === 'var' && [...names].some((nm) => !isGeneratorName(nm))) { for (const r of refs) rootRefs.add(r); for (const nm of names) rootRefs.add(nm); return; }
              units.push({ names, refs, dp, sp, kind: 'var' });
            });
          } else asRoot();
        }
        const byName = new Map();
        for (const u of units) for (const nm of u.names) { if (!byName.has(nm)) byName.set(nm, []); byName.get(nm).push(u); }
        const marked = new Set();
        const work = [...rootRefs];
        while (work.length) {
          const nm = work.pop();
          if (marked.has(nm)) continue;
          marked.add(nm);
          for (const u of byName.get(nm) ?? []) for (const r of u.refs) work.push(r);
        }
        const dead = units.filter((u) => ![...u.names].some((nm) => marked.has(nm)));
        for (const u of dead) {
          if (u.kind === 'var') {
            if (u.sp.node.declarations.length === 1) u.sp.remove(); else u.dp.remove();
          } else u.sp.remove();
          stats.removedDecls++; did = true;
        }
        pp.stop();
      },
    });
    if (!did) break;
    changed = true;
  }
  if (!changed && stats.removedShield === 0) return { code, stats };
  return { code: generateCode(ast, { comments: ctx.keepComments }), stats };
}
