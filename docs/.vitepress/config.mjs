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
        text: 'Get Started',
        items: [
          { text: 'Quick Start Guide', link: '/quick-start', activeMatch: '^/quick-start' },
          { text: 'Featured Apps', link: '/featured', activeMatch: '^/featured' }
        ]
      },
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
          { text: 'About Project', link: '/about' },
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
            { text: 'Prerequisites & Safety', link: '/android-root-guides/#prerequisites-and-safety' }
          ]
        },
        {
          text: 'Essential Steps',
          collapsed: false,
          items: [
            { text: 'Unlock Bootloader', link: '/android-root-guides/how-to-unlock-bootloader' },
            { text: 'Install Custom Recovery', link: '/android-root-guides/how-to-install-custom-recovery' },
            { text: 'Install Custom ROM', link: '/android-root-guides/custom-rom-installation' }
          ]
        },
        {
          text: 'Root Methods',
          collapsed: false,
          items: [
            { text: 'Magisk Installation', link: '/android-root-guides/magisk-guide' },
            { text: 'KernelSU Installation', link: '/android-root-guides/kernelsu-guide' },
            { text: 'APatch Installation', link: '/android-root-guides/apatch-guide' },
            { text: 'LSPosed Framework', link: '/android-root-guides/lsposed-guide' }
          ]
        },
        {
          text: 'Device-Specific Guides',
          collapsed: true,
          items: [
            { text: 'Google Pixel', link: '/android-root-guides/how-to-root-pixel-phone' },
            { text: 'Samsung Galaxy', link: '/android-root-guides/how-to-root-samsung-phone' },
            { text: 'Xiaomi/Redmi/POCO', link: '/android-root-guides/how-to-root-xiaomi-phone' },
            { text: 'OnePlus', link: '/android-root-guides/how-to-root-oneplus-phone' },
            { text: 'Motorola', link: '/android-root-guides/how-to-root-motorola-phone' },
            { text: 'Nothing Phone', link: '/android-root-guides/how-to-root-nothing-phone' }
          ]
        }
      ],

      // Root Apps Sidebar - Updated with proper hash anchors
      '/android-root-apps/': [
        {
          text: 'Essential Apps',
          collapsed: false,
          items: [
            { text: 'Browse All Root Apps', link: '/android-root-apps/' },
            { text: 'Featured Must-Have Apps', link: '/android-root-apps/#featured-apps-the-essentials' },
            { text: 'Root Management Tools', link: '/android-root-apps/#root-managers' },
            { text: 'Ad Blocking Solutions', link: '/android-root-apps/#ads-and-tracking-blockers' }
          ]
        },
        {
          text: 'App Management',
          collapsed: true,
          items: [
            { text: 'App Managers & Control', link: '/android-root-apps/#app-managers-and-control' },
            { text: 'App Isolation & Cloning', link: '/android-root-apps/#app-isolation-and-cloning' },
            { text: 'Alternative App Stores', link: '/android-root-apps/#app-stores' },
            { text: 'Permission Control', link: '/android-root-apps/#app-permissions' }
          ]
        },
        {
          text: 'App Modifications',
          collapsed: true,
          items: [
            { text: 'Social Media Mods', link: '/android-root-apps/#modded-apps-and-tweaks' },
            { text: 'YouTube & Media Mods', link: '/android-root-apps/#youtube-spotify-and-google-photos-mods' },
            { text: 'Other App Modifications', link: '/android-root-apps/#general-app-mods' },
            { text: 'App Patching Tools', link: '/android-root-apps/#patching-tools' }
          ]
        },
        {
          text: 'System & Performance',
          collapsed: true,
          items: [
            { text: 'Battery Optimization', link: '/android-root-apps/#battery-and-power-management' },
            { text: 'Performance Tuning', link: '/android-root-apps/#performance-and-gaming' },
            { text: 'Kernel Management', link: '/android-root-apps/#kernel-management' },
            { text: 'System Modifications', link: '/android-root-apps/#system-modifications' },
            { text: 'Audio Enhancement', link: '/android-root-apps/#audio-and-media' }
          ]
        },
        {
          text: 'Storage & Data',
          collapsed: true,
          items: [
            { text: 'File Management', link: '/android-root-apps/#file-management' },
            { text: 'Backup & Restore', link: '/android-root-apps/#backup-and-restore' },
            { text: 'System Cleaning', link: '/android-root-apps/#cleaning-and-maintenance' }
          ]
        },
        {
          text: 'Privacy & Security',
          collapsed: true,
          items: [
            { text: 'Privacy Protection', link: '/android-root-apps/#privacy-and-security' },
            { text: 'Network Security', link: '/android-root-apps/#firewall-tools' },
            { text: 'Location & GPS Control', link: '/android-root-apps/#location-and-gps' }
          ]
        },
        {
          text: 'Customization',
          collapsed: true,
          items: [
            { text: 'UI Customization', link: '/android-root-apps/#themes-and-ui' },
            { text: 'System Debloating', link: '/android-root-apps/#debloating-and-system-app-removal' },
            { text: 'Display & Screen', link: '/android-root-apps/#screen-and-display' }
          ]
        },
        {
          text: 'Developer Tools',
          collapsed: true,
          items: [
            { text: 'Development & Debugging', link: '/android-root-apps/#development-and-debugging' },
            { text: 'Terminal & Shell', link: '/android-root-apps/#terminal-and-shell-environments' },
            { text: 'System Tools & Utilities', link: '/android-root-apps/#tools' }
          ]
        }
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
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'Quick Start Guide', link: '/quick-start' },
            { text: 'Featured Apps', link: '/featured' },
            { text: 'What is Root Access?', link: '/#what-is-root-access' },
            { text: 'FAQ & Help', link: '/faqs' }
          ]
        },
        {
          text: 'Main Collections',
          collapsed: false,
          items: [
            { text: 'Root Apps Collection', link: '/android-root-apps/' },
            { text: 'Rooting Tutorials', link: '/android-root-guides/' },
            { text: 'General Guides', link: '/guides/' }
          ]
        },
        {
          text: 'Popular Categories',
          collapsed: false,
          items: [
            { text: 'Essential Root Apps', link: '/android-root-apps/#featured-apps-the-essentials' },
            { text: 'Root Management', link: '/android-root-apps/#root-managers' },
            { text: 'Ad Blocking', link: '/android-root-apps/#ads-and-tracking-blockers' },
            { text: 'App Management', link: '/android-root-apps/#app-managers-and-control' },
            { text: 'System Performance', link: '/android-root-apps/#performance-and-gaming' },
            { text: 'Privacy & Security', link: '/android-root-apps/#privacy-and-security' }
          ]
        },
        {
          text: 'Advanced Features',
          collapsed: true,
          items: [
            { text: 'App Modifications', link: '/android-root-apps/#modded-apps-and-tweaks' },
            { text: 'System Customization', link: '/android-root-apps/#customization' },
            { text: 'Developer Tools', link: '/android-root-apps/#development-and-debugging' },
            { text: 'Backup Solutions', link: '/android-root-apps/#backup-and-restore' }
          ]
        },
        {
          text: 'Support & Community',
          collapsed: true,
          items: [
            { text: 'FAQ & Troubleshooting', link: '/faqs' },
            { text: 'About This Project', link: '/about' },
            { text: 'How to Contribute', link: '/contributing' },
            { text: 'Support the Project', link: 'https://opencollective.com/awesome-android-root-official' }
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