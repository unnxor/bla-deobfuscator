// Pipeline driver: pass ordering, per-pass try/catch + validation + rollback, fixpoint, budgets.
import { performance } from 'node:perf_hooks';
import { createHash } from 'node:crypto';
import { parseCode, generateCode, traverse } from './parse.js';
import { Budget } from './util/budget.js';
import { asciiOnly, firstLine, normalizeText } from './util/chars.js';
import { describe, validate } from './validate.js';
import { analyzeSeed } from './analysis/seed.js';
import { findSteppers } from './analysis/signatures.js';
import { runComments } from './passes/p1-comments.js';
import { runFold } from './passes/p3-fold.js';
import { runWeave } from './passes/p4-weave.js';
import { runStrings } from './passes/p5-strings.js';
import { runDce } from './passes/p6-dce.js';
import { runIslands } from './passes/p6b-islands.js';
import { runCleanup } from './passes/p7-cleanup.js';
import { runRename } from './passes/p8-rename.js';
import { runReadable } from './passes/p9-readable.js';

/** compose from->to entries across passes into original->final (best effort; names are not scope-qualified) */
export function composeRenames(list) {
  const out = [];
  for (const e of list) {
    const hit = out.find((x) => x.final === e.from);
    if (hit) hit.final = e.to; else out.push({ original: e.from, final: e.to });
  }
  return out.filter((x) => x.original !== x.final);
}

const sha = (s) => createHash('sha256').update(s).digest('hex').slice(0, 12);
const ROUND = [['p3', runFold], ['p4', runWeave], ['p5', runStrings], ['p3b', runFold], ['p6', runDce], ['p6b', runIslands], ['p7', runCleanup]];

function sanitizeMsg(e) {
  return asciiOnly(firstLine(String(e?.message ?? e), false)).slice(0, 100);
}

/**
 * @param {string} input source text
 * @param {object} opts {keepComments, rename ('readable'|'tags'), maxRounds, timeout (s), onCheckpoint(code)}
 * @returns {{code:string, report:object}}
 */
export function runPipeline(input, opts = {}) {
  const report = { tool: 'antibla-deobf', input: { bytes: typeof input === 'string' ? Buffer.byteLength(input) : 0, sha256: typeof input === 'string' ? sha(input) : '' }, passes: [], warnings: [], profile: {}, failed: false };
  const budget = new Budget({ passMs: Math.min(20000, (opts.timeout ?? 120) * 1000), totalMs: (opts.timeout ?? 120) * 1000 });
  const ctx = {
    plugins: undefined, facts: {}, keepComments: !!opts.keepComments, rename: opts.rename ?? 'readable',
    normalized: false, tick: () => budget.tick(),
  };
  const passthrough = (why) => {
    report.warnings.push(why);
    report.failed = true;
    report.output = { bytes: report.input.bytes, sha256: report.input.sha256 };
    return { code: input, report, renames: [] };
  };
  try {
    if (typeof input !== 'string') return passthrough('input is not text');
    const maxBytes = opts.maxBytes ?? 32 * 1024 * 1024;
    if (input.length > maxBytes) return passthrough('input exceeds size cap');
    const text = normalizeText(input);
    if (text.trim() === '') return passthrough('empty input');
    let ast;
    try { ast = parseCode(text); } catch (e) { return passthrough(sanitizeMsg(e)); }
    ctx.plugins = ast.__plugins;
    ctx.sourceType = ast.program.sourceType;
    ctx.renames = [];
    let info = describe(text, ctx.plugins, ctx.sourceType);
    report.profile.carrier = info.carrier;
    report.profile.markers = {
      armorCorpus: text.includes('_interlockSafetyCorpus_'),
      shadowHeap: text.includes('rollingMask'),
      sourceMap: text.includes('sourceMappingURL='),
    };
    let code = text;
    const emit = (c) => { try { opts.onCheckpoint?.(c); } catch { /* ignore */ } };

    const fault = process.env.ANTIBLA_TEST_FAULT ?? '';
    const apply = (name, fn, round = 0) => {
      const before = code;
      const rec = { name, round, bytesBefore: Buffer.byteLength(before), rolledBack: false };
      const t0 = performance.now();
      try {
        budget.beginPass();
        if (fault === name + ':throw') throw new Error('injected fault');
        const res = fn(before, ctx);
        let out = res.code;
        if (fault === name + ':corrupt') out = out + '\n}}(((';
        if (out !== before) {
          const v = validate(info, out, before.length, ctx);
          if (!v.ok) { rec.rolledBack = true; rec.reason = v.reason; report.failed = true; }
          else { code = out; info = { ...info, ...v.info }; ctx.normalized = true; emit(code); }
        } else if (name === 'p1') ctx.normalized = true;
        rec.stats = res.stats;
      } catch (e) {
        rec.rolledBack = true; rec.reason = sanitizeMsg(e); report.failed = true;
      }
      rec.ms = Math.round(performance.now() - t0);
      rec.bytesAfter = Buffer.byteLength(code);
      report.passes.push(rec);
      if (rec.rolledBack) report.warnings.push(`pass ${name} rolled back: ${rec.reason}`);
    };

    apply('p1', runComments);
    const p1 = report.passes[0];
    if (p1?.stats) { report.profile.commentsStripped = p1.stats.comments; report.profile.canaryCommentsStripped = p1.stats.canary; report.profile.sourcemapStripped = p1.stats.sourcemap; }
    // P2 (read-only analysis)
    try {
      const a = parseCode(code, { plugins: ctx.plugins, sourceType: ctx.sourceType });
      ctx.facts = analyzeSeed(a);
      let steppers = 0;
      traverse(a, { Program(p) { steppers = findSteppers(p).steppers.size; p.stop(); } });
      report.profile.seed = ctx.facts.seed ? { shape: ctx.facts.seed.shape, armorOk: ctx.facts.seed.armorOk, knownBits: (ctx.facts.seed.mask >>> 0).toString(2).split('1').length - 1 } : null;
      report.profile.sensors = ctx.facts.sensors.length;
      report.profile.steppers = steppers;
    } catch (e) {
      ctx.facts = {};
      report.warnings.push('seed analysis failed: ' + sanitizeMsg(e));
    }

    const maxRounds = opts.maxRounds ?? 6;
    for (let round = 1; round <= maxRounds && !budget.totalExceeded(); round++) {
      const start = code;
      for (const [name, fn] of ROUND) apply(name, fn, round);
      if (code === start) break;
      if (code.length > start.length) { code = start; break; }
    }
    if (budget.totalExceeded()) report.warnings.push('total time budget exceeded; stopped early');
    apply('p8', runRename);
    if (ctx.rename === 'readable') apply('p9', runReadable);
    // settle: generator output must be a fixed point of parse+generate
    for (let i = 0; i < 3; i++) {
      try {
        const again = generateCode(parseCode(code, { plugins: ctx.plugins, sourceType: ctx.sourceType }), { comments: ctx.keepComments });
        if (again === code) break;
        const v = validate(info, again, code.length, ctx);
        if (!v.ok) break;
        code = again;
      } catch { break; }
    }
    report.output = { bytes: Buffer.byteLength(code), sha256: sha(code) };
    return { code, report, renames: composeRenames(ctx.renames) };
  } catch (e) {
    return passthrough('internal error: ' + sanitizeMsg(e));
  }
}
