import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: "en-US",
  title: "Awesome Android Root",
  ignoreDeadLinks: true,
  cleanUrls: true,
  sitemap: {
    hostname: 'https://awesome-android-root.link'
  },
  head: [
    // Favicons with improved metadata
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'AAR' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { property: 'og:image', content: 'images/og.png' }],

    // Additional browser compatibility meta tags
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Awesome Android Root' }],
    ['meta', { name: 'application-name', content: 'Awesome Android Root' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],

    // OpenGraph Meta Tags
    ['meta', { property: 'og:title', content: 'Awesome Android Root' }],
    ['meta', { property: 'og:description', content: 'The ultimate collection of Android root apps, Magisk modules, LSPosed modules, with detailed guides for rooting any Android device.' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: 'https://raw.githubusercontent.com/fynks/awesome-android-root/refs/heads/main/docs/public/images/og.png' }],
    ['meta', { property: 'og:url', content: 'https://awesome-android-root.link' }],
    ['meta', { property: 'og:site_name', content: 'Awesome Android Root' }],

    // Twitter Card Meta Tags
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Awesome Android Root' }],
    ['meta', { name: 'twitter:description', content: 'A curated collection of best Android root apps, Magisk modules, LSPosed modules and tools,tricks and guides.' }],
    ['meta', { name: 'twitter:image', content: 'https://raw.githubusercontent.com/fynks/awesome-android-root/refs/heads/main/docs/public/images/og.png' }],

    // SEO Meta Tags
    ['meta', { name: 'keywords', content: 'android root, magisk modules, lsposed framework, custom rom, root apps, android rooting guide, kernelsu, root access, android mods, xposed modules, root tools, bootloader unlock' }],

    ['meta', { name: 'googlebot', content: 'index, follow' }],
    ['meta', { name: 'author', content: 'Fynks' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'language', content: 'English' }],
    ['meta', { name: 'msvalidate.01', content: '7EBF814961E199A15D10C1313CE49074' }],
    
    // Structured data
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Awesome Android Root",
      "url": "https://awesome-android-root.link",
      "description": "A curated collection of best Android root apps, Magisk modules, LSPosed modules and tools,tricks and guides.",
      "author": {
        "@type": "Person",
        "name": "Fynks"
      }
    })],

  ],
  themeConfig: {
    logo: {
      light: '/images/logo.svg',
      dark: '/images/logo_dark.svg',
      alt: 'Site Logo'
    },
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        translations: {
          button: {
            buttonText: 'Search',
            buttonAriaLabel: 'Search documentation'
          }
        }
      }
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Apps', link: '/apps' },
      {
        text: 'Root Guides',
        items: [
          { text: 'Overview', link: '/rooting-guides/' },
          { text: 'Device Guides', link: '/rooting-guides/#vendor-specific-rooting-guides' }
        ]
      },
      {
        text: 'Resources', items: [
          { text: 'FAQs', link: '/faqs' },
          { text: 'Contribute', link: '/contributing' }
        ]
      },
      { text: 'GitHub', link: 'https://github.com/fynks/awesome-android-root' }
    ],
    sidebar: [
      {
        text: 'Getting Started',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/rooting-guides/#introduction' },
          { text: 'Root Solutions', link: '/rooting-guides/#root-solutions' },
          { text: 'Framework Solutions', link: '/rooting-guides/#framework-solutions' }
        ]
      },
      {
        text: 'Device Guides',
        collapsed: false,
        items: [
          { text: 'Xiaomi Devices', link: '/rooting-guides/xiaomi' },
          { text: 'Samsung Devices', link: '/rooting-guides/samsung' },
          { text: 'Pixel Devices', link: '/rooting-guides/pixel' },
          { text: 'OnePlus Devices', link: '/rooting-guides/oneplus' }
        ]
      },
      {
        text: 'Resources',
        collapsed: false,
        items: [
          { text: 'Root Apps List', link: '/apps' },
          { text: 'FAQs', link: '/faqs' },
          { text: 'Contributing', link: '/contributing' }
        ]
      }
    ],
    footer: {
      message: "Released under the MIT License",
      copyright: `Copyright © ${new Date().getFullYear()} Awesome Android Root Project`
    },
    outline: {
      level: [2, 3],
      label: 'On this page'
    },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }
  }
})
