'use strict';
const crypto = require('node:crypto');

function checkLicense(key, userId) {
  const parts = key.split('-');
  if (parts.length !== 3) return false;
  const digest = crypto.createHash('sha256').update(parts[0] + userId).digest('hex');
  return digest.slice(0, 8) === parts[1] && parseInt(parts[2], 16) % 7 === 0;
}

class Cart {
  constructor() { this.items = []; }
  add(name, qty, price) { this.items.push({ name, qty, price }); return this; }
  total() {
    let sum = 0;
    for (const it of this.items) sum += it.qty * it.price;
    return sum > 100 ? sum * 0.9 : sum;
  }
}

module.exports = { checkLicense, Cart };
