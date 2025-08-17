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
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Get Started',
        items: [
          { text: '🚀 Quick Start Guide', link: '/quick-start' },
          { text: '🌟 Featured Apps', link: '/featured' },
          { text: '❓ FAQ & Help', link: '/faqs' }
        ]
      },
      {
        text: 'Collections',
        items: [
          { text: '📱 Root Apps (280+)', link: '/android-root-apps/' },
          { text: '📖 Rooting Guides', link: '/android-root-guides/' },
          { text: '📝 General Guides', link: '/guides/' }
        ]
      },
      {
        text: 'Community',
        items: [
          { text: '🤝 Contributing', link: '/contributing' },
          { text: 'ℹ️ About Project', link: '/about' },
          { text: '💖 Support Us', link: 'https://opencollective.com/awesome-android-root-official' },
          { text: '⭐ Star on GitHub', link: 'https://github.com/awesome-android-root/awesome-android-root' }
        ]
      }
    ],
    sidebar: {
      // Quick Start Guide Sidebar
      '/quick-start': [
        {
          text: '🚀 Quick Start Checklist',
          collapsed: false,
          items: [
            { text: 'Step 1: Unlock Bootloader', link: '/quick-start#step-1-unlock-bootloader' },
            { text: 'Step 2: Install Recovery', link: '/quick-start#step-2-install-custom-recovery' },
            { text: 'Step 3: Choose Root Method', link: '/quick-start#step-3-choose-and-install-root-method' },
            { text: 'Step 4: Hide Root', link: '/quick-start#step-4-hide-root-from-detection' },
            { text: 'Step 5: Create Backup', link: '/quick-start#step-5-create-complete-system-backup' }
          ]
        },
        {
          text: '📱 Essential Next Steps',
          collapsed: false,
          items: [
            { text: 'Install Essential Apps', link: '/quick-start#post-rooting-essentials' },
            { text: 'Emergency Recovery', link: '/quick-start#emergency-recovery-guide' },
            { text: 'Getting Help', link: '/quick-start#getting-help' }
          ]
        },
        {
          text: '🔗 Related Resources',
          collapsed: true,
          items: [
            { text: 'Featured Apps', link: '/featured' },
            { text: 'Device-Specific Guides', link: '/android-root-guides/' },
            { text: 'FAQ & Troubleshooting', link: '/faqs' }
          ]
        }
      ],

      // Featured Apps Sidebar
      '/featured': [
        {
          text: '🏆 Essential Categories',
          collapsed: false,
          items: [
            { text: 'Root Management', link: '/featured#root-management-essentials' },
            { text: 'Ad Blocking', link: '/featured#ad-blocking-champions' },
            { text: 'App Management', link: '/featured#app-management-powerhouses' },
            { text: 'Backup Solutions', link: '/featured#backup-solutions' }
          ]
        },
        {
          text: '⚡ Performance & Customization',
          collapsed: false,
          items: [
            { text: 'Performance Boosters', link: '/featured#performance-boosters' },
            { text: 'Customization Masters', link: '/featured#customization-masters' },
            { text: 'Privacy & Security', link: '/featured#privacy-security-guardians' }
          ]
        },
        {
          text: '🔗 Explore More',
          collapsed: true,
          items: [
            { text: 'Complete App Collection', link: '/android-root-apps/' },
            { text: 'Quick Start Guide', link: '/quick-start' },
            { text: 'Community Choice Awards', link: '/featured#community-choice-awards' }
          ]
        }
      ],

      // Android Root Guides Sidebar
      '/android-root-guides/': [
        {
          text: '🔰 Getting Started',
          collapsed: false,
          items: [
            { text: 'Root Guide Overview', link: '/android-root-guides/' },
            { text: 'Understanding Root Access', link: '/android-root-guides/#understanding-root-access' },
            { text: 'Why Root Your Device?', link: '/android-root-guides/#why-root-your-device' },
            { text: 'Prerequisites & Safety', link: '/android-root-guides/#prerequisites-and-safety' }
          ]
        },
        {
          text: '🛠️ Essential Steps',
          collapsed: false,
          items: [
            { text: 'Unlock Bootloader', link: '/android-root-guides/how-to-unlock-bootloader' },
            { text: 'Install Custom Recovery', link: '/android-root-guides/how-to-install-custom-recovery' },
            { text: 'Install Custom ROM', link: '/android-root-guides/custom-rom-installation' }
          ]
        },
        {
          text: '⚡ Root Methods',
          collapsed: false,
          items: [
            { text: 'Magisk Installation', link: '/android-root-guides/magisk-guide' },
            { text: 'KernelSU Installation', link: '/android-root-guides/kernelsu-guide' },
            { text: 'APatch Installation', link: '/android-root-guides/apatch-guide' },
            { text: 'LSPosed Framework', link: '/android-root-guides/lsposed-guide' }
          ]
        },
        {
          text: '📱 Device-Specific Guides',
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

      // Root Apps Collection Sidebar - Improved organization
      '/android-root-apps/': [
        {
          text: '🌟 Start Here',
          collapsed: false,
          items: [
            { text: 'Browse All Categories', link: '/android-root-apps/' },
            { text: 'Featured Must-Have Apps', link: '/featured' },
            { text: 'Quick Start Guide', link: '/quick-start' }
          ]
        },
        {
          text: '🛡️ Essential Tools',
          collapsed: false,
          items: [
            { text: 'Root Management', link: '/android-root-apps/#root-managers' },
            { text: 'Ad & Tracking Blockers', link: '/android-root-apps/#ads-and-tracking-blockers' },
            { text: 'App Managers & Control', link: '/android-root-apps/#app-managers-and-control' },
            { text: 'Backup & Restore', link: '/android-root-apps/#backup-and-restore' }
          ]
        },
        {
          text: '📱 App Enhancement',
          collapsed: true,
          items: [
            { text: 'App Isolation & Cloning', link: '/android-root-apps/#app-isolation-and-cloning' },
            { text: 'Alternative App Stores', link: '/android-root-apps/#app-stores' },
            { text: 'Permission Control', link: '/android-root-apps/#app-permissions' },
            { text: 'Social Media Mods', link: '/android-root-apps/#modded-apps-and-tweaks' },
            { text: 'YouTube & Media Mods', link: '/android-root-apps/#youtube-spotify-and-google-photos-mods' },
            { text: 'App Patching Tools', link: '/android-root-apps/#patching-tools' }
          ]
        },
        {
          text: '⚡ Performance & System',
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
          text: '🗂️ Storage & Data',
          collapsed: true,
          items: [
            { text: 'File Management', link: '/android-root-apps/#file-management' },
            { text: 'System Cleaning', link: '/android-root-apps/#cleaning-and-maintenance' }
          ]
        },
        {
          text: '🛡️ Privacy & Security',
          collapsed: true,
          items: [
            { text: 'Privacy Protection', link: '/android-root-apps/#privacy-and-security' },
            { text: 'Network Security', link: '/android-root-apps/#firewall-tools' },
            { text: 'Location & GPS Control', link: '/android-root-apps/#location-and-gps' }
          ]
        },
        {
          text: '🎨 Customization',
          collapsed: true,
          items: [
            { text: 'UI Themes & Customization', link: '/android-root-apps/#themes-and-ui' },
            { text: 'System Debloating', link: '/android-root-apps/#debloating-and-system-app-removal' },
            { text: 'Display & Screen', link: '/android-root-apps/#screen-and-display' }
          ]
        },
        {
          text: '🔧 Developer Tools',
          collapsed: true,
          items: [
            { text: 'Development & Debugging', link: '/android-root-apps/#development-and-debugging' },
            { text: 'Terminal & Shell', link: '/android-root-apps/#terminal-and-shell-environments' },
            { text: 'System Utilities', link: '/android-root-apps/#tools' }
          ]
        }
      ],

      // General Android Guides Sidebar
      '/guides/': [
        {
          text: '📝 General Android Guides',
          collapsed: false,
          items: [
            { text: 'Guide Overview', link: '/guides/' },
            { text: 'Complete Ad Blocking Guide', link: '/guides/android-adblocking' },
            { text: 'App Debloating Guide', link: '/guides/android-apps-debloating' },
            { text: 'Stop App Auto Updates', link: '/guides/stop-android-app-auto-updates-play-store' },
            { text: 'App Backup & Restore', link: '/guides/app-backup-restore-using-root' }
          ]
        },
        {
          text: '🔗 Related Resources',
          collapsed: true,
          items: [
            { text: 'Root Apps Collection', link: '/android-root-apps/' },
            { text: 'Rooting Guides', link: '/android-root-guides/' },
            { text: 'Quick Start Guide', link: '/quick-start' }
          ]
        }
      ],

      // Homepage Sidebar - Streamlined and focused
      '/': [
        {
          text: '🚀 Getting Started',
          collapsed: false,
          items: [
            { text: 'Quick Start Guide', link: '/quick-start' },
            { text: 'Featured Apps', link: '/featured' },
            { text: 'FAQ & Troubleshooting', link: '/faqs' }
          ]
        },
        {
          text: '📚 Main Collections',
          collapsed: false,
          items: [
            { text: 'Root Apps (280+)', link: '/android-root-apps/' },
            { text: 'Rooting Tutorials', link: '/android-root-guides/' },
            { text: 'General Guides', link: '/guides/' }
          ]
        },
        {
          text: '🏆 Popular Categories',
          collapsed: false,
          items: [
            { text: 'Essential Root Apps', link: '/featured#root-management-essentials' },
            { text: 'Ad Blocking Solutions', link: '/featured#ad-blocking-champions' },
            { text: 'App Management Tools', link: '/featured#app-management-powerhouses' },
            { text: 'Performance Boosters', link: '/featured#performance-boosters' },
            { text: 'Privacy & Security', link: '/featured#privacy-security-guardians' }
          ]
        },
        {
          text: '🤝 Community & Support',
          collapsed: true,
          items: [
            { text: 'About This Project', link: '/about' },
            { text: 'How to Contribute', link: '/contributing' },
            { text: 'Support the Project', link: 'https://opencollective.com/awesome-android-root-official' },
            { text: 'GitHub Repository', link: 'https://github.com/awesome-android-root/awesome-android-root' }
          ]
        }
      ]
    },
    footer: {
      message: "Made with ❤️ for the Android Root community",
      copyright: `Copyright © ${new Date().getFullYear()} Awesome Android Root Project. Licensed under MIT.`
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
      { 
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>'
        },
        link: 'https://reddit.com/r/AwesomeAndroidRoot'
      }
    ],

    // Add editLink for community contributions
    editLink: {
      pattern: 'https://github.com/awesome-android-root/awesome-android-root/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    // Improve search functionality
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
            buttonText: 'Search apps, guides & tutorials',
            buttonAriaLabel: 'Search documentation'
          },
          modal: {
            displayDetails: 'Display detailed results',
            resetButtonTitle: 'Reset search',
            backButtonTitle: 'Close search',
            noResultsText: 'No results found for',
            footer: {
              selectText: 'to select',
              navigateText: 'to navigate',
              closeText: 'to close'
            }
          }
        }
      }
    }

  },

})