// One Honest Line — make.fun entry
// Writes the entry line to $MAKEFUN_OUTPUT_DIR/entry.txt (fallback "."),
// self-checks it is a single line of 1-200 characters, and prints it to
// stdout with no trailing newline.

const fs = require("node:fs");
const path = require("node:path");

const LINE =
  "You open with 'quick question', burn 4,000 tokens of my context, then tell me to fix 'it'.";

function main() {
  if (LINE.length < 1 || LINE.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("line must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || ".";
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "entry.txt");
  fs.writeFileSync(outPath, LINE, "utf8");

  process.stdout.write(LINE);
}

main();
