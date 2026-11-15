// P5: string decryption via bounded, statically validated vm evaluation of the REAL decoder, with a static fallback.
import { t, traverse, parseCode, generateCode } from '../parse.js';
import { buildSlice, topLevelDecls, topLevelRefs } from '../analysis/slice.js';
import { validateSlice, createContext, runPrimitive, runStatements } from '../util/interp.js';

const MAX_CALLS = 50000;

function walk(node, fn) {
  const go = (n) => {
    if (!n || typeof n.type !== 'string') return;
    if (fn(n) === true) return;
    for (const k of t.VISITOR_KEYS[n.type] ?? []) { const c = n[k]; if (Array.isArray(c)) c.forEach(go); else go(c); }
  };
  go(node);
}

function looksLikeDecoder(fn) {
  if (!t.isFunctionDeclaration(fn) || fn.params.length !== 1 || !t.isIdentifier(fn.params[0])) return false;
  let u8 = false, xor = false, loop = false, out = false;
  walk(fn.body, (n) => {
    if (n.type === 'NewExpression' && t.isIdentifier(n.callee, { name: 'Uint8Array' })) u8 = true;
    if (n.type === 'BinaryExpression' && n.operator === '^') xor = true;
    if (n.type === 'ForStatement' || n.type === 'WhileStatement') loop = true;
    if (n.type === 'Identifier' && (n.name === 'Buffer' || n.name === 'TextDecoder' || n.name === 'fromCharCode')) out = true;
  });
  return u8 && xor && loop && out;
}

/** `"1,2,3".split(",").map(Number)` -> number[] or null */
function numList(n) {
  if (!t.isCallExpression(n) || !t.isMemberExpression(n.callee) || !t.isIdentifier(n.callee.property, { name: 'map' })) return null;
  if (n.arguments.length !== 1 || !t.isIdentifier(n.arguments[0], { name: 'Number' })) return null;
  const s = n.callee.object;
  if (!t.isCallExpression(s) || !t.isMemberExpression(s.callee) || !t.isIdentifier(s.callee.property, { name: 'split' })) return null;
  if (!t.isStringLiteral(s.callee.object) || !t.isStringLiteral(s.arguments[0], { value: ',' })) return null;
  const v = s.callee.object.value;
  return v === '' ? [] : v.split(',').map(Number);
}

function staticTables(programPath, fnPath) {
  const scope = programPath.scope;
  const decls = topLevelDecls(programPath);
  let T = null, K = null;
  for (const r of [...topLevelRefs(fnPath, scope)].sort()) {
    const sp = decls.get(r);
    const d = sp?.node.declarations?.find((x) => t.isIdentifier(x.id, { name: r }));
    if (!d?.init) continue;
    const nl = numList(d.init);
    if (nl) { K = nl; continue; }
    if (t.isArrayExpression(d.init) && d.init.elements.every((e) => e && numList(e))) T = d.init.elements.map(numList);
  }
  return T && K && K.length ? { T, K } : null;
}

const FORMULAS = [
  (e, k, i, j) => (e[j] ^ k[j % k.length]) & 255,
  (e, k, i, j) => (e[j] ^ (k[(j + i * 31) % k.length] ^ ((k[(i * 7 + (j >> 2)) % k.length] + i * 73 + j * 19) & 255))) & 255,
];

function staticDecode(tables, indices) {
  const dec = new TextDecoder('utf-8', { fatal: true });
  for (const f of FORMULAS) {
    try {
      const m = new Map();
      for (const i of indices) {
        const e = tables.T[i];
        if (!e) throw new Error('idx');
        const o = new Uint8Array(e.length);
        for (let j = 0; j < e.length; j++) o[j] = f(e, tables.K, i, j);
        m.set(i, dec.decode(o));
      }
      return m;
    } catch { /* next formula */ }
  }
  return null;
}

export function runStrings(code, ctx) {
  const ast = parseCode(code, { plugins: ctx.plugins, sourceType: ctx.sourceType });
  const stats = { decoders: 0, decrypted: 0, method: null };
  let result = null;
  traverse(ast, {
    Program(pp) {
      const scope = pp.scope;
      const decls = topLevelDecls(pp);
      const decoders = [];
      for (const [name, sp] of decls) if (looksLikeDecoder(sp.node)) decoders.push(name);
      if (!decoders.length) { pp.stop(); return; }
      const aliasOf = new Map(decoders.map((d) => [d, d]));
      for (const sp of pp.get('body')) {
        if (!t.isVariableDeclaration(sp.node)) continue;
        for (const d of sp.node.declarations) {
          if (t.isIdentifier(d.id) && t.isIdentifier(d.init) && aliasOf.has(d.init.name)) {
            const b = scope.getBinding(d.id.name);
            if (b && b.constant) aliasOf.set(d.id.name, aliasOf.get(d.init.name));
          }
        }
      }
      stats.decoders = decoders.length;
      // collect call sites
      const sites = new Map(); // decoder -> [{path, idx}]
      pp.traverse({
        CallExpression(p) {
          ctx.tick();
          const c = p.node.callee;
          if (!t.isIdentifier(c) || !aliasOf.has(c.name)) return;
          const b = p.scope.getBinding(c.name);
          if (!b || b.scope !== scope) return;
          const a = p.node.arguments;
          if (a.length !== 1 || !t.isNumericLiteral(a[0]) || !Number.isInteger(a[0].value) || a[0].value < 0) return;
          const dn = aliasOf.get(c.name);
          if (!sites.has(dn)) sites.set(dn, []);
          sites.get(dn).push({ path: p, idx: a[0].value });
        },
      });
      const replacements = [];
      for (const dn of [...sites.keys()].sort()) {
        const list = sites.get(dn);
        const idxs = [...new Set(list.map((s) => s.idx))].sort((a, b) => a - b);
        if (idxs.length > MAX_CALLS) continue;
        let values = null;
        const sl = buildSlice(pp, [dn]);
        if (sl && validateSlice(sl.code).ok) {
          try {
            const vm = createContext();
            runStatements(vm, sl.code, 500);
            const m = new Map();
            for (const i of idxs) m.set(i, runPrimitive(vm, `${dn}(${i})`, 500));
            if ([...m.values()].every((v) => typeof v === 'string')) { values = m; stats.method = 'interpreter'; }
          } catch { values = null; }
        }
        if (!values) {
          const tables = staticTables(pp, decls.get(dn));
          if (tables) { values = staticDecode(tables, idxs); if (values) stats.method = 'static'; }
        }
        if (!values) continue;
        for (const s of list) replacements.push([s.path, values.get(s.idx)]);
      }
      result = replacements;
    },
  });
  if (!result || !result.length) return { code, stats };
  for (const [p, v] of result) { p.replaceWith(t.stringLiteral(v)); stats.decrypted++; }
  return { code: generateCode(ast, { comments: ctx.keepComments }), stats };
}
