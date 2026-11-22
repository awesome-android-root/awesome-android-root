#!/usr/bin/env bun
/**
 * Prepare the build environment for VitePress.
 *
 * VitePress needs full git history to compute `lastUpdated`. CI checkouts and
 * some hosting providers clone shallow, so fetch the missing history when the
 * shallow-clone marker is present. A failed fetch is reported but does not
 * abort the build: the site still builds with whatever history is available.
 */
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')

if (existsSync(join(ROOT, '.git', 'shallow'))) {
  console.log('Shallow clone detected, fetching full git history...')
  try {
    execFileSync('git', ['fetch', '--unshallow'], { cwd: ROOT, stdio: 'inherit' })
  } catch {
    console.warn('warning: could not unshallow the repository; lastUpdated may be incomplete')
  }
}
