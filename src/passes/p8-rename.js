// P8: rename & format. Strip BLA tag suffixes, give require/destructure aliases their source names.
import { t, traverse, parseCode, generateCode, detectCarrier } from '../parse.js';
import { isWord, isIdent, hexTagAt } from '../util/chars.js';

const RESERVED = new Set(('break case catch class const continue debugger default delete do else enum export extends false finally for function if import in instanceof new null return super switch this throw true try typeof var void while with yield let static await async of arguments eval undefined NaN Infinity ' +
  'implements interface package private protected public null Object Array Math JSON Number String Boolean Symbol Promise Error Buffer process require module exports global globalThis console Date RegExp Map Set').split(' '));
/** name without its `_hex` tag, or null */
const stripTag = (s) => { const i = hexTagAt(s, 3, 4); return i > 0 ? s.slice(0, i) : null; };

function sanitizeModName(s) {
  const parts = (s.startsWith('node:') ? s.slice(5) : s).split('/').filter(Boolean);
  const base = parts.map((p, i) => (i ? p[0].toUpperCase() + p.slice(1) : p)).join('');
  const id = base.split('').map((c) => (isWord(c) || c === '$' ? c : '_')).join('');
  return isIdent(id) ? id : null;
}

function hintFor(binding) {
  const p = binding.path;
  if (!t.isVariableDeclarator(p.node) || !p.node.init) return null;
  const init = p.node.init;
  const isReq = t.isCallExpression(init) && t.isIdentifier(init.callee, { name: 'require' }) && init.arguments.length === 1 && t.isStringLiteral(init.arguments[0]);
  if (!isReq) return null;
  if (t.isIdentifier(p.node.id)) return sanitizeModName(init.arguments[0].value);
  if (t.isObjectPattern(p.node.id)) {
    for (const prop of p.node.id.properties) {
      if (t.isObjectProperty(prop) && !prop.computed && t.isIdentifier(prop.key) && t.isIdentifier(prop.value)
        && prop.value.name === binding.identifier.name) return prop.key.name;
    }
  }
  return null;
}

export function hasDupParams(b) {
  const fn = b.kind === 'param' ? b.scope.path : null;
  if (!fn || !fn.node.params) return false;
  const names = fn.node.params.flatMap((p) => Object.keys(t.getBindingIdentifiers(p)));
  return new Set(names).size !== names.length;
}

export function runRename(code, ctx) {
  const ast = parseCode(code, { plugins: ctx.plugins, sourceType: ctx.sourceType });
  const carrier = detectCarrier(ast);
  const stats = { renamed: 0 };
  let unsafe = false;
  const used = new Set(RESERVED);
  const skipFnNames = new Set();
  let programScope;
  const exportedBindings = new Set();

  traverse(ast, {
    Program(pp) { programScope = pp.scope; pp.scope.crawl(); },
    Identifier(p) {
      if (p.isReferencedIdentifier() || p.isBindingIdentifier()) used.add(p.node.name);
    },
    'CallExpression|NewExpression'(p) {
      const c = p.node.callee;
      if (t.isIdentifier(c) && (c.name === 'eval' || c.name === 'Function') && !p.scope.getBinding(c.name)) unsafe = true;
    },
    WithStatement() { unsafe = true; },
    MemberExpression(p) {
      const n = p.node;
      if (((!n.computed && t.isIdentifier(n.property, { name: 'name' })) || (n.computed && t.isStringLiteral(n.property, { value: 'name' }))) && t.isIdentifier(n.object)) {
        const b = p.scope.getBinding(n.object.name);
        if (b) skipFnNames.add(b);
      }
    },
    ExportSpecifier(p) {
      const b = p.scope.getBinding(p.node.local.name);
      if (b) exportedBindings.add(b);
    },
  });
  if (unsafe) return { code, stats };

  const bindingsInOrder = [];
  traverse(ast, {
    Scopable(path) {
      const sc = path.scope;
      if (sc.path !== path) return;
      for (const b of Object.values(sc.bindings)) bindingsInOrder.push(b);
    },
  });
  const seen = new Set();
  for (const b of bindingsInOrder) {
    if (seen.has(b)) continue;
    seen.add(b);
    const name = b.identifier.name;
    if (b.kind === 'module') continue;
    if (b.scope === programScope && carrier === 'script') continue;
    if (exportedBindings.has(b)) continue;
    const decl = b.path;
    if (decl.parentPath && (decl.parentPath.isExportNamedDeclaration() || decl.parentPath.isExportDefaultDeclaration()
      || (decl.parentPath.parentPath && decl.parentPath.parentPath.isExportNamedDeclaration()))) continue;
    if ((b.path.isFunctionDeclaration() || b.path.isClassDeclaration()) && skipFnNames.has(b)) continue;
    if (hasDupParams(b)) continue;
    if (b.path.isFunctionDeclaration() && !(b.path.parentPath.isProgram() || b.path.parentPath.parentPath?.isFunction())) continue; // Annex B block functions
    let next = null;
    const hint = hintFor(b);
    if (hint && hint !== name && isIdent(hint) && !used.has(hint)) next = hint;
    else {
      const bare = stripTag(name);
      if (bare && isIdent(bare) && !used.has(bare)) next = bare;
    }
    if (!next || RESERVED.has(next)) continue;
    try {
      b.scope.rename(name, next);
      ctx.renames?.push({ from: name, to: next, pass: 'tags' });
      used.add(next);
      stats.renamed++;
    } catch { /* leave as is */ }
  }
  if (stats.renamed === 0) return { code, stats };
  traverse(ast, {
    ObjectProperty(p) {
      const n = p.node;
      if (n.computed || n.shorthand || !t.isIdentifier(n.key)) return;
      if (t.isIdentifier(n.value, { name: n.key.name })) n.shorthand = true;
      else if (t.isAssignmentPattern(n.value) && t.isIdentifier(n.value.left, { name: n.key.name })) n.shorthand = true;
    },
  });
  return { code: generateCode(ast, { comments: ctx.keepComments }), stats };
}
