'use strict';

module.exports = fn;
module.exports.format = format;
module.exports.parse = parse;
var pattern = /\B(?=(\d{3})+(?!\d))/g;
var pattern2 = /(?:\.0*|(\.[^0]+)0+)$/;
var obj = {
  b: 1,
  kb: 1024,
  mb: 1048576,
  gb: 1073741824,
  tb: Math.pow(1024, 4),
  pb: Math.pow(1024, 5)
};
var pattern3 = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;
function fn(text, arg) {
  if (typeof text === "string") {
    return parse(text);
  }
  if (typeof text === "number") {
    return format(text, arg);
  }
  return null;
}
function format(num, options) {
  if (!Number.isFinite(num)) {
    return null;
  }
  var num2 = Math.abs(num);
  var text = options && options.thousandsSeparator || '';
  var text2 = options && options.unitSeparator || '';
  var decimalPlaces = options && options.decimalPlaces !== undefined ? options.decimalPlaces : 2;
  var flag = Boolean(options && options.fixedDecimals);
  var text3 = options && options.unit || '';
  if (!text3 || !obj[text3.toLowerCase()]) {
    if (num2 >= obj.pb) {
      text3 = 'PB';
    } else if (num2 >= obj.tb) {
      text3 = 'TB';
    } else if (num2 >= obj.gb) {
      text3 = 'GB';
    } else if (num2 >= obj.mb) {
      text3 = 'MB';
    } else if (num2 >= obj.kb) {
      text3 = 'KB';
    } else {
      text3 = 'B';
    }
  }
  var num3 = num / obj[text3.toLowerCase()];
  var fixed = num3.toFixed(decimalPlaces);
  if (!flag) {
    fixed = fixed.replace(pattern2, '$1');
  }
  if (text) {
    fixed = fixed.split('.').map(function (item, index) {
      return index === 0 ? item.replace(pattern, text) : item;
    }).join('.');
  }
  return fixed + text2 + text3;
}
function parse(num) {
  if (typeof num === "number" && !isNaN(num)) {
    return num;
  }
  if (typeof num !== "string") {
    return null;
  }
  var exec = pattern3.exec(num);
  var num2;
  var text = 'b';
  if (!exec) {
    num2 = parseInt(num, 10);
    text = 'b';
  } else {
    num2 = parseFloat(exec[1]);
    text = exec[4].toLowerCase();
  }
  if (isNaN(num2)) {
    return null;
  }
  return Math.floor(obj[text] * num2);
}
