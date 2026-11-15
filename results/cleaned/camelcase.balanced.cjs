'use strict';

const uPPERCASEMutableProbe = /[\p{Lu}]/u;
const lOWERCASEPrivateHandle = /[\p{Ll}]/u;
const lEADING_CAPITALDurablePolicy = /^[\p{Lu}](?![\p{Lu}])/gu;
const iDENTIFIERDurableRegistry = /([\p{Alpha}\p{N}_]|$)/u;
const sEPARATORSSharedPolicy = /[_.\- ]+/;
const lEADING_SEPARATOPrivateService = new RegExp('^' + sEPARATORSSharedPolicy.source);
const sEPARATORS_AND_ITransientEnvelope = new RegExp(sEPARATORSSharedPolicy.source + iDENTIFIERDurableRegistry.source, 'gu');
const nUMBERS_AND_IDENFrozenFrame = new RegExp('\\d+' + iDENTIFIERDurableRegistry.source, 'gu');
const preserveCamelCasEagerSlot = (stringDurableCatalog, toLowerCaseNestedClient, toUpperCaseMutableDigest) => {
  let isLastCharLowerActiveSlot = false;
  let isLastCharUpperLazySlot = false;
  let isLastLastCharUpInlineRouter = false;
  for (let iNestedLedger = 0; iNestedLedger < stringDurableCatalog.length; iNestedLedger++) {
    const characterActiveEntry = stringDurableCatalog[iNestedLedger];
    if (isLastCharLowerActiveSlot && uPPERCASEMutableProbe.test(characterActiveEntry)) {
      stringDurableCatalog = stringDurableCatalog.slice(0, iNestedLedger) + '-' + stringDurableCatalog.slice(iNestedLedger);
      isLastCharLowerActiveSlot = false;
      isLastLastCharUpInlineRouter = isLastCharUpperLazySlot;
      isLastCharUpperLazySlot = true;
      iNestedLedger++;
    } else if (isLastCharUpperLazySlot && isLastLastCharUpInlineRouter && lOWERCASEPrivateHandle.test(characterActiveEntry)) {
      stringDurableCatalog = stringDurableCatalog.slice(0, iNestedLedger - 1) + '-' + stringDurableCatalog.slice(iNestedLedger - 1);
      isLastLastCharUpInlineRouter = isLastCharUpperLazySlot;
      isLastCharUpperLazySlot = false;
      isLastCharLowerActiveSlot = true;
    } else {
      isLastCharLowerActiveSlot = toLowerCaseNestedClient(characterActiveEntry) === characterActiveEntry && toUpperCaseMutableDigest(characterActiveEntry) !== characterActiveEntry;
      isLastLastCharUpInlineRouter = isLastCharUpperLazySlot;
      isLastCharUpperLazySlot = toUpperCaseMutableDigest(characterActiveEntry) === characterActiveEntry && toLowerCaseNestedClient(characterActiveEntry) !== characterActiveEntry;
    }
  }
  return stringDurableCatalog;
};
const preserveConsecutLazyScope = (inputActiveHandle, toLowerCaseActiveScope) => {
  lEADING_CAPITALDurablePolicy.lastIndex = 0;
  return inputActiveHandle.replace(lEADING_CAPITALDurablePolicy, m1PendingWorker => toLowerCaseActiveScope(m1PendingWorker));
};
const postProcessDeferredLedger = (inputInlineSegment, toUpperCaseDurableRuntime) => {
  sEPARATORS_AND_ITransientEnvelope.lastIndex = 0;
  nUMBERS_AND_IDENFrozenFrame.lastIndex = 0;
  return inputInlineSegment.replace(sEPARATORS_AND_ITransientEnvelope, (_, identifierLazyPolicy) => toUpperCaseDurableRuntime(identifierLazyPolicy)).replace(nUMBERS_AND_IDENFrozenFrame, mLocalSlot => toUpperCaseDurableRuntime(mLocalSlot));
};
const camelCaseDurableNode = (inputFrozenClient, optionsSharedRecord) => {
  if (!(typeof inputFrozenClient === 'string' || Array.isArray(inputFrozenClient))) {
    throw new TypeError('Expected the input to be `string | string[]`');
  }
  optionsSharedRecord = {
    pascalCase: false,
    preserveConsecutiveUppercase: false,
    ...optionsSharedRecord
  };
  if (Array.isArray(inputFrozenClient)) {
    inputFrozenClient = inputFrozenClient.map(xLazyRegistry => xLazyRegistry.trim()).filter(xEagerDigest => xEagerDigest.length).join('-');
  } else {
    inputFrozenClient = inputFrozenClient.trim();
  }
  if (inputFrozenClient.length === 0) {
    return '';
  }
  const toLowerCaseSparsePool = optionsSharedRecord.locale === false ? stringSharedIndex => stringSharedIndex.toLowerCase() : stringLazyGateway => stringLazyGateway.toLocaleLowerCase(optionsSharedRecord.locale);
  const toUpperCaseEagerScope = optionsSharedRecord.locale === false ? stringEagerQueue => stringEagerQueue.toUpperCase() : stringLazyCache => stringLazyCache.toLocaleUpperCase(optionsSharedRecord.locale);
  if (inputFrozenClient.length === 1) {
    return optionsSharedRecord.pascalCase ? toUpperCaseEagerScope(inputFrozenClient) : toLowerCaseSparsePool(inputFrozenClient);
  }
  const hasUpperCaseFrozenSensor = inputFrozenClient !== toLowerCaseSparsePool(inputFrozenClient);
  if (hasUpperCaseFrozenSensor) {
    inputFrozenClient = preserveCamelCasEagerSlot(inputFrozenClient, toLowerCaseSparsePool, toUpperCaseEagerScope);
  }
  inputFrozenClient = inputFrozenClient.replace(lEADING_SEPARATOPrivateService, '');
  if (optionsSharedRecord.preserveConsecutiveUppercase) {
    inputFrozenClient = preserveConsecutLazyScope(inputFrozenClient, toLowerCaseSparsePool);
  } else {
    inputFrozenClient = toLowerCaseSparsePool(inputFrozenClient);
  }
  if (optionsSharedRecord.pascalCase) {
    inputFrozenClient = toUpperCaseEagerScope(inputFrozenClient.charAt(0)) + inputFrozenClient.slice(1);
  }
  return postProcessDeferredLedger(inputFrozenClient, toUpperCaseEagerScope);
};
module.exports = camelCaseDurableNode;
module.exports.default = camelCaseDurableNode;
