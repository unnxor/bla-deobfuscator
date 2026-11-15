// P3: opaque predicate + constant folding, structural branch simplification.
import { t, traverse, parseCode, generateCode } from '../parse.js';
import { scanPure, decide, evalPure } from '../analysis/evaluator.js';
import { isAlpha, isWord, all, escapeRaw } from '../util/chars.js';

export function litValue(n) {
  switch (n.type) {
    case 'BooleanLiteral': case 'NumericLiteral': case 'StringLiteral': return { ok: true, v: n.value };
    case 'NullLiteral': return { ok: true, v: null };
    default: return { ok: false };
  }
}

export function makeLiteral(v) {
  if (typeof v === 'boolean') return t.booleanLiteral(v);
  if (typeof v === 'string') return t.stringLiteral(v);
  if (typeof v === 'number') return v < 0 ? t.unaryExpression('-', t.numericLiteral(-v)) : t.numericLiteral(v);
  return null;
}

const isNegLit = (n) => t.isUnaryExpression(n, { operator: '-' }) && t.isNumericLiteral(n.argument);

/** Collect names declared by `var` (not crossing functions) and detect block-level function declarations. */
function hoistInfo(stmt) {
  const names = [];
  let hasFn = false;
  const go = (n, top) => {
    if (!n || typeof n.type !== 'string') return;
    if (n.type === 'FunctionDeclaration') { if (!top) hasFn = true; return; }
    if (n.type === 'FunctionExpression' || n.type === 'ArrowFunctionExpression' || n.type === 'ClassDeclaration' || n.type === 'ClassExpression') return;
    if (n.type === 'VariableDeclaration' && n.kind === 'var') names.push(...Object.keys(t.getBindingIdentifiers(n)));
    for (const k of t.VISITOR_KEYS[n.type] ?? []) { const c = n[k]; if (Array.isArray(c)) c.forEach((x) => go(x, false)); else go(c, false); }
  };
  go(stmt, true);
  if (t.isFunctionDeclaration(stmt)) hasFn = true;
  return { names, hasFn };
}

const isLexical = (s) => t.isFunctionDeclaration(s) || t.isClassDeclaration(s) || (t.isVariableDeclaration(s) && s.kind !== 'var');

function unwrapInto(path, stmt) {
  // path is an IfStatement being replaced by `stmt` (the surviving branch)
  if (t.isBlockStatement(stmt)) {
    // splicing a bare string statement could promote it to a directive (strict-mode change): keep the block
    if (stmt.body.some((x) => isLexical(x) || (t.isExpressionStatement(x) && t.isStringLiteral(x.expression)))) { path.replaceWith(stmt); return; }
    if (path.inList) {
      if (stmt.body.length === 0) path.remove(); else path.replaceWithMultiple(stmt.body);
      return;
    }
    if (stmt.body.length === 1) { path.replaceWith(stmt.body[0]); return; }
    path.replaceWith(stmt);
    return;
  }
  path.replaceWith(stmt);
}

const MBA_SAMPLES = (() => {
  const v = [0, 1, -1, 2, 3, 0x7fffffff, -0x80000000, 0x55555555, -0x55555556, 12345, 255, -255, 65535, 0x12345678, -0x12345678, 7];
  const out = [];
  for (const a of v) for (const b of v) out.push([a, b]);
  out.push(['5', 3], [3, '5'], [NaN, 4], [4, NaN], [undefined, 9], [null, 9], [0.5, 2.5], [true, 3], [1e12, 3], ['a', 'b']);
  return out;
})();
const MBA_CANDS = [
  ['+', (a, b) => ((a | 0) + (b | 0)) | 0, (a, b) => t.binaryExpression('|', t.binaryExpression('+', t.binaryExpression('|', a, t.numericLiteral(0)), t.binaryExpression('|', b, t.numericLiteral(0))), t.numericLiteral(0))],
  ['^', (a, b) => a ^ b, (a, b) => t.binaryExpression('^', a, b)],
  ['|', (a, b) => a | b, (a, b) => t.binaryExpression('|', a, b)],
  ['&', (a, b) => a & b, (a, b) => t.binaryExpression('&', a, b)],
  ['-', (a, b) => ((a | 0) - (b | 0)) | 0, (a, b) => t.binaryExpression('|', t.binaryExpression('-', t.binaryExpression('|', a, t.numericLiteral(0)), t.binaryExpression('|', b, t.numericLiteral(0))), t.numericLiteral(0))],
];
const leafKey = (n) => (t.isIdentifier(n) ? n.name : t.isMemberExpression(n) && !n.computed && t.isIdentifier(n.property) ? leafKey(n.object) + '.' + n.property.name : null);

/** Recognise the parameterised affine MBA of generator/mba-substitutions.ts over two pure operands. Returns replacement node or null. */
function recoverMba(node, scope) {
  if (!(t.isBinaryExpression(node, { operator: '|' }) && t.isNumericLiteral(node.right, { value: 0 }))) return null;
  const sum = node.left;
  if (!(t.isBinaryExpression(sum, { operator: '+' }) && t.isNumericLiteral(sum.right) && t.isCallExpression(sum.left))) return null;
  const leaves = new Map();
  let ok = true;
  const rewrite = (n) => {
    if (!ok) return n;
    if (t.isNumericLiteral(n)) return n;
    if (t.isIdentifier(n) || t.isMemberExpression(n)) {
      if (t.isMemberExpression(n) && t.isIdentifier(n.object, { name: 'Math' }) && !scope.getBinding('Math')) return n;
      const k = leafKey(n);
      if (!k || (t.isIdentifier(n) && n.name === 'Math')) { ok = false; return n; }
      if (!leaves.has(k)) { if (leaves.size >= 2) { ok = false; return n; } leaves.set(k, { node: n, name: '__L' + leaves.size }); }
      return t.identifier(leaves.get(k).name);
    }
    const c = { ...n };
    for (const key of t.VISITOR_KEYS[n.type] ?? []) {
      const v = n[key];
      c[key] = Array.isArray(v) ? v.map(rewrite) : v ? rewrite(v) : v;
    }
    return c;
  };
  const probe = rewrite(node);
  if (!ok || leaves.size !== 2) return null;
  const names = [...leaves.values()];
  const sc = scanPure(probe, (nm) => nm === 'Math' ? !scope.getBinding('Math') : nm.startsWith('__L'));
  if (!sc) return null;
  const evalAt = (a, b) => { try { return evalPure(probe, { [names[0].name]: a, [names[1].name]: b }); } catch { return NaN; } };
  for (const [, f, mk] of MBA_CANDS) {
    for (const swap of [false, true]) {
      if (swap && !(mk === MBA_CANDS[4][2])) continue;
      if (MBA_SAMPLES.every(([a, b]) => Object.is(evalAt(a, b), swap ? f(b, a) : f(a, b)))) {
        const [x, y] = swap ? [names[1].node, names[0].node] : [names[0].node, names[1].node];
        return mk(t.cloneNode(x, true), t.cloneNode(y, true));
      }
    }
  }
  return null;
}

export function runFold(code, ctx) {
  const ast = parseCode(code, { plugins: ctx.plugins, sourceType: ctx.sourceType });
  const stats = { folds: 0, branches: 0 };
  const facts = ctx.facts ?? {};
  let programScope = null;

  const attempt = (path) => {
    const n = path.node;
    if (isNegLit(n)) return;
    const vars = new Map();
    const scope = path.scope;
    const idOk = (name) => {
      if (vars.has(name)) return true;
      if (name === 'undefined' || name === 'NaN' || name === 'Infinity' || name === 'Math') return !scope.getBinding(name);
      const b = scope.getBinding(name);
      if (!b) return false;
      if (facts.seed && name === facts.seed.name && b.scope === programScope) {
        vars.set(name, { kind: 'seed', mask: facts.seed.mask, value: facts.seed.value }); return true;
      }
      const sen = (facts.sensors ?? []).find((s) => s.name === name);
      if (sen && b.scope === programScope) { vars.set(name, { kind: 'seed', mask: sen.mask, value: sen.value }); return true; }
      if (name[0] === '_' && isAlpha(name[1] ?? '') && all(name, isWord, 2) && b.scope !== programScope && (b.kind === 'param' || b.kind === 'let' || b.kind === 'const' || b.kind === 'var')) {
        vars.set(name, { kind: 'free' }); return true;
      }
      return false;
    };
    const sc = scanPure(n, idOk);
    if (!sc) return;
    const r = decide(n, vars, sc.ids);
    if (!r.fold) return;
    const lit = makeLiteral(r.value);
    if (!lit) return;
    path.replaceWith(lit);
    stats.folds++;
  };

  traverse(ast, {
    Program(pp) { programScope = pp.scope; },
    'BinaryExpression|UnaryExpression|ConditionalExpression|LogicalExpression|CallExpression': {
      exit(path) {
        ctx.tick();
        attempt(path);
        if (!path.removed && path.node && path.isBinaryExpression({ operator: '|' })) {
          const rep = recoverMba(path.node, path.scope);
          if (rep) { path.replaceWith(rep); stats.mba = (stats.mba ?? 0) + 1; }
        }
        if (path.removed || !path.node) return;
        const n = path.node;
        if (t.isConditionalExpression(n)) {
          const l = litValue(n.test);
          if (l.ok) { path.replaceWith(l.v ? n.consequent : n.alternate); stats.branches++; }
        } else if (t.isLogicalExpression(n)) {
          const l = litValue(n.left);
          if (l.ok) {
            let pick;
            if (n.operator === '&&') pick = l.v ? n.right : n.left;
            else if (n.operator === '||') pick = l.v ? n.left : n.right;
            else pick = l.v === null ? n.right : n.left;
            path.replaceWith(pick); stats.branches++;
          }
        }
      },
    },
    TemplateLiteral: {
      exit(path) {
        const n = path.node;
        if (!n.expressions.some((e) => litValue(e).ok && litValue(e).v !== null)) return;
        const quasis = [];
        const exprs = [];
        let cur = { cooked: n.quasis[0].value.cooked, raw: n.quasis[0].value.raw };
        n.expressions.forEach((e, i) => {
          const l = litValue(e);
          const nextQ = n.quasis[i + 1].value;
          if (l.ok && l.v !== null && cur.cooked !== null && nextQ.cooked !== null) {
            const sv = String(l.v);
            cur = { cooked: cur.cooked + sv + nextQ.cooked, raw: cur.raw + escapeRaw(sv) + nextQ.raw };
          } else {
            quasis.push(cur); exprs.push(e); cur = { cooked: nextQ.cooked, raw: nextQ.raw };
          }
        });
        quasis.push(cur);
        if (exprs.length === 0 && cur.cooked !== null) path.replaceWith(t.stringLiteral(cur.cooked));
        else path.replaceWith(t.templateLiteral(quasis.map((q, i) => t.templateElement(q, i === quasis.length - 1)), exprs));
        stats.folds++;
      },
    },
    IfStatement: {
      exit(path) {
        ctx.tick();
        const n = path.node;
        const l = litValue(n.test);
        if (!l.ok) return;
        const keep = l.v ? n.consequent : n.alternate;
        const drop = l.v ? n.alternate : n.consequent;
        if (!keep) {
          const info = hoistInfo(drop);
          if (info.hasFn) return;
          if (info.names.length) {
            const uniq = [...new Set(info.names)];
            path.replaceWith(t.variableDeclaration('var', uniq.map((nm) => t.variableDeclarator(t.identifier(nm)))));
          } else if (path.inList || path.parentPath.isBlockStatement()) path.remove();
          else path.replaceWith(t.emptyStatement());
          stats.branches++;
          return;
        }
        if (drop) { const info = hoistInfo(drop); if (info.hasFn) return; if (info.names.length) {
          // keep hoisted vars alive
          const uniq = [...new Set(info.names)];
          const decl = t.variableDeclaration('var', uniq.map((nm) => t.variableDeclarator(t.identifier(nm))));
          if (path.inList) { path.insertBefore(decl); } else { path.replaceWith(t.blockStatement([decl, keep])); stats.branches++; return; }
        } }
        unwrapInto(path, keep);
        stats.branches++;
      },
    },
  });
  if (stats.folds + stats.branches + (stats.mba ?? 0) === 0) return { code, stats };
  return { code: generateCode(ast, { comments: ctx.keepComments }), stats };
}
