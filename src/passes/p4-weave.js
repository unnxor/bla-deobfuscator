// P4: weave stripping (statement level): shadow-heap stepper calls and `void <pure>;` anchors.
import { t, traverse, parseCode, generateCode } from '../parse.js';
import { findSteppers } from '../analysis/signatures.js';

function pureArg(n, scope) {
  if (t.isNumericLiteral(n) || t.isStringLiteral(n)) return true;
  if (t.isIdentifier(n)) return !!scope.getBinding(n.name);
  if (t.isMemberExpression(n) && !n.computed && t.isIdentifier(n.object) && t.isIdentifier(n.property)) return !!scope.getBinding(n.object.name);
  if (t.isUnaryExpression(n) && n.operator === '-') return t.isNumericLiteral(n.argument);
  return false;
}

export function runWeave(code, ctx) {
  const ast = parseCode(code, { plugins: ctx.plugins, sourceType: ctx.sourceType });
  const stats = { stepperCalls: 0, voidAnchors: 0 };
  let steppers = new Set();
  let programScope = null;
  traverse(ast, {
    Program(pp) {
      programScope = pp.scope;
      steppers = findSteppers(pp).steppers;
    },
    ExpressionStatement(path) {
      ctx.tick();
      const e = path.node.expression;
      if (t.isCallExpression(e) && t.isIdentifier(e.callee) && steppers.has(e.callee.name)) {
        const b = path.scope.getBinding(e.callee.name);
        if (b && b.scope === programScope && e.arguments.length <= 1 && e.arguments.every((a) => pureArg(a, path.scope))) {
          path.remove(); stats.stepperCalls++; return;
        }
      }
      if (t.isUnaryExpression(e, { operator: 'void' })) {
        const a = e.argument;
        const ok = (x) => t.isIdentifier(x) && !!path.scope.getBinding(x.name);
        if (ok(a) || (t.isArrayExpression(a) && a.elements.every((x) => x && ok(x)))) { path.remove(); stats.voidAnchors++; }
      }
    },
  });
  if (stats.stepperCalls + stats.voidAnchors === 0) return { code, stats };
  return { code: generateCode(ast, { comments: ctx.keepComments }), stats };
}
