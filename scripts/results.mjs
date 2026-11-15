// Regenerates results/: cleaned outputs, results.json, RESULTS.md and the full test log.
// Usage: npm run results   (needs Node 22.23+ because of bla-agents)
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { LIBS, MODES } from '../test/libs.mjs';

const require = createRequire(import.meta.url);
const root = fileURLToPath(new URL('../', import.meta.url));
const pkgDir = (name) => path.join(root, 'node_modules', name);
const CLI = path.join(root, 'src', 'cli.js');
const BLA = path.join(pkgDir('bla-agents'), 'dist', 'cli.js');
const outDir = path.join(root, 'results');
const cleanedDir = path.join(outDir, 'cleaned');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bla-results-'));
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(cleanedDir, { recursive: true });

const size = (f) => fs.statSync(f).size;
const run = (file, args) => spawnSync(process.execPath, [file, ...args], { encoding: 'utf8' });
const rows = [];

for (const [lib, { file, extra = [], modes, calls }] of Object.entries(LIBS)) {
  for (const mode of modes) {
    const id = `${lib}.${mode}`;
    const input = path.join(tmp, `${id}.orig.cjs`);
    const prot = path.join(tmp, `${id}.prot.cjs`);
    const clean = path.join(cleanedDir, `${id}.cjs`);
    const again = path.join(tmp, `${id}.again.cjs`);
    fs.copyFileSync(path.join(pkgDir(lib), file), input);
    run(BLA, ['protect', input, '-o', prot, '--seed', 'corpus-1', ...MODES[mode], ...extra]);
    if (!fs.existsSync(prot)) { rows.push({ lib, mode, error: 'bla protect failed' }); console.log(id, 'PROTECT FAILED'); continue; }
    const t0 = Date.now();
    const d = run(CLI, [prot, clean]);
    const ms = Date.now() - t0;
    run(CLI, [clean, again]);
    let same = false; let detail = '';
    try { same = JSON.stringify(calls(require(clean))) === JSON.stringify(calls(require(input))); } catch (e) { detail = String(e.message).slice(0, 80); }
    const row = {
      lib, mode, originalBytes: size(input), protectedBytes: size(prot), cleanedBytes: size(clean), ms,
      sameBehaviour: same, idempotent: fs.readFileSync(clean, 'utf8') === fs.readFileSync(again, 'utf8'),
      warnings: (d.stderr || '').trim(), detail,
    };
    rows.push(row);
    console.log(id, row.originalBytes, row.protectedBytes, row.cleanedBytes, `${ms}ms`, same ? 'same' : 'DIFF');
  }
}

const bla = require(path.join(pkgDir('bla-agents'), 'package.json')).version;
const meta = { generated: new Date().toISOString().slice(0, 10), node: process.versions.node, blaAgents: bla, seed: 'corpus-1', tool: require(path.join(root, 'package.json')).version };
fs.writeFileSync(path.join(outDir, 'results.json'), JSON.stringify({ meta, rows }, null, 2) + '\n');

const n = (v) => v.toLocaleString('en-US').replace(/,/g, ' ');
const ok = rows.filter((r) => r.sameBehaviour).length;
let md = `# Test results\n\nGenerated ${meta.generated} with Node ${meta.node}, \`bla-agents\` ${meta.blaAgents}, bla-deobfuscator ${meta.tool}, seed \`${meta.seed}\`.\n\n`;
md += `**${ok} of ${rows.length}** protected files, once cleaned, return exactly the same results as the original library.\n`;
md += `Cleaning its own output again changed nothing in **${rows.filter((r) => r.idempotent).length} of ${rows.length}** cases.\n\n`;
md += '| Library | BLA mode | Original | After BLA | Cleaned | Time | Same behaviour | Idempotent |\n|---|---|---:|---:|---:|---:|:-:|:-:|\n';
for (const r of rows) {
  md += r.error ? `| ${r.lib} | ${r.mode} | | | | | ${r.error} | |\n`
    : `| \`${r.lib}\` | ${r.mode} | ${n(r.originalBytes)} B | ${n(r.protectedBytes)} B | ${n(r.cleanedBytes)} B | ${(r.ms / 1000).toFixed(1)} s | ${r.sameBehaviour ? 'yes' : '**NO**'} | ${r.idempotent ? 'yes' : '**NO**'} |\n`;
}
md += '\nCleaned files are in [`cleaned/`](cleaned). The BLA-protected inputs are not stored (up to 1.7 MB each); the fixed seed regenerates them.\n';
md += '`stealth` and `balanced` add less scaffolding, so the cleaned file can be larger than a small or minified original (the tool pretty-prints).\n';
md += '`acorn` needs `--allow-lane-independent`, because `bla-agents` refuses to protect it otherwise; only one mode is run because it takes ~30 s.\n\n';
md += 'Full test-suite output: [`test-output.txt`](test-output.txt). Regenerate everything with `npm run results`.\n';
fs.writeFileSync(path.join(outDir, 'RESULTS.md'), md);

console.log('running test suite...');
const t = spawnSync(process.execPath, ['--test', '--test-reporter=spec', 'test/cli.test.js', 'test/corpus.test.js'], { cwd: root, encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
fs.writeFileSync(path.join(outDir, 'test-output.txt'), `${(t.stdout || '') + (t.stderr || '')}`.replace(/\x1b\[[0-9;]*m/g, ''));
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`done: ${ok}/${rows.length} same behaviour, tests exit code ${t.status}`);
process.exitCode = ok === rows.length && t.status === 0 ? 0 : 1;
