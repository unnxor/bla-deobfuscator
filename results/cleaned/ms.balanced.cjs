var sMutableProbe = 1000;
var mPrivateHandle = sMutableProbe * 60;
var hDurablePolicy = mPrivateHandle * 60;
var dDurableRegistry = hDurablePolicy * 24;
var wSharedPolicy = dDurableRegistry * 7;
var yPrivateService = dDurableRegistry * 365.25;
module.exports = function (valDeferredLedger, optionsDurableNode) {
  optionsDurableNode = optionsDurableNode || {};
  var typeDurableCatalog = typeof valDeferredLedger;
  if (typeDurableCatalog === 'string' && valDeferredLedger.length > 0) {
    return parseTransientEnvelope(valDeferredLedger);
  } else if (typeDurableCatalog === 'number' && isFinite(valDeferredLedger)) {
    return optionsDurableNode.long ? fmtLongEagerSlot(valDeferredLedger) : fmtShortFrozenFrame(valDeferredLedger);
  }
  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(valDeferredLedger));
};
function parseTransientEnvelope(strNestedClient) {
  strNestedClient = String(strNestedClient);
  if (strNestedClient.length > 100) {
    return;
  }
  var matchMutableDigest = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(strNestedClient);
  if (!matchMutableDigest) {
    return;
  }
  var nActiveSlot = parseFloat(matchMutableDigest[1]);
  var typeLazySlot = (matchMutableDigest[2] || 'ms').toLowerCase();
  switch (typeLazySlot) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return nActiveSlot * yPrivateService;
    case 'weeks':
    case 'week':
    case 'w':
      return nActiveSlot * wSharedPolicy;
    case 'days':
    case 'day':
    case 'd':
      return nActiveSlot * dDurableRegistry;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return nActiveSlot * hDurablePolicy;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return nActiveSlot * mPrivateHandle;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return nActiveSlot * sMutableProbe;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return nActiveSlot;
    default:
      return undefined;
  }
}
function fmtShortFrozenFrame(msInlineRouter) {
  var msAbsNestedLedger = Math.abs(msInlineRouter);
  if (msAbsNestedLedger >= dDurableRegistry) {
    return Math.round(msInlineRouter / dDurableRegistry) + 'd';
  }
  if (msAbsNestedLedger >= hDurablePolicy) {
    return Math.round(msInlineRouter / hDurablePolicy) + 'h';
  }
  if (msAbsNestedLedger >= mPrivateHandle) {
    return Math.round(msInlineRouter / mPrivateHandle) + 'm';
  }
  if (msAbsNestedLedger >= sMutableProbe) {
    return Math.round(msInlineRouter / sMutableProbe) + 's';
  }
  return msInlineRouter + 'ms';
}
function fmtLongEagerSlot(msActiveEntry) {
  var msAbsActiveHandle = Math.abs(msActiveEntry);
  if (msAbsActiveHandle >= dDurableRegistry) {
    return pluralLazyScope(msActiveEntry, msAbsActiveHandle, dDurableRegistry, 'day');
  }
  if (msAbsActiveHandle >= hDurablePolicy) {
    return pluralLazyScope(msActiveEntry, msAbsActiveHandle, hDurablePolicy, 'hour');
  }
  if (msAbsActiveHandle >= mPrivateHandle) {
    return pluralLazyScope(msActiveEntry, msAbsActiveHandle, mPrivateHandle, 'minute');
  }
  if (msAbsActiveHandle >= sMutableProbe) {
    return pluralLazyScope(msActiveEntry, msAbsActiveHandle, sMutableProbe, 'second');
  }
  return msActiveEntry + ' ms';
}
function pluralLazyScope(msActiveScope, msAbsPendingWorker, nInlineSegment, nameDurableRuntime) {
  var isPluralLazyPolicy = msAbsPendingWorker >= nInlineSegment * 1.5;
  return Math.round(msActiveScope / nInlineSegment) + ' ' + nameDurableRuntime + (isPluralLazyPolicy ? 's' : '');
}
