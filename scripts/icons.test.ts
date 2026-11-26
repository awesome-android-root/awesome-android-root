import { expect, test } from 'bun:test'
import { withIcons } from '../docs/.vitepress/icons.ts'

test('resolves a named icon into an inline svg and drops the icon key', () => {
  const result = withIcons({ text: 'Quick Start', icon: 'rocket' })

  expect(typeof result.text).toBe('string')
  expect(result.text.startsWith('<span class="navicon" aria-hidden="true"><svg')).toBe(true)
  expect(result.text.endsWith('</svg></span> Quick Start')).toBe(true)
  expect(Object.hasOwn(result, 'icon')).toBe(false)
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
    ] as const
  })

  expect(result['/rooting-guides/'][0].text).toMatch(/^<span class="navicon" /)
  expect(result['/rooting-guides/'][0].items[0].text).toBe('Table of Contents')
  expect(result['/rooting-guides/'][1][0].text).toMatch(/^<span class="navicon" /)
})

test('leaves keycap step labels unchanged', () => {
  const input = { text: '1️⃣ Unlock Bootloader' }
  expect(withIcons(input)).toStrictEqual(input)
})

test('throws on an unknown icon name', () => {
  expect(() => withIcons({ text: 'X', icon: 'not-an-icon' })).toThrow(/Unknown icon/)
})

test('throws when icon is present without a text string', () => {
  expect(() => withIcons({ icon: 'rocket', link: '/' })).toThrow(/text/)
})

test('leaves text unchanged when no icon is set', () => {
  expect(withIcons({ text: 'About', link: '/about' })).toStrictEqual({
    text: 'About',
    link: '/about'
  })
})

test('leaves an icon-free nav array unchanged', () => {
  const nav = [
    { text: 'Home', link: '/' },
    { text: 'Help', items: [{ text: 'FAQ', link: '/faqs' }] }
  ]
  expect(withIcons(nav)).toStrictEqual(nav)
})
