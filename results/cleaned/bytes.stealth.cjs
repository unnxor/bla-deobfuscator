'use strict';

module.exports = bytesSparseService;
module.exports.format = formatCompositeProbe;
module.exports.parse = parseLazyPool;
var formatThousandsRLazyFrame = /\B(?=(\d{3})+(?!\d))/g;
var formatDecimalsReCompositeService = /(?:\.0*|(\.[^0]+)0+)$/;
var mapSparseProbe = {
  b: 1,
  kb: 1024,
  mb: 1048576,
  gb: 1073741824,
  tb: Math.pow(1024, 4),
  pb: Math.pow(1024, 5)
};
var parseRegExpDeferredRuntime = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;
function bytesSparseService(valueLocalSegment, optionsPrivateSensor) {
  if (typeof valueLocalSegment === 'string') {
    return parseLazyPool(valueLocalSegment);
  }
  if (typeof valueLocalSegment === 'number') {
    return formatCompositeProbe(valueLocalSegment, optionsPrivateSensor);
  }
  return null;
}
function formatCompositeProbe(valueDeferredEntry, optionsLocalBundle) {
  if (!Number.isFinite(valueDeferredEntry)) {
    return null;
  }
  var magRemoteShard = Math.abs(valueDeferredEntry);
  var thousandsSeparatCompositeSession = optionsLocalBundle && optionsLocalBundle.thousandsSeparator || '';
  var unitSeparatorCompositeDigest = optionsLocalBundle && optionsLocalBundle.unitSeparator || '';
  var decimalPlacesFrozenChannel = optionsLocalBundle && optionsLocalBundle.decimalPlaces !== undefined ? optionsLocalBundle.decimalPlaces : 2;
  var fixedDecimalsDurableGraph = Boolean(optionsLocalBundle && optionsLocalBundle.fixedDecimals);
  var unitDurableHandle = optionsLocalBundle && optionsLocalBundle.unit || '';
  if (!unitDurableHandle || !mapSparseProbe[unitDurableHandle.toLowerCase()]) {
    if (magRemoteShard >= mapSparseProbe.pb) {
      unitDurableHandle = 'PB';
    } else if (magRemoteShard >= mapSparseProbe.tb) {
      unitDurableHandle = 'TB';
    } else if (magRemoteShard >= mapSparseProbe.gb) {
      unitDurableHandle = 'GB';
    } else if (magRemoteShard >= mapSparseProbe.mb) {
      unitDurableHandle = 'MB';
    } else if (magRemoteShard >= mapSparseProbe.kb) {
      unitDurableHandle = 'KB';
    } else {
      unitDurableHandle = 'B';
    }
  }
  var valLocalRecord = valueDeferredEntry / mapSparseProbe[unitDurableHandle.toLowerCase()];
  var strSparseClient = valLocalRecord.toFixed(decimalPlacesFrozenChannel);
  if (!fixedDecimalsDurableGraph) {
    strSparseClient = strSparseClient.replace(formatDecimalsReCompositeService, '$1');
  }
  if (thousandsSeparatCompositeSession) {
    strSparseClient = strSparseClient.split('.').map(function (sNestedStream, iActiveDigest) {
      return iActiveDigest === 0 ? sNestedStream.replace(formatThousandsRLazyFrame, thousandsSeparatCompositeSession) : sNestedStream;
    }).join('.');
  }
  return strSparseClient + unitSeparatorCompositeDigest + unitDurableHandle;
}
function parseLazyPool(valMutableCache) {
  if (typeof valMutableCache === 'number' && !isNaN(valMutableCache)) {
    return valMutableCache;
  }
  if (typeof valMutableCache !== 'string') {
    return null;
  }
  var resultsDeferredDigest = parseRegExpDeferredRuntime.exec(valMutableCache);
  var floatValuePrivateManifest;
  var unitSparseBundle = 'b';
  if (!resultsDeferredDigest) {
    floatValuePrivateManifest = parseInt(valMutableCache, 10);
    unitSparseBundle = 'b';
  } else {
    floatValuePrivateManifest = parseFloat(resultsDeferredDigest[1]);
    unitSparseBundle = resultsDeferredDigest[4].toLowerCase();
  }
  if (isNaN(floatValuePrivateManifest)) {
    return null;
  }
  return Math.floor(mapSparseProbe[unitSparseBundle] * floatValuePrivateManifest);
}
