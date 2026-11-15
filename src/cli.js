#!/usr/bin/env node
// Usage: node src/cli.js <input.js> <output.js>
import fs from 'node:fs';
import path from 'node:path';
import { Worker } from 'node:worker_threads';
import { fileURLToPath } from 'node:url';

const TIMEOUT_SEC = 120;

/** Run the pipeline in a worker thread. On timeout or crash fall back to the last checkpoint, or the input. */
function deobfuscate(code) {
  return new Promise((resolve) => {
    let lastCheckpoint = null;
    let done = false;
    const finish = (result) => { if (!done) { done = true; clearTimeout(timer); resolve(result); } };
    const fallback = (why) => finish({ code: lastCheckpoint ?? code, warnings: [why + (lastCheckpoint ? '; used last checkpoint' : '; input left unchanged')] });

    let worker;
    try {
      worker = new Worker(fileURLToPath(new URL('./worker.js', import.meta.url)), {
        workerData: { code, opts: { timeout: TIMEOUT_SEC } },
        resourceLimits: { maxOldGenerationSizeMb: 2048 },
      });
    } catch { return fallback('worker start failed'); }

    const timer = setTimeout(() => { worker.terminate(); fallback('timeout'); }, (TIMEOUT_SEC + 5) * 1000);
    worker.on('message', (m) => {
      if (m.type === 'cp') lastCheckpoint = m.code;
      else if (m.type === 'done') finish({ code: m.code, warnings: m.report?.warnings ?? [] });
      else if (m.type === 'fail') fallback('pipeline failed');
    });
    worker.on('error', () => fallback('worker crashed'));
    worker.on('exit', () => fallback('worker exited early'));
  });
}

async function main() {
  const [input, output] = process.argv.slice(2);
  if (!input || !output) {
    console.error('usage: node src/cli.js <input.js> <output.js>');
    return 1;
  }
  let source;
  try { source = fs.readFileSync(input, 'utf8'); } catch { console.error(`cannot read ${input}`); return 1; }

  const { code, warnings } = await deobfuscate(source);
  fs.mkdirSync(path.dirname(path.resolve(output)), { recursive: true });
  fs.writeFileSync(output, code);
  for (const w of warnings) console.error(`warning: ${w}`);
  console.log(`${path.basename(input)}: ${source.length} -> ${code.length} bytes`);
  return 0;
}

main().then((c) => { process.exitCode = c; }, (e) => { console.error('fatal: ' + String(e?.message ?? e).slice(0, 100)); process.exitCode = 1; });
