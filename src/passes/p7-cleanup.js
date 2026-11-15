// P7: small semantics-safe cleanups: const literal propagation, empty statements.
import { t, traverse, parseCode, generateCode } from '../parse.js';
import { makeLiteral } from './p3-fold.js';

export function runCleanup(code, ctx) {
  const ast = parseCode(code, { plugins: ctx.plugins, sourceType: ctx.sourceType });
  const stats = { inlined: 0, empty: 0 };
  let unsafe = false;
  traverse(ast, {
    'CallExpression|NewExpression'(p) { const c = p.node.callee; if (t.isIdentifier(c) && (c.name === 'eval' || c.name === 'Function') && !p.scope.getBinding(c.name)) { unsafe = true; p.stop(); } },
    WithStatement(p) { unsafe = true; p.stop(); },
  });
  if (unsafe) return { code, stats };
  traverse(ast, {
    Program(pp) { pp.scope.crawl(); },
    VariableDeclarator(path) {
      ctx.tick();
      const { node, parent } = path;
      if (parent.kind !== 'const' || !t.isIdentifier(node.id) || !node.init) return;
      const init = node.init;
      let v;
      if (t.isStringLiteral(init)) { if (init.value.length > 200) return; v = init.value; }
      else if (t.isNumericLiteral(init) || t.isBooleanLiteral(init)) v = init.value;
      else if (t.isUnaryExpression(init, { operator: '-' }) && t.isNumericLiteral(init.argument)) v = -init.argument.value;
      else return;
      if (t.isExportNamedDeclaration(path.parentPath.parent)) return;
      const b = path.scope.getBinding(node.id.name);
      if (!b || !b.constant || b.path.node !== node) return;
      for (const r of b.referencePaths) {
        if (r.parentPath.isExportSpecifier() || r.parentPath.isExportDefaultDeclaration()) return;
        if (r.parentPath.isCallExpression({ callee: r.node })) return;
      }
      for (const r of b.referencePaths) {
        if (r.parentPath.isObjectProperty() && r.parent.shorthand) r.parent.shorthand = false;
        const lit = makeLiteral(v);
        r.replaceWith(lit);
        stats.inlined++;
      }
      b.referencePaths.length = 0;
      path.remove();
    },
    EmptyStatement(path) {
      if (path.inList && !path.parentPath.isFor?.()) { path.remove(); stats.empty++; }
    },
  });
  if (stats.inlined + stats.empty === 0) return { code, stats };
  return { code: generateCode(ast, { comments: ctx.keepComments }), stats };
}
