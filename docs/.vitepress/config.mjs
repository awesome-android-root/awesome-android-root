import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: "en-US",
  title: "Awesome Android Root",
  ignoreDeadLinks: true,
  cleanUrls: true,

  // VitePress build optimizations
  vite: {
    build: {
        target: 'esnext',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log'],
          dead_code: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue'],
            'vitepress-vendor': ['vitepress']
          }
        }
      },
      cssCodeSplit: true,
      sourcemap: false
    },
    ssr: {
      noExternal: ['vue']
    },
    optimizeDeps: {
      include: ['vue'],
      force: true
    },
    esbuild: {
      drop: ['console', 'debugger']
    }
  },

  head: [

    // Favicons with improved metadata
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'AAR' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],

    // Additional browser compatibility meta tags
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'color-scheme', content: 'light dark' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'AAR' }],
    ['meta', { name: 'application-name', content: 'Awesome Android Root' }],
    ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],

    // Critical resource hints - prioritize most important resources
    ['link', { rel: 'preconnect', href: 'https://img.shields.io', crossorigin: '' }],
    ['link', { rel: 'dns-prefetch', href: 'https://img.shields.io' }],
    ['link', { rel: 'preconnect', href: 'https://github.com', crossorigin: '' }],
    ['link', { rel: 'dns-prefetch', href: 'https:/github.com' }],

    // SEO Meta Tags - Enhanced for Android Root niche
    ['meta', { name: 'keywords', content: 'android root 2025, magisk modules, kernelsu guide, lsposed framework, custom recovery, twrp guide, bootloader unlock, android customization, root apps, system modifications, android freedom, xposed modules, android debloating, performance optimization, privacy tools, android security, custom rom installation, android development, rooting tutorial, android hacking, mobile security' }],

    // Additional SEO and performance meta tags
    ['meta', { name: 'author', content: 'Fynks' }],
    ['meta', { name: 'publisher', content: 'Awesome Android Root Project' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' }],
    ['meta', { name: 'googlebot', content: 'index, follow, max-image-preview:large' }],
    ['meta', { name: 'language', content: 'en-US' }],
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
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 4, text: 2, titles: 1 }
          }
        },
        translations: {
          button: {
            buttonText: 'Search apps, modules & guides',
            buttonAriaLabel: 'Search apps, modules & guides'
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
      { text: 'Home', link: '/' },
      { 
        text: 'Root Apps', 
        link: '/android-root-apps/#root-apps',
        activeMatch: '^/(android-root-apps/|#root-apps)'
      },
      { 
        text: 'Guides', 
        link: '/android-root-guides/',
        activeMatch: '^/android-root-guides/'
      },
      { 
        text: 'FAQ', 
        link: '/faqs',
        activeMatch: '^/faqs'
      },
      {
        text: 'More',
        items: [
          { text: '📋 About Project', link: '/about' },
          { text: '💝 Support Us', link: 'https://opencollective.com/awesome-android-root-official' },
          { text: '⭐ Star on GitHub', link: 'https://github.com/awesome-android-root/awesome-android-root' },
          { text: '💬 Reddit Community', link: 'https://www.reddit.com/r/Awesome_Android_Root/' }
        ]
      }
    ],
    sidebar: {
      '/android-root-guides/': [
        {
          text: '🚀 Getting Started',
          collapsed: false,
          items: [
            { text: '🤔 What is Root?', link: '/android-root-guides/#what-is-rooting' },
            { text: '⚖️ Should I Root?', link: '/android-root-guides/#should-you-root' },
            { text: '📋 Requirements', link: '/android-root-guides/#requirements-preparation' }
          ]
        },
        {
          text: '🔧 Step-by-Step Guides',
          collapsed: false,
          items: [
            { text: '🔓 Unlock Bootloader', link: '/android-root-guides/how-to-unlock-bootloader' },
            { text: '🛠️ Install Recovery', link: '/android-root-guides/how-to-install-custom-recovery' },
            { text: '⚡ Magisk Guide', link: '/android-root-guides/magisk-guide' },
            { text: '🧬 KernelSU Guide', link: '/android-root-guides/kernelsu-guide' },
            { text: '🔬 LSPosed Guide', link: '/android-root-guides/lsposed-guide' },
            { text: '🌟 Custom ROM Installation', link: '/android-root-guides/custom-rom-installation' }
          ]
        },
        {
          text: '📱 Device-Specific Guides',
          collapsed: true,
          items: [
            { text: '📱 Xiaomi', link: '/android-root-guides/how-to-root-xiaomi-phone' },
            { text: '📱 Samsung', link: '/android-root-guides/how-to-root-samsung-phone' },
            { text: '📱 Google Pixel', link: '/android-root-guides/how-to-root-pixel-phone' },
            { text: '📱 OnePlus', link: '/android-root-guides/how-to-root-oneplus-phone' },
            { text: '📱 Motorola', link: '/android-root-guides/how-to-root-motorola-phone' },
            { text: '📱 Nothing Phone', link: '/android-root-guides/how-to-root-nothing-phone' }
          ]
        }
      ],
      '/': [
        {
          text: '🚀 Getting Started',
          collapsed: false,
          items: [
            { text: '🔰 What is Root?', link: '/android-root-guides/#what-is-rooting' },
            { text: '📖 Complete Guide', link: '/android-root-guides/' },
            { text: '❓ FAQ', link: '/faqs' }
          ]
        },
        {
          text: '📱 Root Apps Categories',
          collapsed: false,
          items: [
            { text: '🚫 Ad Blocking', link: '/#ad-blocking' },
            { text: '📦 App Management', link: '/#app-management' },
            { text: '🔧 App Modifications', link: '/#app-mods' },
            { text: '🎵 Audio & Media', link: '/#audio-enhancement' },
            { text: '⚡ Performance', link: '/#performance-improvements' },
            { text: '🛡️ Security & Privacy', link: '/#privacy-and-security' },
            { text: '🎨 Customization', link: '/#customizations' },
            { text: '🧹 System Optimization', link: '/#system-modifications' }
          ]
        },
        {
          text: '🔧 Essential Tools',
          collapsed: true,
          items: [
            { text: '🔄 Backup & Restore', link: '/#backup-and-restore' },
            { text: '🗂️ File Management', link: '/#file-management' },
            { text: '🛠️ Development Tools', link: '/#development-and-debugging' },
            { text: '🌐 Network Tools', link: '/#network-tools' }
          ]
        },
        {
          text: '📖 Help & Support',
          collapsed: true,
          items: [
            { text: '❓ FAQ', link: '/faqs' },
            { text: '📋 About', link: '/about' },
            { text: '🤝 Contributing', link: '/contributing' },
            { text: '💝 Support Project', link: '/about#support-the-project' }
          ]
        }
      ]
    },
    footer: {
      message: "Made with ❤️ for the Android Root community",
      copyright: `Copyright © ${new Date().getFullYear()} Awesome Android Root Project. All rights reserved.`
    },
    outline: {
      level: [2, 3],
      label: 'On this page'
    },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'short'
      }
    },
    appearance: 'auto',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/awesome-android-root/awesome-android-root' },
      { icon: 'x', link: 'https://x.com/awsm_and_root' },
    ],
    
  },
  
})
