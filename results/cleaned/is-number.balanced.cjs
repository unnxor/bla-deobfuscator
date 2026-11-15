'use strict';

module.exports = function (numMutableProbe) {
  if (typeof numMutableProbe === 'number') {
    return numMutableProbe - numMutableProbe === 0;
  }
  if (typeof numMutableProbe === 'string' && numMutableProbe.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+numMutableProbe) : isFinite(+numMutableProbe);
  }
  return false;
};
