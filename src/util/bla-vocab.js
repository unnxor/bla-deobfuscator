// BLA identifier vocabulary (verb+Adj+Noun_tag, _verbNoun_tag, Adj+Noun+hex, snake stems) and word-based name-shape checks.
import { isDigit, isLower, isUpper, isAlpha, isWord, isHex, isLowerHex, run, all, hexTagAt } from "./chars.js";
const VERBS = ["resolve","compute","derive","validate","dispatch","project","reconcile","normalize","assemble","compose","evaluate","schedule","acquire","release","bind","adapt","mirror","fold","reduce","expand","encode","decode","seal","unseal","attest","verify","sync","flush","prime","hydrate","materialize","capture","emit","observe","trace","probe","sample","filter","transform","allocate"];
const ADJECTIVES = ["Active","Pending","Sealed","Transient","Durable","Local","Remote","Shared","Private","Mutable","Frozen","Lazy","Eager","Inline","Deferred","Primary","Secondary","Nested","Composite","Sparse"];
const NOUNS = ["Ledger","Envelope","Session","Ticket","Digest","Frame","Cursor","Handle","Slot","Epoch","Quota","Policy","Manifest","Bundle","Shard","Segment","Vector","Matrix","Buffer","Stream","Channel","Bridge","Gateway","Router","Registry","Catalog","Index","Cache","Pool","Queue","Stack","Tree","Graph","Node","Edge","Probe","Sensor","Metric","Sample","Record","Entry","Token","Claim","Scope","Context","Runtime","Worker","Service","Client","Provider"];
const SNAKE_STEMS = ["session","ledger","envelope","digest","cursor","handle","epoch","quota","policy","manifest","bundle","shard","segment","vector","matrix","buffer","stream","channel","bridge","gateway","router","registry","catalog","index","cache","pool","queue","probe","metric","sample","record","token","claim","scope","context","runtime","worker","service","client","provider","slot","frame","ticket"];
const ADJ = new Set(ADJECTIVES), NOUN = new Set(NOUNS), VERB = new Set(VERBS), STEM = new Set(SNAKE_STEMS);

/** all end positions p > pos such that name[pos..p) is a word of `set` */
function wordEnds(name, pos, set) {
  const ends = [];
  for (let p = pos + 1; p <= name.length; p++) if (set.has(name.slice(pos, p))) ends.push(p);
  return ends;
}

/** does some chain of words from `sets`, starting at pos, leave a remainder accepted by `tail`? */
function chain(name, pos, sets, tail) {
  if (!sets.length) return tail(name.slice(pos));
  return wordEnds(name, pos, sets[0]).some((p) => chain(name, p, sets.slice(1), tail));
}

const hexTag16 = (r) => r === '' || (r[0] === '_' && run(r.slice(1), isHex, 1, 6));
const hexTag26 = (r) => r === '' || (r[0] === '_' && run(r.slice(1), isHex, 2, 6));
const adjNounTail = (r) => run(isUpper(r[0] ?? '') ? r.slice(1) : r, isLowerHex, 2, 5);

function isSnakeName(name) {
  const parts = name.split('_');
  return parts.length === 4 && parts.slice(0, 3).every((w) => STEM.has(w)) && run(parts[3], isLowerHex, 2, 6);
}

export function isBlaName(name) {
  const lead = name[0] === '_';
  const bare = lead ? name.slice(1) : name;
  return chain(bare, 0, [VERB, ADJ, NOUN], hexTag16)
    || (lead && chain(bare, 0, [VERB, NOUN], hexTag16))
    || chain(name, 0, [ADJ, NOUN], adjNounTail)
    || isSnakeName(name);
}

// fixed names of BLA's runtime prelude (armor corpus, integrity measures, seed, shadow heap, decoy IPC)
const PRELUDE_EXACT = ['interlockSafetyCorpus', 'deriveContainmentCorpusDigest', 'readSplitShare'];
const PRELUDE_OPEN = ['measureIntegrity', 'integrityDigest', 'runtimeSeed', 'shadowHeap', 'stepShadowHeap', 'registerDecoyIpc', 'runtimeState', 'enclaveManifests'];

function isPreludeName(name) {
  const bare = name[0] === '_' ? name.slice(1) : name;
  return PRELUDE_EXACT.some((w) => bare.startsWith(w) && hexTag26(bare.slice(w.length)))
    || PRELUDE_OPEN.some((w) => bare.startsWith(w) && all(bare, isWord, w.length));
}

/** `fooBar_123_4` */
function isNumberedName(name) {
  const parts = name.split('_');
  return parts.length === 3 && isLower(parts[0][0] ?? '') && all(parts[0], isAlpha) && run(parts[1], isDigit, 2, 4) && run(parts[2], isDigit, 1);
}

/** `scc_<word chars>_c<digits>n<digits>` */
function isSccName(name) {
  if (!name.startsWith('scc_')) return false;
  let i = name.length;
  while (i > 0 && isDigit(name[i - 1])) i--;
  if (i === name.length || name[i - 1] !== 'n') return false;
  let j = i - 1;
  while (j > 0 && isDigit(name[j - 1])) j--;
  if (j === i - 1 || name[j - 1] !== 'c' || name[j - 2] !== '_') return false;
  return j - 2 > 4 && all(name, isWord, 4, j - 2);
}

export const isGeneratorName = (name) => isBlaName(name) || isNumberedName(name) || isSccName(name) || isPreludeName(name) || hexTagAt(name, 3, 4) >= 0;
