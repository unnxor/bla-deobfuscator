var num = 1000;
var num2 = num * 60;
var num3 = num2 * 60;
var num4 = num3 * 24;
var num5 = num4 * 7;
var num6 = num4 * 365.25;
module.exports = function (list, obj) {
  obj = obj || {};
  var type = typeof list;
  if (type === "string" && list.length > 0) {
    return fn(list);
  } else if (type === "number" && isFinite(list)) {
    return obj.long ? fn3(list) : fn2(list);
  }
  throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(list));
};
function fn(text) {
  text = String(text);
  if (text.length > 100) {
    return;
  }
  var exec = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(text);
  if (!exec) {
    return;
  }
  var num7 = parseFloat(exec[1]);
  var text2 = (exec[2] || 'ms').toLowerCase();
  switch (text2) {
    case "years":
    case "year":
    case "yrs":
    case 'yr':
    case 'y':
      return num7 * num6;
    case "weeks":
    case "week":
    case 'w':
      return num7 * num5;
    case "days":
    case "day":
    case 'd':
      return num7 * num4;
    case "hours":
    case "hour":
    case "hrs":
    case 'hr':
    case 'h':
      return num7 * num3;
    case "minutes":
    case "minute":
    case "mins":
    case "min":
    case 'm':
      return num7 * num2;
    case "seconds":
    case "second":
    case "secs":
    case "sec":
    case 's':
      return num7 * num;
    case "milliseconds":
    case "millisecond":
    case "msecs":
    case "msec":
    case 'ms':
      return num7;
    default:
      return undefined;
  }
}
function fn2(num7) {
  var num8 = Math.abs(num7);
  if (num8 >= num4) {
    return Math.round(num7 / num4) + 'd';
  }
  if (num8 >= num3) {
    return Math.round(num7 / num3) + 'h';
  }
  if (num8 >= num2) {
    return Math.round(num7 / num2) + 'm';
  }
  if (num8 >= num) {
    return Math.round(num7 / num) + 's';
  }
  return num7 + 'ms';
}
function fn3(num7) {
  var num8 = Math.abs(num7);
  if (num8 >= num4) {
    return fn4(num7, num8, num4, "day");
  }
  if (num8 >= num3) {
    return fn4(num7, num8, num3, "hour");
  }
  if (num8 >= num2) {
    return fn4(num7, num8, num2, "minute");
  }
  if (num8 >= num) {
    return fn4(num7, num8, num, "second");
  }
  return num7 + " ms";
}
function fn4(num7, num8, num9, arg) {
  var flag = num8 >= num9 * 1.5;
  return Math.round(num7 / num9) + ' ' + arg + (flag ? 's' : '');
}
