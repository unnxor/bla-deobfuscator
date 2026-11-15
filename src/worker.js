// worker_threads entry: runs the pipeline, posting checkpoints so the parent can recover from a hang / OOM.
import { parentPort, workerData } from 'node:worker_threads';
import { runPipeline } from './driver.js';

try {
  const { code, report, renames } = runPipeline(workerData.code, {
    ...workerData.opts,
    onCheckpoint: (c) => parentPort.postMessage({ type: 'cp', code: c }),
  });
  parentPort.postMessage({ type: 'done', code, report, renames });
} catch (e) {
  parentPort.postMessage({ type: 'fail', message: String(e?.message ?? e).slice(0, 100) });
}
