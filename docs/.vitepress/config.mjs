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
    ['meta', { name: 'color-scheme', content: 'light dark' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'AAR' }],
    ['meta', { name: 'application-name', content: 'Awesome Android Root' }],
    ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],

    // OpenGraph Meta Tags

    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Awesome Android Root' }],
    ['meta', { property: 'og:title', content: 'Awesome Android Root - Ultimate Collection of Root Apps & Modules 2025' }],
    ['meta', { property: 'og:description', content: 'Discover 195+ curated root apps, powerful Magisk & LSPosed modules, comprehensive rooting guides, and essential tools for ultimate Android customization.' }],
    ['meta', { property: 'og:url', content: 'https://awesome-android-root.link' }],
    ['meta', { property: 'og:image', content: 'https://raw.githubusercontent.com/fynks/awesome-android-root/refs/heads/main/docs/public/images/og.png' }],
    ['meta', { property: 'og:image:alt', content: 'Awesome Android Root - Collection of root apps and modules' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],

    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Awesome Android Root - Ultimate Root Apps Collection 2025' }],
    ['meta', { name: 'twitter:description', content: 'Discover 195+ curated root apps, Magisk & LSPosed modules, and comprehensive Android rooting guides.' }],
    ['meta', { name: 'twitter:image', content: 'https://raw.githubusercontent.com/fynks/awesome-android-root/refs/heads/main/docs/public/images/og.png' }],
    ['meta', { name: 'twitter:image:alt', content: 'Awesome Android Root collection preview' }],

    // Additional social media tags
    ['meta', { property: 'article:author', content: 'https://github.com/fynks' }],
    ['meta', { property: 'article:publisher', content: 'https://awesome-android-root.link' }],


    // SEO Meta Tags
    ['meta', { name: 'keywords', content: 'android root 2025, best magisk modules, lsposed framework, android rooting guide, kernelsu modules, root apps collection, android customization, xposed modules, bootloader unlock, android mods, root tools, custom rom, android tweaks, system modifications' }],

    ['meta', { name: 'author', content: 'Fynks' }],
    ['meta', { name: 'publisher', content: 'Awesome Android Root Project' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' }],
    ['meta', { name: 'googlebot', content: 'index, follow, max-image-preview:large' }],
    ['meta', { name: 'language', content: 'en-US' }],

  
    // Verification Meta Tags
    ['meta', { name: 'msvalidate.01', content: '7EBF814961E199A15D10C1313CE49074' }],
    ['meta', { name: 'google-site-verification', content: 'cUtuaqjIZ-pGgkUGTHpQ9QV3Kek6Q3ZEYenZsStHZEE' }],

    // Preconnect to external domains for performance
    ['link', { rel: 'dns-prefetch', href: 'https://github.com' }],

    // Structured data
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["WebSite", "SoftwareApplication"],
      "name": "Awesome Android Root",
      "alternateName": "AAR",
      "url": "https://awesome-android-root.link",
      "description": "Explore the ultimate curated list of 2025 for 195+ best root apps,powerful Magisk & LSPosed modules, must-have tools for ultimate customization.",
      "keywords": "android root, magisk modules, lsposed framework, custom rom, root apps, android rooting guide, kernelsu, root access, android mods, xposed modules, root tools, bootloader unlock",
      "inLanguage": "en-US",
      "datePublished": "2025-06-06",
      "image": "https://awesome-android-root.link/images/og.png",
      "author": {
        "@type": "Person",
        "name": "Fynks",
        "url": "https://github.com/fynks"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Awesome Android Root Project",
        "logo": {
          "@type": "ImageObject",
          "url": "https://awesome-android-root.link/images/logo.svg"
        }
      },
      "mainEntity": {
        "@type": "ItemList",
        "name": "Android Root Resources",
        "description": "Curated collection of Android rooting tools and guides",
        "numberOfItems": 190,
        "itemListElement": [
          {
            "@type": "SoftwareApplication",
            "name": "Magisk Modules",
            "applicationCategory": "SystemUtility",
            "operatingSystem": "Android"
          },
          {
            "@type": "SoftwareApplication", 
            "name": "LSPosed Modules",
            "applicationCategory": "SystemUtility",
            "operatingSystem": "Android"
          },
          {
            "@type": "HowTo",
            "name": "Android Rooting Guides",
            "description": "Step-by-step rooting guides for various Android devices"
          }
        ]
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "Android developers, power users, modding enthusiasts"
      },
      "about": [
        {
          "@type": "Thing",
          "name": "Android Rooting"
        },
        {
          "@type": "Thing", 
          "name": "Magisk"
        },
        {
          "@type": "Thing",
          "name": "LSPosed Framework"
        }
      ]
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
            buttonText: 'Search root apps and guides',
            buttonAriaLabel: 'Search documentation'
          }
        }
      }
    },
    nav: [
      { 
        text: 'Home', 
        link: '/',
        ariaLabel: 'Go to homepage'
      },
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
