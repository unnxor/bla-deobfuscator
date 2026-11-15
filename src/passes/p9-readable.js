// P9 (last pass): readable renaming. Replaces garbage-looking identifiers (num12341, _0xab12, x, strhiasrfj23, ...)
// with deterministic names inferred from usage. Never touches properties, exports, globals or anything observable.
import { t, traverse, parseCode, generateCode, detectCarrier } from '../parse.js';
import { hasDupParams } from './p8-rename.js';
import { isBlaName } from '../util/bla-vocab.js';
import { isAlpha, isDigit, isLower, isUpper, isHex, isIdent, all, run, lead, hexTagAt, splitDigits, lowerAscii } from '../util/chars.js';

const RESERVED = new Set(('break case catch class const continue debugger default delete do else enum export extends false finally for function if import in instanceof new null return super switch this throw true try typeof var void while with yield let static await async of arguments eval undefined NaN Infinity ' +
  'implements interface package private protected public Object Array Math JSON Number String Boolean Symbol Promise Error Buffer process require module exports global globalThis console Date RegExp Map Set').split(' '));
const KEEP = new Set(['fs', 'os', 'vm', 'id', 'db', 'io', 'ok', 'ui', 'cb', 'fn', '_', '$', 'js', 'ws']);
const NUMSAFE_STEMS = new Set(['sha', 'md', 'utf', 'base', 'int', 'uint', 'float', 'es', 'ipv', 'crc', 'aes', 'des', 'rsa', 'ec', 'win', 'ucs', 'latin', 'iso', 'ieee', 'vec', 'mat']);
// stems this pass generates (+ numeric uniquifier) are never considered garbage => idempotent
const OWN_STEMS = new Set(['i', 'j', 'k', 'l', 'arg', 'value', 'item', 'items', 'fn', 'obj', 'text', 'num', 'list', 'result', 'flag', 'err', 'key', 'index', 'buf', 'callback', 'acc', 'options', 'klass', 'self', 'len', 'parts', 'part', 'keys', 'values', 'entries', 'bytes', 'idx']);
const GLOBAL_OBJECTS = new Set(['globalThis', 'window', 'self', 'global']);
const REL_OPS = new Set(['<', '>', '<=', '>=']);
const LEAD_VERBS = new Set(['get', 'read', 'load', 'parse', 'create', 'make', 'build', 'compute', 'calc', 'find', 'fetch', 'resolve', 'derive', 'decode', 'encode', 'extract', 'collect', 'generate', 'init', 'new', 'to', 'from']);

const isNameChar = (c) => isAlpha(c) || c === '_' || c === '$';
const isLowerDigit = (c) => isLower(c) || isDigit(c);
const numSafe = (name) => { const [stem, digits] = splitDigits(name); return digits !== '' && NUMSAFE_STEMS.has(lowerAscii(stem)); };
const ownStemNum = (name) => { const [stem, digits] = splitDigits(name); return digits.length >= 1 && digits.length <= 2 && OWN_STEMS.has(stem); };

/** `_0x1a2b` (hex digits any case) */
const isHexName = (name) => name.startsWith('_0') && 'xX'.includes(name[2] ?? '-') && name.length > 3 && all(name, isHex, 3);

/** `fooBarBaz_1f8`: lowercase word, one or more Capitalised words, hex tag */
function isTaggedCamel(name) {
  const i = hexTagAt(name, 3, 4);
  if (i < 0) return false;
  const base = name.slice(name[0] === '_' ? 1 : 0, i);
  let p = lead(base, isLower);
  if (p === 0) return false;
  let words = 0;
  while (p < base.length) {
    const n = isUpper(base[p]) ? lead(base, isLowerDigit, p + 1) : 0;
    if (n === 0) return false;
    p += n + 1; words++;
  }
  return words > 0;
}

/** `_a`, `__x1`: underscores followed by up to three alphanumerics */
function isUnderscoreShort(name) {
  const n = lead(name, (c) => c === '_');
  const rest = name.slice(n);
  return n > 0 && run(rest, (c) => isAlpha(c) || isDigit(c), 1, 3);
}

export function isGarbage(name) {
  if (isHexName(name)) return true;
  if (KEEP.has(name)) return false;
  if (isBlaName(name)) return true;
  if (isTaggedCamel(name)) return true;
  if (run(name, isNameChar, 1, 2) || isUnderscoreShort(name)) return true;
  const [stem, digits] = splitDigits(name);
  if (digits !== '' && run(stem, isNameChar, 1, 3) && !numSafe(name)) return !ownStemNum(name);
  return digits.length >= 2 && run(stem, isLower, 2) && !numSafe(name) && !ownStemNum(name);
}

const lowerFirst = (s) => (s ? s[0].toLowerCase() + s.slice(1) : s);
const validId = (s) => isIdent(s) && !RESERVED.has(s);
const singular = (n) => {
  if (!n) return 'item';
  let r = n;
  if (r.endsWith('ies')) r = r.slice(0, -3) + 'y'; else if (r.endsWith('s') && !r.endsWith('ss')) r = r.slice(0, -1);
  return r.length >= 2 && r !== n ? r : 'item';
};
/** `getFooBar` -> `fooBar` for a known leading verb */
const rest = (nm) => {
  const n = lead(nm, isLower);
  if (n === nm.length || !isUpper(nm[n] ?? '') || !LEAD_VERBS.has(nm.slice(0, n))) return null;
  const r = lowerFirst(nm.slice(n));
  return validId(r) ? r : null;
};
const ARRAY_M = new Set(['push', 'pop', 'shift', 'unshift', 'map', 'forEach', 'filter', 'reduce', 'some', 'every', 'find', 'concat', 'splice', 'sort', 'reverse', 'flat']);
const STR_M = new Set(['charCodeAt', 'codePointAt', 'split', 'trim', 'toLowerCase', 'toUpperCase', 'startsWith', 'endsWith', 'replace', 'substring', 'substr', 'padStart', 'padEnd', 'match', 'localeCompare', 'charAt', 'repeat']);
const CALL_TABLE = {
  'JSON.parse': 'parsed', 'JSON.stringify': 'json', 'Object.keys': 'keys', 'Object.values': 'values', 'Object.entries': 'entries', 'Object.assign': 'merged',
  'Array.from': 'list', 'Array.isArray': 'flag', 'Buffer.from': 'buf', 'Buffer.alloc': 'buf', 'Buffer.concat': 'buf', 'Date.now': 'now', 'path.join': 'filePath', 'path.resolve': 'filePath',
  'fs.readFileSync': 'content', 'crypto.createHash': 'hash', 'process.hrtime': 'time',
};
const METHOD_TABLE = { split: 'parts', map: 'mapped', filter: 'filtered', join: 'joined', toString: 'text', trim: 'text', replace: 'text', toLowerCase: 'text', toUpperCase: 'text',
  indexOf: 'index', includes: 'flag', startsWith: 'flag', endsWith: 'flag', test: 'flag', has: 'flag', every: 'flag', some: 'flag', push: 'length', pop: 'item', shift: 'item', find: 'found',
  reduce: 'result', then: 'promise', digest: 'digest', slice: 'part', substring: 'part', concat: 'list', readFileSync: 'content', update: 'hash', get: 'value' };

function calleePath(c) {
  if (t.isIdentifier(c)) return c.name;
  if (t.isMemberExpression(c) && !c.computed && t.isIdentifier(c.property)) { const o = calleePath(c.object); return o ? o + '.' + c.property.name : null; }
  return null;
}

function initName(n, readable) {
  if (!n) return null;
  switch (n.type) {
    case 'StringLiteral': case 'TemplateLiteral': return 'text';
    case 'NumericLiteral': return 'num';
    case 'BooleanLiteral': return 'flag';
    case 'NullLiteral': return 'value';
    case 'RegExpLiteral': return 'pattern';
    case 'ArrayExpression': return 'list';
    case 'ObjectExpression': return 'obj';
    case 'FunctionExpression': case 'ArrowFunctionExpression': return 'fn';
    case 'ClassExpression': return 'klass';
    case 'ThisExpression': return 'self';
    case 'AwaitExpression': return initName(n.argument, readable);
    case 'ParenthesizedExpression': return initName(n.expression, readable);
    case 'NewExpression': {
      const c = n.callee;
      const nm = t.isIdentifier(c) ? c.name : t.isMemberExpression(c) && t.isIdentifier(c.property) ? c.property.name : null;
      if (!nm) return null;
      if (nm === 'Uint8Array') return 'bytes';
      return validId(lowerFirst(nm)) ? lowerFirst(nm) : null;
    }
    case 'CallExpression': case 'OptionalCallExpression': {
      const c = n.callee;
      const p = calleePath(c);
      if (p === 'require' && t.isStringLiteral(n.arguments[0])) return null; // handled via require hint
      if (p && CALL_TABLE[p]) return CALL_TABLE[p];
      if (p && p.startsWith('Math.')) return 'num';
      if (p === 'String') return 'text';
      if (p === 'Number' || p === 'parseInt' || p === 'parseFloat') return 'num';
      if (p === 'Boolean') return 'flag';
      if (p === 'Array') return 'list';
      if (p === 'fetch') return 'response';
      if (t.isIdentifier(c)) return rest(c.name) ?? (readable(c.name) ? null : null) ?? 'result';
      if (t.isMemberExpression(c) && !c.computed && t.isIdentifier(c.property)) {
        const m = c.property.name;
        if (METHOD_TABLE[m]) {
          if ((m === 'slice' || m === 'substring') && t.isIdentifier(c.object) && readable(c.object.name)) return c.object.name;
          return METHOD_TABLE[m];
        }
        return rest(m) ?? (m.length > 2 && validId(m) ? m : 'result');
      }
      return 'result';
    }
    case 'MemberExpression': case 'OptionalMemberExpression': {
      if (n.computed) {
        if (t.isIdentifier(n.object) && readable(n.object.name)) return singular(n.object.name);
        return 'item';
      }
      if (t.isIdentifier(n.property)) return n.property.name === 'length' ? 'len' : validId(n.property.name) ? n.property.name : null;
      return null;
    }
    case 'UnaryExpression': return n.operator === '!' ? 'flag' : n.operator === 'typeof' ? 'type' : n.operator === 'void' ? 'value' : 'num';
    case 'UpdateExpression': return 'num';
    case 'BinaryExpression':
      if (['==', '!=', '===', '!==', '<', '<=', '>', '>=', 'in', 'instanceof'].includes(n.operator)) return 'flag';
      if (n.operator === '+' && (t.isStringLiteral(n.left) || t.isStringLiteral(n.right) || t.isTemplateLiteral(n.left) || t.isTemplateLiteral(n.right))) return 'text';
      return 'num';
    case 'LogicalExpression': return initName(n.right, readable) ?? initName(n.left, readable);
    case 'ConditionalExpression': return initName(n.consequent, readable) ?? initName(n.alternate, readable);
    case 'AssignmentExpression': return initName(n.right, readable);
    case 'SequenceExpression': return initName(n.expressions[n.expressions.length - 1], readable);
    case 'Identifier': return readable(n.name) ? n.name : null;
    default: return null;
  }
}

function typeofNameForCompare(p) {
  // typeof x === "string" etc. around a reference
  const u = p.parentPath;
  if (!u.isUnaryExpression({ operator: 'typeof' })) return null;
  const b = u.parentPath;
  if (!b.isBinaryExpression()) return null;
  const other = b.node.left === u.node ? b.node.right : b.node.left;
  if (!t.isStringLiteral(other)) return null;
  return { string: 'text', number: 'num', function: 'callback', object: 'obj', boolean: 'flag', bigint: 'num' }[other.value] ?? null;
}

function inferParam(b, readable) {
  const props = new Set();
  let hint = null;
  const set = (h) => { if (hint == null) hint = h; };
  let indexLike = false, listLike = false;
  for (const r of b.referencePaths) {
    const p = r.parentPath;
    const ty = typeofNameForCompare(r);
    if (ty) { set(ty); continue; }
    if (p.isCallExpression() && p.node.callee === r.node) { set('callback'); continue; }
    if (p.isNewExpression() && p.node.callee === r.node) { set('klass'); continue; }
    if (p.isAwaitExpression()) { set('promise'); continue; }
    if (p.isMemberExpression() && p.node.object === r.node) {
      if (p.node.computed) { listLike = true; continue; }
      const m = p.node.property.name;
      if (m === 'length') { listLike = true; continue; }
      if (ARRAY_M.has(m)) { set('list'); continue; }
      if (STR_M.has(m)) { set('text'); continue; }
      if (m === 'message' || m === 'stack' || m === 'code') { set('err'); continue; }
      props.add(m);
      continue;
    }
    if (p.isMemberExpression() && p.node.property === r.node && p.node.computed) { indexLike = true; continue; }
    if (p.isCallExpression()) {
      const cp = calleePath(p.node.callee);
      if (cp === 'JSON.parse') { set('json'); continue; }
      if (cp === 'parseInt' || cp === 'Number' || (cp && cp.startsWith('Math.'))) { set('num'); continue; }
      if (cp === 'String') { set('text'); continue; }
    }
    if (p.isBinaryExpression() && ['|', '&', '^', '<<', '>>', '>>>', '*', '/', '%', '-'].includes(p.node.operator)) { set('num'); continue; }
    if (p.isBinaryExpression({ operator: '+' }) && (t.isNumericLiteral(p.node.left) || t.isNumericLiteral(p.node.right))) { set('num'); continue; }
    if (p.isBinaryExpression() && REL_OPS.has(p.node.operator)) { set('num'); continue; }
    if (p.isUpdateExpression()) { set('num'); continue; }
    if (p.isUnaryExpression({ operator: '!' })) { set('flag'); continue; }
  }
  if (hint) return hint;
  if (indexLike) return 'index';
  if (listLike) return 'list';
  if (props.size >= 3) return 'options';
  if (props.size >= 1) return 'obj';
  return null;
}

function loopDepth(path) {
  let d = 0;
  for (let p = path.parentPath; p; p = p.parentPath) if (p.isFor() || p.isWhileStatement()) d++;
  return d;
}

function inferBinding(b, readable) {
  const node = b.path.node;
  const kind = b.kind;
  // 1. observable role from usage: stored under a property name (module.exports = { key: b }, obj.key = b)
  for (const r of b.referencePaths) {
    const p = r.parentPath;
    if (p.isObjectProperty() && p.node.value === r.node && !p.node.computed) {
      const k = t.isIdentifier(p.node.key) ? p.node.key.name : t.isStringLiteral(p.node.key) ? p.node.key.value : null;
      if (k && validId(k) && readable(k)) return k;
    }
    if (p.isAssignmentExpression() && p.node.right === r.node && t.isMemberExpression(p.node.left) && !p.node.left.computed && t.isIdentifier(p.node.left.property)) {
      const k = p.node.left.property.name;
      if (validId(k) && k !== 'exports' && readable(k)) return k;
    }
  }
  if (kind === 'param') {
    const fn = b.scope.path;
    // callbacks of well-known array methods
    const call = fn.parentPath;
    if ((fn.isArrowFunctionExpression() || fn.isFunctionExpression()) && call?.isCallExpression() && call.node.arguments[0] === fn.node && t.isMemberExpression(call.node.callee) && t.isIdentifier(call.node.callee.property)) {
      const m = call.node.callee.property.name;
      const idx = fn.node.params.findIndex((q) => q === b.path.node || (t.isAssignmentPattern(q) && q.left === b.path.node));
      const o = call.node.callee.object;
      const el = t.isIdentifier(o) && readable(o.name) ? singular(o.name) : 'item';
      if (['map', 'forEach', 'filter', 'find', 'some', 'every', 'flatMap', 'findIndex'].includes(m)) return idx === 0 ? el : idx === 1 ? 'index' : 'list';
      if (m === 'reduce') return idx === 0 ? 'acc' : idx === 1 ? el : idx === 2 ? 'index' : 'list';
      if (m === 'then') return 'value';
      if (m === 'catch') return 'err';
      if (m === 'on' || m === 'once') return idx === 0 ? 'data' : 'arg';
    }
    const dv = b.path.parentPath?.isAssignmentPattern() ? b.path.parentPath.node.right : null;
    const u = inferParam(b, readable);
    if (u) return u;
    if (dv) return initName(dv, readable) ?? 'arg';
    return 'arg';
  }
  if (b.path.isCatchClause?.() || (b.path.parentPath && b.path.parentPath.isCatchClause())) return 'err';
  if (b.path.isFunctionDeclaration() || b.path.isFunctionExpression()) return 'fn';
  if (b.path.isClassDeclaration() || b.path.isClassExpression()) return 'klass';
  if (b.path.isVariableDeclarator()) {
    const d = b.path.node;
    const decl = b.path.parentPath;
    const loop = decl.parentPath;
    if (loop?.isForOfStatement() && loop.node.left === decl.node) {
      const it = loop.node.right;
      return t.isIdentifier(it) && readable(it.name) ? singular(it.name) : 'item';
    }
    if (loop?.isForInStatement() && loop.node.left === decl.node) return 'key';
    if (loop?.isForStatement() && loop.node.init === decl.node && t.isIdentifier(d.id)) return ['i', 'j', 'k', 'l', 'm'][loopDepth(b.path) - 1] ?? 'idx';
    if (t.isIdentifier(d.id)) {
      const init = d.init;
      if (init && t.isCallExpression(init) && t.isIdentifier(init.callee, { name: 'require' }) && t.isStringLiteral(init.arguments[0])) return null;
      let n = initName(init, readable);
      if (!n && !init) {
        const cv = b.constantViolations.find((x) => x.isAssignmentExpression());
        if (cv) n = initName(cv.node.right, readable);
      }
      return n ?? 'value';
    }
    // destructuring: object pattern property key
    let cur = b.identifier;
    for (let p = b.path; p; p = null) { /* single level handled below */ }
    const pat = d.id;
    if (t.isObjectPattern(pat)) {
      for (const pr of pat.properties) {
        if (t.isObjectProperty(pr) && !pr.computed && t.isIdentifier(pr.key)) {
          const v = t.isAssignmentPattern(pr.value) ? pr.value.left : pr.value;
          if (v === cur) return pr.key.name;
        }
      }
    }
    return 'item';
  }
  void node;
  return null;
}

export function runReadable(code, ctx) {
  const stats = { renamed: 0 };
  const ast = parseCode(code, { plugins: ctx.plugins, sourceType: ctx.sourceType });
  const carrier = detectCarrier(ast);
  let unsafe = false;
  const skipFn = new Set();
  const exported = new Set();
  const stringKeyed = new Set();
  let programScope;
  traverse(ast, {
    Program(pp) { programScope = pp.scope; pp.scope.crawl(); },
    'CallExpression|NewExpression'(p) {
      const c = p.node.callee;
      if (t.isIdentifier(c) && (c.name === 'eval' || c.name === 'Function') && !p.scope.getBinding(c.name)) unsafe = true;
    },
    WithStatement() { unsafe = true; },
    MemberExpression(p) {
      const n = p.node;
      const key = !n.computed && t.isIdentifier(n.property) ? n.property.name : n.computed && t.isStringLiteral(n.property) ? n.property.value : null;
      if (key === 'name' && t.isIdentifier(n.object)) { const b = p.scope.getBinding(n.object.name); if (b) skipFn.add(b); }
      if (n.computed && t.isStringLiteral(n.property) && (t.isThisExpression(n.object) || (t.isIdentifier(n.object) && GLOBAL_OBJECTS.has(n.object.name)))) stringKeyed.add(n.property.value);
    },
    ExportSpecifier(p) { const b = p.scope.getBinding(p.node.local.name); if (b) exported.add(b); },
  });
  if (unsafe) return { code, stats };

  // identifier-name index per scope (non-property positions) for collision checks
  const names = new Map();
  const namesOf = (scope) => {
    let s = names.get(scope);
    if (s) return s;
    s = new Set();
    scope.path.traverse({ Identifier(p) { if (p.isReferencedIdentifier() || p.isBindingIdentifier()) s.add(p.node.name); } });
    if (scope.path.isProgram?.()) { /* includes everything */ } else if (scope.path.node.id) s.add(scope.path.node.id.name);
    for (const k of Object.keys(scope.bindings)) s.add(k);
    for (const k of Object.keys(scope.getProgramParent().globals)) s.add(k);
    names.set(scope, s);
    return s;
  };
  const readable = (nm) => !isGarbage(nm) && validId(nm);

  const order = [];
  traverse(ast, { Scopable(path) { if (path.scope.path === path) for (const b of Object.values(path.scope.bindings)) order.push(b); } });
  const seen = new Set();
  for (const b of order) {
    if (seen.has(b)) continue;
    seen.add(b);
    const name = b.identifier.name;
    if (b.kind === 'module') continue;
    if (!isGarbage(name)) continue;
    if (b.scope === programScope && carrier === 'script') continue;
    if (exported.has(b) || skipFn.has(b)) continue;
    if (b.scope === programScope && stringKeyed.has(name)) continue;
    const decl = b.path;
    if (decl.parentPath && (decl.parentPath.isExportNamedDeclaration() || decl.parentPath.isExportDefaultDeclaration() || decl.parentPath.parentPath?.isExportNamedDeclaration())) continue;
    if (hasDupParams(b)) continue;
    if (decl.isFunctionDeclaration() && !(decl.parentPath.isProgram() || decl.parentPath.parentPath?.isFunction())) continue;
    // `arguments` aliasing and implicit-this heuristics: only params in simple functions are renamed freely (positions never change)
    let base = null;
    try { base = inferBinding(b, readable); } catch { base = null; }
    if (!base && isBlaName(name)) base = decl.isFunction?.() || decl.isFunctionDeclaration?.() ? 'fn' : decl.isClassDeclaration?.() ? 'Klass' : b.kind === 'param' ? 'arg' : 'value';
    if (!base || !validId(base) || (isGarbage(base) && !['i', 'j', 'k'].includes(base))) continue;
    // scope-aware unique pick
    const scopes = new Set([b.scope]);
    for (const r of [...b.referencePaths, ...b.constantViolations]) for (let s = r.scope; s; s = s.parent) { scopes.add(s); if (s === b.scope) break; }
    let pick = null;
    for (let n = 1; n < 100 && !pick; n++) {
      const c = n === 1 ? base : base + n;
      if (c === name || RESERVED.has(c) || !validId(c)) { if (c === name) { pick = null; break; } continue; }
      let clash = b.scope.hasBinding(c);
      if (!clash) for (const s of scopes) if (namesOf(s).has(c)) { clash = true; break; }
      if (!clash && b.scope === programScope) clash = namesOf(programScope).has(c);
      if (!clash) pick = c;
    }
    if (!pick) continue;
    try {
      b.scope.rename(name, pick);
      for (const s of scopes) { namesOf(s).add(pick); for (let a = s.parent; a; a = a.parent) names.get(a)?.add(pick); }
      ctx.renames?.push({ from: name, to: pick, pass: 'readable' });
      stats.renamed++;
    } catch { /* leave */ }
  }
  if (!stats.renamed) return { code, stats };
  traverse(ast, {
    ObjectProperty(p) {
      const n = p.node;
      if (n.computed || n.shorthand || !t.isIdentifier(n.key)) return;
      if (t.isIdentifier(n.value, { name: n.key.name })) n.shorthand = true;
    },
  });
  return { code: generateCode(ast, { comments: ctx.keepComments }), stats };
}
