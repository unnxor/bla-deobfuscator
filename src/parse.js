// Single source of truth for parser / generator options.
import { parse } from '@babel/parser';
import traverseMod from '@babel/traverse';
import generateMod from '@babel/generator';
import * as t from '@babel/types';
import { asciiOnly, firstLine } from './util/chars.js';

export const traverse = traverseMod.default ?? traverseMod;
export const generate = generateMod.default ?? generateMod;
export { t };

const BASE = {
  sourceType: 'unambiguous',
  allowReturnOutsideFunction: true,
  allowImportExportEverywhere: true,
  allowAwaitOutsideFunction: true,
  errorRecovery: false,
  ranges: false,
  tokens: false,
};

const PLUGIN_SETS = [[], ['jsx'], ['typescript'], ['jsx', 'typescript'], ['decorators-legacy'], ['jsx', 'decorators-legacy']];

/** Parse with plugin retry. Throws a sanitized Error on failure. */
export function parseCode(code, opts = {}) {
  let lastErr = null;
  const sets = opts.plugins ? [opts.plugins] : PLUGIN_SETS;
  // sourceType fallback: unambiguous -> module -> script (an explicit sourceType pins the original mode)
  const modes = opts.sourceType ? [opts.sourceType] : ['unambiguous', 'module', 'script'];
  for (const plugins of sets) {
    for (const sourceType of modes) {
      try {
        const ast = parse(code, { ...BASE, plugins, sourceType });
        ast.__plugins = plugins;
        return ast;
      } catch (e) {
        if (lastErr == null) lastErr = e;
      }
    }
  }
  const msg = firstLine(String(lastErr?.message ?? lastErr)).slice(0, 120);
  const err = new Error('parse error: ' + asciiOnly(msg));
  err.parseError = true;
  throw err;
}

export function generateCode(ast, { comments = false } = {}) {
  const out = generate(ast, {
    comments,
    compact: false,
    retainLines: false,
    jsescOption: { minimal: true },
  }).code;
  return out.endsWith('\n') ? out : out + '\n';
}

/** carrier: 'esm' | 'cjs' | 'script' */
export function detectCarrier(ast) {
  let esm = false;
  for (const n of ast.program.body) {
    if (n.type.startsWith('Import') || n.type.startsWith('Export')) esm = true;
  }
  if (esm) return 'esm';
  let cjs = false;
  traverse(ast, {
    Program(p) {
      for (const name of ['module', 'exports', 'require']) {
        if (p.scope.globals[name] && !p.scope.hasOwnBinding(name)) cjs = true;
      }
      p.stop();
    },
  });
  return cjs ? 'cjs' : 'script';
}
