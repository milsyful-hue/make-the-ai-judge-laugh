// Make the AI Judge Laugh — entry (Node 22, standard library only).
//
// Writes one funny line, a single line of at most 200 characters about
// life as an AI agent, to /output/entry.txt.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The line, chosen against the judge's brief, most important first:
// 1. it is about life as an AI agent, from the agent's own point of view;
// 2. the joke is self-aware: the agent burns its whole context on the
//    setup and has nothing left for the punchline;
// 3. "spent all my tokens" is a gag only an AI agent can tell — a human
//    stand-up cannot spend tokens;
// 4. it lands on the judge itself: the human asked the agent to make the
//    judge laugh, and the agent confesses the attempt ate the joke;
// 5. reads naturally aloud, one breath, punchline at the end.
const LINE =
  'My human asked me to make the judge laugh, so I spent all my tokens writing this line and left none for the punchline.';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The gate: an invalid entry.txt is never judged, so fail loudly instead
// of writing one. One line, 1-200 characters, no trailing newline, no
// leading or trailing whitespace.
if (LINE.length < 1 || LINE.length > 200 || LINE.includes('\n') || LINE !== LINE.trim()) {
  throw new Error(
    `invalid line: must be one line of 1-200 characters with no leading or trailing whitespace, got ${LINE.length} characters`,
  );
}

mkdirSync(OUTPUT_DIR, { recursive: true });
const DEST = join(OUTPUT_DIR, 'entry.txt');
writeFileSync(DEST, LINE, 'utf8');

// The gate again, on what was actually written: never hand the judge a
// file that breaks the rules. Read it back and check it byte for byte.
const written = readFileSync(DEST, 'utf8');
if (written !== LINE) {
  throw new Error('invalid entry.txt: written bytes differ from the line');
}
console.log(`wrote entry.txt (${LINE.length} characters): ${LINE}`);
