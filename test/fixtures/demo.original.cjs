'use strict';
const SECRET_PRICE = 42;

function applyDiscount(price, percent) {
  return price - (price * percent) / 100;
}

function greet(user) {
  return 'Hello, ' + user.name + '! Your total is ' + applyDiscount(SECRET_PRICE, user.discount);
}

module.exports = { greet, applyDiscount };
