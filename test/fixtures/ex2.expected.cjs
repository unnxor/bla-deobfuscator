'use strict';

const crypto = require('node:crypto');
function checkLicense(text, arg) {
  const parts = text.split('-');
  if (parts.length !== 3) return false;
  const digest = crypto.createHash("sha256").update(parts[0] + arg).digest("hex");
  return digest.slice(0, 8) === parts[1] && parseInt(parts[2], 16) % 7 === 0;
}
class Cart {
  constructor() {
    this.items = [];
  }
  add(name, qty, price) {
    this.items.push({
      name,
      qty,
      price
    });
    return this;
  }
  total() {
    let num = 0;
    for (const item of this.items) num += item.qty * item.price;
    return num > 100 ? num * 0.9 : num;
  }
}
module.exports = {
  checkLicense,
  Cart
};
