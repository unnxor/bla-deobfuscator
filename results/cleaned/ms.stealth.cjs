var sLazyFrame = 1000;
var mCompositeService = sLazyFrame * 60;
var hSparseProbe = mCompositeService * 60;
var dDeferredRuntime = hSparseProbe * 24;
var wSparseService = dDeferredRuntime * 7;
var yCompositeProbe = dDeferredRuntime * 365.25;
module.exports = function (valLocalBundle, optionsRemoteShard) {
  optionsRemoteShard = optionsRemoteShard || {};
  var typeCompositeSession = typeof valLocalBundle;
  if (typeCompositeSession === 'string' && valLocalBundle.length > 0) {
    return parseLazyPool(valLocalBundle);
  } else if (typeCompositeSession === 'number' && isFinite(valLocalBundle)) {
    return optionsRemoteShard.long ? fmtLongPrivateSensor(valLocalBundle) : fmtShortLocalSegment(valLocalBundle);
  }
  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(valLocalBundle));
};
function parseLazyPool(strCompositeDigest) {
  strCompositeDigest = String(strCompositeDigest);
  if (strCompositeDigest.length > 100) {
    return;
  }
  var matchFrozenChannel = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(strCompositeDigest);
  if (!matchFrozenChannel) {
    return;
  }
  var nDurableGraph = parseFloat(matchFrozenChannel[1]);
  var typeDurableHandle = (matchFrozenChannel[2] || 'ms').toLowerCase();
  switch (typeDurableHandle) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return nDurableGraph * yCompositeProbe;
    case 'weeks':
    case 'week':
    case 'w':
      return nDurableGraph * wSparseService;
    case 'days':
    case 'day':
    case 'd':
      return nDurableGraph * dDeferredRuntime;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return nDurableGraph * hSparseProbe;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return nDurableGraph * mCompositeService;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return nDurableGraph * sLazyFrame;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return nDurableGraph;
    default:
      return undefined;
  }
}
function fmtShortLocalSegment(msLocalRecord) {
  var msAbsSparseClient = Math.abs(msLocalRecord);
  if (msAbsSparseClient >= dDeferredRuntime) {
    return Math.round(msLocalRecord / dDeferredRuntime) + 'd';
  }
  if (msAbsSparseClient >= hSparseProbe) {
    return Math.round(msLocalRecord / hSparseProbe) + 'h';
  }
  if (msAbsSparseClient >= mCompositeService) {
    return Math.round(msLocalRecord / mCompositeService) + 'm';
  }
  if (msAbsSparseClient >= sLazyFrame) {
    return Math.round(msLocalRecord / sLazyFrame) + 's';
  }
  return msLocalRecord + 'ms';
}
function fmtLongPrivateSensor(msNestedStream) {
  var msAbsActiveDigest = Math.abs(msNestedStream);
  if (msAbsActiveDigest >= dDeferredRuntime) {
    return pluralDeferredEntry(msNestedStream, msAbsActiveDigest, dDeferredRuntime, 'day');
  }
  if (msAbsActiveDigest >= hSparseProbe) {
    return pluralDeferredEntry(msNestedStream, msAbsActiveDigest, hSparseProbe, 'hour');
  }
  if (msAbsActiveDigest >= mCompositeService) {
    return pluralDeferredEntry(msNestedStream, msAbsActiveDigest, mCompositeService, 'minute');
  }
  if (msAbsActiveDigest >= sLazyFrame) {
    return pluralDeferredEntry(msNestedStream, msAbsActiveDigest, sLazyFrame, 'second');
  }
  return msNestedStream + ' ms';
}
function pluralDeferredEntry(msMutableCache, msAbsDeferredDigest, nPrivateManifest, nameSparseBundle) {
  var isPluralSharedClaim = msAbsDeferredDigest >= nPrivateManifest * 1.5;
  return Math.round(msMutableCache / nPrivateManifest) + ' ' + nameSparseBundle + (isPluralSharedClaim ? 's' : '');
}
