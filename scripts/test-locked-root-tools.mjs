import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { columns, selectTools } from '../docs/.vitepress/theme/components/lockedRootTable.mjs'

const tools = JSON.parse(readFileSync(new URL('../docs/rooting-guides/data/locked-root-tools.json', import.meta.url)))
test('reference schema, distinct tools, pinned evidence and separate statuses', () => {
  assert.equal(tools.length, 45)
  assert.equal(new Set(tools.map(tool => tool.id)).size, tools.length)
  for (const tool of tools) {
    for (const [key] of columns) assert.ok(tool[key], `${tool.id}: missing ${key}`)
    if (tool.revision) assert.match(tool.documentation, /\/blob\/[a-f0-9]{40}\//)
    else assert.equal(tool.sourceType, 'Author documentation')
    assert.equal(tool.lastVerified, '2026-10-14')
    assert.ok(['Confirmed', 'Reported', 'Conditional', 'Unverified', 'Patched'].includes(tool.evidence))
    assert.ok(Array.isArray(tool.android) && Array.isArray(tool.profiles))
    assert.ok(['Locked supported', 'Conditionally supported', 'Unlocked required', 'Unknown'].includes(tool.bootloader))
  }
})
test('case-insensitive, multi-term device, firmware, name and profile search', () => {
  assert.ok(selectTools(tools, { query: 'ghostlock' }).length > 10)
  assert.ok(selectTools(tools, { query: 'sm-a175f 6.12.38' }).some(tool => tool.id === 'mobilehackinglab/ghostlock-a17'))
  assert.ok(selectTools(tools, { query: 'cph2745' }).some(tool => tool.id === 'joinchang/ghostlock-oneplus'))
  assert.equal(selectTools(tools, { query: 'no-such-root-tool-xyz' }).length, 0)
  assert.equal(selectTools(tools, { query: '  ' }).length, tools.length)
})
test('category, bootloader, OS, verification and archive filters compose', () => {
  const result = selectTools(tools, { category: 'Rooting app', evidence: 'Reported', status: 'Archived' })
  assert.deepEqual(result.map(tool => tool.id), ['ankitrawatgit/dirtyfrag-android-root-jailbreak'])
  assert.ok(selectTools(tools, { android: '17' }).some(tool => tool.name === 'LSPromise'))
  assert.ok(selectTools(tools, { android: 'Unknown' }).every(tool => !tool.android.length))
  assert.ok(selectTools(tools, { bootloader: 'Unlocked required' }).every(tool => ['Kaeru', 'Fenrir'].includes(tool.name)))
  assert.equal(selectTools(tools, { android: '17', bootloader: 'Unlocked required' }).length, 0)
})
test('all columns sort deterministically both directions, without mutating data', () => {
  const before = JSON.stringify(tools)
  for (const [key] of columns) {
    const asc = selectTools(tools, {}, key)
    const desc = selectTools(tools, {}, key, 'desc')
    assert.deepEqual(asc.map(tool => tool.id), desc.map(tool => tool.id).reverse())
  }
  assert.equal(JSON.stringify(tools), before)
})
test('unfinished ports never assert successful root; archive is not a patch verdict', () => {
  for (const id of ['wtrwx/smt878u-ionstack-poc', 'ang3lo-azevedo/root-my-nothing', 'pubglite55/oppo-ghostlock']) {
    const tool = tools.find(tool => tool.id === id)
    assert.equal(tool.evidence, 'Unverified')
    assert.equal(tool.bootloader, 'Unknown')
  }
  const archived = tools.find(tool => tool.id === 'ankitrawatgit/dirtyfrag-android-root-jailbreak')
  assert.equal(archived.status, 'Archived')
  assert.equal(archived.evidence, 'Reported')
})
