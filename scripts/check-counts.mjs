#!/usr/bin/env node
/**
 * Check that the "NNN+ apps and modules" claims in README.md, docs/index.md and
 * docs/.vitepress/config.mjs match the real number of entries in
 * docs/apps-and-modules/*.md.
 *
 * The claim is compared against the real count rounded down to the nearest 50.
 * Claiming more than the real count is an error; claiming two steps (100) or
 * more below it is a warning.
 *
 * Usage: node scripts/check-counts.mjs
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const DIR = join(ROOT, 'docs', 'apps-and-modules')

const FILES = ['README.md', 'docs/index.md', 'docs/.vitepress/config.mjs']
const STEP = 50
// Matches "650+ apps and modules" style claims such as 650+, 1,200+ or 650 %2B.
const CLAIM_RE = /(\d[\d,]*)\s*(?:\+|%2B)\s+(?:curated\s+)?(?:root\s+)?(?:apps|tools)/gi

function countEntries() {
  let total = 0
  for (const name of readdirSync(DIR)) {
    if (!name.endsWith('.md') || name === 'index.md') continue
    const lines = readFileSync(join(DIR, name), 'utf8').split('\n')
    let inFence = false
    for (const line of lines) {
      if (/^\s*```/.test(line)) inFence = !inFence
      if (inFence) continue
      if (/^-\s+\*\*\[[^\]]+\]\([^)\s]+\)\*\*/.test(line)) total++
    }
  }
  return total
}

const real = countEntries()
const allowed = Math.floor(real / STEP) * STEP

let errors = 0
let warnings = 0

for (const file of FILES) {
  const text = readFileSync(join(ROOT, file), 'utf8')
  const lines = text.split('\n')
  lines.forEach((line, index) => {
    for (const match of line.matchAll(CLAIM_RE)) {
      const claimed = Number(match[1].replace(/,/g, ''))
      const where = `${file}:${index + 1}`
      if (claimed > allowed) {
        console.log(
          `error: ${where} claims "${claimed}+" but only ${real} entries exist (max claim ${allowed}+)`
        )
        errors++
      } else if (allowed - claimed >= STEP * 2) {
        console.log(
          `warning: ${where} claims "${claimed}+" which is well below the real ${real} entries (${allowed}+)`
        )
        warnings++
      }
    }
  })
}

console.log(`\n${real} entries, claims checked against ${allowed}+`)
console.log(`${errors} error(s), ${warnings} warning(s).`)
process.exit(errors ? 1 : 0)