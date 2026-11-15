// Small character-class helpers used instead of regular expressions (name-shape and text checks).
const code = (s, i) => s.charCodeAt(i);
export const isDigit = (c) => c >= '0' && c <= '9';
export const isUpper = (c) => c >= 'A' && c <= 'Z';
export const isLower = (c) => c >= 'a' && c <= 'z';
export const isAlpha = (c) => isUpper(c) || isLower(c);
export const isLowerHex = (c) => isDigit(c) || (c >= 'a' && c <= 'f');
export const isHex = (c) => isLowerHex(c) || (c >= 'A' && c <= 'F');
export const isWord = (c) => isAlpha(c) || isDigit(c) || c === '_';

/** true when every char in s[from..to) satisfies pred (empty range is true) */
export function all(s, pred, from = 0, to = s.length) {
  for (let i = from; i < to; i++) if (!pred(s[i])) return false;
  return true;
}

/** all chars match and the length is within [min, max] */
export const run = (s, pred, min, max = Infinity) => s.length >= min && s.length <= max && all(s, pred);

/** length of the leading run of chars satisfying pred */
export function lead(s, pred, from = 0) {
  let i = from;
  while (i < s.length && pred(s[i])) i++;
  return i - from;
}

/** index of the `_` that starts a trailing lowercase-hex tag of min..max digits, or -1 */
export function hexTagAt(name, min, max) {
  const i = name.lastIndexOf('_');
  if (i < 0 || !run(name.slice(i + 1), isLowerHex, min, max)) return -1;
  return i;
}

/** [stem, digits] where digits is the maximal trailing digit run */
export function splitDigits(name) {
  let i = name.length;
  while (i > 0 && isDigit(name[i - 1])) i--;
  return [name.slice(0, i), name.slice(i)];
}

export const isIdent = (s) => s.length > 0 && (isAlpha(s[0]) || s[0] === '_' || s[0] === '$') && all(s, (c) => isWord(c) || c === '$', 1);

/** ASCII-only lowercase (same case folding a /i regex applies to ASCII needles) */
export function lowerAscii(s) {
  let out = '';
  for (let i = 0; i < s.length; i++) out += s[i] >= 'A' && s[i] <= 'Z' ? String.fromCharCode(code(s, i) + 32) : s[i];
  return out;
}

/** every char outside printable ASCII becomes `?` */
export function asciiOnly(s) {
  let out = '';
  for (let i = 0; i < s.length; i++) { const c = code(s, i); out += c >= 0x20 && c <= 0x7e ? s[i] : '?'; }
  return out;
}

/** first line of s (up to LF; a CR right before it is dropped when stripCR) */
export function firstLine(s, stripCR = true) {
  const i = s.indexOf('\n');
  if (i < 0) return s;
  return stripCR && s.charCodeAt(i - 1) === 13 ? s.slice(0, i - 1) : s.slice(0, i);
}

/** BOM removal and CRLF / lone CR -> LF */
export function normalizeText(s) {
  if (code(s, 0) === 0xfeff) s = s.slice(1);
  return s.split('\r\n').join('\n').split('\r').join('\n');
}

/** escape text for the raw part of a template literal quasi */
export function escapeRaw(s) {
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '\\') out += '\\\\';
    else if (c === '`') out += '\\`';
    else if (c === '$' && s[i + 1] === '{') out += '\\$';
    else if (c === '\r') out += '\\r';
    else out += c;
  }
  return out;
}
