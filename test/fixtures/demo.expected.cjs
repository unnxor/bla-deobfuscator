'use strict';

function applyDiscount(num, num2) {
  return num - num * num2 / 100;
}
function greet(user) {
  return "Hello, " + user.name + "! Your total is " + applyDiscount(42, user.discount);
}
module.exports = {
  greet,
  applyDiscount
};
