// Post-conditions every pass must satisfy, else the driver rolls it back.
import { t, traverse, parseCode } from './parse.js';

function keyName(k, computed) {
  if (computed) return null;
  if (t.isIdentifier(k)) return k.name;
  if (t.isStringLiteral(k)) return k.value;
  return null;
}

/** One traversal gathers everything the validator compares (carrier, exports, directives, free globals). */
export function describe(code, plugins, sourceType) {
  const ast = parseCode(code, { plugins, sourceType });
  const names = new Set();
  const directives = new Map();
  const globals = new Set();
  let carrier = 'script';
  const addDirective = (d) => directives.set(d.value.value, (directives.get(d.value.value) ?? 0) + 1);
  const isModExports = (n) => t.isMemberExpression(n) && t.isIdentifier(n.object, { name: 'module' }) && keyName(n.property, n.computed) === 'exports';

  traverse(ast, {
    Program(p) {
      for (const k of Object.keys(p.scope.globals)) globals.add(k);
      ast.program.directives.forEach(addDirective);
      if (ast.program.body.some((n) => n.type.startsWith('Import') || n.type.startsWith('Export'))) carrier = 'esm';
      else if (['module', 'exports', 'require'].some((k) => p.scope.globals[k] && !p.scope.hasOwnBinding(k))) carrier = 'cjs';
    },
    Function(p) { if (t.isBlockStatement(p.node.body)) p.node.body.directives.forEach(addDirective); },
    AssignmentExpression(p) {
      const l = p.node.left;
      if (!t.isMemberExpression(l)) return;
      if (isModExports(l)) {
        const r = p.node.right;
        if (t.isObjectExpression(r)) {
          for (const pr of r.properties) names.add(t.isObjectProperty(pr) || t.isObjectMethod(pr) ? 'm:' + (keyName(pr.key, pr.computed) ?? '?') : 'm:...');
        } else names.add('m:=');
      } else if (t.isIdentifier(l.object, { name: 'exports' }) || isModExports(l.object)) {
        names.add('e:' + (keyName(l.property, l.computed) ?? '?'));
      }
    },
    ExportNamedDeclaration(p) {
      const n = p.node;
      if (n.declaration) for (const k of Object.keys(t.getBindingIdentifiers(n.declaration))) names.add('x:' + k);
      for (const sp of n.specifiers) names.add('x:' + (sp.exported.name ?? sp.exported.value));
    },
    ExportDefaultDeclaration() { names.add('x:default'); },
    ExportAllDeclaration() { names.add('x:*'); },
  });

  return { carrier, exports: [...names].sort().join('|'), globals, directives, progDirectives: ast.program.directives.map((d) => d.value.value).join('|'), mode: ast.program.sourceType };
}

/** returns {ok, reason} comparing `after` to the previous good `before` description. */
export function validate(beforeInfo, afterCode, beforeLen, ctx) {
  let after;
  try { after = describe(afterCode, ctx.plugins, ctx.sourceType); } catch { return { ok: false, reason: 'output does not re-parse' }; }
  // a browser script whose only CJS-looking references were the generator's prelude legitimately becomes a plain script
  const cjsToScript = beforeInfo.carrier === 'cjs' && after.carrier === 'script' && !beforeInfo.exports && !after.exports;
  if (after.carrier !== beforeInfo.carrier && !cjsToScript) return { ok: false, reason: 'carrier changed' };
  if (after.exports !== beforeInfo.exports) return { ok: false, reason: 'export set changed' };
  if (after.mode !== beforeInfo.mode) return { ok: false, reason: 'source mode changed' };
  if (after.progDirectives !== beforeInfo.progDirectives) return { ok: false, reason: 'directive prologue changed' };
  for (const [k, n] of after.directives) if ((beforeInfo.directives.get(k) ?? 0) < n) return { ok: false, reason: 'new directive' };
  for (const g of after.globals) if (!beforeInfo.globals.has(g)) return { ok: false, reason: 'new free identifier' };
  if (ctx.normalized && afterCode.length > beforeLen * 1.05 + 64) return { ok: false, reason: 'output grew' };
  return { ok: true, info: { carrier: after.carrier, exports: after.exports, globals: after.globals, directives: after.directives, progDirectives: after.progDirectives, mode: after.mode } };
}
