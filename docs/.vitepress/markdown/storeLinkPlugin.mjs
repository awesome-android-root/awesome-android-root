/**
 * Markdown-it plugin to transform F-Droid and Play Store badge links into
 * custom <StoreLink> Vue components.
 *
 * Only converts links whose text is a store badge (🌱 F-Droid / ▶️ Play Store)
 * pointing at the matching store. Everything else renders normally.
 *
 * VitePress 2 renders markdown with markdown-it-async (pages are rendered
 * concurrently), so this plugin is fully STATELESS: each rule derives whether
 * it is inside a store link from the token stream itself rather than from a
 * shared mutable flag.
 */

const FDROID_HREF = /f-droid\.org|apt\.izzysoft\.de/

// Minimal HTML attribute escape - only double-quotes matter here since the
// href is placed inside a double-quoted HTML attribute.
const escapeAttr = (s) => s.replace(/"/g, '&quot;')

/**
 * Determine whether the link opened at `openIdx` is a store badge.
 * Returns the store name ('fdroid' | 'playstore') or null.
 * Looks at the inline text content following the opening token, so nested
 * inline markup (e.g. `[🌱 **F-Droid**](...)`) is handled by reading content
 * from every text token up to the matching link_close.
 */
function getStoreForLink(tokens, openIdx) {
  const openToken = tokens[openIdx]
  if (!openToken || openToken.type !== 'link_open') return null

  const hrefIndex = openToken.attrIndex('href')
  if (hrefIndex < 0) return null
  const href = openToken.attrs[hrefIndex][1] || ''

  // Gather the link's text from the text tokens between open and close.
  let text = ''
  for (let i = openIdx + 1; i < tokens.length; i++) {
    const t = tokens[i]
    if (t.type === 'link_close') break
    if (t.type === 'text' || t.type === 'code_inline') text += t.content
  }
  const label = text.trim()

  if ((label === '🌱' || label === '🌱 F-Droid') && FDROID_HREF.test(href)) {
    return { store: 'fdroid', href }
  }
  if ((label === '▶️' || label === '▶️ Play Store') && href.includes('play.google.com')) {
    return { store: 'playstore', href }
  }
  return null
}

/**
 * If the token at `idx` is wrapped by a store-badge link, find the index of
 * that link_open token; otherwise return -1.
 */
function findEnclosingStoreLinkOpen(tokens, idx) {
  let depth = 0
  for (let i = idx - 1; i >= 0; i--) {
    const t = tokens[i]
    if (t.type === 'link_close') {
      depth++
    } else if (t.type === 'link_open') {
      if (depth === 0) {
        return getStoreForLink(tokens, i) ? i : -1
      }
      depth--
    }
  }
  return -1
}

export function storeLinkPlugin(md) {
  const defaultLinkOpenRender =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options)
    }

  const defaultLinkCloseRender =
    md.renderer.rules.link_close ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options)
    }

  const defaultTextRender =
    md.renderer.rules.text ||
    function (tokens, idx) {
      return tokens[idx].content
    }

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const match = getStoreForLink(tokens, idx)
    if (match) {
      return `<StoreLink store="${match.store}" href="${escapeAttr(match.href)}">`
    }
    return defaultLinkOpenRender(tokens, idx, options, env, self)
  }

  md.renderer.rules.link_close = function (tokens, idx, options, env, self) {
    // Find the matching link_open by balancing nested links (none in practice,
    // but this keeps the lookup robust) and check whether it is a store link.
    let depth = 0
    for (let i = idx - 1; i >= 0; i--) {
      const t = tokens[i]
      if (t.type === 'link_close') {
        depth++
      } else if (t.type === 'link_open') {
        if (depth === 0) {
          if (getStoreForLink(tokens, i)) return '</StoreLink>'
          break
        }
        depth--
      }
    }
    return defaultLinkCloseRender(tokens, idx, options, env, self)
  }

  md.renderer.rules.text = function (tokens, idx, options, env, self) {
    // Suppress the original link text inside a store badge - the StoreLink
    // component renders its own icon.
    if (findEnclosingStoreLinkOpen(tokens, idx) !== -1) {
      return ''
    }

    // Wrap standalone pipe separators with a styled span.
    const content = tokens[idx].content
    if (content.trim() === '|') {
      return '<span class="store-separator">|</span>'
    }

    return defaultTextRender(tokens, idx, options, env, self)
  }
}
