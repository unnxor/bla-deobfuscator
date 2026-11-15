import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const CLI = fileURLToPath(new URL('../src/cli.js', import.meta.url));

function run(source, args) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bla-deobf-'));
  const input = path.join(dir, 'in.js');
  const output = path.join(dir, 'nested', 'out.js');
  if (source !== null) fs.writeFileSync(input, source);
  const r = spawnSync(process.execPath, [CLI, ...(args ?? [input, output])], { encoding: 'utf8' });
  const out = fs.existsSync(output) ? fs.readFileSync(output, 'utf8') : null;
  const inAfter = source !== null ? fs.readFileSync(input, 'utf8') : null;
  fs.rmSync(dir, { recursive: true, force: true });
  return { ...r, out, inAfter };
}

test('prints usage and exits 1 without arguments', () => {
  const r = run(null, []);
  assert.equal(r.status, 1);
  assert.match(r.stderr, /usage/);
});

test('exits 1 when the input file does not exist', () => {
  const r = run(null, ['does-not-exist.js', 'out.js']);
  assert.equal(r.status, 1);
  assert.match(r.stderr, /cannot read/);
});

test('folds constant expressions', () => {
  const r = run('const a = 1 + 2;\nmodule.exports = { a };\n');
  assert.equal(r.status, 0);
  assert.match(r.out, /a: 3/);
});

test('creates missing output directories and never modifies the input', () => {
  const src = 'module.exports = { a: 1 + 2 };\n';
  const r = run(src);
  assert.notEqual(r.out, null);
  assert.equal(r.inAfter, src);
});

test('copies invalid input through unchanged with a warning', () => {
  const r = run('function ((');
  assert.equal(r.status, 0);
  assert.equal(r.out, 'function ((');
  assert.match(r.stderr, /warning/);
});

test('is idempotent: cleaning its own output changes nothing', () => {
  const first = run('const a = 1 + 2;\nmodule.exports = { a };\n');
  const second = run(first.out);
  assert.equal(second.out, first.out);
});

for (const name of ['demo', 'ex2']) {
  test(`real BLA 3.3.2 output (${name}) is cleaned to the expected source`, () => {
    const dir = new URL('./fixtures/', import.meta.url);
    const protectedSrc = fs.readFileSync(new URL(`${name}.protected.cjs`, dir), 'utf8');
    const expected = fs.readFileSync(new URL(`${name}.expected.cjs`, dir), 'utf8');
    const r = run(protectedSrc);
    assert.equal(r.status, 0);
    assert.equal(r.out, expected);
    assert.ok(r.out.length < protectedSrc.length / 100);
  });
}

test('cleaned real output behaves like the original', async () => {
  const dir = new URL('./fixtures/', import.meta.url);
  const protectedSrc = fs.readFileSync(new URL('demo.protected.cjs', dir), 'utf8');
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bla-deobf-'));
  const cleanFile = path.join(tmp, 'clean.cjs');
  fs.writeFileSync(cleanFile, run(protectedSrc).out);
  const original = path.join(fileURLToPath(dir), 'demo.original.cjs');
  const call = (f) => spawnSync(process.execPath, ['-e', `console.log(require(${JSON.stringify(f)}).greet({name:'Ann',discount:10}))`], { encoding: 'utf8' }).stdout;
  assert.equal(call(cleanFile), call(original));
  fs.rmSync(tmp, { recursive: true, force: true });
});
