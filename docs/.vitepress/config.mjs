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

    // Ahref Verification for Search Console
    ['meta', { name: 'ahrefs-site-verification', content: '5fd5ad82113006dedaabbb7cc47ee96924361ceedafe09795ce9abbb7d32d6ff' }],
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
        link: '/android-root-apps/',
        activeMatch: '^/android-root-apps/'
      },
      {
        text: 'Guides',
        items: [
          { text: 'Rooting Guides', link: '/android-root-guides/', activeMatch: '^/android-root-guides/' },
          { text: 'General Guides', link: '/guides/', activeMatch: '^/guides/' }
        ]
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
      // Rooting Guides Sidebar
      '/android-root-guides/': [
        {
          text: '🚀 Getting Started',
          collapsed: false,
          items: [
            { text: '🤔 What is Root?', link: '/android-root-guides/#understanding-root-access' },
            { text: '⚖️ Should I Root?', link: '/android-root-guides/#why-root-your-device' },
            { text: '📋 Requirements', link: '/android-root-guides/#prerequisites-safety' }
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
            { text: '🔥 APatch Guide', link: '/android-root-guides/apatch-guide' },
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

      // Root Apps Sidebar
      '/android-root-apps/': [
        {
          text: '⭐ Featured Essentials',
          collapsed: false,
          items: [
            { text: '🎯 Must-Have Apps', link: '/android-root-apps/#featured-apps-the-essentials' },
            { text: '🔧 Root Management', link: '/android-root-apps/#root-management' },
            { text: '🚫 Ad Blocking', link: '/android-root-apps/#ad-blocking' }
          ]
        },
        {
          text: '📦 App Management',
          collapsed: true,
          items: [
            { text: '📱 App Managers', link: '/android-root-apps/#app-managers' },
            { text: '🔄 App Isolation & Cloning', link: '/android-root-apps/#app-isolation-and-cloning' },
            { text: '🏪 App Markets', link: '/android-root-apps/#app-markets' },
            { text: '🔐 App Permissions', link: '/android-root-apps/#app-permissions' }
          ]
        },
        {
          text: '🔧 App Modifications',
          collapsed: true,
          items: [
            { text: '📱 Social Media Mods', link: '/android-root-apps/#social-media-mods' },
            { text: '🛠️ Other App Mods', link: '/android-root-apps/#other-app-mods' },
            { text: '🔄 Patching Tools', link: '/android-root-apps/#patching' }
          ]
        },
        {
          text: '🎵 Media & Audio',
          collapsed: true,
          items: [
            { text: '🎧 Audio Enhancement', link: '/android-root-apps/#audio-enhancement' },
            { text: '🎞️ ReVanced', link: '/android-root-apps/#revanced' }
          ]
        },
        {
          text: '⚡ Performance & System',
          collapsed: true,
          items: [
            { text: '🔋 Battery Management', link: '/android-root-apps/#battery-management' },
            { text: '⚡ Performance Improvements', link: '/android-root-apps/#performance-improvements' },
            { text: '🔧 Kernel Management', link: '/android-root-apps/#kernel-management' },
            { text: '🧹 System Modifications', link: '/android-root-apps/#system-modifications' }
          ]
        },
        {
          text: '🗂️ Storage & Data',
          collapsed: true,
          items: [
            { text: '📁 File Management', link: '/android-root-apps/#file-management' },
            { text: '💾 Backup & Restore', link: '/android-root-apps/#backup-and-restore' },
            { text: '🧽 Cleaning Apps', link: '/android-root-apps/#cleaning-apps' }
          ]
        },
        {
          text: '🎨 Customization',
          collapsed: true,
          items: [
            { text: '🎨 Customizations', link: '/android-root-apps/#customizations' },
            { text: '🧹 Debloating', link: '/android-root-apps/#debloating' },
            { text: '📺 Screen & Display', link: '/android-root-apps/#screen-and-display' }
          ]
        },
        {
          text: '🛡️ Privacy & Security',
          collapsed: true,
          items: [
            { text: '🔒 Privacy & Security', link: '/android-root-apps/#privacy-and-security' },
            { text: '🌐 Network Tools', link: '/android-root-apps/#network-tools' },
            { text: '📍 Location & GPS', link: '/android-root-apps/#location-and-gps' }
          ]
        },
        {
          text: '🛠️ Developer Tools',
          collapsed: true,
          items: [
            { text: '⚙️ Development & Debugging', link: '/android-root-apps/#development-and-debugging' },
            { text: '💻 Terminal & Shell', link: '/android-root-apps/#terminal--shell-environments' },
            { text: '🔧 Tools & Utilities', link: '/android-root-apps/#tools' }
          ]
        }
      ],

      // General Guides Sidebar
      '/guides/': [
        {
          text: '📖 General Android Guides',
          collapsed: false,
          items: [
            { text: '🏠 Guides Overview', link: '/guides/' },
            { text: '🛑 Stop App Auto Updates', link: '/guides/stop-android-app-auto-updates-play-store' }
          ]
        },
        {
          text: '📱 App Management',
          collapsed: true,
          items: [
            { text: '🛑 Stop Auto Updates', link: '/guides/stop-android-app-auto-updates-play-store' },
            { text: '📦 Batch App Management', link: '/guides/#app-management-guides' },
            { text: '🔄 App Backup Guide', link: '/guides/#app-management-guides' }
          ]
        },
        {
          text: '🔒 Privacy & Security',
          collapsed: true,
          items: [
            { text: '🛡️ Privacy Setup', link: '/guides/#privacy--security-guides' },
            { text: '📍 Location Privacy', link: '/guides/#privacy--security-guides' },
            { text: '🔐 Permission Audit', link: '/guides/#privacy--security-guides' }
          ]
        },
        {
          text: '⚡ Performance & Optimization',
          collapsed: true,
          items: [
            { text: '🔋 Battery Optimization', link: '/guides/#performance--optimization' },
            { text: '🚀 Speed Up Android', link: '/guides/#performance--optimization' },
            { text: '🗂️ Storage Management', link: '/guides/#performance--optimization' }
          ]
        },
        {
          text: '🛠️ Troubleshooting',
          collapsed: true,
          items: [
            { text: '🔧 Common Issues', link: '/guides/#troubleshooting--maintenance' },
            { text: '📱 Boot Problems', link: '/guides/#troubleshooting--maintenance' },
            { text: '🌐 Network Issues', link: '/guides/#troubleshooting--maintenance' }
          ]
        }
      ],

      // Homepage Sidebar
      '/': [
        {
          text: '🚀 Quick Start',
          collapsed: false,
          items: [
            { text: '🔰 What is Root?', link: '/#what-is-root-access' },
            { text: '📖 Rooting Guide', link: '/android-root-guides/' },
            { text: '📱 Root Apps Collection', link: '/android-root-apps/' },
            { text: '❓ FAQ', link: '/faqs' }
          ]
        },
        {
          text: '📱 Popular Categories',
          collapsed: false,
          items: [
            { text: '⭐ Featured Apps', link: '/#featured-apps-the-essentials' },
            { text: '🔧 Root Management', link: '/#root-management' },
            { text: '🚫 Ad Blocking', link: '/#ad-blocking' },
            { text: '📦 App Management', link: '/#app-management' },
            { text: '🔧 App Modifications', link: '/#app-mods' },
            { text: '🎵 Audio & Media', link: '/#audio-enhancement' },
            { text: '⚡ Performance', link: '/#performance-improvements' },
            { text: '🛡️ Security & Privacy', link: '/#privacy-and-security' }
          ]
        },
        {
          text: '🎨 Customization',
          collapsed: true,
          items: [
            { text: '🎨 UI Customizations', link: '/#customizations' },
            { text: '🧹 System Optimization', link: '/#system-modifications' },
            { text: '📺 Screen & Display', link: '/#screen-and-display' }
          ]
        },
        {
          text: '🔧 Advanced Tools',
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
            { text: '❓ FAQ & Troubleshooting', link: '/faqs' },
            { text: '📋 About Project', link: '/about' },
            { text: '🤝 Contributing', link: '/contributing' },
            { text: '💝 Support Project', link: '#support-this-project' },
            { text: '💡 General Android Tips', link: '/guides/' }
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