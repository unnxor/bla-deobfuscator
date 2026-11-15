// Fixed deterministic sample sets (no Date / Math.random).
function xorshift32(s) {
  let x = s | 0;
  return () => { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; return x | 0; };
}

const EDGE = [1, 3, 5, 0x7ffffffd, 0xffffffff, 0x80000001, 0x7fffd, 0, 2, 4, 7, 8, 255, 256, 0xffff, 0x10000,
  0x7fffffff, 0x80000000, 0x55555555, 0xaaaaaaaa, 0x7fffc, 0x7fff, 0x40000, 0x3ffff, 6, 9, 15, 16, 31, 33, 63, 97].map((v) => v | 0);

/** n int32 samples forced to satisfy known bits (mask = known bits, value = their values). */
export function seedSamples(mask = 0, value = 0, n = 96) {
  const out = [];
  const r = xorshift32(0x9e3779b9);
  const all = EDGE.slice();
  while (all.length < n) all.push(r());
  for (const v of all) out.push(((v & ~mask) | (value & mask)) | 0);
  return out;
}

/** Values used for free (unknown) variables: int and non-int / non-number types. */
export const FREE_VALUES = [0, 1, -1, 2, 3, 7, 91, 255, 0x7fffffff, -0x80000000, 12345, 0.5, NaN, undefined, null, 'a', '', true, false, 4294967295, -7, 1e9, 0x5838];
