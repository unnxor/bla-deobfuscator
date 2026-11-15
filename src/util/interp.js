// Tiny AST interpreter for the small, statically validated slices of untrusted code the pipeline needs to evaluate
// (string-table decoders, the armor digest). It never hands source text to the JS engine: no vm, no eval, no Function.
// Safety comes from three layers:
//   1. validateSlice: only whitelisted node types and global names are accepted;
//   2. every member access rejects banned keys (constructor, __proto__, ...);
//   3. native functions run only if they were explicitly registered in SAFE (everything else throws).
// A step budget bounds the run time.
import { parseCode, traverse, t } from '../parse.js';

const ALLOWED_GLOBALS = new Set(['Math', 'Uint8Array', 'Uint16Array', 'Uint32Array', 'Int32Array', 'Array', 'Number', 'String',
  'Object', 'parseInt', 'Buffer', 'TextDecoder', 'undefined', 'NaN', 'Infinity', 'Error', 'Boolean']);
const BANNED_KEYS = new Set(['constructor', '__proto__', 'prototype', '__defineGetter__', '__defineSetter__', '__lookupGetter__', '__lookupSetter__', 'caller', 'callee', 'arguments']);
const ALLOWED_TYPES = new Set(['File', 'Program', 'ExpressionStatement', 'VariableDeclaration', 'VariableDeclarator', 'FunctionDeclaration', 'FunctionExpression',
  'ArrowFunctionExpression', 'BlockStatement', 'ReturnStatement', 'IfStatement', 'ForStatement', 'WhileStatement', 'DoWhileStatement', 'ForOfStatement',
  'UpdateExpression', 'AssignmentExpression', 'BinaryExpression', 'LogicalExpression', 'UnaryExpression', 'ConditionalExpression',
  'CallExpression', 'NewExpression', 'MemberExpression', 'Identifier', 'StringLiteral', 'NumericLiteral', 'BooleanLiteral', 'NullLiteral',
  'TemplateLiteral', 'TemplateElement', 'ArrayExpression', 'ObjectExpression', 'ObjectProperty', 'AssignmentPattern', 'SequenceExpression',
  'ContinueStatement', 'BreakStatement', 'EmptyStatement', 'ThrowStatement', 'ParenthesizedExpression', 'DirectiveLiteral', 'Directive',
  'InterpreterDirective', 'ArrayPattern', 'ObjectPattern', 'RestElement']);
const MAX_STEPS = 3_000_000;
const MAX_STRING = 65536;

/** Static allowlist check: whitelisted node types/globals, no this/eval/Function/await, no banned member names. */
export function validateSlice(code, extraGlobals = []) {
  let ast;
  try { ast = parseCode(code, { plugins: [], sourceType: 'script' }); } catch { return { ok: false, reason: 'parse' }; }
  const allowed = new Set([...ALLOWED_GLOBALS, ...extraGlobals]);
  let reason = null;
  let nodes = 0;
  const fail = (path, why) => { reason = why; path.stop(); };
  try {
    traverse(ast, {
      enter(path) {
        const n = path.node;
        if (++nodes > 200000) return fail(path, 'too big');
        if (!ALLOWED_TYPES.has(n.type)) return fail(path, 'node ' + n.type);
        if (t.isFunction(n) && (n.async || n.generator)) return fail(path, 'async/generator');
        if (t.isMemberExpression(n)) {
          const key = n.computed ? (t.isStringLiteral(n.property) ? n.property.value : null) : n.property.name;
          if (key !== null && BANNED_KEYS.has(key)) return fail(path, 'banned prop');
        }
        if (t.isNewExpression(n) && !(t.isIdentifier(n.callee) && allowed.has(n.callee.name))) return fail(path, 'new');
        if (t.isIdentifier(n) && path.isReferencedIdentifier()) {
          if (n.name === 'eval' || n.name === 'Function' || n.name === 'arguments') return fail(path, 'banned id');
          if (!path.scope.hasBinding(n.name, true) && !allowed.has(n.name)) return fail(path, 'global ' + n.name);
        }
      },
    });
  } catch { return { ok: false, reason: 'traverse' }; }
  return reason ? { ok: false, reason } : { ok: true };
}

// ---- registry of native functions the interpreter may call ----
const SAFE = new WeakSet();
const allow = (obj, names) => { for (const k of names) if (typeof obj[k] === 'function') SAFE.add(obj[k]); };
const TypedArray = Object.getPrototypeOf(Uint8Array);
for (const C of [Uint8Array, Uint16Array, Uint32Array, Int32Array, Array, Error, Number, String, Boolean, Object, TextDecoder]) SAFE.add(C);
allow(Math, ['imul', 'abs', 'min', 'max', 'floor', 'ceil', 'trunc', 'sign', 'round', 'pow', 'sqrt', 'clz32', 'fround']);
allow(String, ['fromCharCode', 'fromCodePoint']);
allow(Array, ['isArray', 'from']);
allow(Number, ['isInteger', 'isFinite', 'isNaN']);
allow(Object, ['keys', 'values', 'entries']);
allow(String.prototype, ['charCodeAt', 'charAt', 'codePointAt', 'slice', 'substring', 'substr', 'split', 'indexOf', 'toString', 'trim', 'toLowerCase', 'toUpperCase', 'padStart', 'padEnd', 'repeat', 'concat']);
allow(Array.prototype, ['push', 'pop', 'shift', 'unshift', 'slice', 'join', 'indexOf', 'concat', 'fill', 'reverse', 'map', 'forEach', 'filter', 'reduce', 'some', 'every', 'splice']);
allow(TypedArray.prototype, ['set', 'subarray', 'fill', 'slice', 'map', 'forEach', 'join', 'indexOf', 'reverse']);
allow(Number.prototype, ['toString']);
allow(TextDecoder.prototype, ['decode']);
SAFE.add(parseInt);

const utf8 = (bytes) => new TextDecoder().decode(Uint8Array.from(bytes));
const BufferShim = {
  from: (u) => { const o = { toString: () => utf8(u) }; SAFE.add(o.toString); return o; },
};
SAFE.add(BufferShim.from);

// ---- interpreter ----
class Env {
  constructor(parent = null) { this.vars = new Map(); this.parent = parent; }
  find(name) { for (let e = this; e; e = e.parent) if (e.vars.has(name)) return e; return null; }
  get(name) { const e = this.find(name); if (!e) throw new Error('undefined ' + name); return e.vars.get(name); }
  set(name, v) { const e = this.find(name); if (!e) throw new Error('assign to undeclared ' + name); e.vars.set(name, v); }
  define(name, v) { this.vars.set(name, v); }
}
const BREAK = { type: 'break' };
const CONTINUE = { type: 'continue' };

const BIN = {
  '+': (a, b) => a + b, '-': (a, b) => a - b, '*': (a, b) => a * b, '/': (a, b) => a / b, '%': (a, b) => a % b, '**': (a, b) => a ** b,
  '|': (a, b) => a | b, '&': (a, b) => a & b, '^': (a, b) => a ^ b, '<<': (a, b) => a << b, '>>': (a, b) => a >> b, '>>>': (a, b) => a >>> b,
  '==': (a, b) => a == b, '!=': (a, b) => a != b, '===': (a, b) => a === b, '!==': (a, b) => a !== b, // eslint-disable-line eqeqeq
  '<': (a, b) => a < b, '<=': (a, b) => a <= b, '>': (a, b) => a > b, '>=': (a, b) => a >= b,
};
const UN = { '-': (a) => -a, '+': (a) => +a, '!': (a) => !a, '~': (a) => ~a, void: () => undefined };

export function createContext() {
  const global = new Env();
  for (const [k, v] of Object.entries({ Math, Uint8Array, Uint16Array, Uint32Array, Int32Array, Array, Number, String, Object, parseInt, TextDecoder, Error, Boolean, Buffer: BufferShim })) global.define(k, v);
  global.define('undefined', undefined); global.define('NaN', NaN); global.define('Infinity', Infinity);
  return { global, steps: 0, closures: new WeakSet() };
}

function run(ctx, env, node) {
  if (++ctx.steps > MAX_STEPS) throw new Error('step budget');
  return EXEC[node.type] ? EXEC[node.type](ctx, env, node) : EVAL[node.type](ctx, env, node);
}
const ev = (ctx, env, n) => { if (++ctx.steps > MAX_STEPS) throw new Error('step budget'); const f = EVAL[n.type]; if (!f) throw new Error('unsupported ' + n.type); return f(ctx, env, n); };

function key(ctx, env, m) { const k = m.computed ? ev(ctx, env, m.property) : m.property.name; const s = typeof k === 'symbol' ? k : String(k); if (BANNED_KEYS.has(s)) throw new Error('banned key'); return k; }
function getMember(obj, k) { if (obj === null || obj === undefined) throw new Error('member of nullish'); return obj[k]; }

function makeFunction(ctx, env, node) {
  const fn = function (...args) {
    const local = new Env(env);
    node.params.forEach((p, i) => bind(ctx, local, p, args[i]));
    if (t.isArrowFunctionExpression(node) && !t.isBlockStatement(node.body)) return ev(ctx, local, node.body);
    hoist(ctx, local, node.body.body);
    const c = execList(ctx, local, node.body.body);
    return c && c.type === 'return' ? c.value : undefined;
  };
  ctx.closures.add(fn); SAFE.add(fn);
  return fn;
}

function bind(ctx, env, target, value) {
  if (t.isIdentifier(target)) env.define(target.name, value);
  else if (t.isAssignmentPattern(target)) bind(ctx, env, target.left, value === undefined ? ev(ctx, env, target.right) : value);
  else if (t.isArrayPattern(target)) target.elements.forEach((el, i) => { if (el) bind(ctx, env, t.isRestElement(el) ? el.argument : el, t.isRestElement(el) ? [...value].slice(i) : value[i]); });
  else if (t.isObjectPattern(target)) for (const p of target.properties) { if (t.isRestElement(p)) throw new Error('object rest'); bind(ctx, env, p.value, getMember(value, p.key.name ?? p.key.value)); }
  else if (t.isRestElement(target)) bind(ctx, env, target.argument, value);
  else throw new Error('bad pattern');
}

function hoist(ctx, env, body) {
  for (const s of body) {
    if (t.isFunctionDeclaration(s)) env.define(s.id.name, makeFunction(ctx, env, s));
    else if (t.isVariableDeclaration(s) && s.kind === 'var') for (const d of s.declarations) if (t.isIdentifier(d.id) && !env.vars.has(d.id.name)) env.define(d.id.name, undefined);
  }
}

function execList(ctx, env, list) {
  for (const s of list) { const c = run(ctx, env, s); if (c) return c; }
  return undefined;
}

function assignTo(ctx, env, target, value) {
  if (t.isIdentifier(target)) env.set(target.name, value);
  else if (t.isMemberExpression(target)) { const o = ev(ctx, env, target.object); if (o === null || o === undefined) throw new Error('assign to nullish'); o[key(ctx, env, target)] = value; }
  else throw new Error('bad target');
  return value;
}

function callNative(fn, thisArg, args) {
  if (typeof fn !== 'function' || !SAFE.has(fn)) throw new Error('call not allowed');
  return Reflect.apply(fn, thisArg, args);
}

const EVAL = {
  NumericLiteral: (c, e, n) => n.value, StringLiteral: (c, e, n) => n.value, BooleanLiteral: (c, e, n) => n.value, NullLiteral: () => null,
  ParenthesizedExpression: (c, e, n) => ev(c, e, n.expression),
  Identifier: (c, e, n) => e.get(n.name),
  TemplateLiteral: (c, e, n) => n.quasis.map((q, i) => q.value.cooked + (i < n.expressions.length ? String(ev(c, e, n.expressions[i])) : '')).join(''),
  ArrayExpression: (c, e, n) => n.elements.map((el) => (el ? ev(c, e, el) : undefined)),
  ObjectExpression: (c, e, n) => {
    const o = {};
    for (const p of n.properties) {
      if (!t.isObjectProperty(p)) throw new Error('object member');
      const k = p.computed ? ev(c, e, p.key) : (p.key.name ?? p.key.value);
      if (BANNED_KEYS.has(String(k))) throw new Error('banned key');
      o[k] = ev(c, e, p.value);
    }
    return o;
  },
  FunctionExpression: (c, e, n) => makeFunction(c, e, n),
  ArrowFunctionExpression: (c, e, n) => makeFunction(c, e, n),
  SequenceExpression: (c, e, n) => { let r; for (const x of n.expressions) r = ev(c, e, x); return r; },
  UnaryExpression: (c, e, n) => {
    if (n.operator === 'typeof') return t.isIdentifier(n.argument) && !e.find(n.argument.name) ? 'undefined' : typeof ev(c, e, n.argument);
    if (!Object.prototype.hasOwnProperty.call(UN, n.operator)) throw new Error('unary ' + n.operator);
    return UN[n.operator](ev(c, e, n.argument));
  },
  BinaryExpression: (c, e, n) => {
    if (!Object.prototype.hasOwnProperty.call(BIN, n.operator)) throw new Error('binary ' + n.operator);
    const r = BIN[n.operator](ev(c, e, n.left), ev(c, e, n.right));
    if (typeof r === 'string' && r.length > MAX_STRING) throw new Error('string too long');
    return r;
  },
  LogicalExpression: (c, e, n) => {
    const l = ev(c, e, n.left);
    if (n.operator === '&&') return l ? ev(c, e, n.right) : l;
    if (n.operator === '||') return l ? l : ev(c, e, n.right);
    throw new Error('logical ' + n.operator);
  },
  ConditionalExpression: (c, e, n) => (ev(c, e, n.test) ? ev(c, e, n.consequent) : ev(c, e, n.alternate)),
  MemberExpression: (c, e, n) => getMember(ev(c, e, n.object), key(c, e, n)),
  UpdateExpression: (c, e, n) => {
    const old = Number(ev(c, e, n.argument));
    const next = n.operator === '++' ? old + 1 : old - 1;
    assignTo(c, e, n.argument, next);
    return n.prefix ? next : old;
  },
  AssignmentExpression: (c, e, n) => {
    if (n.operator === '=') return assignTo(c, e, n.left, ev(c, e, n.right));
    const op = n.operator.slice(0, -1);
    if (!Object.prototype.hasOwnProperty.call(BIN, op)) throw new Error('assign op ' + n.operator);
    const r = BIN[op](ev(c, e, n.left), ev(c, e, n.right));
    if (typeof r === 'string' && r.length > MAX_STRING) throw new Error('string too long');
    return assignTo(c, e, n.left, r);
  },
  CallExpression: (c, e, n) => {
    let thisArg; let fn;
    if (t.isMemberExpression(n.callee)) { thisArg = ev(c, e, n.callee.object); fn = getMember(thisArg, key(c, e, n.callee)); } else fn = ev(c, e, n.callee);
    const args = n.arguments.map((a) => ev(c, e, a));
    if (c.closures.has(fn)) return fn(...args);
    return callNative(fn, thisArg, args);
  },
  NewExpression: (c, e, n) => {
    const ctor = ev(c, e, n.callee);
    if (typeof ctor !== 'function' || !SAFE.has(ctor)) throw new Error('new not allowed');
    return Reflect.construct(ctor, n.arguments.map((a) => ev(c, e, a)));
  },
};

const EXEC = {
  EmptyStatement: () => undefined,
  ExpressionStatement: (c, e, n) => { c.last = ev(c, e, n.expression); return undefined; },
  FunctionDeclaration: () => undefined, // hoisted
  VariableDeclaration: (c, e, n) => { for (const d of n.declarations) bind(c, e, d.id, d.init ? ev(c, e, d.init) : undefined); return undefined; },
  ReturnStatement: (c, e, n) => ({ type: 'return', value: n.argument ? ev(c, e, n.argument) : undefined }),
  ThrowStatement: (c, e, n) => { ev(c, e, n.argument); throw new Error('thrown'); },
  BreakStatement: () => BREAK,
  ContinueStatement: () => CONTINUE,
  BlockStatement: (c, e, n) => { const local = new Env(e); hoist(c, local, n.body); return execList(c, local, n.body); },
  IfStatement: (c, e, n) => (ev(c, e, n.test) ? run(c, e, n.consequent) : n.alternate ? run(c, e, n.alternate) : undefined),
  WhileStatement: (c, e, n) => loop(c, e, null, n.test, null, n.body, false),
  DoWhileStatement: (c, e, n) => loop(c, e, null, n.test, null, n.body, true),
  ForStatement: (c, e, n) => { const local = new Env(e); if (n.init) { if (t.isVariableDeclaration(n.init)) run(c, local, n.init); else ev(c, local, n.init); } return loop(c, local, null, n.test, n.update, n.body, false); },
  ForOfStatement: (c, e, n) => {
    for (const item of ev(c, e, n.right)) {
      const local = new Env(e);
      if (t.isVariableDeclaration(n.left)) bind(c, local, n.left.declarations[0].id, item); else assignTo(c, local, n.left, item);
      const r = run(c, local, n.body);
      if (r === BREAK) break;
      if (r && r.type === 'return') return r;
    }
    return undefined;
  },
};

function loop(c, env, _unused, test, update, body, doWhile) {
  let first = doWhile;
  while (first || !test || ev(c, env, test)) {
    first = false;
    const r = run(c, env, body);
    if (r === BREAK) break;
    if (r && r.type === 'return') return r;
    if (update) ev(c, env, update);
  }
  return undefined;
}

/** Run statements in the context's global scope (declares the slice's functions and variables). */
export function runStatements(ctx, code) {
  const ast = parseCode(code, { plugins: [], sourceType: 'script' });
  hoist(ctx, ctx.global, ast.program.body);
  const c = execList(ctx, ctx.global, ast.program.body);
  return c;
}

/** Evaluate one expression and return its primitive result (string/number/boolean) or throw. */
export function runPrimitive(ctx, code) {
  const ast = parseCode(code, { plugins: [], sourceType: 'script' });
  const stmt = ast.program.body[0];
  if (ast.program.body.length !== 1 || !t.isExpressionStatement(stmt)) throw new Error('expression expected');
  const r = ev(ctx, ctx.global, stmt.expression);
  const ty = typeof r;
  if (ty !== 'string' && ty !== 'number' && ty !== 'boolean') throw new Error('non-primitive result');
  if (ty === 'string' && r.length > MAX_STRING) throw new Error('result too long');
  return r;
}
