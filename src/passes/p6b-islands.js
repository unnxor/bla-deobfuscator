// P6b: dead "island" removal. Top-level statements that are provably side-effect free outside their own island
// (decoy/labyrinth/chaff helpers, state objects, `void decoy(123)` calls) are removed as whole connected components.
//
// Soundness rules (anything unproven keeps the component alive):
//  * only cjs/esm carriers (script top-level bindings are globals and observable);
//  * a component is dead only if EVERY statement in it is a "pure candidate"; one non-candidate statement
//    (require, exports assignment, unknown call, class, ...) that touches the component keeps all of it;
//  * pure functions: no this/arguments/eval/with/throw/new/await/yield/async/generator, no delete, no writes to
//    parameters' members, calls only to other pure top-level functions or Math.*, globals limited to Math and
//    `typeof process` / `process.pid` reads, no unconditional infinite loops.
import { t, traverse, parseCode, generateCode, detectCarrier } from '../parse.js';
import { isGeneratorName as blaLike } from '../util/bla-vocab.js';

const SAFE_GLOBAL_CALL_ROOTS = new Set(['Math']);
const TYPED = ['ArrayBuffer', 'Int8Array', 'Uint8Array', 'Uint8ClampedArray', 'Int16Array', 'Uint16Array', 'Int32Array', 'Uint32Array', 'Float32Array', 'Float64Array', 'DataView'];
const SAFE_GLOBAL_READS = new Set(['Math', 'undefined', 'NaN', 'Infinity', ...TYPED]);

function declaredNames(stmt) {
  if (t.isFunctionDeclaration(stmt)) return stmt.id ? [stmt.id.name] : [];
  if (t.isVariableDeclaration(stmt)) return stmt.declarations.flatMap((d) => (t.isIdentifier(d.id) ? [d.id.name] : null) ?? [null]);
  return [];
}

export function runIslands(code, ctx) {
  const stats = { removed: 0, components: 0 };
  const ast = parseCode(code, { plugins: ctx.plugins, sourceType: ctx.sourceType });
  const carrier = detectCarrier(ast);
  const isScript = carrier === 'script'; // top-level bindings are globals: only generator-named islands may go

  let programPath;
  traverse(ast, { Program(p) { programPath = p; p.stop(); } });
  const scope = programPath.scope;
  const body = ast.program.body;

  // unused imports of node builtins (e.g. BLA's `createRequire` carrier) have no side effects: drop them
  if (carrier === 'esm') {
    for (const sp of programPath.get('body')) {
      if (!sp.isImportDeclaration() || !sp.node.source.value.startsWith('node:')) continue;
      const kept = sp.node.specifiers.filter((sp2) => { const b = scope.getBinding(sp2.local.name); return !b || b.referenced || b.constantViolations.length; });
      if (kept.length === sp.node.specifiers.length || !sp.node.specifiers.length) continue;
      stats.removed += sp.node.specifiers.length - kept.length;
      if (kept.length) sp.node.specifiers = kept; else sp.remove();
    }
    scope.crawl();
  }

  // statement index for each top-level binding
  const owner = new Map();
  const badDecl = new Set();
  body.forEach((stmt, i) => {
    if (t.isFunctionDeclaration(stmt) || t.isVariableDeclaration(stmt)) {
      const names = declaredNames(stmt);
      if (names.includes(null)) badDecl.add(i);
      for (const n of names) if (n) owner.set(n, i);
    }
  });

  // does the program contain constructs that make static reasoning unsound?
  let unsafeDynamic = false;
  traverse(ast, {
    CallExpression(p) { if (t.isIdentifier(p.node.callee, { name: 'eval' })) unsafeDynamic = true; },
    WithStatement() { unsafeDynamic = true; },
  });
  if (unsafeDynamic) return { code, stats };

  // ---- purity of functions (greatest fixpoint) ----
  const fnDecls = new Map(); // name -> {path, idx}
  programPath.get('body').forEach((sp, i) => {
    if (sp.isFunctionDeclaration() && sp.node.id && !sp.node.async && !sp.node.generator) fnDecls.set(sp.node.id.name, { path: sp, idx: i });
  });
  const pureFns = new Set(fnDecls.keys());

  const isTopBinding = (path, name) => { const b = path.scope.getBinding(name); return b && b.scope === scope ? b : null; };

  function functionIsPure(name, path) {
    let ok = true;
    const bail = () => { ok = false; };
    const fnNode = path.node;
    const paramBindings = new Set();
    for (const p of fnNode.params) if (!t.isIdentifier(p)) return false;
    path.traverse({
      ThisExpression: bail, Super: bail, ThrowStatement: bail,
      NewExpression(p) { const c = p.node.callee; if (!(t.isIdentifier(c) && TYPED.includes(c.name) && !p.scope.getBinding(c.name))) bail(); },
      AwaitExpression: bail, YieldExpression: bail,
      ClassDeclaration: bail, ClassExpression: bail, TryStatement: bail, ForOfStatement: bail, ForInStatement: bail,
      MetaProperty: bail, TaggedTemplateExpression: bail, ImportExpression: bail,
      Function(p) { if (p.node !== fnNode) bail(); },
      WhileStatement(p) { if (t.isBooleanLiteral(p.node.test, { value: true }) || t.isNumericLiteral(p.node.test)) bail(); },
      DoWhileStatement(p) { if (t.isBooleanLiteral(p.node.test, { value: true }) || t.isNumericLiteral(p.node.test)) bail(); },
      ForStatement(p) { if (!p.node.test) bail(); },
      UnaryExpression(p) { if (p.node.operator === 'delete') bail(); },
      Identifier(p) {
        if (!p.isReferencedIdentifier()) return;
        const nm = p.node.name;
        if (nm === 'arguments') return bail();
        const b = p.scope.getBinding(nm);
        if (b) return;
        // unbound: only Math.*, undefined, NaN, Infinity, `typeof process`, `process.pid` reads
        if (SAFE_GLOBAL_READS.has(nm)) return;
        if (nm === 'process') {
          const par = p.parent;
          const okTypeof = t.isUnaryExpression(par, { operator: 'typeof' });
          const okMember = t.isMemberExpression(par, { computed: false }) && par.object === p.node && t.isIdentifier(par.property, { name: 'pid' }) && !t.isAssignmentExpression(p.parentPath.parent, { left: par });
          const okTest = t.isLogicalExpression(par) || t.isConditionalExpression(par) || t.isBinaryExpression(par);
          if (okTypeof || okMember || okTest) return;
        }
        bail();
      },
      CallExpression(p) {
        const c = p.node.callee;
        if (t.isIdentifier(c)) {
          if (!pureFns.has(c.name) || p.scope.getBinding(c.name)?.scope !== scope) return bail();
          return;
        }
        if (t.isMemberExpression(c) && !c.computed && t.isIdentifier(c.object) && SAFE_GLOBAL_CALL_ROOTS.has(c.object.name) && !p.scope.getBinding(c.object.name)) return;
        bail();
      },
      AssignmentExpression(p) { if (!targetOk(p.get('left'), path, fnNode)) bail(); },
      UpdateExpression(p) { if (!targetOk(p.get('argument'), path, fnNode)) bail(); },
    });
    return ok;
  }

  // assignment target must be a local of this function, or a member chain rooted at a local / top-level binding
  // (never at a parameter, which may alias caller data, nor at a global)
  function targetOk(tp, fnPath, fnNode) {
    let n = tp.node; let cur = tp;
    while (t.isMemberExpression(n)) { n = n.object; cur = cur.get('object'); }
    if (!t.isIdentifier(n)) return false;
    const b = cur.scope.getBinding(n.name);
    if (!b) return false;
    if (b.kind === 'param') return t.isIdentifier(tp.node) && !t.isMemberExpression(tp.node) && b.scope.path === fnPath;
    if (b.scope === scope) return !t.isIdentifier(tp.node) || false; // writing top-level binding itself: keep conservative unless member write
    return true;
  }

  for (let changed = true; changed;) {
    changed = false;
    for (const name of [...pureFns]) {
      let ok = false;
      try { ok = functionIsPure(name, fnDecls.get(name).path); } catch { ok = false; }
      if (!ok) { pureFns.delete(name); changed = true; }
    }
  }

  // ---- pure expressions (for top-level initialisers / statements) ----
  const pureExpr = (n, d = 0) => {
    if (!n || d > 40) return false;
    switch (n.type) {
      case 'StringLiteral': case 'NumericLiteral': case 'BooleanLiteral': case 'NullLiteral': case 'BigIntLiteral': return true;
      case 'TemplateLiteral': return n.expressions.every((e) => pureExpr(e, d + 1));
      case 'Identifier': return owner.has(n.name) || SAFE_GLOBAL_READS.has(n.name);
      case 'ArrayExpression': return n.elements.every((e) => e === null || (!t.isSpreadElement(e) && pureExpr(e, d + 1)));
      case 'ObjectExpression': return n.properties.every((p) => t.isObjectProperty(p) && !p.computed && pureExpr(p.value, d + 1));
      case 'UnaryExpression': return n.operator !== 'delete' && pureExpr(n.argument, d + 1);
      case 'BinaryExpression': case 'LogicalExpression': return pureExpr(n.left, d + 1) && pureExpr(n.right, d + 1);
      case 'ConditionalExpression': return pureExpr(n.test, d + 1) && pureExpr(n.consequent, d + 1) && pureExpr(n.alternate, d + 1);
      case 'SequenceExpression': return n.expressions.every((e) => pureExpr(e, d + 1));
      case 'CallExpression': return t.isIdentifier(n.callee) && pureFns.has(n.callee.name) && n.arguments.every((a) => !t.isSpreadElement(a) && pureExpr(a, d + 1));
      case 'MemberExpression': if (t.isMetaProperty(n.object) && n.object.meta.name === 'import' && t.isIdentifier(n.property)) return true; return !n.computed && t.isIdentifier(n.object) && owner.has(n.object.name) && t.isIdentifier(n.property);
      case 'FunctionExpression': case 'ArrowFunctionExpression': return false;
      default: return false;
    }
  };

  // ---- classify each top-level statement ----
  const candidate = body.map((stmt, i) => {
    if (t.isFunctionDeclaration(stmt)) return !!stmt.id && pureFns.has(stmt.id.name);
    if (t.isVariableDeclaration(stmt)) {
      if (badDecl.has(i)) return false;
      return stmt.declarations.every((d) => t.isIdentifier(d.id) && d.init && pureExpr(d.init));
    }
    if (t.isExpressionStatement(stmt)) {
      const e = stmt.expression;
      if (t.isUnaryExpression(e, { operator: 'void' })) return pureExpr(e.argument);
      return pureExpr(e);
    }
    return false;
  });

  // ---- connected components through top-level binding references ----
  const parent = body.map((_, i) => i);
  const find = (x) => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
  const union = (a, b) => { a = find(a); b = find(b); if (a !== b) parent[b] = a; };
  programPath.get('body').forEach((sp, i) => {
    sp.traverse({
      Identifier(p) {
        if (!p.isReferencedIdentifier() && !p.isBindingIdentifier() && !p.parentPath.isAssignmentExpression({ left: p.node })) return;
        const b = isTopBinding(p, p.node.name);
        if (b && owner.has(p.node.name)) union(i, owner.get(p.node.name));
      },
    });
    // statement itself (e.g. `fn(1)` ExpressionStatement: callee identifier is a reference, handled above)
  });
  // exports of ESM and CJS statements are non-candidates, so they pin their components alive
  const alive = new Set();
  body.forEach((_, i) => { if (!candidate[i]) alive.add(find(i)); });
  if (isScript) { // a component may only be dropped if every binding it declares carries a generator-style name
    body.forEach((stmt, i) => { if (candidate[i] && declaredNames(stmt).some((n) => n && !blaLike(n))) alive.add(find(i)); });
  }
  const drop = new Set();
  body.forEach((_, i) => { if (candidate[i] && !alive.has(find(i))) drop.add(i); });
  if (!drop.size && !stats.removed) return { code, stats };

  stats.removed += drop.size;
  stats.components = new Set([...drop].map(find)).size;
  ast.program.body = body.filter((_, i) => !drop.has(i));
  return { code: generateCode(ast, { comments: ctx.keepComments }), stats };
}
