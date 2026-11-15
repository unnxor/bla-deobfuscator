'use strict';

const uPPERCASELazyFrame = /[\p{Lu}]/u;
const lOWERCASECompositeService = /[\p{Ll}]/u;
const lEADING_CAPITALSparseProbe = /^[\p{Lu}](?![\p{Lu}])/gu;
const iDENTIFIERDeferredRuntime = /([\p{Alpha}\p{N}_]|$)/u;
const sEPARATORSSparseService = /[_.\- ]+/;
const lEADING_SEPARATOCompositeProbe = new RegExp('^' + sEPARATORSSparseService.source);
const sEPARATORS_AND_ILazyPool = new RegExp(sEPARATORSSparseService.source + iDENTIFIERDeferredRuntime.source, 'gu');
const nUMBERS_AND_IDENLocalSegment = new RegExp('\\d+' + iDENTIFIERDeferredRuntime.source, 'gu');
const preserveCamelCasPrivateSensor = (stringCompositeSession, toLowerCaseCompositeDigest, toUpperCaseFrozenChannel) => {
  let isLastCharLowerDurableGraph = false;
  let isLastCharUpperDurableHandle = false;
  let isLastLastCharUpLocalRecord = false;
  for (let iSparseClient = 0; iSparseClient < stringCompositeSession.length; iSparseClient++) {
    const characterNestedStream = stringCompositeSession[iSparseClient];
    if (isLastCharLowerDurableGraph && uPPERCASELazyFrame.test(characterNestedStream)) {
      stringCompositeSession = stringCompositeSession.slice(0, iSparseClient) + '-' + stringCompositeSession.slice(iSparseClient);
      isLastCharLowerDurableGraph = false;
      isLastLastCharUpLocalRecord = isLastCharUpperDurableHandle;
      isLastCharUpperDurableHandle = true;
      iSparseClient++;
    } else if (isLastCharUpperDurableHandle && isLastLastCharUpLocalRecord && lOWERCASECompositeService.test(characterNestedStream)) {
      stringCompositeSession = stringCompositeSession.slice(0, iSparseClient - 1) + '-' + stringCompositeSession.slice(iSparseClient - 1);
      isLastLastCharUpLocalRecord = isLastCharUpperDurableHandle;
      isLastCharUpperDurableHandle = false;
      isLastCharLowerDurableGraph = true;
    } else {
      isLastCharLowerDurableGraph = toLowerCaseCompositeDigest(characterNestedStream) === characterNestedStream && toUpperCaseFrozenChannel(characterNestedStream) !== characterNestedStream;
      isLastLastCharUpLocalRecord = isLastCharUpperDurableHandle;
      isLastCharUpperDurableHandle = toUpperCaseFrozenChannel(characterNestedStream) === characterNestedStream && toLowerCaseCompositeDigest(characterNestedStream) !== characterNestedStream;
    }
  }
  return stringCompositeSession;
};
const preserveConsecutDeferredEntry = (inputActiveDigest, toLowerCaseMutableCache) => {
  lEADING_CAPITALSparseProbe.lastIndex = 0;
  return inputActiveDigest.replace(lEADING_CAPITALSparseProbe, m1DeferredDigest => toLowerCaseMutableCache(m1DeferredDigest));
};
const postProcessLocalBundle = (inputPrivateManifest, toUpperCaseSparseBundle) => {
  sEPARATORS_AND_ILazyPool.lastIndex = 0;
  nUMBERS_AND_IDENLocalSegment.lastIndex = 0;
  return inputPrivateManifest.replace(sEPARATORS_AND_ILazyPool, (_, identifierSharedClaim) => toUpperCaseSparseBundle(identifierSharedClaim)).replace(nUMBERS_AND_IDENLocalSegment, mFrozenNode => toUpperCaseSparseBundle(mFrozenNode));
};
const camelCaseRemoteShard = (inputCompositeScope, optionsCompositeBundle) => {
  if (!(typeof inputCompositeScope === 'string' || Array.isArray(inputCompositeScope))) {
    throw new TypeError('Expected the input to be `string | string[]`');
  }
  optionsCompositeBundle = {
    pascalCase: false,
    preserveConsecutiveUppercase: false,
    ...optionsCompositeBundle
  };
  if (Array.isArray(inputCompositeScope)) {
    inputCompositeScope = inputCompositeScope.map(xSealedLedger => xSealedLedger.trim()).filter(xMutablePool => xMutablePool.length).join('-');
  } else {
    inputCompositeScope = inputCompositeScope.trim();
  }
  if (inputCompositeScope.length === 0) {
    return '';
  }
  const toLowerCaseNestedChannel = optionsCompositeBundle.locale === false ? stringInlineStack => stringInlineStack.toLowerCase() : stringPrivateManifest => stringPrivateManifest.toLocaleLowerCase(optionsCompositeBundle.locale);
  const toUpperCaseActiveMatrix = optionsCompositeBundle.locale === false ? stringInlineSensor => stringInlineSensor.toUpperCase() : stringCompositeMatrix => stringCompositeMatrix.toLocaleUpperCase(optionsCompositeBundle.locale);
  if (inputCompositeScope.length === 1) {
    return optionsCompositeBundle.pascalCase ? toUpperCaseActiveMatrix(inputCompositeScope) : toLowerCaseNestedChannel(inputCompositeScope);
  }
  const hasUpperCaseSealedFrame = inputCompositeScope !== toLowerCaseNestedChannel(inputCompositeScope);
  if (hasUpperCaseSealedFrame) {
    inputCompositeScope = preserveCamelCasPrivateSensor(inputCompositeScope, toLowerCaseNestedChannel, toUpperCaseActiveMatrix);
  }
  inputCompositeScope = inputCompositeScope.replace(lEADING_SEPARATOCompositeProbe, '');
  if (optionsCompositeBundle.preserveConsecutiveUppercase) {
    inputCompositeScope = preserveConsecutDeferredEntry(inputCompositeScope, toLowerCaseNestedChannel);
  } else {
    inputCompositeScope = toLowerCaseNestedChannel(inputCompositeScope);
  }
  if (optionsCompositeBundle.pascalCase) {
    inputCompositeScope = toUpperCaseActiveMatrix(inputCompositeScope.charAt(0)) + inputCompositeScope.slice(1);
  }
  return postProcessLocalBundle(inputCompositeScope, toUpperCaseActiveMatrix);
};
module.exports = camelCaseRemoteShard;
module.exports.default = camelCaseRemoteShard;
