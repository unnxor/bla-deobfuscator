'use strict';

module.exports = function equalSparseProbe(aLazyFrame, bCompositeService) {
  if (aLazyFrame === bCompositeService) return true;
  if (aLazyFrame && bCompositeService && typeof aLazyFrame == 'object' && typeof bCompositeService == 'object') {
    if (aLazyFrame.constructor !== bCompositeService.constructor) return false;
    var lengthDeferredRuntime, iSparseService, keysCompositeProbe;
    if (Array.isArray(aLazyFrame)) {
      lengthDeferredRuntime = aLazyFrame.length;
      if (lengthDeferredRuntime != bCompositeService.length) return false;
      for (iSparseService = lengthDeferredRuntime; iSparseService-- !== 0;) if (!equalSparseProbe(aLazyFrame[iSparseService], bCompositeService[iSparseService])) return false;
      return true;
    }
    if (aLazyFrame.constructor === RegExp) return aLazyFrame.source === bCompositeService.source && aLazyFrame.flags === bCompositeService.flags;
    if (aLazyFrame.valueOf !== Object.prototype.valueOf) return aLazyFrame.valueOf() === bCompositeService.valueOf();
    if (aLazyFrame.toString !== Object.prototype.toString) return aLazyFrame.toString() === bCompositeService.toString();
    keysCompositeProbe = Object.keys(aLazyFrame);
    lengthDeferredRuntime = keysCompositeProbe.length;
    if (lengthDeferredRuntime !== Object.keys(bCompositeService).length) return false;
    for (iSparseService = lengthDeferredRuntime; iSparseService-- !== 0;) if (!Object.prototype.hasOwnProperty.call(bCompositeService, keysCompositeProbe[iSparseService])) return false;
    for (iSparseService = lengthDeferredRuntime; iSparseService-- !== 0;) {
      var keyLazyPool = keysCompositeProbe[iSparseService];
      if (!equalSparseProbe(aLazyFrame[keyLazyPool], bCompositeService[keyLazyPool])) return false;
    }
    return true;
  }
  return aLazyFrame !== aLazyFrame && bCompositeService !== bCompositeService;
};
