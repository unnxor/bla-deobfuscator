// Slicing helpers: top-level declarations, references, and a self-contained code slice for a set of root names.
import { generate, t } from '../parse.js';

/** Map top-level binding name -> statement path (functions, variable declarations, classes). */
export function topLevelDecls(programPath) {
  const map = new Map();
  for (const sp of programPath.get('body')) {
    const n = sp.node;
    if (t.isFunctionDeclaration(n) || t.isClassDeclaration(n)) { if (n.id) map.set(n.id.name, sp); }
    else if (t.isVariableDeclaration(n)) {
      for (const name of Object.keys(t.getBindingIdentifiers(n))) map.set(name, sp);
    }
  }
  return map;
}

/** Names of top-level bindings referenced inside a path. */
export function topLevelRefs(path, programScope) {
  const out = new Set();
  const visit = (p) => {
    const n = p.node;
    if (!t.isIdentifier(n)) return;
    const isRef = p.isReferencedIdentifier() || (p.parentPath.isAssignmentExpression() && p.parent.left === n) || p.parentPath.isUpdateExpression();
    if (!isRef) return;
    const b = p.scope.getBinding(n.name);
    if (b && b.scope === programScope) out.add(n.name);
  };
  visit(path);
  path.traverse({ Identifier: visit });
  return out;
}

/** Transitive closure of top-level statements needed by `rootNames`. Returns {code, statements:Set, names:Set} or null. */
export function buildSlice(programPath, rootNames, maxBytes = 65536) {
  const decls = topLevelDecls(programPath);
  const scope = programPath.scope;
  const need = new Set();
  const work = [...rootNames];
  const stmts = new Set();
  while (work.length) {
    const name = work.pop();
    if (need.has(name)) continue;
    need.add(name);
    const sp = decls.get(name);
    if (!sp) return null;
    if (!stmts.has(sp)) {
      stmts.add(sp);
      for (const r of topLevelRefs(sp, scope)) work.push(r);
      for (const nm of Object.keys(t.getBindingIdentifiers(sp.node))) need.add(nm);
    }
  }
  const ordered = programPath.get('body').filter((sp) => stmts.has(sp));
  let code = '';
  for (const sp of ordered) {
    code += generate(sp.node, { comments: false, jsescOption: { minimal: true } }).code + '\n';
    if (code.length > maxBytes) return null;
  }
  return { code, statements: stmts, names: need };
}
