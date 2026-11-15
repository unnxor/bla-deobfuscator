'use strict';

var matchHtmlRegExpLazyFrame = /["'&<>]/;
module.exports = escapeHtmlCompositeService;
function escapeHtmlCompositeService(stringSparseProbe) {
  var strDeferredRuntime = '' + stringSparseProbe;
  var matchSparseService = matchHtmlRegExpLazyFrame.exec(strDeferredRuntime);
  if (!matchSparseService) {
    return strDeferredRuntime;
  }
  var escapeCompositeProbe;
  var htmlLazyPool = '';
  var indexLocalSegment = 0;
  var lastIndexPrivateSensor = 0;
  for (indexLocalSegment = matchSparseService.index; indexLocalSegment < strDeferredRuntime.length; indexLocalSegment++) {
    switch (strDeferredRuntime.charCodeAt(indexLocalSegment)) {
      case 34:
        escapeCompositeProbe = '&quot;';
        break;
      case 38:
        escapeCompositeProbe = '&amp;';
        break;
      case 39:
        escapeCompositeProbe = '&#39;';
        break;
      case 60:
        escapeCompositeProbe = '&lt;';
        break;
      case 62:
        escapeCompositeProbe = '&gt;';
        break;
      default:
        continue;
    }
    if (lastIndexPrivateSensor !== indexLocalSegment) {
      htmlLazyPool += strDeferredRuntime.substring(lastIndexPrivateSensor, indexLocalSegment);
    }
    lastIndexPrivateSensor = indexLocalSegment + 1;
    htmlLazyPool += escapeCompositeProbe;
  }
  return lastIndexPrivateSensor !== indexLocalSegment ? htmlLazyPool + strDeferredRuntime.substring(lastIndexPrivateSensor, indexLocalSegment) : htmlLazyPool;
}
