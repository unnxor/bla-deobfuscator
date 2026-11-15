// Differential tests on real libraries: protect with bla-agents, clean with this tool, compare behaviour with the original.
// Needs bla-agents (Node 22.23+ / 24+), so the tests are skipped on older Node versions.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { LIBS, MODES } from './libs.mjs';

const require = createRequire(import.meta.url);
const CLI = fileURLToPath(new URL('../src/cli.js', import.meta.url));
const [major, minor] = process.versions.node.split('.').map(Number);
const canProtect = major > 22 || (major === 22 && minor >= 23);
const pkgDir = (name) => fileURLToPath(new URL(`../node_modules/${name}/`, import.meta.url));
const BLA = path.join(pkgDir('bla-agents'), 'dist', 'cli.js');
const TEST_MODES = ['balanced', 'maximum', 'full'];

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bla-corpus-'));
process.on('exit', () => fs.rmSync(tmp, { recursive: true, force: true }));

function protect(lib, mode) {
  const { file, extra = [] } = LIBS[lib];
  const input = path.join(tmp, `${lib}.${mode}.orig.cjs`);
  const protectedFile = path.join(tmp, `${lib}.${mode}.prot.cjs`);
  fs.copyFileSync(path.join(pkgDir(lib), file), input);
  const r = spawnSync(process.execPath, [BLA, 'protect', input, '-o', protectedFile, '--seed', 'corpus-1', ...MODES[mode], ...extra], { encoding: 'utf8' });
  assert.ok(fs.existsSync(protectedFile), `bla protect failed: ${(r.stderr || r.stdout).slice(-300)}`);
  return { input, protectedFile };
}

function clean(protectedFile, name) {
  const out = path.join(tmp, `${name}.clean.cjs`);
  const r = spawnSync(process.execPath, [CLI, protectedFile, out], { encoding: 'utf8' });
  assert.equal(r.status, 0);
  assert.equal(r.stderr, '', `unexpected warnings: ${r.stderr}`);
  return out;
}

for (const [lib, { modes, calls }] of Object.entries(LIBS)) {
  for (const mode of modes.filter((m) => TEST_MODES.includes(m))) {
    const big = lib === 'acorn';
    test(`${lib} (${mode}): cleaned output behaves like the original`, { skip: !canProtect && 'bla-agents needs Node 22.23+', timeout: big ? 180000 : 120000 }, () => {
      const { input, protectedFile } = protect(lib, mode);
      const cleaned = clean(protectedFile, `${lib}.${mode}`);
      assert.deepEqual(calls(require(cleaned)), calls(require(input)));
      if (mode !== 'balanced') assert.ok(fs.statSync(cleaned).size < fs.statSync(protectedFile).size / (big ? 5 : 10));
    });
  }
}
