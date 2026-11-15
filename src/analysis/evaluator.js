// Interpreter for the pure int/string expression subset BLA's opaque predicates live in,
// plus a sample-based decision procedure (fold only when ALL samples agree).
import { seedSamples, FREE_VALUES } from '../util/samples.js';

const BIN = {
  '+': (a, b) => a + b, '-': (a, b) => a - b, '*': (a, b) => a * b, '/': (a, b) => a / b, '%': (a, b) => a % b,
  '**': (a, b) => a ** b, '|': (a, b) => a | b, '&': (a, b) => a & b, '^': (a, b) => a ^ b,
  '<<': (a, b) => a << b, '>>': (a, b) => a >> b, '>>>': (a, b) => a >>> b,
  '==': (a, b) => a == b, '!=': (a, b) => a != b, '===': (a, b) => a === b, '!==': (a, b) => a !== b, // eslint-disable-line eqeqeq
  '<': (a, b) => a < b, '<=': (a, b) => a <= b, '>': (a, b) => a > b, '>=': (a, b) => a >= b,
};
const UN = { '-': (a) => -a, '+': (a) => +a, '!': (a) => !a, '~': (a) => ~a, typeof: (a) => typeof a, void: () => undefined };
const MATH = { imul: Math.imul, abs: Math.abs, min: Math.min, max: Math.max, floor: Math.floor, ceil: Math.ceil, trunc: Math.trunc, sign: Math.sign };
const MAX_NODES = 400;

export class NoFold extends Error {}

/**
 * Scan node for the whitelisted subset. Returns {ids:Set<string>, count} or null.
 * `isOk(name)` classifies identifiers (must return true for allowed free vars).
 */
export function scanPure(node, idOk) {
  const ids = new Set();
  let count = 0;
  const go = (n) => {
    if (!n || ++count > MAX_NODES) return false;
    switch (n.type) {
      case 'NumericLiteral': case 'StringLiteral': case 'BooleanLiteral': case 'NullLiteral': return true;
      case 'Identifier': if (!idOk(n.name)) return false; ids.add(n.name); return true;
      case 'ParenthesizedExpression': return go(n.expression);
      case 'BinaryExpression': return Object.prototype.hasOwnProperty.call(BIN, n.operator) && go(n.left) && go(n.right);
      case 'LogicalExpression': return (n.operator === '&&' || n.operator === '||') && go(n.left) && go(n.right);
      case 'UnaryExpression': return Object.prototype.hasOwnProperty.call(UN, n.operator) && go(n.argument);
      case 'ConditionalExpression': return go(n.test) && go(n.consequent) && go(n.alternate);
      case 'CallExpression': {
        const c = n.callee;
        if (c.type !== 'MemberExpression' || c.computed || c.object.type !== 'Identifier' || c.object.name !== 'Math'
          || c.property.type !== 'Identifier' || !Object.prototype.hasOwnProperty.call(MATH, c.property.name) || !idOk('Math')) return false;
        return n.arguments.every(go);
      }
      default: return false;
    }
  };
  return go(node) ? { ids, count } : null;
}

export function evalPure(n, env) {
  switch (n.type) {
    case 'NumericLiteral': case 'StringLiteral': case 'BooleanLiteral': return n.value;
    case 'NullLiteral': return null;
    case 'Identifier':
      if (n.name === 'undefined') return undefined;
      if (n.name === 'NaN') return NaN;
      if (n.name === 'Infinity') return Infinity;
      if (!Object.prototype.hasOwnProperty.call(env, n.name)) throw new NoFold();
      return env[n.name];
    case 'ParenthesizedExpression': return evalPure(n.expression, env);
    case 'BinaryExpression': return BIN[n.operator](evalPure(n.left, env), evalPure(n.right, env));
    case 'LogicalExpression': {
      const l = evalPure(n.left, env);
      return n.operator === '&&' ? (l ? evalPure(n.right, env) : l) : (l ? l : evalPure(n.right, env));
    }
    case 'UnaryExpression': return UN[n.operator](evalPure(n.argument, env));
    case 'ConditionalExpression': return evalPure(n.test, env) ? evalPure(n.consequent, env) : evalPure(n.alternate, env);
    case 'CallExpression': return MATH[n.callee.property.name](...n.arguments.map((a) => evalPure(a, env)));
    default: throw new NoFold();
  }
}

/**
 * Decide the constant value of `node` or return {fold:false}.
 * vars: Map name -> {kind:'seed'|'free', mask, value}
 */
export function decide(node, vars, ids) {
  const names = [...ids].filter((i) => vars.has(i)).sort();
  const nSamples = names.length === 0 ? 1 : 96;
  const seedLists = new Map();
  let first;
  for (let i = 0; i < nSamples; i++) {
    const env = {};
    names.forEach((nm, k) => {
      const v = vars.get(nm);
      if (v.kind === 'seed') {
        if (!seedLists.has(nm)) seedLists.set(nm, seedSamples(v.mask, v.value, 96));
        const list = seedLists.get(nm);
        env[nm] = list[(i + k * 13) % list.length];
      } else env[nm] = FREE_VALUES[(i + k * 5 + Math.floor(i / FREE_VALUES.length) * (k + 1)) % FREE_VALUES.length];
    });
    let r;
    try { r = evalPure(node, env); } catch { return { fold: false }; }
    if (i === 0) {
      const ty = typeof r;
      if (ty !== 'boolean' && ty !== 'number' && ty !== 'string') return { fold: false };
      if (ty === 'number' && (!Number.isFinite(r) || Object.is(r, -0))) return { fold: false };
      if (ty === 'string' && r.length > 4096) return { fold: false };
      first = r;
    } else if (!Object.is(r, first)) return { fold: false };
  }
  return { fold: true, value: first };
}
