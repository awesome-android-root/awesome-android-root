#!/usr/bin/env bun
/**
 * Prepare the build environment for VitePress.
 *
 * VitePress needs full git history to compute `lastUpdated`. CI checkouts and
 * some hosting providers clone shallow, so fetch the missing history when the
 * shallow-clone marker is present. A failed fetch is reported but does not
 * abort the build: the site still builds with whatever history is available.
 */
import { join, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')

if (await Bun.file(join(ROOT, '.git', 'shallow')).exists()) {
  console.log('Shallow clone detected, fetching full git history...')
  const { exitCode } = Bun.spawnSync(['git', 'fetch', '--unshallow'], {
    cwd: ROOT,
    stdin: 'inherit',
    stdout: 'inherit',
    stderr: 'inherit'
  })
  if (exitCode !== 0) {
    console.warn('warning: could not unshallow the repository; lastUpdated may be incomplete')
  }
}
