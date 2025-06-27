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
            buttonText: 'Search apps, modules & guides',
            buttonAriaLabel: 'Search root apps, modules & root guides'
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
        link: '/'
      },
      {
        text: 'Root Apps & Modules',
        items: [
          {
            items: [
              { text: '📋 All Categories', link: '/android-root-apps/#root-apps' }
            ]
          },
          {
            text: 'Popular Categories',
            items: [
              { text: '🛡️ Ad Blocking', link: '/android-root-apps/#ad-blocking' },
              { text: '🎨 Customization', link: '/android-root-apps/#customization' },
              { text: '⚡ Performance', link: '/android-root-apps/#performance-improvements' },
              { text: '🔋 Battery Management', link: '/android-root-apps/#battery-management' }
            ]
          }
        ]
      },
      {
        text: 'Rooting Guides',
        items: [
          { text: '🚀 Start Here', link: '/android-root-guides/' },
          { text: '🔓 Unlock Bootloader', link: '/android-root-guides/bootloader-unlocking' },
          { text: '🛠️ Install Recovery', link: '/android-root-guides/custom-recovery' },
          { text: '🌟 Install Custom ROM', link: '/android-root-guides/custom-rom-installation' }
        ]
      },
      {
        text: 'Resources',
        items: [
          {
            text: 'Help & Support',
            items: [
              { text: '❓ FAQ & Troubleshooting', link: '/faqs' },
              { text: '💖 Support', link: 'https://opencollective.com/awesome-android-root-official' },
              { text: '📜 About', link: '/about' }
            ]
          },
          {
            text: 'Community Resources',
            items: [
              { text: '𝕏 / Twitter', link: 'https://x.com/awsm_and_root' },
              { text: '💬 Community Forums', link: '/android-root-apps/#community-resources' }
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
          { text: 'What is Root Access?', link: '/android-root-apps/#what-is-root-access' },
          { text: 'Should You Root?', link: '/android-root-guides/#should-you-root-your-device' },
          { text: 'Safety & Prerequisites', link: '/android-root-guides/#prerequisites-and-preparations' }
        ]
      },
      {
        text: '📖 Step-by-Step Guides',
        collapsed: false,
        items: [
          { text: '📋 Complete Rooting Guide', link: '/android-root-guides/#android-rooting-guide' },
          { text: '🔓 Unlock Bootloader', link: '/android-root-guides/bootloader-unlocking' },
          { text: '🛠️  Install Recovery', link: '/android-root-guides/custom-recovery' },
          ,{
        text: '📱 Device Guides',
        collapsed: true,
        items: [
          { text: 'Xiaomi Devices', link: '/android-root-guides/xiaomi' },
          { text: 'Motorola Devices', link: '/android-root-guides/motorola' },
          { text: 'Samsung (Coming Soon)', link: '/android-root-guides/samsung' },
          { text: 'Google Pixel (Coming Soon)', link: '/android-root-guides/pixel' },
          { text: 'OnePlus (Coming Soon)', link: '/android-root-guides/oneplus' }
        ]},
          { text: '🌟 Install Custom ROM', link: '/android-root-guides/custom-rom-installation' }
        ]
      },
      {
        text: '📱 Root Apps by Category',
        collapsed: true,
        items: [
          { text: '📋 Browse All Apps', link: '/android-root-apps/#root-apps' },
          { text: '🔧 System & Performance', link: '/android-root-apps/#performance-improvements' },
          { text: '🎨 Customization & Themes', link: '/android-root-apps/#os-customizations' },
          { text: '🛡️ Privacy & Security', link: '/android-root-apps/#privacy-and-security' },
          { text: '🎯 App Management', link: '/android-root-apps/#app-managers' },
          { text: '⚡ Performance & System', link: '/android-root-apps/#performance-improvements' }
        ]
      },
      {
        text: '❓ Help & Support',
        collapsed: true,
        items: [
          { text: 'FAQ & Troubleshooting', link: '/faqs' },
          { text: 'Emergency Recovery', link: '/android-root-guides/bootloader-unlocking#troubleshooting' },
          { text: 'Contributing Guide', link: '/contributing' },
          { text: 'About This Project', link: '/about' },
          { text: 'Community Links', link: '/android-root-apps/#community-resources' }
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
    },
    socialLinks:[
      { icon: 'github', link: 'https://github.com/awesome-android-root/awesome-android-root' },
      { icon: 'reddit', link: 'https://www.reddit.com/r/Awesome_Android_Root/' },

    ]
  }
})
