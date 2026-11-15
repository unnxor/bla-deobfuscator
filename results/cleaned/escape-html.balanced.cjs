'use strict';

var matchHtmlRegExpMutableProbe = /["'&<>]/;
module.exports = escapeHtmlPrivateHandle;
function escapeHtmlPrivateHandle(stringDurablePolicy) {
  var strDurableRegistry = '' + stringDurablePolicy;
  var matchSharedPolicy = matchHtmlRegExpMutableProbe.exec(strDurableRegistry);
  if (!matchSharedPolicy) {
    return strDurableRegistry;
  }
  var escapePrivateService;
  var htmlTransientEnvelope = '';
  var indexFrozenFrame = 0;
  var lastIndexEagerSlot = 0;
  for (indexFrozenFrame = matchSharedPolicy.index; indexFrozenFrame < strDurableRegistry.length; indexFrozenFrame++) {
    switch (strDurableRegistry.charCodeAt(indexFrozenFrame)) {
      case 34:
        escapePrivateService = '&quot;';
        break;
      case 38:
        escapePrivateService = '&amp;';
        break;
      case 39:
        escapePrivateService = '&#39;';
        break;
      case 60:
        escapePrivateService = '&lt;';
        break;
      case 62:
        escapePrivateService = '&gt;';
        break;
      default:
        continue;
    }
    if (lastIndexEagerSlot !== indexFrozenFrame) {
      htmlTransientEnvelope += strDurableRegistry.substring(lastIndexEagerSlot, indexFrozenFrame);
    }
    lastIndexEagerSlot = indexFrozenFrame + 1;
    htmlTransientEnvelope += escapePrivateService;
  }
  return lastIndexEagerSlot !== indexFrozenFrame ? htmlTransientEnvelope + strDurableRegistry.substring(lastIndexEagerSlot, indexFrozenFrame) : htmlTransientEnvelope;
}
