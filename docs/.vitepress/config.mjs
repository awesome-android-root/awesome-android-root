import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: "en-US",
  title: "Awesome Android Root",
  ignoreDeadLinks: true,
  cleanUrls: true,

  // VitePress build optimizations
  vite: {
    build: {
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

  // Enhanced performance settings
  appearance: 'auto',
  lastUpdated: true,

  // Reduce markdown processing overhead
  markdown: {
    lineNumbers: false,
    config: (md) => {
      // Optimize markdown processing
      md.set({
        html: true,
        xhtmlOut: true,
        breaks: false,
        langPrefix: 'language-',
        linkify: true,
        typographer: false
      });
    }
  },

  head: [
    // Critical resource hints - prioritize most important resources
    ['link', { rel: 'preconnect', href: 'https://img.shields.io', crossorigin: '' }],
    ['link', { rel: 'dns-prefetch', href: 'https://img.shields.io' }],
    ['link', { rel: 'preconnect', href: 'https://profile-counter.glitch.me', crossorigin: '' }],
    ['link', { rel: 'dns-prefetch', href: 'https://profile-counter.glitch.me' }],

    // Font preloading to prevent layout shifts
    ['link', { rel: 'preload', href: '/assets/inter-roman-latin.Di8DUHzh.woff2', as: 'font', type: 'font/woff2', crossorigin: '' }],

    // Favicons with improved metadata
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'AAR' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],

    // Performance and CLS optimization headers
    ['link', { rel: 'preconnect', href: 'https://img.shields.io', crossorigin: '' }],
    ['link', { rel: 'dns-prefetch', href: 'https://img.shields.io' }],
    ['link', { rel: 'preconnect', href: 'https://github.com', crossorigin: '' }],
    ['link', { rel: 'dns-prefetch', href: 'https://github.com' }],

    // Additional browser compatibility meta tags
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'color-scheme', content: 'light dark' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'AAR' }],
    ['meta', { name: 'application-name', content: 'Awesome Android Root' }],
    ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],

    // SEO Meta Tags
    ['meta', { name: 'keywords', content: 'awesome android root, android root 2025, complete rooting guide, bootloader unlock guide, custom recovery installation, twrp guide, orangefox recovery, magisk installation, kernelsu guide, apatch guide, best magisk modules, lsposed framework, android rooting tutorial, xiaomi unlock guide, samsung root guide, pixel root guide, oneplus root guide, android customization, root apps collection, system modifications, android development' }],

    ['meta', { name: 'author', content: 'Fynks' }],
    ['meta', { name: 'publisher', content: 'Awesome Android Root Project' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' }],
    ['meta', { name: 'googlebot', content: 'index, follow, max-image-preview:large' }],
    ['meta', { name: 'language', content: 'en-US' }],

    // Critical performance optimization
    ['style', {}, `
      /* Critical CSS to prevent layout shifts */
      .aar-intro img[src*="img.shields.io"] { 
        height: 20px; 
        width: auto; 
        display: inline-block; 
        vertical-align: middle;
        background-color: rgba(0,0,0,0.05);
        border-radius: 4px;
      }
      .aar-intro { min-height: 60px; }
      .VPLocalNavOutlineDropdown { min-height: 40px; }
    `]
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
            buttonText: 'Search apps, guides & resources',
            buttonAriaLabel: 'Search root apps, rooting guides and resources'
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
        text: 'Home',
        link: '/',
        ariaLabel: 'Go to homepage'
      },
      {
        text: 'Apps & Modules',
        items: [
          {
            text: 'Popular Categories',
            items: [
              { text: '🛡️ Ad Blocking', link: '/#ad-blocking' },
              { text: '📱 App Management', link: '/#app-management' },
              { text: '🎯 App Modifications', link: '/#app-mods' },
              { text: '🎨 Customization', link: '/#customization' }
            ]
          },
          {
            text: 'System & Performance',
            items: [
              { text: '⚡ Performance', link: '/#performance-improvements' },
              { text: '🔧 System Tools', link: '/#system-tools' },
              { text: '🎵 Audio Enhancement', link: '/#audio-enhancement' },
              { text: '🔋 Battery Management', link: '/#battery-management' }
            ]
          },
          {
            text: 'Browse All',
            items: [
              { text: '📋 All Categories', link: '/#root-apps' }
            ]
          }
        ]
      },
      {
        text: 'Guides',
        items: [
          {
            text: '🚀 Getting Started',
            items: [
              { text: '📖 Complete Rooting Guide', link: '/rooting-guides/' },
              { text: '❓ Should I Root My Device?', link: '/rooting-guides/#should-you-root-your-device' },

            ]
          },
          {
            text: '📱 Essential Steps',
            items: [
              { text: '🔓 Bootloader Unlocking', link: '/rooting-guides/bootloader-unlocking' },
              { text: '�️ Custom Recovery Installation', link: '/rooting-guides/custom-recovery' },
              { text: '🔧 Root Installation Process', link: '/rooting-guides/#how-to-root' }
            ]
          },
          {
            text: '🔧 Advanced Topics',
            items: [
              { text: '🧩 LSPosed Framework', link: '/rooting-guides/#lsposed-framework' },
              { text: '�️ Safety & Troubleshooting', link: '/rooting-guides/#safety-and-troubleshooting' },
              { text: '🆘 Emergency Recovery', link: '/rooting-guides/bootloader-unlocking#troubleshooting' }
            ]
          }
        ]
      },
      {
        text: 'Resources',
        items: [
          {
            text: 'Help & Support',
            items: [
              { text: '❓ FAQ & Troubleshooting', link: '/faqs' },
              { text: '� Glossary & Terms', link: '/#glossary' },
              { text: '🆘 Emergency Recovery', link: '/rooting-guides/bootloader-unlocking#troubleshooting' },
              { text: '�️ Safety Guidelines', link: '/rooting-guides/#safety-and-troubleshooting' }
            ]
          },
          {
            text: 'Community Resources',
            items: [
              { text: '💬 Community Forums', link: '/#community-resources' },
              { text: '📖 Contributing Guide', link: '/contributing' },
              { text: '🐛 Report Issues', link: 'https://github.com/awesome-android-root/awesome-android-root/issues' },
              { text: '💡 Feature Requests', link: 'https://github.com/awesome-android-root/awesome-android-root/discussions' }
            ]
          }
        ]
      },
      {
        text: 'Community & Links',
        items: [
          {
            text: 'Official Project',
            items: [
              { text: '🏠 Main Website', link: 'https://awesome-android-root.org' },
              { text: '📱 GitHub Repository', link: 'https://github.com/awesome-android-root/awesome-android-root' },
              { text: '💖 Support Project', link: 'https://opencollective.com/awesome-android-root-official' },
              { text: '📋 Project Stats', link: '/#stats' }
            ]
          },
          {
            text: 'Community & Social',
            items: [
              { text: '💬 Reddit Community', link: 'https://www.reddit.com/r/Awesome_Android_Root/' },
              { text: '𝕏 Twitter/X', link: 'https://x.com/awsm_and_root' },
              { text: '💡 Discussions', link: 'https://github.com/awesome-android-root/awesome-android-root/discussions' },
              { text: '🐛 Report Issues', link: 'https://github.com/awesome-android-root/awesome-android-root/issues' }
            ]
          },
          {
            text: 'Mirror Sites',
            items: [
              { text: '☁️ Cloudflare Pages', link: 'https://awesome-android-root.pages.dev/' },
              { text: '🌐 Netlify Mirror', link: 'https://awesome-android-root.netlify.app/' }
            ]
          }
        ]
      }
    ],
    sidebar: [
      {
        text: '🚀 Getting Started',
        collapsed: false,
        items: [
          { text: 'What is Root Access?', link: '/#what-is-root-access' },
          { text: 'Root Guide & Solutions', link: '/rooting-guides/' },
          { text: 'Glossary', link: '/#glossary' }
        ]
      },
      {
        text: '📖 Complete Rooting Guides',
        collapsed: true,
        items: [
          {
            text: '📋 Master Rooting Guide',
            link: '/rooting-guides/',
            items: [
              { text: '❓ Should You Root?', link: '/rooting-guides/#should-you-root-your-device' },
              { text: '📋 Prerequisites', link: '/rooting-guides/#prerequisites-and-preparations' },
              { text: '🔍 Root Solutions Comparison', link: '/rooting-guides/#root-solutions-comparison' }
            ]
          },
          {
            text: '🔓 Bootloader Unlocking',
            link: '/rooting-guides/bootloader-unlocking',
          },
          {
            text: '🛠️ Custom Recovery',
            link: '/rooting-guides/custom-recovery',
          }
        ]
      },
      {
        text: '📱 Device-Specific Guides',
        collapsed: true,
        items: [
          { text: '📱 Xiaomi Devices', link: '/rooting-guides/xiaomi' },
          { text: '📱 Motorola Devices', link: '/rooting-guides/motorola' },
          { text: '📱 Samsung (Coming Soon)', link: '/rooting-guides/samsung' },
          { text: '📱 Google Pixel (Coming Soon)', link: '/rooting-guides/pixel' },
          { text: '📱 OnePlus (Coming Soon)', link: '/rooting-guides/oneplus' }
        ]
      },
      { text: '📋 Browse all Root Apps', link: '/#root-apps' },
      {
        text: '🎨 Customization',
        collapsed: true,
        items: [
          { text: 'OS Customizations', link: '/#os-customizations' },
          { text: 'Theming', link: '/#theming' },
          { text: 'Launchers', link: '/#launchers' },
          { text: 'Boot Animations', link: '/#boot-animations' },
          { text: 'Font Managers', link: '/#font-managers' },
          { text: 'Navigation', link: '/#navigation' }
        ]
      },
      {
        text: '🎯 App Modifications',
        collapsed: true,
        items: [
          { text: 'Social Media Mods', link: '/#social-media-mods' },
          { text: 'Other App Mods', link: '/#other-app-mods' },
          { text: 'Patching', link: '/#patching' },
          { text: 'ReVanced', link: '/#revanced' }
        ]
      }, {
        text: '🔧 System Tools',
        collapsed: true,
        items: [
          { text: 'File Management', link: '/#file-management' },
          { text: 'Backup & Restore', link: '/#backup-and-restore' },
          { text: 'Cleaning Apps', link: '/#cleaning-apps' },
          { text: 'Development & Debugging', link: '/#development-and-debugging' },
          { text: 'Termux', link: '/#termux' },
          { text: 'Tools', link: '/#tools' }
        ]
      },
      {
        text: '🛡️ Security & Blocking',
        collapsed: true,
        items: [
          { text: 'Ad Blocking', link: '/#ad-blocking' },
          { text: 'Privacy & Security', link: '/#privacy-and-security' },
          { text: 'Hide Root', link: '/#hide-root' }
        ]
      },
      {
        text: '📱 App Management',
        collapsed: true,
        items: [
          { text: 'App Managers', link: '/#app-managers' },
          { text: 'App Markets', link: '/#app-markets' },
          { text: 'App Permissions', link: '/#app-permissions' },
          { text: 'App Isolation & Cloning', link: '/#app-isolation-and-cloning' }
        ]
      },
      {
        text: '⚡ Performance & System',
        collapsed: true,
        items: [
          { text: 'Performance Improvements', link: '/#performance-improvements' },
          { text: 'Battery Management', link: '/#battery-management' },
          { text: 'System Modifications', link: '/#system-modifications' },
          { text: 'Kernel Management', link: '/#kernel-management' },
          { text: 'Debloating', link: '/#debloating' }
        ]
      },
      {
        text: '📚 Help & Community',
        collapsed: true,
        items: [
          { text: 'FAQ & Troubleshooting', link: '/faqs' },
          { text: '🆘 Emergency Recovery', link: '/rooting-guides/bootloader-unlocking#troubleshooting' },
          { text: '🛡️ Safety Guidelines', link: '/rooting-guides/#safety-and-troubleshooting' },
          { text: 'Important Notes', link: '/#important-notes' },
          { text: 'Community & Resources', link: '/#community--resources' },
          { text: 'Contributing', link: '/contributing' },
          { text: 'Stats', link: '/#stats' }
        ]
      }
    ],
    footer: {
      message: "Made with ❤️ for the Android Root community",
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
        timeStyle: 'short'
      }
    }
  }
})
