'use strict';

var pattern = /["'&<>]/;
module.exports = fn;
function fn(arg) {
  var text = '' + arg;
  var exec = pattern.exec(text);
  if (!exec) {
    return text;
  }
  var text2;
  var text3 = '';
  var num = 0;
  var num2 = 0;
  for (num = exec.index; num < text.length; num++) {
    switch (text.charCodeAt(num)) {
      case 34:
        text2 = "&quot;";
        break;
      case 38:
        text2 = "&amp;";
        break;
      case 39:
        text2 = "&#39;";
        break;
      case 60:
        text2 = "&lt;";
        break;
      case 62:
        text2 = "&gt;";
        break;
      default:
        continue;
    }
    if (num2 !== num) {
      text3 += text.substring(num2, num);
    }
    num2 = num + 1;
    text3 += text2;
  }
  return num2 !== num ? text3 + text.substring(num2, num) : text3;
}
