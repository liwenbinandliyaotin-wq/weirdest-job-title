// Weirdest Job Title: Blind Judge Showdown entrypoint (Node 22, standard library only).
//
// What this program does: take the finished job title that sits next to
// this file (entry.txt) and place an exact copy of it at
// <output dir>/entry.txt, where the output dir comes from MAKEFUN_OUTPUT_DIR
// and falls back to /output. The bytes written are identical to the bytes
// read, so the judge always sees the same title.
//
// Local check:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

function main() {
  const here = dirname(fileURLToPath(import.meta.url));
  const text = readFileSync(join(here, 'entry.txt'), 'utf8');
  if (text.trim().length === 0) {
    throw new Error('entry.txt is blank, nothing to write');
  }
  if (text.length > 60) {
    throw new Error(`entry.txt must be 1-60 characters, got ${text.length}`);
  }
  const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  mkdirSync(targetDir, { recursive: true });
  const target = join(targetDir, 'entry.txt');
  writeFileSync(target, text);
  console.log(`wrote ${text.length} characters to ${target}`);
}

main();
