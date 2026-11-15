'use strict';

module.exports = bytesSharedPolicy;
module.exports.format = formatPrivateService;
module.exports.parse = parseTransientEnvelope;
var formatThousandsRMutableProbe = /\B(?=(\d{3})+(?!\d))/g;
var formatDecimalsRePrivateHandle = /(?:\.0*|(\.[^0]+)0+)$/;
var mapDurablePolicy = {
  b: 1,
  kb: 1024,
  mb: 1048576,
  gb: 1073741824,
  tb: Math.pow(1024, 4),
  pb: Math.pow(1024, 5)
};
var parseRegExpDurableRegistry = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;
function bytesSharedPolicy(valueFrozenFrame, optionsEagerSlot) {
  if (typeof valueFrozenFrame === 'string') {
    return parseTransientEnvelope(valueFrozenFrame);
  }
  if (typeof valueFrozenFrame === 'number') {
    return formatPrivateService(valueFrozenFrame, optionsEagerSlot);
  }
  return null;
}
function formatPrivateService(valueLazyScope, optionsDeferredLedger) {
  if (!Number.isFinite(valueLazyScope)) {
    return null;
  }
  var magDurableNode = Math.abs(valueLazyScope);
  var thousandsSeparatDurableCatalog = optionsDeferredLedger && optionsDeferredLedger.thousandsSeparator || '';
  var unitSeparatorNestedClient = optionsDeferredLedger && optionsDeferredLedger.unitSeparator || '';
  var decimalPlacesMutableDigest = optionsDeferredLedger && optionsDeferredLedger.decimalPlaces !== undefined ? optionsDeferredLedger.decimalPlaces : 2;
  var fixedDecimalsActiveSlot = Boolean(optionsDeferredLedger && optionsDeferredLedger.fixedDecimals);
  var unitLazySlot = optionsDeferredLedger && optionsDeferredLedger.unit || '';
  if (!unitLazySlot || !mapDurablePolicy[unitLazySlot.toLowerCase()]) {
    if (magDurableNode >= mapDurablePolicy.pb) {
      unitLazySlot = 'PB';
    } else if (magDurableNode >= mapDurablePolicy.tb) {
      unitLazySlot = 'TB';
    } else if (magDurableNode >= mapDurablePolicy.gb) {
      unitLazySlot = 'GB';
    } else if (magDurableNode >= mapDurablePolicy.mb) {
      unitLazySlot = 'MB';
    } else if (magDurableNode >= mapDurablePolicy.kb) {
      unitLazySlot = 'KB';
    } else {
      unitLazySlot = 'B';
    }
  }
  var valInlineRouter = valueLazyScope / mapDurablePolicy[unitLazySlot.toLowerCase()];
  var strNestedLedger = valInlineRouter.toFixed(decimalPlacesMutableDigest);
  if (!fixedDecimalsActiveSlot) {
    strNestedLedger = strNestedLedger.replace(formatDecimalsRePrivateHandle, '$1');
  }
  if (thousandsSeparatDurableCatalog) {
    strNestedLedger = strNestedLedger.split('.').map(function (sActiveEntry, iActiveHandle) {
      return iActiveHandle === 0 ? sActiveEntry.replace(formatThousandsRMutableProbe, thousandsSeparatDurableCatalog) : sActiveEntry;
    }).join('.');
  }
  return strNestedLedger + unitSeparatorNestedClient + unitLazySlot;
}
function parseTransientEnvelope(valActiveScope) {
  if (typeof valActiveScope === 'number' && !isNaN(valActiveScope)) {
    return valActiveScope;
  }
  if (typeof valActiveScope !== 'string') {
    return null;
  }
  var resultsPendingWorker = parseRegExpDurableRegistry.exec(valActiveScope);
  var floatValueInlineSegment;
  var unitDurableRuntime = 'b';
  if (!resultsPendingWorker) {
    floatValueInlineSegment = parseInt(valActiveScope, 10);
    unitDurableRuntime = 'b';
  } else {
    floatValueInlineSegment = parseFloat(resultsPendingWorker[1]);
    unitDurableRuntime = resultsPendingWorker[4].toLowerCase();
  }
  if (isNaN(floatValueInlineSegment)) {
    return null;
  }
  return Math.floor(mapDurablePolicy[unitDurableRuntime] * floatValueInlineSegment);
}
