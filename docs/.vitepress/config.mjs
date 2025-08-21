import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: "en-US",
  title: "Awesome Android Root",
  description: "Ultimate Android rooting hub with 280+ curated root apps, Magisk modules, and step-by-step guides for Android customization and freedom.",
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

    // Enhanced SEO and performance meta tags
    ['meta', { name: 'author', content: 'Awesome Android Root Project' }],
    ['meta', { name: 'publisher', content: 'Awesome Android Root Project' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' }],
    ['meta', { name: 'googlebot', content: 'index, follow, max-image-preview:large' }],
    ['meta', { name: 'language', content: 'en-US' }],
    ['meta', { name: 'distribution', content: 'global' }],
    ['meta', { name: 'rating', content: 'general' }],
    ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],

    // Open Graph structured data
    ['meta', { property: 'og:site_name', content: 'Awesome Android Root' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],

    // Twitter Card data
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@awsm_and_root' }],
    ['meta', { name: 'twitter:creator', content: '@awsm_and_root' }],

    // JSON-LD structured data for better SEO
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Awesome Android Root",
      "description": "Ultimate Android rooting hub with 280+ curated root apps, Magisk modules, and step-by-step guides",
      "url": "https://awesome-android-root.org",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://awesome-android-root.org/?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Awesome Android Root Project",
        "url": "https://github.com/awesome-android-root"
      }
    })],

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
            boost: { 
              title: 4, 
              text: 2, 
              titles: 3,
              'quick-start': 4,
              'troubleshooting': 4,
              'safety': 4,
              'featured': 3
            }
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
        text: 'Resources',
        items: [
          { text: 'FAQ & Support', link: '/faqs', activeMatch: '^/faqs' },
          { text: 'Glossary & Terms', link: '/android-root-apps/#glossary' },
          { text: 'Community', link: '/android-root-apps/#community-and-connect' },
          { text: 'Project Stats', link: '/android-root-apps/#stats' }
        ]
      },
      {
        text: 'More',
        items: [
          { text: 'About Project', link: '/about' },
          { text: 'How to Contribute', link: '/contributing' },
          { text: 'Support Us', link: 'https://opencollective.com/awesome-android-root-official' },
          { text: 'Star on GitHub', link: 'https://github.com/awesome-android-root/awesome-android-root' },
          { text: 'Reddit Community', link: 'https://www.reddit.com/r/Awesome_Android_Root/' }
        ]
      }
    ],
    sidebar: {
      // Android Root Guides Sidebar
      '/android-root-guides/': [
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'Understanding Root Access', link: '/android-root-guides/#understanding-root-access' },
            { text: 'Why Root Your Device?', link: '/android-root-guides/#why-root-your-device' },
            { text: 'Security & Safety First', link: '/#-security--safety-first' },
            { text: 'Prerequisites & Safety', link: '/android-root-guides/#prerequisites-and-safety' }
          ]
        },
        {
          text: 'Choose Your Root Method',
          collapsed: false,
          items: [
            { text: 'Root Methods Comparison', link: '/#choose-your-root-method' },
            { text: 'Magisk (Recommended)', link: '/android-root-guides/magisk-guide' },
            { text: 'KernelSU (Advanced)', link: '/android-root-guides/kernelsu-guide' },
            { text: 'APatch (Alternative)', link: '/android-root-guides/apatch-guide' }
          ]
        },
        {
          text: 'Essential Steps',
          collapsed: false,
          items: [
            { text: 'Step-by-Step Overview', link: '/#complete-process-overview' },
            { text: 'Unlock Bootloader', link: '/android-root-guides/how-to-unlock-bootloader' },
            { text: 'Install Custom Recovery', link: '/android-root-guides/how-to-install-custom-recovery' },
            { text: 'Install Custom ROM', link: '/android-root-guides/custom-rom-installation' }
          ]
        },
        {
          text: 'Advanced Frameworks',
          collapsed: false,
          items: [
            { text: 'LSPosed Framework', link: '/android-root-guides/lsposed-guide' },
            { text: 'Zygisk Implementation', link: '/#zygisk-implementations' },
            { text: 'Root Hiding Setup', link: '/#root-hiding--integrity' }
          ]
        },
        {
          text: 'Device-Specific Guides',
          collapsed: true,
          items: [
            { text: 'Device Compatibility', link: '/#-device-specific-root-guides' },
            { text: 'Google Pixel', link: '/android-root-guides/how-to-root-pixel-phone' },
            { text: 'Samsung Galaxy', link: '/android-root-guides/how-to-root-samsung-phone' },
            { text: 'Xiaomi/Redmi/POCO', link: '/android-root-guides/how-to-root-xiaomi-phone' },
            { text: 'OnePlus', link: '/android-root-guides/how-to-root-oneplus-phone' },
            { text: 'Motorola', link: '/android-root-guides/how-to-root-motorola-phone' },
            { text: 'Nothing Phone', link: '/android-root-guides/how-to-root-nothing-phone' }
          ]
        },
        {
          text: 'Support & Troubleshooting',
          collapsed: true,
          items: [
            { text: 'Quick Troubleshooting', link: '/#-quick-troubleshooting' },
            { text: 'Complete FAQ', link: '/faqs' },
            { text: 'Emergency Recovery', link: '/#bootloop-protection' },
            { text: 'Community Support', link: '/#community-and-connect' }
          ]
        }
      ],

      // Root Apps Sidebar - Updated with proper hash anchors
      '/android-root-apps/': [
        { text: '⭐ Featured Essentials', link: '/android-root-apps/#featured-apps-the-essentials' },
        { text: '📋 Browse All Categories', link: '/android-root-apps/' },
        { text: '---' },
        { text: '🔓 Root Management', link: '/android-root-apps/#root-management' },
        { text: '🛡️ Root Hiding & Integrity', link: '/android-root-apps/#root-hiding--integrity' },
        { text: '🚫 Ad & Tracker Blocking', link: '/android-root-apps/#ads-and-tracking-blockers' },
        { text: '📦 App Management', link: '/android-root-apps/#app-management' },
        { text: '🛡  Privacy & Security', link: '/android-root-apps/#privacy-and-security' },
        { text: '---' },
        { text: '⚡ Performance Tweaks', link: '/android-root-apps/#performance-tweaks' },
        { text: '🎨 Customization', link: '/android-root-apps/#customization' },
        { text: '🪄 Modded Apps & Tweaks', link: '/android-root-apps/#modded-apps--tweaks' },
        { text: '🌐 Networking & Connectivity', link: '/android-root-apps/#networking--connectivity' },
        { text: '---' },
        { text: '🛠️ Development & Debugging', link: '/android-root-apps/#development-and-debugging' },
        { text: '🔧 Device Control & Hardware', link: '/android-root-apps/#device-control-and-hardware' },
        { text: '🗂️ File Management', link: '/android-root-apps/#file-management' },
        { text: '💻 Terminal & Shell', link: '/android-root-apps/#terminal-and-shell-environments' },
        { text: '---' },
        { text: '� Audio Management', link: '/android-root-apps/#audio-and-media' },
        { text: '💾 Backup & Restore', link: '/android-root-apps/#backup-and-restore' },
        { text: '🧹 System Debloating', link: '/android-root-apps/#debloating-and-system-app-removal' },
        { text: '🔩 System Modifications', link: '/android-root-apps/#system-modifications' },
        { text: '---' },
        { text: '💬 Communication', link: '/android-root-apps/#communication' },
        { text: '📍 Location & GPS', link: '/android-root-apps/#location-and-gps' },
        { text: '📡 NFC Tools', link: '/android-root-apps/#nfc-tools' },
        { text: '🖼️ Screen & Display', link: '/android-root-apps/#screen-and-display' },
        { text: '♿ Accessibility & Utilities', link: '/android-root-apps/#accessibility--utilities' },
        { text: '🧰 General Tools', link: '/android-root-apps/#tools' },
        { text: '▶️ ReVanced', link: '/android-root-apps/#revanced' },
        { text: '🧩 Kernel Management', link: '/android-root-apps/#kernel-management' }
      ],

      // General Android Guides Sidebar
      '/guides/': [
        {
          text: 'Android Tips & Guides',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/guides/' },
            { text: 'Ad Blocking Methods', link: '/guides/android-adblocking' },
            { text: 'App Debloating Guide', link: '/guides/android-apps-debloating' },
            { text: 'Stop App Auto Updates', link: '/guides/stop-android-app-auto-updates-play-store' },
            { text: 'App Backup & Restore', link: '/guides/app-backup-restore-using-root' }
          ]
        }
      ],

      // Homepage Sidebar - Updated with proper hash anchors
      '/': [
        {
          text: 'Quick Start',
          collapsed: false,
          items: [
            { text: 'Quick Start Guide', link: '/#-quick-start-guide' },
            { text: 'What is Root Access?', link: '/#what-is-root-access' },
            { text: 'Security & Safety First', link: '/#-security--safety-first' },
            { text: 'Root Methods Comparison', link: '/#choose-your-root-method' },
            { text: 'Device Compatibility', link: '/#-device-specific-root-guides' }
          ]
        },
        {
          text: 'Essential Resources',
          collapsed: false,
          items: [
            { text: 'Complete Rooting Guides', link: '/android-root-guides/' },
            { text: 'Featured Root Apps', link: '/#featured-apps-the-essentials' },
            { text: 'Troubleshooting Guide', link: '/#-quick-troubleshooting' },
            { text: 'Glossary & Terms', link: '/#glossary--legend' }
          ]
        },
        {
          text: 'Popular Categories',
          collapsed: false,
          items: [
            { text: 'Root Management', link: '/#root-managers' },
            { text: 'Ad Blocking', link: '/#ads-and-tracking-blockers' },
            { text: 'App Management', link: '/#app-managers-and-control' },
            { text: 'System Performance', link: '/#performance-and-gaming' },
            { text: 'Privacy & Security', link: '/#privacy-and-security' },
            { text: 'System Customization', link: '/#customization' }
          ]
        },
        {
          text: 'Advanced Features',
          collapsed: true,
          items: [
            { text: 'App Modifications', link: '/#modded-apps--tweaks' },
            { text: 'Root Hiding & Integrity', link: '/#root-hiding--integrity' },
            { text: 'Developer Tools', link: '/#development-and-debugging' },
            { text: 'System Modifications', link: '/#system-modifications' },
            { text: 'Network & Connectivity', link: '/#networking--connectivity' }
          ]
        },
        {
          text: 'Support & Community',
          collapsed: true,
          items: [
            { text: 'FAQ & Troubleshooting', link: '/faqs' },
            { text: 'Community & Connect', link: '/#community-and-connect' },
            { text: 'How to Contribute', link: '/contributing' },
            { text: 'About This Project', link: '/about' }
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