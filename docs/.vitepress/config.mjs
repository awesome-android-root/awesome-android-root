import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'
import llmstxt, { copyOrDownloadAsMarkdownButtons } from 'vitepress-plugin-llms'
import { APP_CATEGORIES } from './categoryData.mjs'
import { entryRowsPlugin, countCategoryEntries } from './markdown/entryRows.mjs'
import { storeLinkPlugin } from './markdown/storeLinkPlugin.mjs'

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

const docsDirectory = fileURLToPath(new URL('../', import.meta.url))
const appsDirectory = path.join(docsDirectory, 'apps-and-modules')
const entryStats = countCategoryEntries(appsDirectory, APP_CATEGORIES, (path) => readFileSync(path, 'utf8'))

function llmsSidebar(sidebar) {
  const sanitizeItems = (items = []) => items.flatMap((item) => {
    const nestedItems = item.items ? sanitizeItems(item.items) : undefined
    const link = isLlmPageLink(item.link) ? item.link : undefined

    if (!link && (!nestedItems || nestedItems.length === 0)) return []

    const sanitized = { ...item }
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

const siteConfig = defineConfig({
  lang: 'en-US',
  title: 'Awesome Android Root',
  titleTemplate: ':title · Awesome Android Root',
  ignoreDeadLinks: true,
  cleanUrls: true,
  lastUpdated: true,
  metaChunk: true,

  transformHead({ pageData, title: fullTitle, description: pageDescription }) {
    const site = 'https://awesome-android-root.xyz'
    const relativePath = pageData.relativePath || 'index.md'
    const route = relativePath === 'index.md'
      ? '/'
      : `/${relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')}`
    const pageUrl = `${site}${route}`
    const title = fullTitle || pageData.title || 'Awesome Android Root'
    const description = pageDescription || pageData.description || 'A curated index of Android root apps, modules and practical guides.'
    const frontmatterHead = Array.isArray(pageData.frontmatter?.head) ? pageData.frontmatter.head : []
    const themeColorHead = [
      ['meta', { media: '(prefers-color-scheme: light)', name: 'theme-color', content: '#fafafa' }],
      ['meta', { media: '(prefers-color-scheme: dark)', name: 'theme-color', content: '#0b0b0c' }]
    ]
    const seoHead = [
      ['link', { rel: 'canonical', href: pageUrl }],
      ['meta', { property: 'og:type', content: route.startsWith('/rooting-guides/') || route.startsWith('/general-guides/') ? 'article' : 'website' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: pageUrl }],
      ['meta', { property: 'og:image', content: `${site}/images/og.png` }],
      ['meta', { property: 'og:image:alt', content: 'Awesome Android Root: apps, modules and guides' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:site', content: '@awsm_and_root' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: `${site}/images/og.png` }]
    ]
    const hasSocialTag = (tagName, attributes) => frontmatterHead.some((entry) => {
      if (!Array.isArray(entry) || entry[0] !== tagName || !entry[1]) return false
      return Object.entries(attributes).every(([key, value]) => entry[1][key] === value)
    })

    const head = [...themeColorHead]
    for (const [tagName, attributes] of seoHead) {
      const key = attributes.rel ? 'rel' : attributes.property ? 'property' : 'name'
      if (!hasSocialTag(tagName, { [key]: attributes[key] })) head.push([tagName, attributes])
    }

    const labels = route.split('/').filter(Boolean).map((part) =>
      part.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    )
    const breadcrumbItems = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${site}/` }
    ]
    labels.forEach((label, index) => {
      const itemRoute = `/${route.split('/').filter(Boolean).slice(0, index + 1).join('/')}`
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: index + 2,
        name: label,
        item: `${site}${itemRoute}`
      })
    })

    const graph = [
      {
        '@type': 'Organization',
        '@id': `${site}/#organization`,
        name: 'Awesome Android Root',
        url: `${site}/`,
        logo: {
          '@type': 'ImageObject',
          url: `${site}/images/logo.png`,
          width: 330,
          height: 330
        },
        sameAs: [
          'https://github.com/awesome-android-root',
          'https://x.com/awsm_and_root'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': `${site}/#website`,
        name: 'Awesome Android Root',
        url: `${site}/`,
        inLanguage: 'en-US',
        publisher: { '@id': `${site}/#organization` }
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        name: title,
        description,
        url: pageUrl,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${site}/#website` },
        publisher: { '@id': `${site}/#organization` },
        ...(pageData.lastUpdated ? { dateModified: new Date(pageData.lastUpdated).toISOString() } : {})
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: breadcrumbItems
      }
    ]

    if (route === '/apps-and-modules/') {
      graph.push({
        '@type': 'ItemList',
        '@id': `${pageUrl}#categories`,
        name: 'Android root app and module categories',
        numberOfItems: entryStats.categories.length,
        itemListElement: entryStats.categories.map((category, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: category.title,
          url: `${site}/apps-and-modules/${category.slug}`,
          numberOfItems: category.count
        }))
      })
    }

    const hasJsonLd = frontmatterHead.some((entry) =>
      Array.isArray(entry) && entry[0] === 'script' && entry[1]?.type === 'application/ld+json'
    )
    if (!hasJsonLd) {
      head.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
      ])
    }

    return head
  },

  transformHtml(html, _id, { pageData }) {
    // VitePress adds DNS-prefetch hints for external Markdown links; omit them to keep page loads same-origin.
    html = html.replace(/<link\s+rel="dns-prefetch"\s+href="https?:\/\/[^\"]+"\s*\/?\s*>/gi, '')
    const relativePath = pageData.relativePath || ''
    const isGuide = /^(rooting-guides|general-guides)\//.test(relativePath) ||
      ['faqs.md', 'troubleshooting.md'].includes(relativePath)
    if (!isGuide || /class="guide-meta"/.test(html)) return html

    const sourcePath = path.join(docsDirectory, pageData.filePath || relativePath)
    let source = ''
    try {
      source = readFileSync(sourcePath, 'utf8')
    } catch {
      return html
    }

    const body = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<[^>]*>/g, ' ')
      .replace(/!?\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[`*_~>#|]/g, ' ')
    const wordCount = (body.match(/[\p{L}\p{N}]+/gu) || []).length
    const readingTime = Math.max(1, Math.ceil(wordCount / 220))
    const updatedDate = pageData.lastUpdated
      ? new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(pageData.lastUpdated))
      : ''
    const slug = relativePath.split('/').at(-1)?.replace(/\.md$/, '')
    const framework = pageData.frontmatter?.framework || ({
      'magisk-guide': 'Magisk',
      'kernelsu-guide': 'KernelSU',
      'apatch-guide': 'APatch',
      'lsposed-guide': 'LSPosed'
    })[slug]
    const metaText = [`${readingTime} min read`, updatedDate && `Updated ${updatedDate}`, framework].filter(Boolean).join(' · ')
    const meta = `<p class="guide-meta" aria-label="Guide details">${metaText}</p>`

    return html.replace(/(<h1\b[^>]*>[\s\S]*?<\/h1>)/i, `$1${meta}`)
  },

  vite: {
    plugins: [
      llmstxt({ sidebar: llmsSidebar }),
      systemFontsPlugin
    ],
    build: {
      chunkSizeWarningLimit: 600,
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
        '**/*.{css,js,woff2,ico,svg,png}',
        '**/offline.html'
      ],
      globIgnores: [
        '**/node_modules/**',
        '**/dev-dist/**',
        '**/.vitepress/cache/**',
        '**/images/og/**'
      ],
      navigateFallback: '/offline.html',
      navigateFallbackDenylist: [/^\/(?:assets|images|fonts)\//],
      skipWaiting: true,
      clientsClaim: true,
      cleanupOutdatedCaches: true,
      maximumFileSizeToCacheInBytes: 2 * 1024 * 1024,
      runtimeCaching: [
        {
          urlPattern: ({ request, sameOrigin }) => sameOrigin && request.mode === 'navigate',
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'aar-pages-v1',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 60 * 60 * 24 * 30,
              purgeOnQuotaError: true
            },
            cacheableResponse: { statuses: [200] }
          }
        },
        {
          urlPattern: ({ url, sameOrigin }) => sameOrigin && url.pathname.startsWith('/assets/'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'aar-static-assets-v1',
            expiration: {
              maxEntries: 150,
              maxAgeSeconds: 60 * 60 * 24 * 365,
              purgeOnQuotaError: true
            },
            cacheableResponse: { statuses: [200] }
          }
        },
        {
          urlPattern: ({ request, sameOrigin }) => sameOrigin && request.destination === 'image',
          handler: 'CacheFirst',
          options: {
            cacheName: 'aar-images-v1',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 60 * 60 * 24 * 60,
              purgeOnQuotaError: true
            },
            cacheableResponse: { statuses: [200] }
          }
        }
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
    theme: { light: 'github-light', dark: 'github-dark-default' },
    anchor: { level: [2, 3, 4] },
    image: { lazyLoad: true },
    config: (md) => {
      md.use(storeLinkPlugin)
      md.use(entryRowsPlugin)
      md.use(copyOrDownloadAsMarkdownButtons)
    }
  },

  head: [

    // Favicons and Touch Icons
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/apple-touch-icon.png' }],


    ['meta', { name: 'color-scheme', content: 'light dark' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'AAR' }],
    ['meta', { name: 'application-name', content: 'Awesome Android Root' }],
    ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],

    // Sitemap
    ['link', { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' }],

    // web manifest 
    ['link', { rel: 'manifest', href: '/manifest.json' }],

    // --- SEO Meta Tags ---
    ['meta', { name: 'publisher', content: 'Awesome Android Root Project' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' }],
    ['meta', { name: 'googlebot', content: 'index, follow, max-image-preview:large' }],
    ['meta', { name: 'language', content: 'en-US' }],
    ['meta', { name: 'distribution', content: 'global' }],
    ['meta', { name: 'rating', content: 'general' }],
    ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],

    // --- Verification Tags ---
    ['meta', { name: 'google-site-verification', content: 'LZTsUH49HHfaPFDezfkN4dE0JmLUbOrY3NJKLr1ZPrE' }]
  ],

  themeConfig: {
    entryCount: entryStats.total,
    categories: entryStats.categories,
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

    nav: [
      {
        text: 'Apps & modules',
        link: '/apps-and-modules/',
        activeMatch: '^/apps-and-modules/'
      },
      {
        text: 'Rooting guides',
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
          { text: 'Non-root alternatives', link: '/non-root-alternatives' },
          { text: 'Contributing', link: '/contributing' },
          { text: 'Legal disclaimer', link: '/legal-disclaimer' },
          { text: 'About', link: '/about' }
        ],
      },
    ],

    sidebar: {
      // Main/Home Sidebar
      '/': [
        {
          text: 'Quick start',
          collapsed: false,
          items: [
            { text: 'What is Android root?', link: '/rooting-guides/#understanding-root-access' },
            { text: 'Complete rooting guide', link: '/rooting-guides/' },
            { text: 'Browse all apps & modules', link: '/apps-and-modules/' },
            { text: 'Root management apps', link: '/apps-and-modules/root-management' }
          ]
        },
        {
          text: 'Root methods',
          collapsed: false,
          items: [
            { text: 'Compare root methods', link: '/rooting-guides/root-framework-comparison' },
            { text: 'Magisk (recommended)', link: '/rooting-guides/magisk-guide' },
            { text: 'KernelSU', link: '/rooting-guides/kernelsu-guide' },
            { text: 'APatch', link: '/rooting-guides/apatch-guide' },
            { text: 'LSPosed framework', link: '/rooting-guides/lsposed-guide' },
            { text: 'Root without unlocking (GhostLock)', link: '/rooting-guides/root-without-unlocking-bootloader' }
          ]
        },
        {
          text: 'Device guides',
          collapsed: true,
          items: [
            { text: 'Google Pixel', link: '/rooting-guides/how-to-root-pixel-phone' },
            { text: 'Samsung Galaxy', link: '/rooting-guides/how-to-root-samsung-phone' },
            { text: 'Xiaomi/Redmi/POCO', link: '/rooting-guides/how-to-root-xiaomi-phone' },
            { text: 'OnePlus', link: '/rooting-guides/how-to-root-oneplus-phone' },
            { text: 'Nothing Phone', link: '/rooting-guides/how-to-root-nothing-phone' },
            { text: 'Motorola', link: '/rooting-guides/how-to-root-motorola-phone' },
            { text: 'View all devices', link: '/rooting-guides/#device-specific-guides' }
          ]
        },
        {
          text: 'Help & resources',
          collapsed: true,
          items: [
            { text: 'Frequently asked questions', link: '/faqs' },
            { text: 'Troubleshooting guide', link: '/troubleshooting' },
            { text: 'Rooting glossary', link: '/apps-and-modules/#glossary-and-badges' },
            { text: 'Community resources', link: '/resources' },
            { text: 'Non-root alternatives', link: '/non-root-alternatives' }
          ]
        }
      ],
      // Rooting Guides Sidebar
      '/rooting-guides/': [
        {
          text: 'Guide overview',
          collapsed: false,
          items: [
            { text: 'Table of contents', link: '/rooting-guides/' },
            { text: 'Understanding root', link: '/rooting-guides/#understanding-root-access' },
            { text: 'Benefits vs risks', link: '/rooting-guides/#benefits-vs-risks' },
            { text: 'Safety first', link: '/rooting-guides/#prerequisites-and-safety' }
          ]
        },
        {
          text: 'Root methods',
          items: [
            { text: 'Compare methods', link: '/rooting-guides/root-framework-comparison' },
            { text: 'Magisk (recommended)', link: '/rooting-guides/magisk-guide' },
            { text: 'KernelSU', link: '/rooting-guides/kernelsu-guide' },
            { text: 'APatch', link: '/rooting-guides/apatch-guide' },
            { text: 'Temporary root, no unlock (GhostLock)', link: '/rooting-guides/root-without-unlocking-bootloader' }
          ]
        },
        {
          text: 'Locked-bootloader options',
          collapsed: true,
          items: [
            { text: 'GhostLock temporary root', link: '/rooting-guides/root-without-unlocking-bootloader' },
            { text: 'Bootloader mods & temp root', link: '/rooting-guides/temporary-root-solutions' }
          ]
        },
        {
          text: 'Step-by-step process',
          collapsed: false,
          items: [
            { text: '1. Unlock bootloader', link: '/rooting-guides/how-to-unlock-bootloader' },
            { text: '2. Install custom recovery', link: '/rooting-guides/how-to-install-custom-recovery' },
            { text: '3. Root your device', link: '/rooting-guides/#universal-rooting-process' },
            { text: '4. Install LSPosed framework', link: '/rooting-guides/lsposed-guide' },
            { text: '5. Install custom ROM (optional)', link: '/rooting-guides/custom-rom-installation' }
          ]
        },
        {
          text: 'Device-specific guides',
          collapsed: true,
          items: [
            { text: 'All supported devices', link: '/rooting-guides/#device-specific-guides' },
            {
              text: 'Popular brands',
              items: [
                { text: 'Google Pixel phones', link: '/rooting-guides/how-to-root-pixel-phone' },
                { text: 'Samsung Galaxy devices', link: '/rooting-guides/how-to-root-samsung-phone' },
                { text: 'Xiaomi/Redmi/POCO', link: '/rooting-guides/how-to-root-xiaomi-phone' },
                { text: 'OnePlus smartphones', link: '/rooting-guides/how-to-root-oneplus-phone' },
                { text: 'Motorola phones', link: '/rooting-guides/how-to-root-motorola-phone' },
                { text: 'Nothing Phone series', link: '/rooting-guides/how-to-root-nothing-phone' }
              ]
            }
          ]
        },
        {
          text: 'Help & support',
          collapsed: true,
          items: [
            { text: 'Troubleshooting guide', link: '/troubleshooting' },
            { text: 'Frequently asked questions', link: '/faqs' },
            { text: 'Community help & resources', link: '/rooting-guides/#community-and-support' },
            { text: 'Rooting glossary', link: '/apps-and-modules/#glossary-and-badges' }
          ]
        }
      ],

      // Apps and Modules Sidebar
      '/apps-and-modules/': [
        {
          text: 'Quick access',
          collapsed: true,
          items: [
            { text: 'Category overview', link: '/apps-and-modules/' },
            { text: 'Root management apps', link: '/apps-and-modules/root-management' },
            { text: 'Glossary & badges', link: '/apps-and-modules/#glossary-and-badges' },
            { text: 'Safety checklist', link: '/apps-and-modules/#safety-checklist' }
          ]
        },
        {
          text: 'Root management',
          link: '/apps-and-modules/root-management',
          collapsed: true,
          items: [
            { text: 'Root managers', link: '/apps-and-modules/root-management#root-managers' },
            { text: 'Temporary root (locked bootloader)', link: '/apps-and-modules/root-management#temporary-root-locked-bootloader' },
            { text: 'Module managers', link: '/apps-and-modules/root-management#module-managers' },
            { text: 'Metamodules', link: '/apps-and-modules/root-management#metamodules' },
            { text: 'LSPosed & Xposed', link: '/apps-and-modules/root-management#lsposed-xposed' },
            { text: 'Zygisk', link: '/apps-and-modules/root-management#zygisk' },
            { text: 'Root hiding & Play Integrity', link: '/apps-and-modules/root-management#root-hiding-play-integrity' },
            { text: 'Susfs', link: '/apps-and-modules/root-management#susfs' },
            { text: 'Bootloop protection', link: '/apps-and-modules/root-management#bootloop-protection' },
            { text: 'Root detection & testing', link: '/apps-and-modules/root-management#root-detection-testing' },
          ]
        },
        {
          text: 'System',
          link: '/apps-and-modules/system',
          collapsed: true,
          items: [
            { text: 'System tweaks', link: '/apps-and-modules/system#system-tweaks' },
            { text: 'VBMeta mods', link: '/apps-and-modules/system#vbmeta-mods' },
            { text: 'System UI & framework', link: '/apps-and-modules/system#system-ui-framework' },
            { text: 'AOSP (Android Open Source Project)', link: '/apps-and-modules/system#aosp-android-open-source-project' },
            { text: 'ColorOS (OPPO)', link: '/apps-and-modules/system#coloros-oppo' },
            { text: 'HyperOS (Xiaomi)', link: '/apps-and-modules/system#hyperos-xiaomi' },
            { text: 'NothingOS', link: '/apps-and-modules/system#nothingos' },
            { text: 'One UI (Samsung)', link: '/apps-and-modules/system#one-ui-samsung' },
            { text: 'Onyx', link: '/apps-and-modules/system#onyx' },
            { text: 'Oxygen OS (OnePlus)', link: '/apps-and-modules/system#oxygen-os-oneplus' },
            { text: 'ZUI', link: '/apps-and-modules/system#zui' },
            { text: 'Boot & startup', link: '/apps-and-modules/system#boot-startup' },
            { text: 'App & package management', link: '/apps-and-modules/system#app-package-management' },
            { text: 'Permissions & AppOps', link: '/apps-and-modules/system#permissions-appops' },
            { text: 'System information & diagnostics', link: '/apps-and-modules/system#system-information-diagnostics' },
          ]
        },
        {
          text: 'Performance & battery',
          link: '/apps-and-modules/performance',
          collapsed: true,
          items: [
            { text: 'Performance optimization', link: '/apps-and-modules/performance#performance-optimization' },
            { text: 'Kernel management', link: '/apps-and-modules/performance#kernel-management' },
            { text: 'Memory & RAM', link: '/apps-and-modules/performance#memory-ram' },
            { text: 'Battery optimization', link: '/apps-and-modules/performance#battery-optimization' },
            { text: 'Charging & power', link: '/apps-and-modules/performance#charging-power' },
            { text: 'Task & process management', link: '/apps-and-modules/performance#task-process-management' },
          ]
        },
        {
          text: 'Privacy',
          link: '/apps-and-modules/privacy',
          collapsed: true,
          items: [
            { text: 'Privacy tools', link: '/apps-and-modules/privacy#privacy-tools' },
            { text: 'Device ID & spoofing', link: '/apps-and-modules/privacy#device-id-spoofing' },
            { text: 'App isolation', link: '/apps-and-modules/privacy#app-isolation' },
            { text: 'Location & GPS', link: '/apps-and-modules/privacy#location-gps' },
          ]
        },
        {
          text: 'Security',
          link: '/apps-and-modules/security',
          collapsed: true,
          items: [
            { text: 'Security tools', link: '/apps-and-modules/security#security-tools' },
            { text: 'Firewalls & filtering', link: '/apps-and-modules/security#firewalls-filtering' },
          ]
        },
        {
          text: 'Ad blocking',
          link: '/apps-and-modules/ad-blocking',
          collapsed: true,
          items: [
            { text: 'Ad & tracker blocking', link: '/apps-and-modules/ad-blocking#ad-tracker-blocking' },
            { text: 'DNS & network filtering', link: '/apps-and-modules/ad-blocking#dns-network-filtering' },
          ]
        },
        {
          text: 'App modifications',
          link: '/apps-and-modules/app-modifications',
          collapsed: true,
          items: [
            { text: 'App patchers', link: '/apps-and-modules/app-modifications#app-patchers' },
            { text: 'App mods', link: '/apps-and-modules/app-modifications#app-mods' },
            { text: 'Social media mods', link: '/apps-and-modules/app-modifications#social-media-mods' },
            { text: 'Browser mods', link: '/apps-and-modules/app-modifications#browser-mods' },
            { text: 'YouTube & media mods', link: '/apps-and-modules/app-modifications#youtube-media-mods' },
            { text: 'Signature & verification', link: '/apps-and-modules/app-modifications#signature-verification' },
          ]
        },
        {
          text: 'Debloating',
          link: '/apps-and-modules/debloating',
          collapsed: true,
          items: [
            { text: 'Debloating tools & modules', link: '/apps-and-modules/debloating#debloating-apps-modules' },
          ]
        },
        {
          text: 'File management',
          link: '/apps-and-modules/file-management',
          collapsed: true,
          items: [
            { text: 'File managers', link: '/apps-and-modules/file-management#file-managers' },
            { text: 'Cleaning', link: '/apps-and-modules/file-management#cleaning' },
            { text: 'File & partition tools', link: '/apps-and-modules/file-management#file-partition-tools' },
          ]
        },
        {
          text: 'Backup & restore',
          link: '/apps-and-modules/backup',
          collapsed: true,
          items: [
            { text: 'Backup & restore', link: '/apps-and-modules/backup#backup-apps-tools' },
          ]
        },
        {
          text: 'Customization',
          link: '/apps-and-modules/customization',
          collapsed: true,
          items: [
            { text: 'Themes & visual mods', link: '/apps-and-modules/customization#themes-visual-mods' },
            { text: 'Launchers & home screen', link: '/apps-and-modules/customization#launchers-home-screen' },
            { text: 'Status bar & navigation', link: '/apps-and-modules/customization#status-bar-navigation' },
            { text: 'Gestures & controls', link: '/apps-and-modules/customization#gestures-controls' },
            { text: 'Fonts & emojis', link: '/apps-and-modules/customization#fonts-emojis' },
            { text: 'Notifications', link: '/apps-and-modules/customization#notifications' },
            { text: 'Lockscreen & AOD', link: '/apps-and-modules/customization#lockscreen-aod' },
            { text: 'Screen & display', link: '/apps-and-modules/customization#screen-display' },
          ]
        },
        {
          text: 'Audio',
          link: '/apps-and-modules/audio',
          collapsed: true,
          items: [
            { text: 'Audio enhancement', link: '/apps-and-modules/audio#audio-enhancement' },
            { text: 'Audio control', link: '/apps-and-modules/audio#audio-control' },
            { text: 'Audio effects', link: '/apps-and-modules/audio#audio-effects' },
          ]
        },
        {
          text: 'Networking',
          link: '/apps-and-modules/networking',
          collapsed: true,
          items: [
            { text: 'VPN & proxy', link: '/apps-and-modules/networking#vpn-proxy' },
            { text: 'Network tools', link: '/apps-and-modules/networking#network-tools' },
            { text: 'Wi-Fi & mobile data', link: '/apps-and-modules/networking#wi-fi-mobile-data' },
            { text: 'Bluetooth & NFC', link: '/apps-and-modules/networking#bluetooth-nfc' },
          ]
        },
        {
          text: 'Gaming',
          link: '/apps-and-modules/gaming',
          collapsed: true,
          items: [
            { text: 'Gaming optimization', link: '/apps-and-modules/gaming#gaming-optimization' },
            { text: 'Game modifications & tools', link: '/apps-and-modules/gaming#game-modifications-tools' },
          ]
        },
        {
          text: 'Development & automation',
          link: '/apps-and-modules/development',
          collapsed: true,
          items: [
            { text: 'Terminal & shell', link: '/apps-and-modules/development#terminal-shell' },
            { text: 'ADB & debugging', link: '/apps-and-modules/development#adb-debugging' },
            { text: 'Developer tools', link: '/apps-and-modules/development#developer-tools' },
            { text: 'Linux environments', link: '/apps-and-modules/development#linux-environments' },
            { text: 'Automation', link: '/apps-and-modules/development#automation' },
            { text: 'Hardware & sensors', link: '/apps-and-modules/development#hardware-sensors' },
          ]
        },
        {
          text: 'General utilities',
          link: '/apps-and-modules/utilities',
          collapsed: true,
          items: [
            { text: 'Sync & file transfer', link: '/apps-and-modules/utilities#sync-file-transfer' },
            { text: 'Reboot & power', link: '/apps-and-modules/utilities#reboot-power' },
            { text: 'Sharing & intent tools', link: '/apps-and-modules/utilities#sharing-intent-tools' },
            { text: 'Communication & messaging', link: '/apps-and-modules/utilities#communication-messaging' },
            { text: 'General toolboxes', link: '/apps-and-modules/utilities#general-toolboxes' },
          ]
        },
        {
          text: 'More resources',
          collapsed: true,
          items: [
            { text: 'Rooting guides', link: '/rooting-guides/' },
            { text: 'General guides', link: '/general-guides/' },
            { text: 'Troubleshooting', link: '/troubleshooting' },
            { text: 'FAQs', link: '/faqs' },
            { text: 'Community resources', link: '/resources' }
          ]
        }
      ],

      // General Guides Sidebar
      '/general-guides/': [
        {
          text: 'All tutorials',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/general-guides/' },
            { text: 'Quick navigation', link: '/general-guides/#quick-navigation' }
          ]
        },
        {
          text: 'Privacy & security',
          collapsed: false,
          items: [
            { text: 'Security guides', link: '/general-guides/#privacy-security-guides' },
            { text: 'Ad blocking', link: '/general-guides/android-adblocking' }
          ]
        },
        {
          text: 'App management',
          collapsed: false,
          items: [
            { text: 'App optimization', link: '/general-guides/#app-management-optimization' },
            { text: 'Debloating guide', link: '/general-guides/android-apps-debloating' },
            { text: 'Stop auto updates', link: '/general-guides/stop-android-app-auto-updates-play-store' }
          ]
        },
        {
          text: 'System optimization',
          collapsed: true,
          items: [
            { text: 'Performance guides', link: '/general-guides/#performance-system-optimization' },
            { text: 'Battery optimization', link: '/general-guides/#battery-power-management' }
          ]
        },
        {
          text: 'Customization',
          collapsed: true,
          items: [
            { text: 'Theming guides', link: '/general-guides/#customization-theming' },
            { text: 'UI modifications', link: '/general-guides/#system-ui-changes' }
          ]
        },
        {
          text: 'Advanced topics',
          collapsed: true,
          items: [
            { text: 'Technical guides', link: '/general-guides/#development-technical-guides' },
            { text: 'Android knowledge', link: '/general-guides/#essential-android-knowledge' }
          ]
        },
        {
          text: 'Community',
          collapsed: true,
          items: [
            { text: 'Resources', link: '/general-guides/#community-resources' },
            { text: 'Contributing', link: '/general-guides/#contributing-to-our-guides' }
          ]
        }
      ],

      // Standalone pages sidebars
      '/troubleshooting': [
        {
          text: 'Troubleshooting',
          items: [
            { text: 'Emergency recovery', link: '/troubleshooting#emergency-recovery' },
            { text: 'Magisk troubleshooting', link: '/troubleshooting#magisk-troubleshooting' },
            { text: 'KernelSU troubleshooting', link: '/troubleshooting#kernelsu-troubleshooting' },
            { text: 'APatch troubleshooting', link: '/troubleshooting#apatch-troubleshooting' },
            { text: 'Bootloader & fastboot', link: '/troubleshooting#bootloader-and-fastboot-issues' },
            { text: 'Play Integrity', link: '/troubleshooting#play-integrity-and-banking-apps' }
          ]
        },
        {
          text: 'Related',
          items: [
            { text: 'Back to guides', link: '/rooting-guides/' },
            { text: 'FAQ', link: '/faqs' },
            { text: 'Community help', link: '/resources' }
          ]
        }
      ],

      '/faqs': [
        {
          text: 'FAQ',
          items: [
            { text: 'Getting started', link: '/faqs#getting-started' },
            { text: 'Technical questions', link: '/faqs#technical-questions' },
            { text: 'Compatibility', link: '/faqs#compatibility' },
            { text: 'After rooting', link: '/faqs#after-rooting' },
            { text: 'Community and support', link: '/faqs#community-and-support' }
          ]
        },
        {
          text: 'Related',
          items: [
            { text: 'Back to guides', link: '/rooting-guides/' },
            { text: 'Troubleshooting', link: '/troubleshooting' },
            { text: 'Resources', link: '/resources' }
          ]
        }
      ],

      '/resources': [
        {
          text: 'Resources',
          items: [
            { text: 'Core tooling', link: '/resources#core-tooling' },
            { text: 'Learning and reference', link: '/resources#learning-and-reference' },
            { text: 'Communities and support', link: '/resources#communities-and-support' },
            { text: 'Firmware and device data', link: '/resources#firmware-and-device-data' },
            { text: 'Emergency and recovery', link: '/resources#emergency-and-recovery' },
            { text: 'Advanced engineering', link: '/resources#advanced-engineering' }
          ]
        },
        {
          text: 'Quick links',
          items: [
            { text: 'Rooting guides', link: '/rooting-guides/' },
            { text: 'Browse apps', link: '/apps-and-modules/' },
            { text: 'FAQ', link: '/faqs' }
          ]
        }
      ],

      '/about': [
        {
          text: 'About',
          items: [
            { text: 'Our mission', link: '/about#our-mission' },
            { text: 'What we offer', link: '/about#what-we-offer' },
            { text: 'Getting started', link: '/about#getting-started' },
            { text: 'Community & support', link: '/about#community-support' },
            { text: 'Core values', link: '/about#core-values' },
            { text: 'Support the project', link: '/about#support-the-project' }
          ]
        },
        {
          text: 'Get involved',
          items: [
            { text: 'Contribute', link: '/contributing' },
            { text: 'Github', link: 'https://github.com/awesome-android-root/awesome-android-root' }
          ]
        }
      ],

      '/contributing': [
        {
          text: 'Contributing',
          items: [
            { text: 'Quick start', link: '/contributing#quick-start' },
            { text: 'Entry format', link: '/contributing#entry-format' },
            { text: 'Categories & tags', link: '/contributing#categories-tags' },
            { text: 'Quality requirements', link: '/contributing#quality-requirements' },
            { text: 'Pull request template', link: '/contributing#pull-request-template' }
          ]
        },
        {
          text: 'Resources',
          items: [
            { text: 'Github issues', link: 'https://github.com/awesome-android-root/awesome-android-root/issues' },
            { text: 'Discussions', link: 'https://github.com/awesome-android-root/awesome-android-root/discussions' },
            { text: 'Project home', link: '/' }
          ]
        }
      ],

      '/non-root-alternatives': [
        {
          text: 'Non-root alternatives',
          items: [
            { text: 'Overview', link: '/non-root-alternatives' },
            { text: 'Quick assessment', link: '/non-root-alternatives#quick-assessment' },
            { text: 'Foundation technologies', link: '/non-root-alternatives#foundation-technologies' },
            { text: 'Core solutions by need', link: '/non-root-alternatives#core-solutions-by-need' },
            { text: 'Effectiveness comparison', link: '/non-root-alternatives#effectiveness-comparison' }
          ]
        },
        {
          text: 'Related',
          items: [
            { text: 'Benefits vs risks', link: '/rooting-guides/#benefits-vs-risks' },
            { text: 'Root apps', link: '/apps-and-modules/' },
            { text: 'Home', link: '/' }
          ]
        }
      ]
    },


    footer: {
      message: `
        <div class="aar-footer-row">
          <a href="/contributing">Contribute</a>
          <span aria-hidden="true">·</span>
          <a href="/legal-disclaimer">Legal</a>
          <span aria-hidden="true">·</span>
          <a href="https://github.com/awesome-android-root/awesome-android-root">GitHub</a>
          <span aria-hidden="true">·</span>
          <a href="https://x.com/awsm_and_root">X</a>
          <span class="aar-footer-copyright">© ${new Date().getFullYear()} Awesome Android Root Project</span>
        </div>
      `,
      copyright: ''
    },

    sidebarMenuLabel: 'Menu',
    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    },
    outline: {
      level: [2, 3],
      label: 'On this page'
    },
    lastUpdated: {
      text: 'Last updated'
    },
    appearance: 'auto',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/awesome-android-root/awesome-android-root' }
    ],
  },
})

function collapseSidebarGroups(items) {
  for (const item of items ?? []) {
    if (!Array.isArray(item.items) || item.items.length === 0) continue
    item.collapsed = true
    collapseSidebarGroups(item.items)
  }
  return items
}

for (const [route, groups] of Object.entries(siteConfig.themeConfig.sidebar)) {
  if (Array.isArray(groups)) collapseSidebarGroups(groups)
  else collapseSidebarGroups([groups])
}

export default withPwa(siteConfig)
