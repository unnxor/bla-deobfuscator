'use strict';

module.exports = function fn(obj, obj2) {
  if (obj === obj2) return true;
  if (obj && obj2 && typeof obj == "object" && typeof obj2 == "object") {
    if (obj.constructor !== obj2.constructor) return false;
    var len, len2, keys;
    if (Array.isArray(obj)) {
      len = obj.length;
      if (len != obj2.length) return false;
      for (len2 = len; len2-- !== 0;) if (!fn(obj[len2], obj2[len2])) return false;
      return true;
    }
    if (obj.constructor === RegExp) return obj.source === obj2.source && obj.flags === obj2.flags;
    if (obj.valueOf !== Object.prototype.valueOf) return obj.valueOf() === obj2.valueOf();
    if (obj.toString !== Object.prototype.toString) return obj.toString() === obj2.toString();
    keys = Object.keys(obj);
    len = keys.length;
    if (len !== Object.keys(obj2).length) return false;
    for (len2 = len; len2-- !== 0;) if (!Object.prototype.hasOwnProperty.call(obj2, keys[len2])) return false;
    for (len2 = len; len2-- !== 0;) {
      var key = keys[len2];
      if (!fn(obj[key], obj2[key])) return false;
    }
    return true;
  }
  return obj !== obj && obj2 !== obj2;
};
