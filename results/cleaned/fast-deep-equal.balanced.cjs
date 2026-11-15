'use strict';

module.exports = function equalDurablePolicy(aMutableProbe, bPrivateHandle) {
  if (aMutableProbe === bPrivateHandle) return true;
  if (aMutableProbe && bPrivateHandle && typeof aMutableProbe == 'object' && typeof bPrivateHandle == 'object') {
    if (aMutableProbe.constructor !== bPrivateHandle.constructor) return false;
    var lengthDurableRegistry, iSharedPolicy, keysPrivateService;
    if (Array.isArray(aMutableProbe)) {
      lengthDurableRegistry = aMutableProbe.length;
      if (lengthDurableRegistry != bPrivateHandle.length) return false;
      for (iSharedPolicy = lengthDurableRegistry; iSharedPolicy-- !== 0;) if (!equalDurablePolicy(aMutableProbe[iSharedPolicy], bPrivateHandle[iSharedPolicy])) return false;
      return true;
    }
    if (aMutableProbe.constructor === RegExp) return aMutableProbe.source === bPrivateHandle.source && aMutableProbe.flags === bPrivateHandle.flags;
    if (aMutableProbe.valueOf !== Object.prototype.valueOf) return aMutableProbe.valueOf() === bPrivateHandle.valueOf();
    if (aMutableProbe.toString !== Object.prototype.toString) return aMutableProbe.toString() === bPrivateHandle.toString();
    keysPrivateService = Object.keys(aMutableProbe);
    lengthDurableRegistry = keysPrivateService.length;
    if (lengthDurableRegistry !== Object.keys(bPrivateHandle).length) return false;
    for (iSharedPolicy = lengthDurableRegistry; iSharedPolicy-- !== 0;) if (!Object.prototype.hasOwnProperty.call(bPrivateHandle, keysPrivateService[iSharedPolicy])) return false;
    for (iSharedPolicy = lengthDurableRegistry; iSharedPolicy-- !== 0;) {
      var keyTransientEnvelope = keysPrivateService[iSharedPolicy];
      if (!equalDurablePolicy(aMutableProbe[keyTransientEnvelope], bPrivateHandle[keyTransientEnvelope])) return false;
    }
    return true;
  }
  return aMutableProbe !== aMutableProbe && bPrivateHandle !== bPrivateHandle;
};
