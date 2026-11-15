// P1: comment & sourcemap strip. Comments carry no semantics. Counts only (never echoes comment text).
import { traverse, parseCode, generateCode } from '../parse.js';
import { isCanaryComment } from '../analysis/signatures.js';

/** `# sourceMappingURL=` / `@ sourceMappingURL=` comment */
function isSourceMap(text) {
  const v = text.trim();
  return (v[0] === '#' || v[0] === '@') && v.slice(1).trimStart().startsWith('sourceMappingURL=');
}

export function runComments(code, ctx) {
  const ast = parseCode(code, { plugins: ctx.plugins, sourceType: ctx.sourceType });
  const stats = { comments: ast.comments?.length ?? 0, canary: 0, sourcemap: 0 };
  for (const c of ast.comments ?? []) {
    if (isCanaryComment(c.value)) stats.canary++;
    if (isSourceMap(c.value)) stats.sourcemap++;
  }
  if (ctx.keepComments) {
    const keep = (c) => !isCanaryComment(c.value) && !isSourceMap(c.value);
    traverse(ast, {
      enter(path) {
        const n = path.node;
        for (const k of ['leadingComments', 'trailingComments', 'innerComments']) if (n[k]) n[k] = n[k].filter(keep);
      },
    });
  }
  return { code: generateCode(ast, { comments: !!ctx.keepComments }), stats };
}
