'use strict';

const pattern = /[\p{Lu}]/u;
const pattern2 = /[\p{Ll}]/u;
const pattern3 = /^[\p{Lu}](?![\p{Lu}])/gu;
const pattern4 = /([\p{Alpha}\p{N}_]|$)/u;
const pattern5 = /[_.\- ]+/;
const regExp = new RegExp('^' + pattern5.source);
const regExp2 = new RegExp(pattern5.source + pattern4.source, 'gu');
const regExp3 = new RegExp("\\d+" + pattern4.source, 'gu');
const fn = (list, callback, callback2) => {
  let flag = false;
  let flag2 = false;
  let flag3 = false;
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (flag && pattern.test(item)) {
      list = list.slice(0, i) + '-' + list.slice(i);
      flag = false;
      flag3 = flag2;
      flag2 = true;
      i++;
    } else if (flag2 && flag3 && pattern2.test(item)) {
      list = list.slice(0, i - 1) + '-' + list.slice(i - 1);
      flag3 = flag2;
      flag2 = false;
      flag = true;
    } else {
      flag = callback(item) === item && callback2(item) !== item;
      flag3 = flag2;
      flag2 = callback2(item) === item && callback(item) !== item;
    }
  }
  return list;
};
const fn2 = (text, callback) => {
  pattern3.lastIndex = 0;
  return text.replace(pattern3, arg => callback(arg));
};
const fn3 = (text, callback) => {
  regExp2.lastIndex = 0;
  regExp3.lastIndex = 0;
  return text.replace(regExp2, (_, arg) => callback(arg)).replace(regExp3, arg => callback(arg));
};
const fn4 = (text, options) => {
  if (!(typeof text === "string" || Array.isArray(text))) {
    throw new TypeError("Expected the input to be `string | string[]`");
  }
  options = {
    pascalCase: false,
    preserveConsecutiveUppercase: false,
    ...options
  };
  if (Array.isArray(text)) {
    text = text.map(item => item.trim()).filter(item => item.length).join('-');
  } else {
    text = text.trim();
  }
  if (text.length === 0) {
    return '';
  }
  const fn5 = options.locale === false ? text2 => text2.toLowerCase() : obj => obj.toLocaleLowerCase(options.locale);
  const fn6 = options.locale === false ? text2 => text2.toUpperCase() : obj => obj.toLocaleUpperCase(options.locale);
  if (text.length === 1) {
    return options.pascalCase ? fn6(text) : fn5(text);
  }
  const flag = text !== fn5(text);
  if (flag) {
    text = fn(text, fn5, fn6);
  }
  text = text.replace(regExp, '');
  if (options.preserveConsecutiveUppercase) {
    text = fn2(text, fn5);
  } else {
    text = fn5(text);
  }
  if (options.pascalCase) {
    text = fn6(text.charAt(0)) + text.slice(1);
  }
  return fn3(text, fn6);
};
module.exports = fn4;
module.exports.default = fn4;
