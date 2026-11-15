// Time and node-count budget shared by all passes; throws BudgetExceeded so the driver can roll a pass back.
import { performance } from 'node:perf_hooks';
class BudgetExceeded extends Error {
  constructor(msg = 'budget exceeded') { super(msg); this.name = 'BudgetExceeded'; }
}

/** Cheap cooperative deadline; call tick() from hot loops/visitors. */
export class Budget {
  constructor({ passMs = 20000, totalMs = 120000, maxTicks = 2_000_000 } = {}) {
    this.passMs = passMs; this.totalMs = totalMs; this.maxTicks = maxTicks;
    this.start = performance.now(); this.passStart = this.start; this.ticks = 0;
  }
  beginPass() { this.passStart = performance.now(); this.ticks = 0; }
  tick() {
    if ((++this.ticks & 255) !== 0) return;
    const now = performance.now();
    if (this.ticks > this.maxTicks) throw new BudgetExceeded('node cap');
    if (now - this.passStart > this.passMs) throw new BudgetExceeded('pass deadline');
    if (now - this.start > this.totalMs) throw new BudgetExceeded('total deadline');
  }
  totalExceeded() { return performance.now() - this.start > this.totalMs; }
}
