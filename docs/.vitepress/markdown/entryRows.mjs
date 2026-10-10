const ENTRY_LINK_PREFIX = /^[ \t]*-[ \t]+\*\*\[[^\]\r\n]+\]\([^\r\n]*\)\*\*/

const BADGES = new Map([
  ['FOSS', { key: 'foss', label: 'FOSS', text: 'FOSS' }],
  ['Proprietary', { key: 'proprietary', label: 'Proprietary license', text: 'Proprietary' }],
  ['[M]', { key: 'm', label: 'Magisk', text: 'M' }],
  ['[K]', { key: 'k', label: 'KernelSU', text: 'K' }],
  ['[A]', { key: 'a', label: 'APatch', text: 'A' }],
  ['[LSP]', { key: 'lsp', label: 'LSPosed', text: 'LSP' }]
])

const FRAMEWORK_LABELS = {
  m: 'Magisk',
  k: 'KernelSU',
  a: 'APatch',
  lsp: 'LSPosed'
}

export function isEntryLine(line) {
  const match = line.match(ENTRY_LINK_PREFIX)
  if (!match) return false

  const description = line.slice(match[0].length).replace(/^[ \t]*-[ \t]*/, '').trim()
  return description.length > 0
}

export function countMarkdownEntries(markdown) {
  return markdown.split(/\r?\n/).filter(isEntryLine).length
}

export function countCategoryEntries(markdownDirectory, categories, readFile) {
  const entries = categories.map((category) => ({
    ...category,
    count: countMarkdownEntries(readFile(`${markdownDirectory}/${category.slug}.md`))
  }))

  return {
    categories: entries,
    total: entries.reduce((sum, category) => sum + category.count, 0)
  }
}

function createHtmlToken(state, content) {
  const token = new state.Token('html_inline', '', 0)
  token.content = content
  token.level = 0
  return token
}

function matchingClose(children, openIndex, openType, closeType) {
  let depth = 0
  for (let index = openIndex; index < children.length; index += 1) {
    if (children[index].type === openType) depth += 1
    if (children[index].type === closeType) {
      depth -= 1
      if (depth === 0) return index
    }
  }
  return -1
}

function getBadge(token) {
  return token.type === 'code_inline' ? BADGES.get(token.content.trim()) : undefined
}

function addFlag(itemToken, key) {
  itemToken.attrSet(`data-${key}`, 'true')
}

function decorateEntry(state, itemToken, inlineToken, listToken) {
  const children = inlineToken.children ?? []
  const nameOpen = children.findIndex((token) => token.type === 'strong_open')
  if (nameOpen < 0) return false

  const nameClose = matchingClose(children, nameOpen, 'strong_open', 'strong_close')
  if (nameClose < 0) return false

  const nameTokens = children.slice(nameOpen + 1, nameClose)
  if (!nameTokens.some((token) => token.type === 'link_open') || !nameTokens.some((token) => token.type === 'link_close')) {
    return false
  }

  let firstBadge = -1
  let lastBadge = -1
  for (let index = nameClose + 1; index < children.length; index += 1) {
    if (getBadge(children[index])) {
      if (firstBadge < 0) firstBadge = index
      lastBadge = index
    }
  }

  const descriptionEnd = firstBadge < 0 ? children.length : firstBadge
  const badgeKeys = children
    .slice(nameClose + 1)
    .map(getBadge)
    .filter(Boolean)
    .map((badge) => badge.key)
  const description = children
    .slice(nameClose + 1, descriptionEnd)
    .filter((token) => token.type === 'text' || token.type === 'code_inline')
    .map((token) => token.content)
    .join('')
    .replace(/^[ \t]*-[ \t]*/, '')
    .replace(/[|\s]+/g, ' ')
    .trim()

  if (!description) return false

  const recommended = nameTokens.some((token) => token.type === 'text' && token.content.includes('⭐'))
  if (recommended) {
    for (const token of nameTokens) {
      if (token.type === 'text') token.content = token.content.replace(/^\s*⭐\s*/u, '')
    }
    itemToken.attrSet('data-rec', 'true')
  }

  for (let index = nameClose + 1; index < descriptionEnd; index += 1) {
    const token = children[index]
    if (token.type === 'text') {
      token.content = token.content.replace(/^[ \t]*-[ \t]*/, '')
      break
    }
  }

  const output = []
  output.push(createHtmlToken(state, '<span class="entry-main"><span class="entry-name">'))
  if (recommended) {
    output.push(createHtmlToken(state, '<span class="entry-recommended" aria-hidden="true"><svg viewBox="0 0 16 16" focusable="false"><path d="m8 1.5 1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.3l-3.8 2 .7-4.3-3.1-3 4.3-.6L8 1.5Z"/></svg></span><span class="visually-hidden">Recommended: </span>'))
  }

  for (let index = 0; index < children.length; index += 1) {
    const token = children[index]

    if (index === nameOpen) {
      output.push(token)
      continue
    }

    if (index === nameClose) {
      output.push(token)
      output.push(createHtmlToken(state, '</span><span class="entry-description">'))
      continue
    }

    if (index === firstBadge && firstBadge >= 0) {
      output.push(createHtmlToken(state, '</span></span><span class="entry-badges" aria-label="Compatibility and licensing">'))
    }

    const badge = getBadge(token)
    if (badge) {
      const frameworkName = FRAMEWORK_LABELS[badge.key]
      token.attrJoin('class', `entry-badge entry-badge-${badge.key}`)
      token.attrSet('title', badge.label)
      if (frameworkName) {
        token.attrSet('aria-hidden', 'true')
        token.content = badge.text
        output.push(token)
        output.push(createHtmlToken(state, `<span class="visually-hidden">${frameworkName}</span>`))
      } else {
        token.content = badge.text
        output.push(token)
      }
    } else {
      output.push(token)
    }
  }

  if (firstBadge >= 0) {
    output.push(createHtmlToken(state, '</span>'))
  } else {
    output.push(createHtmlToken(state, '</span></span>'))
  }

  inlineToken.children = output
  itemToken.attrJoin('class', 'aar-entry')

  for (const key of badgeKeys) addFlag(itemToken, key)

  if (listToken && !listToken.attrGet('class')?.split(/\s+/).includes('aar-entry-list')) {
    listToken.attrJoin('class', 'aar-entry-list')
  }
  return true
}

export function entryRowsPlugin(md) {
  md.core.ruler.push('aar_entry_rows', (state) => {
    const listStack = []
    const itemStack = []

    for (const token of state.tokens) {
      if (token.type === 'bullet_list_open' || token.type === 'ordered_list_open') {
        listStack.push(token)
      } else if (token.type === 'list_item_open') {
        itemStack.push({ token, listToken: listStack.at(-1), decorated: false })
      } else if (token.type === 'inline' && itemStack.length) {
        const current = itemStack.at(-1)
        if (!current.decorated && decorateEntry(state, current.token, token, current.listToken)) {
          current.decorated = true
        }
      } else if (token.type === 'list_item_close') {
        itemStack.pop()
      } else if (token.type === 'bullet_list_close' || token.type === 'ordered_list_close') {
        listStack.pop()
      }
    }
  })
}
