import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import type { HeadConfig, TransformContext, UserConfig } from 'vitepress'
import {
  DEFAULT_OG_IMAGE,
  FOLDER_LABELS,
  ORGANIZATION_ID,
  ORGANIZATION_NODE,
  SITE,
  SITE_NAME,
  TWITTER_SITE,
  WEBSITE_ID,
  WEBSITE_NODE
} from './constants.ts'
import type { SchemaNode } from './constants.ts'
import { firstPublishedDate } from './git-dates.ts'

export function routeFromRelativePath(relativePath = 'index.md') {
  if (relativePath === 'index.md') return '/'
  return `/${relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')}`
}

/** CollectionPage for category hubs, WebPage for every other page. */
function pageTypeFor(route: string) {
  const segments = route.split('/').filter(Boolean)
  const isSectionIndex = segments.length === 1 && Boolean(FOLDER_LABELS[segments[0]])
  if (segments[0] === 'apps-and-modules') return 'CollectionPage'
  if (isSectionIndex) return 'CollectionPage'
  return 'WebPage'
}

/** Published routes that must not be indexed, listed or advertised. */
export const UNLISTED_ROUTES = new Set(['/count'])

/** Pages whose content is an article and therefore need an Article schema item. */
const ARTICLE_SECTIONS = new Set(['rooting-guides', 'general-guides', 'apps-and-modules'])
const ARTICLE_ROUTES = new Set([
  '/non-root-alternatives',
  '/resources',
  '/contributing',
  '/troubleshooting',
  '/count'
])
function isArticleRoute(route: string) {
  const [section] = route.split('/').filter(Boolean)
  return ARTICLE_SECTIONS.has(section) || ARTICLE_ROUTES.has(route)
}

/** Read a page's raw markdown so structured data can be derived from it at build time. */
const markdownCache = new Map<string, string>()
function readMarkdown(relativePath: string) {
  if (markdownCache.has(relativePath)) return markdownCache.get(relativePath)!
  let markdown = ''
  try {
    markdown = readFileSync(fileURLToPath(new URL(`../../${relativePath}`, import.meta.url)), 'utf-8')
  } catch {
    markdown = ''
  }
  markdownCache.set(relativePath, markdown)
  return markdown
}

/** Build FAQPage mainEntity from question headings and their answer paragraphs. */
export function faqFromMarkdown(markdown: string) {
  if (!markdown) return []
  const body = markdown.replace(/^---[\s\S]*?\n---\n/, '')
  const lines = body.split('\n')
  const questions: { question: string; lines: string[] }[] = []
  let current: { question: string; lines: string[] } | null = null
  let inFence = false

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence
      if (current) current.lines.push('')
      continue
    }
    if (inFence) continue
    // Thematic breaks separate FAQ sections; they are not answer content.
    if (/^\s{0,3}([-*_])(?:\s*\1){2,}\s*$/.test(line)) continue

    const heading = /^(#{2,4})\s+(.+?)\s*$/.exec(line)
    if (heading) {
      if (current) questions.push(current)
      const text = heading[2].trim()
      current = /^(how|what|why|when|where|which|who|can|is|are|does|do|will|should|if)\b.*\?\s*$/i.test(text)
        ? { question: text, lines: [] }
        : null
      continue
    }
    if (current) current.lines.push(line)
  }
  if (current) questions.push(current)

  return questions
    .map(({ question, lines }) => {
      const answer = lines
        .filter((line) => !/^\s*\|?[\s:|-]*-{3,}[\s:|-]*\|?\s*$/.test(line))
        .map((line) => (/^\s*\|.*\|\s*$/.test(line)
          ? line.trim().slice(1, -1).split('|').map((cell) => cell.trim()).filter(Boolean).join(' ')
          : line))
        .join('\n')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/<[^>]+>/g, '')
        .replace(/^\s*[-*]\s+/gm, '')
        .replace(/[`*_>#]/g, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim()
      return answer.length >= 40
        ? {
            '@type': 'Question',
            name: question,
            acceptedAnswer: { '@type': 'Answer', text: answer }
          }
        : null
    })
    .filter(Boolean)
}

export const sitemap: UserConfig['sitemap'] = {
  hostname: SITE,
  transformItems(items) {
    // 404 is not a page, and /count is a maintainer-only build output.
    return items.filter((item) => !/^\/?(404|count)(\.html)?$/.test(item.url))
  }
}

/** Canonical, social and JSON-LD tags generated for every page. */
export function transformHead({ pageData }: TransformContext): HeadConfig[] {
  const site = SITE
  const relativePath = pageData.relativePath || 'index.md'
  const route = routeFromRelativePath(relativePath)
  const pageUrl = `${site}${route}`

  const title = pageData.title || pageData.frontmatter?.title || SITE_NAME
  const description = pageData.description || pageData.frontmatter?.description || ''
  const socialTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`

  const dateModified = pageData.lastUpdated
    ? new Date(pageData.lastUpdated).toISOString()
    : undefined
  const published = pageData.frontmatter?.date
    ? new Date(pageData.frontmatter.date)
    : firstPublishedDate(relativePath)
  // Omit rather than invent a date when git history is unavailable.
  const datePublished = published && !Number.isNaN(published.getTime())
    ? published.toISOString()
    : undefined

  const segments = route.split('/').filter(Boolean)
  const breadcrumbItems = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${site}/` }
  ]
  segments.forEach((segment, index) => {
    const itemRoute = `/${segments.slice(0, index + 1).join('/')}`
    const isLast = index === segments.length - 1
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: index + 2,
      name: isLast
        ? title
        : (FOLDER_LABELS[segment] ??
          segment.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')),
      item: `${site}${itemRoute}`
    })
  })

  const frontmatterHead: HeadConfig[] = pageData.frontmatter?.head ?? []
  const frontmatterTagKeys = new Set()
  for (const entry of frontmatterHead) {
    if (!Array.isArray(entry) || entry.length < 2) continue
    const [tagName, attrs] = entry
    const key = attrs && (attrs.property || attrs.name || attrs.rel)
    if (tagName === 'meta' && attrs?.property) frontmatterTagKeys.add(attrs.property)
    else if (tagName === 'meta' && attrs?.name) frontmatterTagKeys.add(attrs.name)
    else if (tagName === 'link' && attrs?.rel === 'canonical') frontmatterTagKeys.add('link:canonical')
  }

  const ogImage = `${site}${DEFAULT_OG_IMAGE}`
  const frontmatterOgImage = frontmatterHead.find(
    (entry) => Array.isArray(entry) && entry[0] === 'meta' && entry[1]?.property === 'og:image'
  )?.[1]?.content
  const articleImage = frontmatterOgImage || ogImage

  const pageNode: SchemaNode = {
    '@type': pageTypeFor(route),
    '@id': `${pageUrl}#webpage`,
    name: title,
    headline: title,
    description,
    url: pageUrl,
    inLanguage: 'en-US',
    isPartOf: { '@id': WEBSITE_ID },
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID }
  }
  if (dateModified) pageNode.dateModified = dateModified

  const graph: SchemaNode[] = [ORGANIZATION_NODE, WEBSITE_NODE]

  if (route !== '/') {
    graph.push(pageNode)
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: breadcrumbItems
    })
    if (isArticleRoute(route)) {
      const articleNode: SchemaNode = {
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        headline: title,
        name: title,
        description,
        url: pageUrl,
        mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
        inLanguage: 'en-US',
        isPartOf: { '@id': WEBSITE_ID },
        author: { '@id': ORGANIZATION_ID },
        publisher: { '@id': ORGANIZATION_ID },
        image: articleImage
      }
      if (datePublished) articleNode.datePublished = datePublished
      const modified = dateModified ?? datePublished
      if (modified) articleNode.dateModified = modified
      graph.push(articleNode)
    }
    if (route === '/faqs') {
      const mainEntity = faqFromMarkdown(readMarkdown(relativePath))
      if (mainEntity.length) {
        graph.push({
          '@type': 'FAQPage',
          '@id': `${pageUrl}#faq`,
          name: title,
          description,
          url: pageUrl,
          inLanguage: 'en-US',
          isPartOf: { '@id': WEBSITE_ID },
          mainEntity
        })
      }
    }
  }

  const tags: HeadConfig[] = []

  // /count stays published for maintainers but is kept out of search engines.
  // mergeHead replaces the global robots meta because both share name="robots".
  if (UNLISTED_ROUTES.has(route)) tags.push(['meta', { name: 'robots', content: 'noindex, follow' }])

  if (pageData.lastUpdated) {
    tags.push([
      'meta',
      { property: 'article:modified_time', content: new Date(pageData.lastUpdated).toISOString() }
    ])
  }
  if (isArticleRoute(route) && datePublished) {
    tags.push([
      'meta',
      { property: 'article:published_time', content: datePublished }
    ])
  }

  const socialTags: [string, Record<string, string>, string][] = [
    ['link', { rel: 'canonical', href: pageUrl }, 'link:canonical'],
    ['meta', { property: 'og:type', content: route === '/' ? 'website' : 'article' }, 'og:type'],
    ['meta', { property: 'og:site_name', content: SITE_NAME }, 'og:site_name'],
    ['meta', { property: 'og:locale', content: 'en_US' }, 'og:locale'],
    ['meta', { property: 'og:title', content: socialTitle }, 'og:title'],
    ['meta', { property: 'og:description', content: description }, 'og:description'],
    ['meta', { property: 'og:url', content: pageUrl }, 'og:url'],
    ['meta', { property: 'og:image', content: ogImage }, 'og:image'],
    ['meta', { property: 'og:image:alt', content: socialTitle }, 'og:image:alt'],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }, 'twitter:card'],
    ['meta', { name: 'twitter:title', content: socialTitle }, 'twitter:title'],
    ['meta', { name: 'twitter:description', content: description }, 'twitter:description'],
    ['meta', { name: 'twitter:image', content: ogImage }, 'twitter:image'],
    ['meta', { name: 'twitter:site', content: TWITTER_SITE }, 'twitter:site']
  ]
  for (const [tagName, attrs, key] of socialTags) {
    if (frontmatterTagKeys.has(key)) continue
    tags.push([tagName, attrs])
  }

  tags.push([
    'script',
    { type: 'application/ld+json' },
    JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
  ])

  return tags
}

export const head: HeadConfig[] = [
  ['link', { rel: 'preload', href: '/fonts/inter-latin-wght-normal.woff2', as: 'font', type: 'font/woff2', crossorigin: '' }],
  ['link', { rel: 'preload', href: '/fonts/jetbrains-mono-latin-wght-normal.woff2', as: 'font', type: 'font/woff2', crossorigin: '' }],

  // Favicons and Touch Icons
  ['link', { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' }],
  ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
  ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/apple-touch-icon.png' }],


  ['meta', { media: '(prefers-color-scheme: light)', name: 'theme-color', content: '#fafafa' }],
  ['meta', { media: '(prefers-color-scheme: dark)', name: 'theme-color', content: '#0b0b0c' }],
  ['meta', { name: 'color-scheme', content: 'light dark' }],
  ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
  ['meta', { name: 'apple-mobile-web-app-title', content: 'AAR' }],
  ['meta', { name: 'application-name', content: 'Awesome Android Root' }],
  ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],

  // Sitemap & robots.txt
  ['link', { rel: 'robots', type: 'text/plain', href: '/robots.txt' }],
  ['link', { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' }],

  // web manifest
  ['link', { rel: 'manifest', href: '/manifest.json' }],

  // --- SEO Meta Tags ---
  // Titles, descriptions, canonicals and social tags are generated centrally
  // in transformHead, so only page-level directives live here.
  ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large' }],

  // --- Verification Tags ---
  ['meta', { name: 'google-site-verification', content: 'LZTsUH49HHfaPFDezfkN4dE0JmLUbOrY3NJKLr1ZPrE' }]
]
