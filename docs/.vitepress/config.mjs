import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: "en-US",
  title: "Awesome Android Root - Ultimate List of Root Apps",
  titleTemplate: ':title | Awesome Android Root - Ultimate List of Root Apps',
  description: "A comprehensive, curated list of Android root apps, tools, and utilities. Includes ad blockers, system tools, customization apps, and root-specific utilities.",
  ignoreDeadLinks: true,
  themeConfig: {
    logo: {
      light: '/images/logo.svg',
      dark: '/images/logo_dark.svg',
      alt: 'Site Logo'
    },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    siteTitle: "Awesome Android Root",
    head: [
      ['meta', { charset: 'UTF-8' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'description', content: 'A comprehensive, curated list of Android root apps, tools, and utilities. Includes ad blockers, system tools, customization apps, and root-specific utilities.' }],
    ['link', { rel: 'icon', href: '../favicon.ico', sizes: 'any' }],
    ['link', { rel: 'icon', href: '../favicon.svg', type: 'image/svg+xml' }],
    ['title', {}, 'Awesome Android Root'],
    ['meta', { name: 'theme-color', content: '#0366d6' }],
    ['link', { rel: 'canonical', href: 'https://awesome-android-root.netlify.app/' }],
    ['link', { rel: 'dns-prefetch', href: 'https://awesome.re' }],
    ['link', { rel: 'preconnect', href: 'https://awesome.re' }],
    ['link', { rel: 'dns-prefetch', href: 'https://profile-counter.glitch.me/' }],
    ['link', { rel: 'preconnect', href: 'https://profile-counter.glitch.me/' }],
        
    // OpenGraph Meta Tags
    ['meta', { property: 'og:title', content: 'Awesome Android Root - Ultimate List of Root Apps' }],
    ['meta', { property: 'og:description', content: 'Discover the best Android root apps, tools, and utilities. A curated collection of essential root applications for advanced Android users.' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: 'https://raw.githubusercontent.com/sindresorhus/awesome/main/media/logo.svg' }],
    ['meta', { property: 'og:url', content: 'https://awesome-android-root.netlify.app/' }],
    ['meta', { property: 'og:site_name', content: 'Awesome Android Root' }],
    
    // Twitter Card Meta Tags
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Awesome Android Root - Ultimate List of Root Apps' }],
    ['meta', { name: 'twitter:description', content: 'Discover the best Android root apps, tools, and utilities. A curated collection of essential root applications.' }],
    ['meta', { name: 'twitter:image', content: 'https://raw.githubusercontent.com/sindresorhus/awesome/main/media/logo.svg' }],

    // SEO Meta Tags
    ['meta', { name: 'keywords', content: 'android root, root apps, magisk modules, xposed modules, android customization, android tools, root utilities, android mods' }],
    ['meta', { name: 'author', content: 'Android Root Community' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'language', content: 'English' }]

    ],
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Apps', link: '/apps' },
      { text: 'Rooting Guides', link: '/rooting_guides/' },
      { text: 'FAQs', link: '/faqs' }
    ],
    sidebar: [
      {
        text: 'Rooting Guides',
          items: [
            { text: 'Basics', link: '/rooting_guides/' },
            { text: 'Xiaomi', link: '/rooting_guides/xiaomi' },
            { text: 'Samsung', link: '/rooting_guides/samsung' },
            { text: 'pixel', link: '/rooting_guidesm/pixel' }
        ]
      },
      {text: 'Navigation',
        items: [
          {text: 'Home', link: '/'},
          {text: 'Apps', link: '/apps'},
          {text: 'FAQs', link: '/faqs'},
          {text: 'Contributions', link: '/contributing'},
        ]

      }
    ],
    footer: {
      message: "Released under the UnLicensed License."
    }
  }
})
