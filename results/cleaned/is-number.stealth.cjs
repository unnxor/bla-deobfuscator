'use strict';

module.exports = function (numLazyFrame) {
  if (typeof numLazyFrame === 'number') {
    return numLazyFrame - numLazyFrame === 0;
  }
  if (typeof numLazyFrame === 'string' && numLazyFrame.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+numLazyFrame) : isFinite(+numLazyFrame);
  }
  return false;
};
