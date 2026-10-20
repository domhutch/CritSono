#!/usr/bin/env node
/**
 * Re-enable the optional ICS/FUSIC report-form printing feature.
 *
 * The official report-form artwork is not distributed with this repository
 * (see docs/ICS_FORMS.md). This script helps a deployment that is permitted to
 * use report-form templates to bring the feature back:
 *
 *   1. Reports whether the expected template files are present under
 *      `public/templates/`, and restores them from git history when they are
 *      missing and the user asks for it.
 *   2. Writes `VITE_ENABLE_ICS_FORMS=true` to `.env.local` so local builds pick
 *      up the feature (the flag is off by default).
 *
 * It never overwrites templates that already exist, and it does not decide
 * whether you have the right to use a template — you are responsible for that.
 *
 * Usage:
 *   node scripts/enable-ics-forms.mjs            # restore templates + set flag
 *   node scripts/enable-ics-forms.mjs --no-restore   # only set the flag
 */

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const templatesDir = path.join(root, "public", "templates");
const envFile = path.join(root, ".env.local");

/**
 * The template files the builders expect, and the git ref they were removed at
 * (see docs/ICS_FORMS.md and ASSET_CREDITS.md).
 */
const TEMPLATES = [
  "fusic-heart-report-form-v13.svg",
  "fusic-lung-report-form-v10.svg",
  "fusic-abdomen-report-form-v1-2025.svg",
  "fusic-abdomen-report-form-v1-2025-page2.svg",
];
const TEMPLATES_REF = "main";

const skipRestore = process.argv.includes("--no-restore");

function relative(filePath) {
  return path.relative(root, filePath);
}

function git(args, options = {}) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    stdio: options.noThrow ? ["ignore", "pipe", "ignore"] : ["ignore", "pipe", "pipe"],
  });
}

function templatesAvailableAtRef(ref) {
  try {
    const out = git(["ls-tree", "-r", "--name-only", ref, "public/templates/"]);
    return out.trim().length > 0;
  } catch {
    return false;
  }
}

function summarizeExisting() {
  if (!existsSync(templatesDir)) return { present: [], missing: TEMPLATES };
  const present = [];
  const missing = [];
  for (const name of TEMPLATES) {
    (existsSync(path.join(templatesDir, name)) ? present : missing).push(name);
  }
  return { present, missing };
}

console.log("ICS/FUSIC report-form printing — re-enable helper\n");

let { present, missing } = summarizeExisting();
for (const name of present) console.log(`  found   ${relative(path.join(templatesDir, name))}`);
for (const name of missing) console.log(`  missing ${relative(path.join(templatesDir, name))}`);
console.log();

if (missing.length > 0 && !skipRestore) {
  if (!templatesAvailableAtRef(TEMPLATES_REF)) {
    console.log(
      `No report-form templates are available at '${TEMPLATES_REF}' in this repository.\n` +
        "Add your own A4-portrait SVG templates under public/templates/ with the names above,\n" +
        "then re-run this script (or build with VITE_ENABLE_ICS_FORMS=true) to enable the feature.\n",
    );
  } else {
    console.log(`Restoring ${missing.length} template file(s) from '${TEMPLATES_REF}'...`);
    try {
      git(["checkout", TEMPLATES_REF, "--", "public/templates/"]);
    } catch (error) {
      console.error("Could not restore templates from git:");
      console.error(error.stderr?.toString?.() || error.message);
      process.exitCode = 1;
    }
    ({ present, missing } = summarizeExisting());
    if (missing.length === 0) {
      console.log("All template files restored.\n");
    } else {
      console.log(`Still missing: ${missing.join(", ")}\n`);
    }
  }
} else if (missing.length > 0) {
  console.log("Skipping restore (--no-restore). Add the missing templates yourself.\n");
}

// Set the build-time flag for local builds.
const flagLine = "VITE_ENABLE_ICS_FORMS=true";
let envContents = existsSync(envFile) ? readFileSync(envFile, "utf8") : "";
if (/^\s*VITE_ENABLE_ICS_FORMS\s*=/m.test(envContents)) {
  envContents = envContents.replace(/^\s*VITE_ENABLE_ICS_FORMS\s*=.*$/m, flagLine);
  writeFileSync(envFile, envContents);
  console.log(`Updated ${relative(envFile)}: ${flagLine}`);
} else {
  const prefix = envContents && !envContents.endsWith("\n") ? `${envContents}\n` : envContents;
  writeFileSync(envFile, `${prefix}${flagLine}\n`);
  console.log(`Wrote ${relative(envFile)}: ${flagLine}`);
}

console.log(
  "\nNext steps:\n" +
    "  - Confirm you have the right to use every template you add (see docs/ICS_FORMS.md).\n" +
    "  - Rebuild: npm run check   (or VITE_ENABLE_ICS_FORMS=true npm run build).\n" +
    "  - For CI/GitHub Pages, set a repository variable VITE_ENABLE_ICS_FORMS=true and pass it\n" +
    "    in the deploy workflow's build step.",
);
