import assert from 'node:assert/strict'
import test from 'node:test'
import { withIcons } from '../docs/.vitepress/icons.mjs'

test('resolves a named icon into an inline svg and drops the icon key', () => {
  const result = withIcons({ text: 'Quick Start', icon: 'rocket' })

  assert.ok(
    typeof result.text === 'string' &&
      result.text.startsWith('<span class="navicon" aria-hidden="true"><svg'),
    result.text
  )
  assert.ok(result.text.endsWith('</svg></span> Quick Start'), result.text)
  assert.equal(Object.hasOwn(result, 'icon'), false)
})

test('walks nested arrays and objects', () => {
  const result = withIcons({
    '/rooting-guides/': [
      {
        text: 'Guide Overview',
        icon: 'book-open',
        items: [{ text: 'Table of Contents', link: '/rooting-guides/' }]
      },
      [{ text: 'Quick Start', icon: 'rocket' }]
    ]
  })

  assert.match(result['/rooting-guides/'][0].text, /^<span class="navicon" /)
  assert.equal(result['/rooting-guides/'][0].items[0].text, 'Table of Contents')
  assert.match(result['/rooting-guides/'][1][0].text, /^<span class="navicon" /)
})

test('leaves keycap step labels unchanged', () => {
  const input = { text: '1️⃣ Unlock Bootloader' }
  assert.deepEqual(withIcons(input), input)
})

test('throws on an unknown icon name', () => {
  assert.throws(() => withIcons({ text: 'X', icon: 'not-an-icon' }), /Unknown icon/)
})

test('throws when icon is present without a text string', () => {
  assert.throws(() => withIcons({ icon: 'rocket', link: '/' }), /text/)
})

test('leaves text unchanged when no icon is set', () => {
  assert.deepEqual(withIcons({ text: 'About', link: '/about' }), {
    text: 'About',
    link: '/about'
  })
})

test('leaves an icon-free nav array unchanged', () => {
  const nav = [
    { text: 'Home', link: '/' },
    { text: 'Help', items: [{ text: 'FAQ', link: '/faqs' }] }
  ]
  assert.deepEqual(withIcons(nav), nav)
})
