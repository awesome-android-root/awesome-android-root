#!/usr/bin/env node
/**
 * Compare SEO head tags between two VitePress builds.
 *
 * Usage: node scripts/head-diff.mjs <beforeDir> <afterDir>
 *
 * Extracts title, meta description, canonical, og:* and twitter:* from every
 * HTML file in both builds and prints one line per difference. Intended for
 * reviewing the effect of config.mjs head generation changes.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const TRACKED = [
  'og:type',
  'og:site_name',
  'og:locale',
  'og:title',
  'og:description',
  'og:url',
  'og:image',
  'og:image:alt',
  'twitter:card',
  'twitter:title',
  'twitter:description',
  'twitter:image',
  'twitter:site'
]

function htmlFiles(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) out.push(...htmlFiles(full))
    else if (name.endsWith('.html')) out.push(full)
  }
  return out
}

function extract(html) {
  const tags = new Map()
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1]
  tags.set('title', title?.trim() ?? null)

  const metaRe = /<meta\s+([^>]*?)\/?>/gi
  let m
  while ((m = metaRe.exec(html))) {
    const attrs = {}
    const attrRe = /([\w:.-]+)="([^"]*)"/g
    let a
    while ((a = attrRe.exec(m[1]))) attrs[a[1]] = a[2]
    if (attrs.name === 'description') tags.set('meta:description', attrs.content ?? null)
    else if (attrs.property) tags.set(attrs.property, attrs.content ?? null)
    else if (attrs.name && TRACKED.includes(attrs.name)) tags.set(attrs.name, attrs.content ?? null)
  }

  const linkRe = /<link\s+([^>]*?)\/?>/gi
  while ((m = linkRe.exec(html))) {
    if (/rel="canonical"/.test(m[1])) {
      tags.set('canonical', m[1].match(/href="([^"]*)"/)?.[1] ?? null)
    }
  }
  return tags
}

const [beforeArg, afterArg] = process.argv.slice(2)
if (!beforeArg || !afterArg) {
  console.error('usage: node scripts/head-diff.mjs <beforeDir> <afterDir>')
  process.exit(2)
}

const beforeDir = resolve(beforeArg)
const afterDir = resolve(afterArg)
const before = new Map(
  htmlFiles(beforeDir).map((f) => [relative(beforeDir, f), extract(readFileSync(f, 'utf8'))])
)
const after = new Map(
  htmlFiles(afterDir).map((f) => [relative(afterDir, f), extract(readFileSync(f, 'utf8'))])
)

const keys = [...new Set([...before.keys(), ...after.keys()])].sort()
let differences = 0

for (const file of keys) {
  const a = before.get(file)
  const b = after.get(file)
  if (!a || !b) {
    console.log(`${file}: page only exists in ${!a ? afterDir : beforeDir}`)
    differences++
    continue
  }
  for (const key of new Set([...a.keys(), ...b.keys()])) {
    if (a.get(key) !== b.get(key)) {
      console.log(`${file} :: ${key}\n  before: ${a.get(key)}\n  after:  ${b.get(key)}`)
      differences++
    }
  }
}

console.log(`\n${differences} difference(s) across ${keys.length} page(s).`)