/**
 * Nav and sidebar icons.
 *
 * VitePress renders sidebar labels and nav items with `v-html`, so an `icon`
 * key on a config item is replaced by inline SVG in its `text` at build time.
 * Keys are Lucide icon slugs, for example `icon: 'book-open'`.
 */
import { __iconData as audioLines } from '@lucide/vue/dist/esm/icons/audio-lines.mjs'
import { __iconData as book } from '@lucide/vue/dist/esm/icons/book.mjs'
import { __iconData as bookOpen } from '@lucide/vue/dist/esm/icons/book-open.mjs'
import { __iconData as bot } from '@lucide/vue/dist/esm/icons/bot.mjs'
import { __iconData as circleQuestionMark } from '@lucide/vue/dist/esm/icons/circle-question-mark.mjs'
import { __iconData as clipboardList } from '@lucide/vue/dist/esm/icons/clipboard-list.mjs'
import { __iconData as databaseBackup } from '@lucide/vue/dist/esm/icons/database-backup.mjs'
import { __iconData as eraser } from '@lucide/vue/dist/esm/icons/eraser.mjs'
import { __iconData as eyeOff } from '@lucide/vue/dist/esm/icons/eye-off.mjs'
import { __iconData as fileText } from '@lucide/vue/dist/esm/icons/file-text.mjs'
import { __iconData as folderTree } from '@lucide/vue/dist/esm/icons/folder-tree.mjs'
import { __iconData as gamepad2 } from '@lucide/vue/dist/esm/icons/gamepad-2.mjs'
import { __iconData as ghost } from '@lucide/vue/dist/esm/icons/ghost.mjs'
import { __iconData as globe } from '@lucide/vue/dist/esm/icons/globe.mjs'
import { __iconData as lock } from '@lucide/vue/dist/esm/icons/lock.mjs'
import { __iconData as lockKeyhole } from '@lucide/vue/dist/esm/icons/lock-keyhole.mjs'
import { __iconData as medal } from '@lucide/vue/dist/esm/icons/medal.mjs'
import { __iconData as box } from '@lucide/vue/dist/esm/icons/package.mjs'
import { __iconData as palette } from '@lucide/vue/dist/esm/icons/palette.mjs'
import { __iconData as puzzle } from '@lucide/vue/dist/esm/icons/puzzle.mjs'
import { __iconData as rocket } from '@lucide/vue/dist/esm/icons/rocket.mjs'
import { __iconData as scale } from '@lucide/vue/dist/esm/icons/scale.mjs'
import { __iconData as settings } from '@lucide/vue/dist/esm/icons/settings.mjs'
import { __iconData as shield } from '@lucide/vue/dist/esm/icons/shield.mjs'
import { __iconData as shieldOff } from '@lucide/vue/dist/esm/icons/shield-off.mjs'
import { __iconData as shuffle } from '@lucide/vue/dist/esm/icons/shuffle.mjs'
import { __iconData as smartphone } from '@lucide/vue/dist/esm/icons/smartphone.mjs'
import { __iconData as squareTerminal } from '@lucide/vue/dist/esm/icons/square-terminal.mjs'
import { __iconData as star } from '@lucide/vue/dist/esm/icons/star.mjs'
import { __iconData as trophy } from '@lucide/vue/dist/esm/icons/trophy.mjs'
import { __iconData as wrench } from '@lucide/vue/dist/esm/icons/wrench.mjs'
import { __iconData as zap } from '@lucide/vue/dist/esm/icons/zap.mjs'

const NAMED_ICONS = {
  'audio-lines': audioLines,
  book,
  'book-open': bookOpen,
  bot,
  box,
  'circle-question-mark': circleQuestionMark,
  'clipboard-list': clipboardList,
  'database-backup': databaseBackup,
  eraser,
  'eye-off': eyeOff,
  'file-text': fileText,
  'folder-tree': folderTree,
  'gamepad-2': gamepad2,
  ghost,
  globe,
  lock,
  'lock-keyhole': lockKeyhole,
  medal,
  palette,
  puzzle,
  rocket,
  scale,
  settings,
  shield,
  'shield-off': shieldOff,
  shuffle,
  smartphone,
  'square-terminal': squareTerminal,
  star,
  trophy,
  wrench,
  zap
}

function toSvg({ node }) {
  const body = node
    .map(([tag, attrs]) => {
      const pairs = Object.entries(attrs)
        .filter(([key]) => key !== 'key')
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ')
      return `<${tag} ${pairs} />`
    })
    .join('')

  return (
    '<span class="navicon" aria-hidden="true">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"' +
    ` stroke-linecap="round" stroke-linejoin="round">${body}</svg>` +
    '</span>'
  )
}

function prependIcon(text, name) {
  const icon = NAMED_ICONS[name]
  if (!icon) throw new Error(`Unknown icon "${name}"`)
  return `${toSvg(icon)} ${text}`
}

/** Replaces the `icon` key of every config item with inline SVG in its `text`. */
export function withIcons(node) {
  if (Array.isArray(node)) return node.map(withIcons)
  if (!node || typeof node !== 'object') return node

  const { icon } = node
  if (typeof icon === 'string' && typeof node.text !== 'string') {
    throw new Error(`Item with icon "${icon}" requires a string text field`)
  }

  return Object.fromEntries(
    Object.entries(node).flatMap(([key, value]) => {
      if (key === 'icon') return []
      if (key === 'text' && typeof icon === 'string') {
        return [[key, prependIcon(value, icon)]]
      }
      return [[key, withIcons(value)]]
    })
  )
}
