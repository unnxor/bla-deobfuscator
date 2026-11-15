!function (tMutableProbe, ePrivateHandle) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = ePrivateHandle() : "function" == typeof define && define.amd ? define(ePrivateHandle) : (tMutableProbe = "undefined" != typeof globalThis ? globalThis : tMutableProbe || self).dayjs = ePrivateHandle();
}(this, function () {
  "use strict";

  var tDurablePolicy = 1e3,
    eDurableRegistry = 6e4,
    nSharedPolicy = 36e5,
    rPrivateService = "millisecond",
    iTransientEnvelope = "second",
    sFrozenFrame = "minute",
    uEagerSlot = "hour",
    aLazyScope = "day",
    oDeferredLedger = "week",
    cDurableNode = "month",
    fDurableCatalog = "quarter",
    hNestedClient = "year",
    dMutableDigest = "date",
    lActiveSlot = "Invalid Date",
    pattern = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
    yInlineRouter = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
    mNestedLedger = {
      name: "en",
      weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      ordinal: function (tSparsePool) {
        var eEagerScope = ["th", "st", "nd", "rd"],
          nFrozenSensor = tSparsePool % 100;
        return "[" + tSparsePool + (eEagerScope[(nFrozenSensor - 20) % 10] || eEagerScope[nFrozenSensor] || eEagerScope[0]) + "]";
      }
    },
    mActiveEntry = function (tLazyRegistry, eEagerDigest, nSharedIndex) {
      var rLazyGateway = String(tLazyRegistry);
      return !rLazyGateway || rLazyGateway.length >= eEagerDigest ? tLazyRegistry : "" + Array(eEagerDigest + 1 - rLazyGateway.length).join(nSharedIndex) + tLazyRegistry;
    },
    vActiveHandle = {
      s: mActiveEntry,
      z: function (tEagerQueue) {
        var eLazyCache = -tEagerQueue.utcOffset(),
          nPendingBridge = Math.abs(eLazyCache),
          rTransientNode = Math.floor(nPendingBridge / 60),
          iSecondaryEnvelope = nPendingBridge % 60;
        return (eLazyCache <= 0 ? "+" : "-") + mActiveEntry(rTransientNode, 2, "0") + ":" + mActiveEntry(iSecondaryEnvelope, 2, "0");
      },
      m: function tNestedQuota(eSharedGateway, nDeferredRouter) {
        if (eSharedGateway.date() < nDeferredRouter.date()) return -tNestedQuota(nDeferredRouter, eSharedGateway);
        var rInlineRuntime = 12 * (nDeferredRouter.year() - eSharedGateway.year()) + (nDeferredRouter.month() - eSharedGateway.month()),
          iFrozenProbe = eSharedGateway.clone().add(rInlineRuntime, cDurableNode),
          sEagerRegistry = nDeferredRouter - iFrozenProbe < 0,
          uPrimaryRegistry = eSharedGateway.clone().add(rInlineRuntime + (sEagerRegistry ? -1 : 1), cDurableNode);
        return +(-(rInlineRuntime + (nDeferredRouter - iFrozenProbe) / (sEagerRegistry ? iFrozenProbe - uPrimaryRegistry : uPrimaryRegistry - iFrozenProbe)) || 0);
      },
      a: function (tDeferredRegistry) {
        return tDeferredRegistry < 0 ? Math.ceil(tDeferredRegistry) || 0 : Math.floor(tDeferredRegistry);
      },
      p: function (tEagerRecord) {
        return {
          M: cDurableNode,
          y: hNestedClient,
          w: oDeferredLedger,
          d: aLazyScope,
          D: dMutableDigest,
          h: uEagerSlot,
          m: sFrozenFrame,
          s: iTransientEnvelope,
          ms: rPrivateService,
          Q: fDurableCatalog
        }[tEagerRecord] || String(tEagerRecord || "").toLowerCase().replace(/s$/, "");
      },
      u: function (tEagerDigest) {
        return void 0 === tEagerDigest;
      }
    },
    gActiveScope = "en",
    dPendingWorker = {};
  dPendingWorker[gActiveScope] = mNestedLedger;
  var pInlineSegment = "$isDayjsObject",
    sDurableRuntime = function (tRemoteSegment) {
      return tRemoteSegment instanceof _ || !(!tRemoteSegment || !tRemoteSegment[pInlineSegment]);
    },
    wLazyPolicy = function tInlineSegment(e, nNestedToken, rFrozenSample) {
      var iEagerManifest;
      if (!e) return gActiveScope;
      if ("string" == typeof e) {
        var sSecondaryIndex = e.toLowerCase();
        dPendingWorker[sSecondaryIndex] && (iEagerManifest = sSecondaryIndex), nNestedToken && (dPendingWorker[sSecondaryIndex] = nNestedToken, iEagerManifest = sSecondaryIndex);
        var uSharedContext = e.split("-");
        if (!iEagerManifest && uSharedContext.length > 1) return tInlineSegment(uSharedContext[0]);
      } else {
        var aTransientHandle = e.name;
        dPendingWorker[aTransientHandle] = e, iEagerManifest = aTransientHandle;
      }
      return !rFrozenSample && iEagerManifest && (gActiveScope = iEagerManifest), iEagerManifest || !rFrozenSample && gActiveScope;
    },
    oLocalSlot = function (tSecondaryEpoch, ePrivateBuffer) {
      if (sDurableRuntime(tSecondaryEpoch)) return tSecondaryEpoch.clone();
      var nDeferredPolicy = "object" == typeof ePrivateBuffer ? ePrivateBuffer : {};
      return nDeferredPolicy.date = tSecondaryEpoch, nDeferredPolicy.args = arguments, new _(nDeferredPolicy);
    },
    bFrozenClient = vActiveHandle;
  bFrozenClient.l = wLazyPolicy, bFrozenClient.i = sDurableRuntime, bFrozenClient.w = function (tSecondaryEnvelope, eTransientVector) {
    return oLocalSlot(tSecondaryEnvelope, {
      locale: eTransientVector.$L,
      utc: eTransientVector.$u,
      x: eTransientVector.$x,
      $offset: eTransientVector.$offset
    });
  };
  var _ = function () {
      function mPrivateLedger(tFrozenQuota) {
        this.$L = wLazyPolicy(tFrozenQuota.locale, null, true), this.parse(tFrozenQuota), this.$x = this.$x || tFrozenQuota.x || {}, this[pInlineSegment] = true;
      }
      var mPendingCursor = mPrivateLedger.prototype;
      return mPendingCursor.parse = function (tSealedSlot) {
        this.$d = function (tCompositeChannel) {
          var eDeferredIndex = tCompositeChannel.date,
            nMutableCache = tCompositeChannel.utc;
          if (null === eDeferredIndex) return new Date(NaN);
          if (bFrozenClient.u(eDeferredIndex)) return new Date();
          if (eDeferredIndex instanceof Date) return new Date(eDeferredIndex);
          if ("string" == typeof eDeferredIndex && !/Z$/i.test(eDeferredIndex)) {
            var rPendingClaim = eDeferredIndex.match(pattern);
            if (rPendingClaim) {
              var iDurableBuffer = rPendingClaim[2] - 1 || 0,
                sPendingQueue = (rPendingClaim[7] || "0").substring(0, 3);
              return nMutableCache ? new Date(Date.UTC(rPendingClaim[1], iDurableBuffer, rPendingClaim[3] || 1, rPendingClaim[4] || 0, rPendingClaim[5] || 0, rPendingClaim[6] || 0, sPendingQueue)) : new Date(rPendingClaim[1], iDurableBuffer, rPendingClaim[3] || 1, rPendingClaim[4] || 0, rPendingClaim[5] || 0, rPendingClaim[6] || 0, sPendingQueue);
            }
          }
          return new Date(eDeferredIndex);
        }(tSealedSlot), this.init();
      }, mPendingCursor.init = function () {
        var tEagerService = this.$d;
        this.$y = tEagerService.getFullYear(), this.$M = tEagerService.getMonth(), this.$D = tEagerService.getDate(), this.$W = tEagerService.getDay(), this.$H = tEagerService.getHours(), this.$m = tEagerService.getMinutes(), this.$s = tEagerService.getSeconds(), this.$ms = tEagerService.getMilliseconds();
      }, mPendingCursor.$utils = function () {
        return bFrozenClient;
      }, mPendingCursor.isValid = function () {
        return !(this.$d.toString() === lActiveSlot);
      }, mPendingCursor.isSame = function (tTransientDigest, eSealedRouter) {
        var nRemotePool = oLocalSlot(tTransientDigest);
        return this.startOf(eSealedRouter) <= nRemotePool && nRemotePool <= this.endOf(eSealedRouter);
      }, mPendingCursor.isAfter = function (tEagerScope, eInlineChannel) {
        return oLocalSlot(tEagerScope) < this.startOf(eInlineChannel);
      }, mPendingCursor.isBefore = function (tLocalTree, eDeferredGateway) {
        return this.endOf(eDeferredGateway) < oLocalSlot(tLocalTree);
      }, mPendingCursor.$g = function (tSecondaryLedger, eTransientEdge, nLazyStack) {
        return bFrozenClient.u(tSecondaryLedger) ? this[eTransientEdge] : this.set(nLazyStack, tSecondaryLedger);
      }, mPendingCursor.unix = function () {
        return Math.floor(this.valueOf() / 1e3);
      }, mPendingCursor.valueOf = function () {
        return this.$d.getTime();
      }, mPendingCursor.startOf = function (tEagerPolicy, eCompositeMetric) {
        var nSharedBridge = this,
          rLazyEdge = !!bFrozenClient.u(eCompositeMetric) || eCompositeMetric,
          fActiveGateway = bFrozenClient.p(tEagerPolicy),
          lPrimaryEpoch = function (tSealedHandle, eEagerCursor) {
            var iPendingGateway = bFrozenClient.w(nSharedBridge.$u ? Date.UTC(nSharedBridge.$y, eEagerCursor, tSealedHandle) : new Date(nSharedBridge.$y, eEagerCursor, tSealedHandle), nSharedBridge);
            return rLazyEdge ? iPendingGateway : iPendingGateway.endOf(aLazyScope);
          },
          fn = function (tDurableContext, eInlineProvider) {
            return bFrozenClient.w(nSharedBridge.toDate()[tDurableContext].apply(nSharedBridge.toDate("s"), (rLazyEdge ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(eInlineProvider)), nSharedBridge);
          },
          yLazyClaim = this.$W,
          mMutableSensor = this.$M,
          mCompositeMatrix = this.$D,
          vMutableMetric = "set" + (this.$u ? "UTC" : "");
        switch (fActiveGateway) {
          case hNestedClient:
            return rLazyEdge ? lPrimaryEpoch(1, 0) : lPrimaryEpoch(31, 11);
          case cDurableNode:
            return rLazyEdge ? lPrimaryEpoch(1, mMutableSensor) : lPrimaryEpoch(0, mMutableSensor + 1);
          case oDeferredLedger:
            var gSharedProvider = this.$locale().weekStart || 0,
              dInlineDigest = (yLazyClaim < gSharedProvider ? yLazyClaim + 7 : yLazyClaim) - gSharedProvider;
            return lPrimaryEpoch(rLazyEdge ? mCompositeMatrix - dInlineDigest : mCompositeMatrix + (6 - dInlineDigest), mMutableSensor);
          case aLazyScope:
          case dMutableDigest:
            return fn(vMutableMetric + "Hours", 0);
          case uEagerSlot:
            return fn(vMutableMetric + "Minutes", 1);
          case sFrozenFrame:
            return fn(vMutableMetric + "Seconds", 2);
          case iTransientEnvelope:
            return fn(vMutableMetric + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, mPendingCursor.endOf = function (arg) {
        return this.startOf(arg, false);
      }, mPendingCursor.$set = function (tPrivateDigest, eSealedProvider) {
        var nPendingProbe,
          oActiveBridge = bFrozenClient.p(tPrivateDigest),
          fMutableClaim = "set" + (this.$u ? "UTC" : ""),
          lRemoteRuntime = (nPendingProbe = {}, nPendingProbe[aLazyScope] = fMutableClaim + "Date", nPendingProbe[dMutableDigest] = fMutableClaim + "Date", nPendingProbe[cDurableNode] = fMutableClaim + "Month", nPendingProbe[hNestedClient] = fMutableClaim + "FullYear", nPendingProbe[uEagerSlot] = fMutableClaim + "Hours", nPendingProbe[sFrozenFrame] = fMutableClaim + "Minutes", nPendingProbe[iTransientEnvelope] = fMutableClaim + "Seconds", nPendingProbe[rPrivateService] = fMutableClaim + "Milliseconds", nPendingProbe)[oActiveBridge],
          num = oActiveBridge === aLazyScope ? this.$D + (eSealedProvider - this.$W) : eSealedProvider;
        if (oActiveBridge === cDurableNode || oActiveBridge === hNestedClient) {
          var yCompositeSlot = this.clone().set(dMutableDigest, 1);
          yCompositeSlot.$d[lRemoteRuntime](num), yCompositeSlot.init(), this.$d = yCompositeSlot.set(dMutableDigest, Math.min(this.$D, yCompositeSlot.daysInMonth())).$d;
        } else lRemoteRuntime && this.$d[lRemoteRuntime](num);
        return this.init(), this;
      }, mPendingCursor.set = function (tLocalChannel, eDeferredSlot) {
        return this.clone().$set(tLocalChannel, eDeferredSlot);
      }, mPendingCursor.get = function (tDeferredPolicy) {
        return this[bFrozenClient.p(tDeferredPolicy)]();
      }, mPendingCursor.add = function (rCompositeContext, fLocalDigest) {
        var dSecondaryBridge,
          lCompositeManifest = this;
        rCompositeContext = Number(rCompositeContext);
        var result = bFrozenClient.p(fLocalDigest),
          yPrimaryClaim = function (tInlineScope) {
            var eFrozenLedger = oLocalSlot(lCompositeManifest);
            return bFrozenClient.w(eFrozenLedger.date(eFrozenLedger.date() + Math.round(tInlineScope * rCompositeContext)), lCompositeManifest);
          };
        if (result === cDurableNode) return this.set(cDurableNode, this.$M + rCompositeContext);
        if (result === hNestedClient) return this.set(hNestedClient, this.$y + rCompositeContext);
        if (result === aLazyScope) return yPrimaryClaim(1);
        if (result === oDeferredLedger) return yPrimaryClaim(7);
        var mEagerSample = (dSecondaryBridge = {}, dSecondaryBridge[sFrozenFrame] = eDurableRegistry, dSecondaryBridge[uEagerSlot] = nSharedPolicy, dSecondaryBridge[iTransientEnvelope] = tDurablePolicy, dSecondaryBridge)[result] || 1,
          mPrivateEnvelope = this.$d.getTime() + rCompositeContext * mEagerSample;
        return bFrozenClient.w(mPrivateEnvelope, this);
      }, mPendingCursor.subtract = function (tLazyService, eMutableScope) {
        return this.add(-1 * tLazyService, eMutableScope);
      }, mPendingCursor.format = function (tNestedGraph) {
        var eSharedRuntime = this,
          nFrozenHandle = this.$locale();
        if (!this.isValid()) return nFrozenHandle.invalidDate || lActiveSlot;
        var rRemoteScope = tNestedGraph || "YYYY-MM-DDTHH:mm:ssZ",
          iInlineGateway = bFrozenClient.z(this),
          sNestedScope = this.$H,
          uDeferredQuota = this.$m,
          aTransientSegment = this.$M,
          oTransientRegistry = nFrozenHandle.weekdays,
          cLocalWorker = nFrozenHandle.months,
          fPrimaryCursor = nFrozenHandle.meridiem,
          hEagerProbe = function (tSharedEntry, nDeferredTree, iPrivateGateway, sActiveSegment) {
            return tSharedEntry && (tSharedEntry[nDeferredTree] || tSharedEntry(eSharedRuntime, rRemoteScope)) || iPrivateGateway[nDeferredTree].slice(0, sActiveSegment);
          },
          dActiveStream = function (tEagerSlot) {
            return bFrozenClient.s(sNestedScope % 12 || 12, tEagerSlot, "0");
          },
          fn = fPrimaryCursor || function (tSharedRegistry, eDeferredSegment, nPrimaryEdge) {
            var rCompositeProvider = tSharedRegistry < 12 ? "AM" : "PM";
            return nPrimaryEdge ? rCompositeProvider.toLowerCase() : rCompositeProvider;
          };
        return rRemoteScope.replace(yInlineRouter, function (tPrivateShard, rActiveStream) {
          return rActiveStream || function (tSealedEntry) {
            switch (tSealedEntry) {
              case "YY":
                return String(eSharedRuntime.$y).slice(-2);
              case "YYYY":
                return bFrozenClient.s(eSharedRuntime.$y, 4, "0");
              case "M":
                return aTransientSegment + 1;
              case "MM":
                return bFrozenClient.s(aTransientSegment + 1, 2, "0");
              case "MMM":
                return hEagerProbe(nFrozenHandle.monthsShort, aTransientSegment, cLocalWorker, 3);
              case "MMMM":
                return hEagerProbe(cLocalWorker, aTransientSegment);
              case "D":
                return eSharedRuntime.$D;
              case "DD":
                return bFrozenClient.s(eSharedRuntime.$D, 2, "0");
              case "d":
                return String(eSharedRuntime.$W);
              case "dd":
                return hEagerProbe(nFrozenHandle.weekdaysMin, eSharedRuntime.$W, oTransientRegistry, 2);
              case "ddd":
                return hEagerProbe(nFrozenHandle.weekdaysShort, eSharedRuntime.$W, oTransientRegistry, 3);
              case "dddd":
                return oTransientRegistry[eSharedRuntime.$W];
              case "H":
                return String(sNestedScope);
              case "HH":
                return bFrozenClient.s(sNestedScope, 2, "0");
              case "h":
                return dActiveStream(1);
              case "hh":
                return dActiveStream(2);
              case "a":
                return fn(sNestedScope, uDeferredQuota, true);
              case "A":
                return fn(sNestedScope, uDeferredQuota, false);
              case "m":
                return String(uDeferredQuota);
              case "mm":
                return bFrozenClient.s(uDeferredQuota, 2, "0");
              case "s":
                return String(eSharedRuntime.$s);
              case "ss":
                return bFrozenClient.s(eSharedRuntime.$s, 2, "0");
              case "SSS":
                return bFrozenClient.s(eSharedRuntime.$ms, 3, "0");
              case "Z":
                return iInlineGateway;
            }
            return null;
          }(tPrivateShard) || iInlineGateway.replace(":", "");
        });
      }, mPendingCursor.utcOffset = function () {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, mPendingCursor.diff = function (rNestedNode, dDurableSegment, lEagerStream) {
        var num,
          yLazyWorker = this,
          mActiveSample = bFrozenClient.p(dDurableSegment),
          result = oLocalSlot(rNestedNode),
          vSharedCache = (result.utcOffset() - this.utcOffset()) * eDurableRegistry,
          gSecondaryEdge = this - result,
          dTransientShard = function () {
            return bFrozenClient.m(yLazyWorker, result);
          };
        switch (mActiveSample) {
          case hNestedClient:
            num = dTransientShard() / 12;
            break;
          case cDurableNode:
            num = dTransientShard();
            break;
          case fDurableCatalog:
            num = dTransientShard() / 3;
            break;
          case oDeferredLedger:
            num = (gSecondaryEdge - vSharedCache) / 6048e5;
            break;
          case aLazyScope:
            num = (gSecondaryEdge - vSharedCache) / 864e5;
            break;
          case uEagerSlot:
            num = gSecondaryEdge / nSharedPolicy;
            break;
          case sFrozenFrame:
            num = gSecondaryEdge / eDurableRegistry;
            break;
          case iTransientEnvelope:
            num = gSecondaryEdge / tDurablePolicy;
            break;
          default:
            num = gSecondaryEdge;
        }
        return lEagerStream ? num : bFrozenClient.a(num);
      }, mPendingCursor.daysInMonth = function () {
        return this.endOf(cDurableNode).$D;
      }, mPendingCursor.$locale = function () {
        return dPendingWorker[this.$L];
      }, mPendingCursor.locale = function (tNestedPolicy, eSharedQuota) {
        if (!tNestedPolicy) return this.$L;
        var nPendingEntry = this.clone(),
          rTransientClient = wLazyPolicy(tNestedPolicy, eSharedQuota, true);
        return rTransientClient && (nPendingEntry.$L = rTransientClient), nPendingEntry;
      }, mPendingCursor.clone = function () {
        return bFrozenClient.w(this.$d, this);
      }, mPendingCursor.toDate = function () {
        return new Date(this.valueOf());
      }, mPendingCursor.toJSON = function () {
        return this.isValid() ? this.toISOString() : null;
      }, mPendingCursor.toISOString = function () {
        return this.$d.toISOString();
      }, mPendingCursor.toString = function () {
        return this.$d.toUTCString();
      }, mPrivateLedger;
    }(),
    kSharedRecord = _.prototype;
  return oLocalSlot.prototype = kSharedRecord, [["$ms", rPrivateService], ["$s", iTransientEnvelope], ["$m", sFrozenFrame], ["$H", uEagerSlot], ["$W", aLazyScope], ["$M", cDurableNode], ["$y", hNestedClient], ["$D", dMutableDigest]].forEach(function (item) {
    kSharedRecord[item[1]] = function (ePrimaryEpoch) {
      return this.$g(ePrimaryEpoch, item[0], item[1]);
    };
  }), oLocalSlot.extend = function (tDurableSensor, eSealedMetric) {
    return tDurableSensor.$i || (tDurableSensor(eSealedMetric, _, oLocalSlot), tDurableSensor.$i = true), oLocalSlot;
  }, oLocalSlot.locale = wLazyPolicy, oLocalSlot.isDayjs = sDurableRuntime, oLocalSlot.unix = function (tSecondaryNode) {
    return oLocalSlot(1e3 * tSecondaryNode);
  }, oLocalSlot.en = dPendingWorker[gActiveScope], oLocalSlot.Ls = dPendingWorker, oLocalSlot.p = {}, oLocalSlot;
});
