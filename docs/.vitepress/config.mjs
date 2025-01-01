import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: "en-US",
  title: "Awesome Android Root",
  ignoreDeadLinks: true,
  cleanUrls: true,
  sitemap: {
    hostname: 'https://www.awesome-android-root.link'
  },
  head: [
    // Favicons with improved metadata
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: 'any' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-192x192.png', sizes: '192x192' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: '32x32' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16' }],
    ['link', { rel: 'manifest', href: '/manifest.json', crossorigin: 'use-credentials' }],

    // Additional browser compatibility meta tags
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Awesome Android Root' }],
    ['meta', { name: 'application-name', content: 'Awesome Android Root' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],


    // Preconnects and Prefetches
    ['link', { rel: 'dns-prefetch', href: 'https://awesome.re' }],
    ['link', { rel: 'preconnect', href: 'https://awesome.re' }],
    ['link', { rel: 'dns-prefetch', href: 'https://profile-counter.glitch.me/' }],
    ['link', { rel: 'preconnect', href: 'https://profile-counter.glitch.me/' }],

    // OpenGraph Meta Tags
    ['meta', { property: 'og:title', content: 'Awesome Android Root' }],
    ['meta', { property: 'og:description', content: 'Complete guide to Android rooting with 100+ curated root apps, device-specific tutorials, troubleshooting tips, and Magisk/LSPosed frameworks.' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: 'https://raw.githubusercontent.com/fynks/awesome-android-root/refs/heads/main/docs/public/images/og.png' }],
    ['meta', { property: 'og:url', content: 'https://www.awesome-android-root.link' }],
    ['meta', { property: 'og:site_name', content: 'Awesome Android Root' }],

    // Twitter Card Meta Tags
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Awesome Android Root' }],
    ['meta', { name: 'twitter:description', content: 'Complete guide to Android rooting with 100+ curated root apps, device-specific tutorials, troubleshooting tips, and Magisk/LSPosed frameworks.' }],
    ['meta', { name: 'twitter:image', content: 'https://raw.githubusercontent.com/fynks/awesome-android-root/refs/heads/main/docs/public/images/og.png' }],

    // SEO Meta Tags
     ['meta', { name: 'keywords', content: 'android root, magisk modules, lsposed framework, custom rom, root apps, android rooting guide, kernelsu, root access, android mods, xposed modules, root tools, bootloader unlock' }],
    
    ['meta', { name: 'googlebot', content: 'index, follow' }],
    ['meta', { name: 'author', content: 'Fynks' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'language', content: 'English' }],

    // Structured data
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Awesome Android Root",
      "url": "https://www.awesome-android-root.link",
      "description": "Comprehensive Android root apps collection and Android rooting guides ",
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
              { text: 'Device Guides', link: '/rooting-guides/#vendor-specific-rooting-guides'},
              { text: 'Troubleshooting', link: '/troubleshooting/' }
            ]
          },
          { text: 'Resources', items: [
            { text: 'FAQs', link: '/faqs' },
            { text: 'Stats', link: '/stats' },
            { text: 'Contribute', link: '/contributing' }
          ]},
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
            text: 'Troubleshooting',
            collapsed: false,
            items: [
              { text: 'Common Issues', link: '/troubleshooting/' },
              { text: 'WhatsApp Fix', link: '/troubleshooting/whatsapp' },
              { text: 'Safety Net/Integrity', link: '/troubleshooting/#safetynet-play-integrity-issues' }
            ]
          },
          {
            text: 'Resources',
            collapsed: false,
            items: [
              { text: 'Root Apps List', link: '/apps' },
              { text: 'Statistics', link: '/stats' },
              { text: 'FAQs', link: '/faqs' },
              { text: 'Contributing', link: '/contributing' }
            ]
          }
        ],
    footer: {
      message: "Released under the UnLicense.",
      copyright: "Copyright © 2024-present"
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
