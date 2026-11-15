!function (arg, callback) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = callback() : "function" == typeof define && define.amd ? define(callback) : (arg = "undefined" != typeof globalThis ? globalThis : arg || self).dayjs = callback();
}(this, function () {
  "use strict";

  var num = 1000,
    num2 = 60000,
    num3 = 3600000,
    text = "millisecond",
    text2 = "second",
    text3 = "minute",
    text4 = "hour",
    text5 = "day",
    text6 = "week",
    text7 = "month",
    text8 = "quarter",
    text9 = "year",
    text10 = "date",
    text11 = "Invalid Date",
    pattern = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
    pattern2 = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
    obj = {
      name: "en",
      weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      ordinal: function (num4) {
        var list = ["th", "st", "nd", "rd"],
          num5 = num4 % 100;
        return "[" + num4 + (list[(num5 - 20) % 10] || list[num5] || list[0]) + "]";
      }
    },
    fn = function (text14, num4, arg) {
      var text15 = String(text14);
      return !text15 || text15.length >= num4 ? text14 : "" + Array(num4 + 1 - text15.length).join(arg) + text14;
    },
    obj2 = {
      s: fn,
      z: function (obj4) {
        var num4 = -obj4.utcOffset(),
          num5 = Math.abs(num4),
          num6 = Math.floor(num5 / 60),
          num7 = num5 % 60;
        return (num4 <= 0 ? "+" : "-") + fn(num6, 2, "0") + ":" + fn(num7, 2, "0");
      },
      m: function fn3(options, num4) {
        if (options.date() < num4.date()) return -fn3(num4, options);
        var num5 = 12 * (num4.year() - options.year()) + (num4.month() - options.month()),
          add = options.clone().add(num5, text7),
          flag = num4 - add < 0,
          add2 = options.clone().add(num5 + (flag ? -1 : 1), text7);
        return +(-(num5 + (num4 - add) / (flag ? add - add2 : add2 - add)) || 0);
      },
      a: function (num4) {
        return num4 < 0 ? Math.ceil(num4) || 0 : Math.floor(num4);
      },
      p: function (index) {
        return {
          M: text7,
          y: text9,
          w: text6,
          d: text5,
          D: text10,
          h: text4,
          m: text3,
          s: text2,
          ms: text,
          Q: text8
        }[index] || String(index || "").toLowerCase().replace(/s$/, "");
      },
      u: function (arg) {
        return void 0 === arg;
      }
    },
    text12 = "en",
    obj3 = {};
  obj3[text12] = obj;
  var text13 = "$isDayjsObject",
    isDayjs = function (flag) {
      return flag instanceof _ || !(!flag || !flag[text13]);
    },
    locale = function fn3(e, arg, flag) {
      var value;
      if (!e) return text12;
      if ("string" == typeof e) {
        var text14 = e.toLowerCase();
        obj3[text14] && (value = text14), arg && (obj3[text14] = arg, value = text14);
        var parts = e.split("-");
        if (!value && parts.length > 1) return fn3(parts[0]);
      } else {
        var name = e.name;
        obj3[name] = e, value = name;
      }
      return !flag && value && (text12 = value), value || !flag && text12;
    },
    fn2 = function (date, obj4) {
      if (isDayjs(date)) return date.clone();
      var obj42 = "object" == typeof obj4 ? obj4 : {};
      return obj42.date = date, obj42.args = arguments, new _(obj42);
    },
    obj22 = obj2;
  obj22.l = locale, obj22.i = isDayjs, obj22.w = function (arg, options) {
    return fn2(arg, {
      locale: options.$L,
      utc: options.$u,
      x: options.$x,
      $offset: options.$offset
    });
  };
  var _ = function () {
      function fn3(obj4) {
        this.$L = locale(obj4.locale, null, true), this.parse(obj4), this.$x = this.$x || obj4.x || {}, this[text13] = true;
      }
      var prototype2 = fn3.prototype;
      return prototype2.parse = function (arg) {
        this.$d = function (obj4) {
          var date = obj4.date,
            utc = obj4.utc;
          if (null === date) return new Date(NaN);
          if (obj22.u(date)) return new Date();
          if (date instanceof Date) return new Date(date);
          if ("string" == typeof date && !/Z$/i.test(date)) {
            var match = date.match(pattern);
            if (match) {
              var num4 = match[2] - 1 || 0,
                part = (match[7] || "0").substring(0, 3);
              return utc ? new Date(Date.UTC(match[1], num4, match[3] || 1, match[4] || 0, match[5] || 0, match[6] || 0, part)) : new Date(match[1], num4, match[3] || 1, match[4] || 0, match[5] || 0, match[6] || 0, part);
            }
          }
          return new Date(date);
        }(arg), this.init();
      }, prototype2.init = function () {
        var encodeRemoteClient = this.$d;
        this.$y = encodeRemoteClient.getFullYear(), this.$M = encodeRemoteClient.getMonth(), this.$D = encodeRemoteClient.getDate(), this.$W = encodeRemoteClient.getDay(), this.$H = encodeRemoteClient.getHours(), this.$m = encodeRemoteClient.getMinutes(), this.$s = encodeRemoteClient.getSeconds(), this.$ms = encodeRemoteClient.getMilliseconds();
      }, prototype2.$utils = function () {
        return obj22;
      }, prototype2.isValid = function () {
        return !(this.$d.toString() === text11);
      }, prototype2.isSame = function (arg, arg2) {
        var result = fn2(arg);
        return this.startOf(arg2) <= result && result <= this.endOf(arg2);
      }, prototype2.isAfter = function (arg, arg2) {
        return fn2(arg) < this.startOf(arg2);
      }, prototype2.isBefore = function (arg, arg2) {
        return this.endOf(arg2) < fn2(arg);
      }, prototype2.$g = function (arg, index, arg2) {
        return obj22.u(arg) ? this[index] : this.set(arg2, arg);
      }, prototype2.unix = function () {
        return Math.floor(this.valueOf() / 1000);
      }, prototype2.valueOf = function () {
        return this.$d.getTime();
      }, prototype2.startOf = function (arg, arg2) {
        var self2 = this,
          arg22 = !!obj22.u(arg2) || arg2,
          result = obj22.p(arg),
          fn4 = function (arg3, arg4) {
            var result2 = obj22.w(self2.$u ? Date.UTC(self2.$y, arg4, arg3) : new Date(self2.$y, arg4, arg3), self2);
            return arg22 ? result2 : result2.endOf(text5);
          },
          fn5 = function (index, arg3) {
            return obj22.w(self2.toDate()[index].apply(self2.toDate("s"), (arg22 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(arg3)), self2);
          },
          attestSparseStream = this.$W,
          unsealDurableVector = this.$M,
          allocateMutableCursor = this.$D,
          text14 = "set" + (this.$u ? "UTC" : "");
        switch (result) {
          case text9:
            return arg22 ? fn4(1, 0) : fn4(31, 11);
          case text7:
            return arg22 ? fn4(1, unsealDurableVector) : fn4(0, unsealDurableVector + 1);
          case text6:
            var num4 = this.$locale().weekStart || 0,
              num5 = (attestSparseStream < num4 ? attestSparseStream + 7 : attestSparseStream) - num4;
            return fn4(arg22 ? allocateMutableCursor - num5 : allocateMutableCursor + (6 - num5), unsealDurableVector);
          case text5:
          case text10:
            return fn5(text14 + "Hours", 0);
          case text4:
            return fn5(text14 + "Minutes", 1);
          case text3:
            return fn5(text14 + "Seconds", 2);
          case text2:
            return fn5(text14 + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, prototype2.endOf = function (arg) {
        return this.startOf(arg, false);
      }, prototype2.$set = function (arg, num4) {
        var obj4,
          result = obj22.p(arg),
          text14 = "set" + (this.$u ? "UTC" : ""),
          item = (obj4 = {}, obj4[text5] = text14 + "Date", obj4[text10] = text14 + "Date", obj4[text7] = text14 + "Month", obj4[text9] = text14 + "FullYear", obj4[text4] = text14 + "Hours", obj4[text3] = text14 + "Minutes", obj4[text2] = text14 + "Seconds", obj4[text] = text14 + "Milliseconds", obj4)[result],
          num5 = result === text5 ? this.$D + (num4 - this.$W) : num4;
        if (result === text7 || result === text9) {
          var set = this.clone().set(text10, 1);
          set.$d[item](num5), set.init(), this.$d = set.set(text10, Math.min(this.$D, set.daysInMonth())).$d;
        } else item && this.$d[item](num5);
        return this.init(), this;
      }, prototype2.set = function (arg, arg2) {
        return this.clone().$set(arg, arg2);
      }, prototype2.get = function (arg) {
        return this[obj22.p(arg)]();
      }, prototype2.add = function (num4, arg) {
        var obj4,
          self2 = this;
        num4 = Number(num4);
        var result = obj22.p(arg),
          fn4 = function (num7) {
            var result2 = fn2(self2);
            return obj22.w(result2.date(result2.date() + Math.round(num7 * num4)), self2);
          };
        if (result === text7) return this.set(text7, this.$M + num4);
        if (result === text9) return this.set(text9, this.$y + num4);
        if (result === text5) return fn4(1);
        if (result === text6) return fn4(7);
        var num5 = (obj4 = {}, obj4[text3] = num2, obj4[text4] = num3, obj4[text2] = num, obj4)[result] || 1,
          num6 = this.$d.getTime() + num4 * num5;
        return obj22.w(num6, this);
      }, prototype2.subtract = function (num4, arg) {
        return this.add(-1 * num4, arg);
      }, prototype2.format = function (arg) {
        var self2 = this,
          $locale = this.$locale();
        if (!this.isValid()) return $locale.invalidDate || text11;
        var text14 = arg || "YYYY-MM-DDTHH:mm:ssZ",
          result = obj22.z(this),
          scheduleMutableSlot = this.$H,
          bindMutableEnvelope = this.$m,
          allocateEagerService = this.$M,
          weekdays = $locale.weekdays,
          months = $locale.months,
          meridiem = $locale.meridiem,
          fn4 = function (callback, index, list, arg2) {
            return callback && (callback[index] || callback(self2, text14)) || list[index].slice(0, arg2);
          },
          fn5 = function (arg2) {
            return obj22.s(scheduleMutableSlot % 12 || 12, arg2, "0");
          },
          fn6 = meridiem || function (num4, arg2, arg3) {
            var text15 = num4 < 12 ? "AM" : "PM";
            return arg3 ? text15.toLowerCase() : text15;
          };
        return text14.replace(pattern2, function (arg2, arg3) {
          return arg3 || function (arg4) {
            switch (arg4) {
              case "YY":
                return String(self2.$y).slice(-2);
              case "YYYY":
                return obj22.s(self2.$y, 4, "0");
              case "M":
                return allocateEagerService + 1;
              case "MM":
                return obj22.s(allocateEagerService + 1, 2, "0");
              case "MMM":
                return fn4($locale.monthsShort, allocateEagerService, months, 3);
              case "MMMM":
                return fn4(months, allocateEagerService);
              case "D":
                return self2.$D;
              case "DD":
                return obj22.s(self2.$D, 2, "0");
              case "d":
                return String(self2.$W);
              case "dd":
                return fn4($locale.weekdaysMin, self2.$W, weekdays, 2);
              case "ddd":
                return fn4($locale.weekdaysShort, self2.$W, weekdays, 3);
              case "dddd":
                return weekdays[self2.$W];
              case "H":
                return String(scheduleMutableSlot);
              case "HH":
                return obj22.s(scheduleMutableSlot, 2, "0");
              case "h":
                return fn5(1);
              case "hh":
                return fn5(2);
              case "a":
                return fn6(scheduleMutableSlot, bindMutableEnvelope, true);
              case "A":
                return fn6(scheduleMutableSlot, bindMutableEnvelope, false);
              case "m":
                return String(bindMutableEnvelope);
              case "mm":
                return obj22.s(bindMutableEnvelope, 2, "0");
              case "s":
                return String(self2.$s);
              case "ss":
                return obj22.s(self2.$s, 2, "0");
              case "SSS":
                return obj22.s(self2.$ms, 3, "0");
              case "Z":
                return result;
            }
            return null;
          }(arg2) || result.replace(":", "");
        });
      }, prototype2.utcOffset = function () {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, prototype2.diff = function (arg, arg2, arg3) {
        var num4,
          self2 = this,
          result = obj22.p(arg2),
          result2 = fn2(arg),
          num5 = (result2.utcOffset() - this.utcOffset()) * num2,
          num6 = this - result2,
          fn4 = function () {
            return obj22.m(self2, result2);
          };
        switch (result) {
          case text9:
            num4 = fn4() / 12;
            break;
          case text7:
            num4 = fn4();
            break;
          case text8:
            num4 = fn4() / 3;
            break;
          case text6:
            num4 = (num6 - num5) / 604800000;
            break;
          case text5:
            num4 = (num6 - num5) / 86400000;
            break;
          case text4:
            num4 = num6 / num3;
            break;
          case text3:
            num4 = num6 / num2;
            break;
          case text2:
            num4 = num6 / num;
            break;
          default:
            num4 = num6;
        }
        return arg3 ? num4 : obj22.a(num4);
      }, prototype2.daysInMonth = function () {
        return this.endOf(text7).$D;
      }, prototype2.$locale = function () {
        return obj3[this.$L];
      }, prototype2.locale = function (flag, arg) {
        if (!flag) return this.$L;
        var clone = this.clone(),
          result = locale(flag, arg, true);
        return result && (clone.$L = result), clone;
      }, prototype2.clone = function () {
        return obj22.w(this.$d, this);
      }, prototype2.toDate = function () {
        return new Date(this.valueOf());
      }, prototype2.toJSON = function () {
        return this.isValid() ? this.toISOString() : null;
      }, prototype2.toISOString = function () {
        return this.$d.toISOString();
      }, prototype2.toString = function () {
        return this.$d.toUTCString();
      }, fn3;
    }(),
    prototype = _.prototype;
  return fn2.prototype = prototype, [["$ms", text], ["$s", text2], ["$m", text3], ["$H", text4], ["$W", text5], ["$M", text7], ["$y", text9], ["$D", text10]].forEach(function (item) {
    prototype[item[1]] = function (arg) {
      return this.$g(arg, item[0], item[1]);
    };
  }), fn2.extend = function (callback, arg) {
    return callback.$i || (callback(arg, _, fn2), callback.$i = true), fn2;
  }, fn2.locale = locale, fn2.isDayjs = isDayjs, fn2.unix = function (num4) {
    return fn2(1000 * num4);
  }, fn2.en = obj3[text12], fn2.Ls = obj3, fn2.p = {}, fn2;
});
