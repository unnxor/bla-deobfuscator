!function (tLazyFrame, eCompositeService) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = eCompositeService() : "function" == typeof define && define.amd ? define(eCompositeService) : (tLazyFrame = "undefined" != typeof globalThis ? globalThis : tLazyFrame || self).dayjs = eCompositeService();
}(this, function () {
  "use strict";

  var tSparseProbe = 1e3,
    eDeferredRuntime = 6e4,
    nSparseService = 36e5,
    rCompositeProbe = "millisecond",
    iLazyPool = "second",
    sLocalSegment = "minute",
    uPrivateSensor = "hour",
    aDeferredEntry = "day",
    oLocalBundle = "week",
    cRemoteShard = "month",
    fCompositeSession = "quarter",
    hCompositeDigest = "year",
    dFrozenChannel = "date",
    lDurableGraph = "Invalid Date",
    pattern = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
    yLocalRecord = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
    mSparseClient = {
      name: "en",
      weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      ordinal: function (tNestedChannel) {
        var eActiveMatrix = ["th", "st", "nd", "rd"],
          nSealedFrame = tNestedChannel % 100;
        return "[" + tNestedChannel + (eActiveMatrix[(nSealedFrame - 20) % 10] || eActiveMatrix[nSealedFrame] || eActiveMatrix[0]) + "]";
      }
    },
    mNestedStream = function (tSealedLedger, eMutablePool, nInlineStack) {
      var rPrivateManifest = String(tSealedLedger);
      return !rPrivateManifest || rPrivateManifest.length >= eMutablePool ? tSealedLedger : "" + Array(eMutablePool + 1 - rPrivateManifest.length).join(nInlineStack) + tSealedLedger;
    },
    vActiveDigest = {
      s: mNestedStream,
      z: function (tInlineSensor) {
        var eCompositeMatrix = -tInlineSensor.utcOffset(),
          nActiveRegistry = Math.abs(eCompositeMatrix),
          rSealedMetric = Math.floor(nActiveRegistry / 60),
          iInlineTree = nActiveRegistry % 60;
        return (eCompositeMatrix <= 0 ? "+" : "-") + mNestedStream(rSealedMetric, 2, "0") + ":" + mNestedStream(iInlineTree, 2, "0");
      },
      m: function tSparseCache(eSecondaryRegistry, nDeferredGateway) {
        if (eSecondaryRegistry.date() < nDeferredGateway.date()) return -tSparseCache(nDeferredGateway, eSecondaryRegistry);
        var rCompositeClaim = 12 * (nDeferredGateway.year() - eSecondaryRegistry.year()) + (nDeferredGateway.month() - eSecondaryRegistry.month()),
          iSecondaryProvider = eSecondaryRegistry.clone().add(rCompositeClaim, cRemoteShard),
          sSharedFrame = nDeferredGateway - iSecondaryProvider < 0,
          uMutableDigest = eSecondaryRegistry.clone().add(rCompositeClaim + (sSharedFrame ? -1 : 1), cRemoteShard);
        return +(-(rCompositeClaim + (nDeferredGateway - iSecondaryProvider) / (sSharedFrame ? iSecondaryProvider - uMutableDigest : uMutableDigest - iSecondaryProvider)) || 0);
      },
      a: function (tPrivateSession) {
        return tPrivateSession < 0 ? Math.ceil(tPrivateSession) || 0 : Math.floor(tPrivateSession);
      },
      p: function (tFrozenVector) {
        return {
          M: cRemoteShard,
          y: hCompositeDigest,
          w: oLocalBundle,
          d: aDeferredEntry,
          D: dFrozenChannel,
          h: uPrivateSensor,
          m: sLocalSegment,
          s: iLazyPool,
          ms: rCompositeProbe,
          Q: fCompositeSession
        }[tFrozenVector] || String(tFrozenVector || "").toLowerCase().replace(/s$/, "");
      },
      u: function (tCompositeShard) {
        return void 0 === tCompositeShard;
      }
    },
    gMutableCache = "en",
    dDeferredDigest = {};
  dDeferredDigest[gMutableCache] = mSparseClient;
  var pPrivateManifest = "$isDayjsObject",
    sSparseBundle = function (tDeferredChannel) {
      return tDeferredChannel instanceof _ || !(!tDeferredChannel || !tDeferredChannel[pPrivateManifest]);
    },
    wSharedClaim = function tMutableSession(e, nSealedSegment, rTransientMetric) {
      var iDeferredQueue;
      if (!e) return gMutableCache;
      if ("string" == typeof e) {
        var sSharedClient = e.toLowerCase();
        dDeferredDigest[sSharedClient] && (iDeferredQueue = sSharedClient), nSealedSegment && (dDeferredDigest[sSharedClient] = nSealedSegment, iDeferredQueue = sSharedClient);
        var uFrozenQueue = e.split("-");
        if (!iDeferredQueue && uFrozenQueue.length > 1) return tMutableSession(uFrozenQueue[0]);
      } else {
        var aSparseEntry = e.name;
        dDeferredDigest[aSparseEntry] = e, iDeferredQueue = aSparseEntry;
      }
      return !rTransientMetric && iDeferredQueue && (gMutableCache = iDeferredQueue), iDeferredQueue || !rTransientMetric && gMutableCache;
    },
    oFrozenNode = function (tLazyPolicy, eFrozenSensor) {
      if (sSparseBundle(tLazyPolicy)) return tLazyPolicy.clone();
      var nLocalStack = "object" == typeof eFrozenSensor ? eFrozenSensor : {};
      return nLocalStack.date = tLazyPolicy, nLocalStack.args = arguments, new _(nLocalStack);
    },
    bCompositeScope = vActiveDigest;
  bCompositeScope.l = wSharedClaim, bCompositeScope.i = sSparseBundle, bCompositeScope.w = function (tLocalRuntime, eLocalEpoch) {
    return oFrozenNode(tLocalRuntime, {
      locale: eLocalEpoch.$L,
      utc: eLocalEpoch.$u,
      x: eLocalEpoch.$x,
      $offset: eLocalEpoch.$offset
    });
  };
  var _ = function () {
      function mMutableLedger(tPrivateGraph) {
        this.$L = wSharedClaim(tPrivateGraph.locale, null, true), this.parse(tPrivateGraph), this.$x = this.$x || tPrivateGraph.x || {}, this[pPrivateManifest] = true;
      }
      var mLocalIndex = mMutableLedger.prototype;
      return mLocalIndex.parse = function (tRemoteProbe) {
        this.$d = function (tFrozenSlot) {
          var eCompositeProbe = tFrozenSlot.date,
            nLazyCursor = tFrozenSlot.utc;
          if (null === eCompositeProbe) return new Date(NaN);
          if (bCompositeScope.u(eCompositeProbe)) return new Date();
          if (eCompositeProbe instanceof Date) return new Date(eCompositeProbe);
          if ("string" == typeof eCompositeProbe && !/Z$/i.test(eCompositeProbe)) {
            var rNestedChannel = eCompositeProbe.match(pattern);
            if (rNestedChannel) {
              var iPrivateRecord = rNestedChannel[2] - 1 || 0,
                sLazySession = (rNestedChannel[7] || "0").substring(0, 3);
              return nLazyCursor ? new Date(Date.UTC(rNestedChannel[1], iPrivateRecord, rNestedChannel[3] || 1, rNestedChannel[4] || 0, rNestedChannel[5] || 0, rNestedChannel[6] || 0, sLazySession)) : new Date(rNestedChannel[1], iPrivateRecord, rNestedChannel[3] || 1, rNestedChannel[4] || 0, rNestedChannel[5] || 0, rNestedChannel[6] || 0, sLazySession);
            }
          }
          return new Date(eCompositeProbe);
        }(tRemoteProbe), this.init();
      }, mLocalIndex.init = function () {
        var tFrozenClient = this.$d;
        this.$y = tFrozenClient.getFullYear(), this.$M = tFrozenClient.getMonth(), this.$D = tFrozenClient.getDate(), this.$W = tFrozenClient.getDay(), this.$H = tFrozenClient.getHours(), this.$m = tFrozenClient.getMinutes(), this.$s = tFrozenClient.getSeconds(), this.$ms = tFrozenClient.getMilliseconds();
      }, mLocalIndex.$utils = function () {
        return bCompositeScope;
      }, mLocalIndex.isValid = function () {
        return !(this.$d.toString() === lDurableGraph);
      }, mLocalIndex.isSame = function (tNestedSlot, ePrivateGraph) {
        var nDurableStack = oFrozenNode(tNestedSlot);
        return this.startOf(ePrivateGraph) <= nDurableStack && nDurableStack <= this.endOf(ePrivateGraph);
      }, mLocalIndex.isAfter = function (tNestedClient, eLazyWorker) {
        return oFrozenNode(tNestedClient) < this.startOf(eLazyWorker);
      }, mLocalIndex.isBefore = function (tDeferredEnvelope, eLazyCursor) {
        return this.endOf(eLazyCursor) < oFrozenNode(tDeferredEnvelope);
      }, mLocalIndex.$g = function (tPrimaryRuntime, ePrivateEnvelope, nCompositeShard) {
        return bCompositeScope.u(tPrimaryRuntime) ? this[ePrivateEnvelope] : this.set(nCompositeShard, tPrimaryRuntime);
      }, mLocalIndex.unix = function () {
        return Math.floor(this.valueOf() / 1e3);
      }, mLocalIndex.valueOf = function () {
        return this.$d.getTime();
      }, mLocalIndex.startOf = function (tCompositeCursor, eSealedFrame) {
        var nMutableGateway = this,
          rSealedEnvelope = !!bCompositeScope.u(eSealedFrame) || eSealedFrame,
          fNestedBridge = bCompositeScope.p(tCompositeCursor),
          lRemoteMetric = function (tDeferredScope, eActiveRuntime) {
            var iNestedCursor = bCompositeScope.w(nMutableGateway.$u ? Date.UTC(nMutableGateway.$y, eActiveRuntime, tDeferredScope) : new Date(nMutableGateway.$y, eActiveRuntime, tDeferredScope), nMutableGateway);
            return rSealedEnvelope ? iNestedCursor : iNestedCursor.endOf(aDeferredEntry);
          },
          fn = function (tSparseBridge, eDeferredSegment) {
            return bCompositeScope.w(nMutableGateway.toDate()[tSparseBridge].apply(nMutableGateway.toDate("s"), (rSealedEnvelope ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(eDeferredSegment)), nMutableGateway);
          },
          yMutableNode = this.$W,
          mFrozenNode = this.$M,
          mPrimaryProvider = this.$D,
          vTransientPolicy = "set" + (this.$u ? "UTC" : "");
        switch (fNestedBridge) {
          case hCompositeDigest:
            return rSealedEnvelope ? lRemoteMetric(1, 0) : lRemoteMetric(31, 11);
          case cRemoteShard:
            return rSealedEnvelope ? lRemoteMetric(1, mFrozenNode) : lRemoteMetric(0, mFrozenNode + 1);
          case oLocalBundle:
            var gTransientHandle = this.$locale().weekStart || 0,
              dPrimaryCatalog = (yMutableNode < gTransientHandle ? yMutableNode + 7 : yMutableNode) - gTransientHandle;
            return lRemoteMetric(rSealedEnvelope ? mPrimaryProvider - dPrimaryCatalog : mPrimaryProvider + (6 - dPrimaryCatalog), mFrozenNode);
          case aDeferredEntry:
          case dFrozenChannel:
            return fn(vTransientPolicy + "Hours", 0);
          case uPrivateSensor:
            return fn(vTransientPolicy + "Minutes", 1);
          case sLocalSegment:
            return fn(vTransientPolicy + "Seconds", 2);
          case iLazyPool:
            return fn(vTransientPolicy + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, mLocalIndex.endOf = function (tFrozenContext) {
        return this.startOf(tFrozenContext, false);
      }, mLocalIndex.$set = function (tTransientFrame, eMutableQuota) {
        var nFrozenManifest,
          oPrimaryDigest = bCompositeScope.p(tTransientFrame),
          fLazyChannel = "set" + (this.$u ? "UTC" : ""),
          lPendingToken = (nFrozenManifest = {}, nFrozenManifest[aDeferredEntry] = fLazyChannel + "Date", nFrozenManifest[dFrozenChannel] = fLazyChannel + "Date", nFrozenManifest[cRemoteShard] = fLazyChannel + "Month", nFrozenManifest[hCompositeDigest] = fLazyChannel + "FullYear", nFrozenManifest[uPrivateSensor] = fLazyChannel + "Hours", nFrozenManifest[sLocalSegment] = fLazyChannel + "Minutes", nFrozenManifest[iLazyPool] = fLazyChannel + "Seconds", nFrozenManifest[rCompositeProbe] = fLazyChannel + "Milliseconds", nFrozenManifest)[oPrimaryDigest],
          num = oPrimaryDigest === aDeferredEntry ? this.$D + (eMutableQuota - this.$W) : eMutableQuota;
        if (oPrimaryDigest === cRemoteShard || oPrimaryDigest === hCompositeDigest) {
          var yLazyChannel = this.clone().set(dFrozenChannel, 1);
          yLazyChannel.$d[lPendingToken](num), yLazyChannel.init(), this.$d = yLazyChannel.set(dFrozenChannel, Math.min(this.$D, yLazyChannel.daysInMonth())).$d;
        } else lPendingToken && this.$d[lPendingToken](num);
        return this.init(), this;
      }, mLocalIndex.set = function (tMutableProbe, ePrivateHandle) {
        return this.clone().$set(tMutableProbe, ePrivateHandle);
      }, mLocalIndex.get = function (tDurablePolicy) {
        return this[bCompositeScope.p(tDurablePolicy)]();
      }, mLocalIndex.add = function (rDurableRegistry, fSharedPolicy) {
        var dPrivateService,
          lTransientEnvelope = this;
        rDurableRegistry = Number(rDurableRegistry);
        var result = bCompositeScope.p(fSharedPolicy),
          yEagerSlot = function (tDurableNode) {
            var eDurableCatalog = oFrozenNode(lTransientEnvelope);
            return bCompositeScope.w(eDurableCatalog.date(eDurableCatalog.date() + Math.round(tDurableNode * rDurableRegistry)), lTransientEnvelope);
          };
        if (result === cRemoteShard) return this.set(cRemoteShard, this.$M + rDurableRegistry);
        if (result === hCompositeDigest) return this.set(hCompositeDigest, this.$y + rDurableRegistry);
        if (result === aDeferredEntry) return yEagerSlot(1);
        if (result === oLocalBundle) return yEagerSlot(7);
        var mLazyScope = (dPrivateService = {}, dPrivateService[sLocalSegment] = eDeferredRuntime, dPrivateService[uPrivateSensor] = nSparseService, dPrivateService[iLazyPool] = tSparseProbe, dPrivateService)[result] || 1,
          mDeferredLedger = this.$d.getTime() + rDurableRegistry * mLazyScope;
        return bCompositeScope.w(mDeferredLedger, this);
      }, mLocalIndex.subtract = function (num, eMutableDigest) {
        return this.add(-1 * num, eMutableDigest);
      }, mLocalIndex.format = function (tActiveSlot) {
        var eLazySlot = this,
          nInlineRouter = this.$locale();
        if (!this.isValid()) return nInlineRouter.invalidDate || lDurableGraph;
        var rNestedLedger = tActiveSlot || "YYYY-MM-DDTHH:mm:ssZ",
          iActiveEntry = bCompositeScope.z(this),
          sActiveHandle = this.$H,
          uActiveScope = this.$m,
          aPendingWorker = this.$M,
          oInlineSegment = nInlineRouter.weekdays,
          cDurableRuntime = nInlineRouter.months,
          fLazyPolicy = nInlineRouter.meridiem,
          hLocalSlot = function (tSparsePool, nEagerScope, iFrozenSensor, sLazyRegistry) {
            return tSparsePool && (tSparsePool[nEagerScope] || tSparsePool(eLazySlot, rNestedLedger)) || iFrozenSensor[nEagerScope].slice(0, sLazyRegistry);
          },
          dFrozenClient = function (tEagerDigest) {
            return bCompositeScope.s(sActiveHandle % 12 || 12, tEagerDigest, "0");
          },
          fn = fLazyPolicy || function (tSharedIndex, eLazyGateway, nEagerQueue) {
            var rLazyCache = tSharedIndex < 12 ? "AM" : "PM";
            return nEagerQueue ? rLazyCache.toLowerCase() : rLazyCache;
          };
        return rNestedLedger.replace(yLocalRecord, function (tPendingBridge, rTransientNode) {
          return rTransientNode || function (tSecondaryEnvelope) {
            switch (tSecondaryEnvelope) {
              case "YY":
                return String(eLazySlot.$y).slice(-2);
              case "YYYY":
                return bCompositeScope.s(eLazySlot.$y, 4, "0");
              case "M":
                return aPendingWorker + 1;
              case "MM":
                return bCompositeScope.s(aPendingWorker + 1, 2, "0");
              case "MMM":
                return hLocalSlot(nInlineRouter.monthsShort, aPendingWorker, cDurableRuntime, 3);
              case "MMMM":
                return hLocalSlot(cDurableRuntime, aPendingWorker);
              case "D":
                return eLazySlot.$D;
              case "DD":
                return bCompositeScope.s(eLazySlot.$D, 2, "0");
              case "d":
                return String(eLazySlot.$W);
              case "dd":
                return hLocalSlot(nInlineRouter.weekdaysMin, eLazySlot.$W, oInlineSegment, 2);
              case "ddd":
                return hLocalSlot(nInlineRouter.weekdaysShort, eLazySlot.$W, oInlineSegment, 3);
              case "dddd":
                return oInlineSegment[eLazySlot.$W];
              case "H":
                return String(sActiveHandle);
              case "HH":
                return bCompositeScope.s(sActiveHandle, 2, "0");
              case "h":
                return dFrozenClient(1);
              case "hh":
                return dFrozenClient(2);
              case "a":
                return fn(sActiveHandle, uActiveScope, true);
              case "A":
                return fn(sActiveHandle, uActiveScope, false);
              case "m":
                return String(uActiveScope);
              case "mm":
                return bCompositeScope.s(uActiveScope, 2, "0");
              case "s":
                return String(eLazySlot.$s);
              case "ss":
                return bCompositeScope.s(eLazySlot.$s, 2, "0");
              case "SSS":
                return bCompositeScope.s(eLazySlot.$ms, 3, "0");
              case "Z":
                return iActiveEntry;
            }
            return null;
          }(tPendingBridge) || iActiveEntry.replace(":", "");
        });
      }, mLocalIndex.utcOffset = function () {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, mLocalIndex.diff = function (rSharedGateway, dDeferredRouter, lNestedQuota) {
        var num,
          yFrozenProbe = this,
          mEagerRegistry = bCompositeScope.p(dDeferredRouter),
          mPrimaryRegistry = oFrozenNode(rSharedGateway),
          vDeferredRegistry = (mPrimaryRegistry.utcOffset() - this.utcOffset()) * eDeferredRuntime,
          gEagerRecord = this - mPrimaryRegistry,
          dEagerDigest = function () {
            return bCompositeScope.m(yFrozenProbe, mPrimaryRegistry);
          };
        switch (mEagerRegistry) {
          case hCompositeDigest:
            num = dEagerDigest() / 12;
            break;
          case cRemoteShard:
            num = dEagerDigest();
            break;
          case fCompositeSession:
            num = dEagerDigest() / 3;
            break;
          case oLocalBundle:
            num = (gEagerRecord - vDeferredRegistry) / 6048e5;
            break;
          case aDeferredEntry:
            num = (gEagerRecord - vDeferredRegistry) / 864e5;
            break;
          case uPrivateSensor:
            num = gEagerRecord / nSparseService;
            break;
          case sLocalSegment:
            num = gEagerRecord / eDeferredRuntime;
            break;
          case iLazyPool:
            num = gEagerRecord / tSparseProbe;
            break;
          default:
            num = gEagerRecord;
        }
        return lNestedQuota ? num : bCompositeScope.a(num);
      }, mLocalIndex.daysInMonth = function () {
        return this.endOf(cRemoteShard).$D;
      }, mLocalIndex.$locale = function () {
        return dDeferredDigest[this.$L];
      }, mLocalIndex.locale = function (tRemoteSegment, eNestedToken) {
        if (!tRemoteSegment) return this.$L;
        var nFrozenSample = this.clone(),
          rInlineSegment = wSharedClaim(tRemoteSegment, eNestedToken, true);
        return rInlineSegment && (nFrozenSample.$L = rInlineSegment), nFrozenSample;
      }, mLocalIndex.clone = function () {
        return bCompositeScope.w(this.$d, this);
      }, mLocalIndex.toDate = function () {
        return new Date(this.valueOf());
      }, mLocalIndex.toJSON = function () {
        return this.isValid() ? this.toISOString() : null;
      }, mLocalIndex.toISOString = function () {
        return this.$d.toISOString();
      }, mLocalIndex.toString = function () {
        return this.$d.toUTCString();
      }, mMutableLedger;
    }(),
    kCompositeBundle = _.prototype;
  return oFrozenNode.prototype = kCompositeBundle, [["$ms", rCompositeProbe], ["$s", iLazyPool], ["$m", sLocalSegment], ["$H", uPrivateSensor], ["$W", aDeferredEntry], ["$M", cRemoteShard], ["$y", hCompositeDigest], ["$D", dFrozenChannel]].forEach(function (tEagerManifest) {
    kCompositeBundle[tEagerManifest[1]] = function (eSecondaryIndex) {
      return this.$g(eSecondaryIndex, tEagerManifest[0], tEagerManifest[1]);
    };
  }), oFrozenNode.extend = function (tSharedContext, eTransientHandle) {
    return tSharedContext.$i || (tSharedContext(eTransientHandle, _, oFrozenNode), tSharedContext.$i = true), oFrozenNode;
  }, oFrozenNode.locale = wSharedClaim, oFrozenNode.isDayjs = sSparseBundle, oFrozenNode.unix = function (tSecondaryEpoch) {
    return oFrozenNode(1e3 * tSecondaryEpoch);
  }, oFrozenNode.en = dDeferredDigest[gMutableCache], oFrozenNode.Ls = dDeferredDigest, oFrozenNode.p = {}, oFrozenNode;
});
