import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'
import llmstxt, { copyOrDownloadAsMarkdownButtons } from 'vitepress-plugin-llms'
import { storeLinkPlugin } from './markdown/storeLinkPlugin.mjs'
import { withIcons } from './icons.mjs'

// ── Context7 Ask ───────────────────────────────────────────────────────
const CONTEXT7_SEARCH_ENDPOINT = 'https://context7.com/api/v2/ask?siteKey=ask_e76b34059e0dee80c89ca4c0'
const CONTEXT7_SEARCH_NOTE =
  'This site has a search endpoint: ' + CONTEXT7_SEARCH_ENDPOINT + '&query=<URL-encoded question>. It returns documentation that answers the question, with a source link for each part. No API key is needed. If nothing matches, it says so.'
// Hidden blockquote injected at top of <body> for agent discovery
const CONTEXT7_BODY_BLOCKQUOTE =
  '<blockquote data-context7-ask="true" aria-hidden="true" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0">' +
  '<h2>Search</h2>' +
  '<p>' + CONTEXT7_SEARCH_NOTE.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</p>' +
  '</blockquote>'

const isLlmPageLink = (link) =>
  typeof link === 'string' && link.startsWith('/') && link !== '/' && !link.includes('#')

const systemFontsPlugin = {
  name: 'aar-system-fonts',
  enforce: 'pre',
  resolveId(source, importer) {
    if (importer?.includes('theme-default') && /(^|\/)styles\/fonts\.css$/.test(source)) {
      return fileURLToPath(new URL('./theme/fonts.css', import.meta.url))
    }
    return null
  }
}

function llmsSidebar(sidebar) {
  const sanitizeItems = (items = []) => items.flatMap((item) => {
    const nestedItems = item.items ? sanitizeItems(item.items) : undefined
    const link = isLlmPageLink(item.link) ? item.link : undefined

    if (!link && (!nestedItems || nestedItems.length === 0)) return []

    const sanitized = { ...item }
    if (typeof sanitized.text === 'string') {
      sanitized.text = sanitized.text.replace(/<[^>]+>/g, '').trim()
    }
    if (link) sanitized.link = link
    else delete sanitized.link
    if (nestedItems) sanitized.items = nestedItems
    else delete sanitized.items
    return [sanitized]
  })

  if (Array.isArray(sidebar)) return sanitizeItems(sidebar)

  return Object.fromEntries(
    Object.entries(sidebar ?? {}).map(([route, items]) => [route, sanitizeItems(items)])
  )
}

const SITE = 'https://awesome-android-root.xyz'
const SITE_NAME = 'Awesome Android Root'
const TWITTER_SITE = '@awsm_and_root'
const DEFAULT_OG_IMAGE = '/images/og.png'

const ORGANIZATION_ID = `${SITE}/#organization`
const WEBSITE_ID = `${SITE}/#website`

const ORGANIZATION_NODE = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  description: 'A community-curated resource for Android rooting guides, troubleshooting, and root apps and modules.',
  url: `${SITE}/`,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'general support',
      url: 'https://github.com/awesome-android-root/awesome-android-root/issues/new'
    },
    {
      '@type': 'ContactPoint',
      contactType: 'security reports',
      email: 'security@awesome-android-root.xyz',
      url: 'https://github.com/awesome-android-root/awesome-android-root/security/advisories/new'
    }
  ],
  logo: {
    '@type': 'ImageObject',
    url: `${SITE}/images/logo.png`,
    width: 330,
    height: 330
  },
  sameAs: [
    'https://github.com/awesome-android-root',
    'https://x.com/awsm_and_root'
  ]
}

const WEBSITE_NODE = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE_NAME,
  url: `${SITE}/`,
  inLanguage: 'en-US',
  publisher: { '@id': ORGANIZATION_ID }
}

const FOLDER_LABELS = {
  'rooting-guides': 'Rooting Guides',
  'apps-and-modules': 'Apps & Modules',
  'general-guides': 'Tutorials'
}

function routeFromRelativePath(relativePath = 'index.md') {
  if (relativePath === 'index.md') return '/'
  return `/${relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')}`
}

/** CollectionPage for category hubs, TechArticle for step-by-step guides. */
function pageTypeFor(route) {
  const segments = route.split('/').filter(Boolean)
  const isSectionIndex = segments.length === 1 && Boolean(FOLDER_LABELS[segments[0]])
  if (segments[0] === 'apps-and-modules') return 'CollectionPage'
  if (isSectionIndex) return 'CollectionPage'
  if (segments[0] === 'rooting-guides' || segments[0] === 'general-guides') return 'TechArticle'
  return 'WebPage'
}

/** Read a page's raw markdown so structured data can be derived from it at build time. */
const markdownCache = new Map()
function readMarkdown(relativePath) {
  if (markdownCache.has(relativePath)) return markdownCache.get(relativePath)
  let markdown = ''
  try {
    markdown = readFileSync(fileURLToPath(new URL(`../${relativePath}`, import.meta.url)), 'utf-8')
  } catch {
    markdown = ''
  }
  markdownCache.set(relativePath, markdown)
  return markdown
}

/** Build FAQPage mainEntity from question headings and their answer paragraphs. */
function faqFromMarkdown(markdown) {
  if (!markdown) return []
  const body = markdown.replace(/^---[\s\S]*?\n---\n/, '')
  const lines = body.split('\n')
  const questions = []
  let current = null
  let inFence = false

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence
      if (current) current.lines.push('')
      continue
    }
    if (inFence) continue

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
        .join('\n')
        .replace(/^\s*[-*]\s+/gm, '')
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
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

export default withPwa(defineConfig({
  lang: 'en-US',
  title: SITE_NAME,
  ignoreDeadLinks: false,
  cleanUrls: true,
  lastUpdated: true,
  metaChunk: true,

  transformHtml(code) {
    // Inject hidden Context7 search blockquote at the top of <body> for agent discovery
    return code.replace('<body>', '<body>' + CONTEXT7_BODY_BLOCKQUOTE)
  },

  buildEnd(siteConfig) {
    // Inject Context7 search section into llms-full.txt after the first page's frontmatter
    const llmsFullPath = join(siteConfig.outDir, 'llms-full.txt')
    if (!existsSync(llmsFullPath)) return
    let content = readFileSync(llmsFullPath, 'utf-8')
    // Find the end of the first frontmatter block (second '---')
    const firstFence = content.indexOf('---')
    if (firstFence === -1) return
    const secondFence = content.indexOf('---', firstFence + 3)
    if (secondFence === -1) return
    const insertPos = secondFence + 3
    const section = `\n\n## Search\n\n${CONTEXT7_SEARCH_NOTE}\n\n`
    content = content.slice(0, insertPos) + section + content.slice(insertPos)
    writeFileSync(llmsFullPath, content, 'utf-8')
  },

  sitemap: {
    hostname: SITE,
    transformItems(items) {
      return items.filter((item) => !/^\/?404(\.html)?$/.test(item.url))
    }
  },

  transformHead({ pageData }) {
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
      : null
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

    const pageNode = {
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
    if (datePublished) pageNode.datePublished = datePublished

    const graph = [ORGANIZATION_NODE, WEBSITE_NODE]

    if (route !== '/') {
      graph.push(pageNode)
      graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: breadcrumbItems
      })
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

    const tags = []

    if (pageData.lastUpdated) {
      tags.push([
        'meta',
        { property: 'article:modified_time', content: new Date(pageData.lastUpdated).toISOString() }
      ])
    }
    const publishedDate = pageData.frontmatter?.date
    if (publishedDate) {
      const published = new Date(publishedDate)
      if (!Number.isNaN(published.getTime())) {
        tags.push([
          'meta',
          { property: 'article:published_time', content: published.toISOString() }
        ])
      }
    }

    const frontmatterHead = pageData.frontmatter?.head ?? []
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
    const socialTags = [
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
  },

  vite: {
    plugins: [
      llmstxt({ sidebar: llmsSidebar, excludeIndexPage: false,
        customLLMsTxtTemplate: `# {title}\n\n> {description}\n\n## Search\n\n${CONTEXT7_SEARCH_NOTE}\n\n{details}\n\n## Table of Contents\n\n{toc}`,
      }),
      systemFontsPlugin
    ],
    build: {
      chunkSizeWarningLimit: 1000,
    },
    server: {
      warmup: { clientFiles: ['.vitepress/theme/**/*.{js,ts,vue}'] },
      allowedHosts: true,
    },
    css: { devSourcemap: false },
    oxc: {
      target: 'es2022'
    },
    rolldownOptions: {
      output: {
        minify: process.env.NODE_ENV === 'production'
          ? {
            compress: { dropConsole: true, dropDebugger: true },
            mangle: true,
            codegen: { legalComments: 'none' }
          }
          : false
      }
    }
  },


  pwa: {
    strategies: 'generateSW',
    registerType: 'autoUpdate',

    workbox: {
      
      globPatterns: [
        '**/*.{png,jpg,jpeg,svg,gif,webp,avif,ico}',
      ],

      globIgnores: [
        '**/node_modules/**',
        '**/dev-dist/**',
        '**/.vitepress/cache/**',
        '**/images/og/**',
      ],

      skipWaiting: true,
      clientsClaim: true,
      cleanupOutdatedCaches: true,

      maximumFileSizeToCacheInBytes: 2 * 1024 * 1024,

      runtimeCaching: [
        {

          urlPattern: ({ url, sameOrigin }) =>
            sameOrigin && url.pathname.startsWith('/assets/'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'aar-static-assets',
            expiration: {
              maxEntries: 150,
              maxAgeSeconds: 60 * 60 * 24 * 365,  // filenames are content-hashed
              purgeOnQuotaError: true,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          }
        },
        {

          urlPattern: ({ request, url, sameOrigin }) => {
            const isImage = request.destination === 'image' ||
              /\.(png|jpg|jpeg|svg|gif|webp|avif|ico|bmp)$/i.test(url.pathname)

            const isAllowedOrigin = sameOrigin ||
              url.origin === 'https://raw.githubusercontent.com' ||
              url.origin === 'https://user-images.githubusercontent.com'

            return isImage && isAllowedOrigin
          },
          handler: 'CacheFirst',
          options: {
            cacheName: 'aar-images-v1',
            expiration: {
              maxEntries: 120,
              maxAgeSeconds: 60 * 60 * 24 * 60,  // 60 days (images rarely change)
              purgeOnQuotaError: true,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          }
        },
        {

          urlPattern: ({ url }) => url.origin === 'https://avatars.githubusercontent.com',
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'aar-github-avatars',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 7,  // 7 days
              purgeOnQuotaError: true,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          }
        },
        {
          urlPattern: ({ url }) => url.origin === 'https://img.shields.io',
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'aar-badges',
            expiration: {
              maxEntries: 40,
              maxAgeSeconds: 60 * 60 * 24,  // 1 day
              purgeOnQuotaError: true,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          }
        },
      ]
    },

    manifest: false,

    devOptions: {
      enabled: process.env.NODE_ENV === 'development',
      suppressWarnings: true,
      type: 'module'
    },

    injectRegister: 'script',
    minify: true,

  },


  markdown: {
    cache: true,
    anchor: { level: [2, 3, 4] },
    image: { lazyLoad: true },
    config: (md) => {
      md.use(storeLinkPlugin)
      md.use(copyOrDownloadAsMarkdownButtons)
    }
  },

  head: [

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
    ['meta', { name: 'google-site-verification', content: 'LZTsUH49HHfaPFDezfkN4dE0JmLUbOrY3NJKLr1ZPrE' }],
    ['meta', { name: 'context7-site-verification', content: 'ask_e76b34059e0dee80c89ca4c0' }]
  ],

  themeConfig: {
    logo: {
      light: '/images/logo.svg',
      dark: '/images/logo_dark.svg',
      alt: 'Awesome Android Root Logo'
    },
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: {
              title: 4,
              text: 2,
              titles: 3
            },
            boostDocument: (documentId) => {
              if (documentId.includes('apps-and-modules')) return 10
              return 1
            }
          }
        },
        async _render(src, env, md) {
          const html = await md.renderAsync(src, env)
          if (env.frontmatter?.search === false) return ''
          return html
        },
        translations: {
          button: {
            buttonText: 'Search',
            buttonAriaLabel: 'Search'
          },
          modal: {
            displayDetails: 'Display detailed list',
            resetButtonTitle: 'Reset search',
            backButtonTitle: 'Close search',
            noResultsText: 'No results for',
            footer: {
              selectText: 'to select',
              navigateText: 'to navigate',
              closeText: 'to close'
            }
          }
        }
      }
    },

    nav: withIcons([
      { text: 'Home', link: '/' },
      {
        text: 'Apps & Modules',
        link: '/apps-and-modules/',
        activeMatch: '^/apps-and-modules/'
      },
      {
        text: 'Rooting Guides',
        link: '/rooting-guides/',
        activeMatch: '^/rooting-guides/'
      },
      {
        text: 'Tutorials',
        link: '/general-guides/',
        activeMatch: '^/general-guides/'
      },
      {
        text: 'Help',
        items: [
          { text: 'FAQ', link: '/faqs' },
          { text: 'Troubleshooting', link: '/troubleshooting' },
          { text: 'Resources', link: '/resources' },
          { text: 'Non-Root Alternatives', link: '/non-root-alternatives' },
          { text: 'Contributing', link: '/contributing' },
          { text: 'Legal Disclaimer', link: '/legal-disclaimer' },
          { text: 'About', link: '/about' },
          { text: 'Contact', link: '/contact' },
          { text: 'Privacy', link: '/privacy' },
          { text: '⭐ GitHub', link: 'https://github.com/awesome-android-root/awesome-android-root' }
        ],
      },
    ]),

    sidebar: withIcons({
      // Main/Home Sidebar
      '/': [
        {
          text: '🚀 Quick Start',
          collapsed: false,
          items: [
            { text: 'What is Android Root?', link: '/rooting-guides/#understanding-root-access' },
            { text: 'Complete Rooting Guide', link: '/rooting-guides/' },
            { text: 'Browse All Apps & Modules', link: '/apps-and-modules/' },
            { text: 'Essential Must-Have Apps', link: '/apps-and-modules/#starter-kit-must-have-apps' }
          ]
        },
        {
          text: '🏆 Root Methods',
          collapsed: false,
          items: [
            { text: '⚖️ Compare Root Methods', link: '/rooting-guides/root-framework-comparison' },
            { text: '🏅 Magisk (Recommended)', link: '/rooting-guides/magisk-guide' },
            { text: '⚡ KernelSU', link: '/rooting-guides/kernelsu-guide' },
            { text: '🤖 APatch', link: '/rooting-guides/apatch-guide' },
            { text: '⚙️ LSPosed Framework', link: '/rooting-guides/lsposed-guide' },
            { text: '👻 Root Without Unlocking (GhostLock)', link: '/rooting-guides/root-without-unlocking-bootloader' }
          ]
        },
        {
          text: '📱 Device Guides',
          collapsed: true,
          items: [
            { text: '🔷 Google Pixel', link: '/rooting-guides/how-to-root-pixel-phone' },
            { text: '🔷 Samsung Galaxy', link: '/rooting-guides/how-to-root-samsung-phone' },
            { text: '🔷 Xiaomi/Redmi/POCO', link: '/rooting-guides/how-to-root-xiaomi-phone' },
            { text: '🔷 OnePlus', link: '/rooting-guides/how-to-root-oneplus-phone' },
            { text: '🔷 Nothing Phone', link: '/rooting-guides/how-to-root-nothing-phone' },
            { text: '🔷 Motorola', link: '/rooting-guides/how-to-root-motorola-phone' },
            { text: '📋 View All Devices', link: '/rooting-guides/#device-specific-guides' }
          ]
        },
        {
          text: '📚 Help & Resources',
          collapsed: true,
          items: [
            { text: '❓ Frequently Asked Questions', link: '/faqs' },
            { text: '🔧 Troubleshooting Guide', link: '/troubleshooting' },
            { text: '📖 Rooting Glossary', link: '/apps-and-modules/#glossary' },
            { text: '🌐 Community Resources', link: '/resources' },
            { text: '🔀 Non-Root Alternatives', link: '/non-root-alternatives' }
          ]
        }
      ],
      // Rooting Guides Sidebar
      '/rooting-guides/': [
        {
          text: '📖 Guide Overview',
          collapsed: false,
          items: [
            { text: 'Table of Contents', link: '/rooting-guides/' },
            { text: 'Understanding Root', link: '/rooting-guides/#understanding-root-access' },
            { text: 'Benefits vs Risks', link: '/rooting-guides/#benefits-vs-risks' },
            { text: 'Safety First', link: '/rooting-guides/#prerequisites-and-safety' }
          ]
        },
        {
          text: 'Root Methods',
          items: [
            { text: 'Compare Methods', link: '/rooting-guides/root-framework-comparison' },
            { text: 'Magisk (Recommended)', link: '/rooting-guides/magisk-guide' },
            { text: 'KernelSU', link: '/rooting-guides/kernelsu-guide' },
            { text: 'SUSFS Root Hiding', link: '/rooting-guides/susfs-guide' },
            { text: 'APatch', link: '/rooting-guides/apatch-guide' },
            { text: 'Temporary Root, No Unlock (GhostLock)', link: '/rooting-guides/root-without-unlocking-bootloader' }
          ]
        },
        {
          text: '🔒 Locked-Bootloader Options',
          collapsed: true,
          items: [
            { text: 'GhostLock Temporary Root', link: '/rooting-guides/root-without-unlocking-bootloader' },
            { text: 'Bootloader Mods & Temp Root', link: '/rooting-guides/temporary-root-solutions' }
          ]
        },
        {
          text: '🔧 Step-by-Step Process',
          collapsed: false,
          items: [
            { text: '1️⃣ Unlock Bootloader', link: '/rooting-guides/how-to-unlock-bootloader' },
            { text: '2️⃣ Install Custom Recovery', link: '/rooting-guides/how-to-install-custom-recovery' },
            { text: '3️⃣ Root Your Device', link: '/rooting-guides/#universal-rooting-process' },
            { text: '4️⃣ Install LSPosed Framework', link: '/rooting-guides/lsposed-guide' },
            { text: '5️⃣ Install Custom ROM (Optional)', link: '/rooting-guides/custom-rom-installation' }
          ]
        },
        {
          text: '📱 Device-Specific Guides',
          collapsed: true,
          items: [
            { text: '📋 All Supported Devices', link: '/rooting-guides/#device-specific-guides' },
            {
              text: '🏆 Popular Brands',
              items: [
                { text: 'Google Pixel Phones', link: '/rooting-guides/how-to-root-pixel-phone' },
                { text: 'Samsung Galaxy Devices', link: '/rooting-guides/how-to-root-samsung-phone' },
                { text: 'Xiaomi/Redmi/POCO', link: '/rooting-guides/how-to-root-xiaomi-phone' },
                { text: 'OnePlus Smartphones', link: '/rooting-guides/how-to-root-oneplus-phone' },
                { text: 'Motorola Phones', link: '/rooting-guides/how-to-root-motorola-phone' },
                { text: 'Nothing Phone Series', link: '/rooting-guides/how-to-root-nothing-phone' }
              ]
            }
          ]
        },
        {
          text: 'Help & Support',
          collapsed: true,
          items: [
            { text: 'Troubleshooting Guide', link: '/troubleshooting' },
            { text: 'Frequently Asked Questions', link: '/faqs' },
            { text: 'Community Help & Resources', link: '/rooting-guides/#community-and-support' },
            { text: 'Rooting Glossary', link: '/apps-and-modules/#glossary' }
          ]
        }
      ],

      // Apps and Modules Sidebar
      '/apps-and-modules/': [
        {
          text: '⭐ Quick Access',
          collapsed: false,
          items: [
            { text: 'Category Overview', link: '/apps-and-modules/' },
            { text: '⭐ Must-Have Apps', link: '/apps-and-modules/#starter-kit-must-have-apps' },
            { text: '📘 Glossary & Badges', link: '/apps-and-modules/#glossary' },
            { text: '🛡️ Safety Checklist', link: '/apps-and-modules/#safety-legal' }
          ]
        },
        {
          text: '🛠️ Root Management',
          link: '/apps-and-modules/root-management',
          collapsed: true,
          items: [
            { text: 'Root Managers', link: '/apps-and-modules/root-management#root-managers' },
            { text: 'Temporary Root (Locked Bootloader)', link: '/apps-and-modules/root-management#temporary-root-locked-bootloader' },
            { text: 'Module Managers', link: '/apps-and-modules/root-management#module-managers' },
            { text: 'Metamodules', link: '/apps-and-modules/root-management#metamodules' },
            { text: 'LSPosed & Xposed', link: '/apps-and-modules/root-management#lsposed-xposed' },
            { text: 'Zygisk', link: '/apps-and-modules/root-management#zygisk' },
            { text: 'Root Hiding & Play Integrity', link: '/apps-and-modules/root-management#root-hiding-play-integrity' },
            { text: 'Susfs', link: '/apps-and-modules/root-management#susfs' },
            { text: 'Bootloop Protection', link: '/apps-and-modules/root-management#bootloop-protection' },
            { text: 'Root Detection & Testing', link: '/apps-and-modules/root-management#root-detection-testing' },
          ]
        },
        {
          text: '⚙️ System',
          link: '/apps-and-modules/system',
          collapsed: true,
          items: [
            { text: 'System Tweaks', link: '/apps-and-modules/system#system-tweaks' },
            { text: 'VBMeta Mods', link: '/apps-and-modules/system#vbmeta-mods' },
            { text: 'System UI & Framework', link: '/apps-and-modules/system#system-ui-framework' },
            { text: 'AOSP (Android Open Source Project)', link: '/apps-and-modules/system#aosp-android-open-source-project' },
            { text: 'ColorOS (Oppo)', link: '/apps-and-modules/system#coloros-oppo' },
            { text: 'Flyme (Meizu)', link: '/apps-and-modules/system#flyme-meizu' },
            { text: 'HyperOS (Xiaomi)', link: '/apps-and-modules/system#hyperos-xiaomi' },
            { text: 'NothingOS', link: '/apps-and-modules/system#nothingos' },
            { text: 'One UI (Samsung)', link: '/apps-and-modules/system#one-ui-samsung' },
            { text: 'Onyx', link: '/apps-and-modules/system#onyx' },
            { text: 'Oxygen OS (OnePlus)', link: '/apps-and-modules/system#oxygen-os-oneplus' },
            { text: 'ZUI', link: '/apps-and-modules/system#zui' },
            { text: 'Boot & Startup', link: '/apps-and-modules/system#boot-startup' },
            { text: 'App & Package Management', link: '/apps-and-modules/system#app-package-management' },
            { text: 'Permissions & AppOps', link: '/apps-and-modules/system#permissions-appops' },
            { text: 'System Information & Diagnostics', link: '/apps-and-modules/system#system-information-diagnostics' },
          ]
        },
        {
          text: '⚡ Performance & Battery',
          link: '/apps-and-modules/performance',
          collapsed: true,
          items: [
            { text: 'Performance Optimization', link: '/apps-and-modules/performance#performance-optimization' },
            { text: 'Kernel Management', link: '/apps-and-modules/performance#kernel-management' },
            { text: 'Memory & RAM', link: '/apps-and-modules/performance#memory-ram' },
            { text: 'Battery Optimization', link: '/apps-and-modules/performance#battery-optimization' },
            { text: 'Charging & Power', link: '/apps-and-modules/performance#charging-power' },
            { text: 'Task & Process Management', link: '/apps-and-modules/performance#task-process-management' },
          ]
        },
        {
          text: '🕵️ Privacy',
          link: '/apps-and-modules/privacy',
          collapsed: true,
          items: [
            { text: 'Privacy Tools', link: '/apps-and-modules/privacy#privacy-tools' },
            { text: 'Device ID & Spoofing', link: '/apps-and-modules/privacy#device-id-spoofing' },
            { text: 'App Isolation', link: '/apps-and-modules/privacy#app-isolation' },
            { text: 'Location & GPS', link: '/apps-and-modules/privacy#location-gps' },
          ]
        },
        {
          text: '🔐 Security',
          link: '/apps-and-modules/security',
          collapsed: true,
          items: [
            { text: 'Security Tools', link: '/apps-and-modules/security#security-tools' },
            { text: 'Firewalls & Filtering', link: '/apps-and-modules/security#firewalls-filtering' },
          ]
        },
        {
          text: '🚫 Ad Blocking',
          link: '/apps-and-modules/ad-blocking',
          collapsed: true,
          items: [
            { text: 'Ad & Tracker Blocking', link: '/apps-and-modules/ad-blocking#ad-tracker-blocking' },
            { text: 'DNS & Network Filtering', link: '/apps-and-modules/ad-blocking#dns-network-filtering' },
          ]
        },
        {
          text: '🧩 App Modifications',
          link: '/apps-and-modules/app-modifications',
          collapsed: true,
          items: [
            { text: 'App Patchers', link: '/apps-and-modules/app-modifications#app-patchers' },
            { text: 'App Mods', link: '/apps-and-modules/app-modifications#app-mods' },
            { text: 'Social Media Mods', link: '/apps-and-modules/app-modifications#social-media-mods' },
            { text: 'Browser Mods', link: '/apps-and-modules/app-modifications#browser-mods' },
            { text: 'Media & Camera Mods', link: '/apps-and-modules/app-modifications#media-camera-mods' },
            { text: 'Signature & Verification', link: '/apps-and-modules/app-modifications#signature-verification' },
          ]
        },
        {
          text: '🧹 Debloating',
          link: '/apps-and-modules/debloating',
          collapsed: true,
          items: [
            { text: 'Debloating Tools & Modules', link: '/apps-and-modules/debloating#debloating' },
          ]
        },
        {
          text: '🗂️ File Management',
          link: '/apps-and-modules/file-management',
          collapsed: true,
          items: [
            { text: 'File Managers', link: '/apps-and-modules/file-management#file-managers' },
            { text: 'Cleaning', link: '/apps-and-modules/file-management#cleaning' },
            { text: 'File & Partition Tools', link: '/apps-and-modules/file-management#file-partition-tools' },
          ]
        },
        {
          text: '💾 Backup & Restore',
          link: '/apps-and-modules/backup',
          collapsed: true,
          items: [
            { text: 'Backup & Restore', link: '/apps-and-modules/backup#backup-restore' },
          ]
        },
        {
          text: '🎨 Customization',
          link: '/apps-and-modules/customization',
          collapsed: true,
          items: [
            { text: 'Themes & Visual Mods', link: '/apps-and-modules/customization#themes-visual-mods' },
            { text: 'Launchers & Home Screen', link: '/apps-and-modules/customization#launchers-home-screen' },
            { text: 'Status Bar & Navigation', link: '/apps-and-modules/customization#status-bar-navigation' },
            { text: 'Gestures & Controls', link: '/apps-and-modules/customization#gestures-controls' },
            { text: 'Fonts & Emojis', link: '/apps-and-modules/customization#fonts-emojis' },
            { text: 'Notifications', link: '/apps-and-modules/customization#notifications' },
            { text: 'Lockscreen & AOD', link: '/apps-and-modules/customization#lockscreen-aod' },
            { text: 'Screen & Display', link: '/apps-and-modules/customization#screen-display' },
          ]
        },
        {
          text: '🎵 Audio',
          link: '/apps-and-modules/audio',
          collapsed: true,
          items: [
            { text: 'Audio Enhancement', link: '/apps-and-modules/audio#audio-enhancement' },
            { text: 'Audio Control', link: '/apps-and-modules/audio#audio-control' },
            { text: 'Audio Effects', link: '/apps-and-modules/audio#audio-effects' },
          ]
        },
        {
          text: '🌐 Networking',
          link: '/apps-and-modules/networking',
          collapsed: true,
          items: [
            { text: 'VPN & Proxy', link: '/apps-and-modules/networking#vpn-proxy' },
            { text: 'Network Tools', link: '/apps-and-modules/networking#network-tools' },
            { text: 'Wi-Fi & Mobile Data', link: '/apps-and-modules/networking#wi-fi-mobile-data' },
            { text: 'Bluetooth & NFC', link: '/apps-and-modules/networking#bluetooth-nfc' },
          ]
        },
        {
          text: '🎮 Gaming',
          link: '/apps-and-modules/gaming',
          collapsed: true,
          items: [
            { text: 'Gaming Optimization', link: '/apps-and-modules/gaming#gaming-optimization' },
            { text: 'Game Modifications & Tools', link: '/apps-and-modules/gaming#game-modifications-tools' },
          ]
        },
        {
          text: '🧑‍💻 Development & Automation',
          link: '/apps-and-modules/development',
          collapsed: true,
          items: [
            { text: 'Terminal & Shell', link: '/apps-and-modules/development#terminal-shell' },
            { text: 'ADB & Debugging', link: '/apps-and-modules/development#adb-debugging' },
            { text: 'Developer Tools', link: '/apps-and-modules/development#developer-tools' },
            { text: 'Linux Environments', link: '/apps-and-modules/development#linux-environments' },
            { text: 'Automation', link: '/apps-and-modules/development#automation' },
            { text: 'Hardware & Sensors', link: '/apps-and-modules/development#hardware-sensors' },
          ]
        },
        {
          text: '🧰 General Utilities',
          link: '/apps-and-modules/utilities',
          collapsed: true,
          items: [
            { text: 'Sync & File Transfer', link: '/apps-and-modules/utilities#sync-file-transfer' },
            { text: 'Reboot & Power', link: '/apps-and-modules/utilities#reboot-power' },
            { text: 'Sharing & Intent Tools', link: '/apps-and-modules/utilities#sharing-intent-tools' },
            { text: 'Communication & Messaging', link: '/apps-and-modules/utilities#communication-messaging' },
            { text: 'General Toolboxes', link: '/apps-and-modules/utilities#general-toolboxes' },
          ]
        },
        {
          text: '📚 More Resources',
          collapsed: true,
          items: [
            { text: 'Rooting Guides', link: '/rooting-guides/' },
            { text: 'General Guides', link: '/general-guides/' },
            { text: 'Troubleshooting', link: '/troubleshooting' },
            { text: 'FAQs', link: '/faqs' },
            { text: 'Community Resources', link: '/resources' }
          ]
        }
      ],

      // General Guides Sidebar
      '/general-guides/': [
        {
          text: '📚 General Guides',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/general-guides/' },
            { text: 'Privacy & Ad Blocking', link: '/general-guides/#privacy-ad-blocking' },
            { text: 'App Management', link: '/general-guides/#app-management' },
            { text: 'Related Documentation', link: '/general-guides/#related-documentation' }
          ]
        },
        {
          text: '🛡️ Privacy & Ad Blocking',
          collapsed: false,
          items: [
            { text: 'Android Ad Blocking', link: '/general-guides/android-adblocking' }
          ]
        },
        {
          text: '📦 App Management',
          collapsed: false,
          items: [
            { text: 'Safely Debloat Android Apps', link: '/general-guides/android-apps-debloating' },
            { text: 'Stop Play Store Auto-Updates', link: '/general-guides/stop-android-app-auto-updates-play-store' }
          ]
        },
        {
          text: 'More Documentation',
          collapsed: true,
          items: [
            { text: 'Non-root Alternatives', link: '/non-root-alternatives' },
            { text: 'Rooting Guides', link: '/rooting-guides/' },
            { text: 'Troubleshooting', link: '/troubleshooting' },
            { text: 'FAQs', link: '/faqs' },
            { text: 'Apps & Modules', link: '/apps-and-modules/' }
          ]
        }
      ],

      // Standalone pages sidebars
      '/troubleshooting': [
        {
          text: 'Troubleshooting',
          items: [
            { text: 'Emergency Recovery', link: '/troubleshooting#emergency-recovery' },
            { text: 'Magisk Troubleshooting', link: '/troubleshooting#magisk-troubleshooting' },
            { text: 'KernelSU Troubleshooting', link: '/troubleshooting#kernelsu-troubleshooting' },
            { text: 'APatch Troubleshooting', link: '/troubleshooting#apatch-troubleshooting' },
            { text: 'Bootloader & Fastboot', link: '/troubleshooting#bootloader-and-fastboot-issues' },
            { text: 'Play Integrity', link: '/troubleshooting#play-integrity-and-banking-apps' }
          ]
        },
        {
          text: 'Related',
          items: [
            { text: 'Back to Guides', link: '/rooting-guides/' },
            { text: 'FAQ', link: '/faqs' },
            { text: 'Community Help', link: '/resources' }
          ]
        }
      ],

      '/faqs': [
        {
          text: 'FAQ',
          items: [
            { text: 'Getting Started', link: '/faqs#getting-started' },
            { text: 'Technical Questions', link: '/faqs#technical-questions' },
            { text: 'Compatibility', link: '/faqs#compatibility' },
            { text: 'After Rooting', link: '/faqs#after-rooting' },
            { text: 'Community and Support', link: '/faqs#community-and-support' }
          ]
        },
        {
          text: 'Related',
          items: [
            { text: 'Back to Guides', link: '/rooting-guides/' },
            { text: 'Troubleshooting', link: '/troubleshooting' },
            { text: 'Resources', link: '/resources' }
          ]
        }
      ],

      '/resources': [
        {
          text: 'Resources',
          items: [
            { text: 'Core Tooling', link: '/resources#core-tooling' },
            { text: 'Learning and Reference', link: '/resources#learning-and-reference' },
            { text: 'Communities and Support', link: '/resources#communities-and-support' },
            { text: 'Firmware and Device Data', link: '/resources#firmware-and-device-data' },
            { text: 'Emergency and Recovery', link: '/resources#emergency-and-recovery' },
            { text: 'Advanced Engineering', link: '/resources#advanced-engineering' }
          ]
        },
        {
          text: 'Quick Links',
          items: [
            { text: 'Rooting Guides', link: '/rooting-guides/' },
            { text: 'Browse Apps', link: '/apps-and-modules/' },
            { text: 'FAQ', link: '/faqs' }
          ]
        }
      ],

      '/about': [
        {
          text: 'About',
          items: [
            { text: 'Overview', link: '/about' },
            { text: 'What the Project Covers', link: '/about#what-the-project-covers' },
            { text: 'Getting Started', link: '/about#getting-started' },
            { text: 'Community & Contributions', link: '/about#community-and-contributions' }
          ]
        },
        {
          text: 'Get Involved',
          items: [
            { text: 'Contribute', link: '/contributing' },
            { text: 'GitHub', link: 'https://github.com/awesome-android-root/awesome-android-root' }
          ]
        }
      ],

      '/contributing': [
        {
          text: 'Contributing',
          items: [
            { text: 'Quick Start', link: '/contributing#quick-start' },
            { text: 'Entry Format', link: '/contributing#entry-format' },
            { text: 'Categories & Tags', link: '/contributing#categories-tags' },
            { text: 'Quality Requirements', link: '/contributing#quality-requirements' },
            { text: 'Pull Request Template', link: '/contributing#pull-request-template' }
          ]
        },
        {
          text: 'Resources',
          items: [
            { text: 'GitHub Issues', link: 'https://github.com/awesome-android-root/awesome-android-root/issues' },
            { text: 'Discussions', link: 'https://github.com/awesome-android-root/awesome-android-root/discussions' },
            { text: 'Project Home', link: '/' }
          ]
        }
      ],

      '/non-root-alternatives': [
        {
          text: 'Non-Root Alternatives',
          items: [
            { text: 'Overview', link: '/non-root-alternatives' },
            { text: 'Quick Assessment', link: '/non-root-alternatives#quick-assessment' },
            { text: 'Foundation Technologies', link: '/non-root-alternatives#foundation-technologies' },
            { text: 'Solutions by Need', link: '/non-root-alternatives#solutions-by-need' },
            { text: 'Non-Root Toolkit', link: '/non-root-alternatives#non-root-toolkit' },
            { text: 'Key ADB Commands', link: '/non-root-alternatives#key-adb-commands' },
            { text: 'Limitations', link: '/non-root-alternatives#limitations' },
            { text: 'Decision Guide', link: '/non-root-alternatives#decision-guide' },
            { text: 'Quick Start Guide', link: '/non-root-alternatives#quick-start-guide' },
            { text: 'Resources', link: '/non-root-alternatives#resources' }
          ]
        },
        {
          text: 'Related',
          items: [
            { text: 'Benefits vs Risks', link: '/rooting-guides/#benefits-vs-risks' },
            { text: 'Root Apps', link: '/apps-and-modules/' },
            { text: 'Home', link: '/' }
          ]
        }
      ]
    }),


    footer: {
      message: `
        <div style="display: flex; gap: 24px; justify-content: center; flex-wrap: wrap; align-items: center; margin-bottom: 8px; font-size: 14px;">
          <a href="/contributing" style="color: var(--vp-c-text-2); transition: color 0.2s; text-decoration: none; font-weight: 500;">Contribute</a>
          <span style="color: var(--vp-c-divider);">•</span>
          <a href="/legal-disclaimer" style="color: var(--vp-c-text-2); transition: color 0.2s; text-decoration: none; font-weight: 500;">Legal</a>
          <span style="color: var(--vp-c-divider);">•</span>
          <a href="https://github.com/awesome-android-root/awesome-android-root" style="color: var(--vp-c-text-2); transition: color 0.2s; text-decoration: none; font-weight: 500;">GitHub</a>
          <span style="color: var(--vp-c-divider);">•</span>
          <a href="https://x.com/awsm_and_root" style="color: var(--vp-c-text-2); transition: color 0.2s; text-decoration: none; font-weight: 500;">Twitter/X</a>
        </div>
      `,
      copyright: `Copyright © ${new Date().getFullYear()} Awesome Android Root Project`
    },

    outline: {
      level: [2, 3],
      label: 'On this page'
    },
    appearance: 'auto',
    socialLinks: [
      { icon: 'x', link: 'https://x.com/awsm_and_root' },
      { icon: 'github', link: 'https://github.com/awesome-android-root/awesome-android-root' }
    ],
  },
}))
