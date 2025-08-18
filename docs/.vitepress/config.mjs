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
        text: 'Apps',
        items: [
          { text: 'Overview', link: '/android-root-apps/' },
          { text: 'Essential Apps', link: '/android-root-apps/#essential-apps---start-here' },
          { text: 'Categories', link: '/android-root-apps/' }
        ]
      },
      {
        text: 'Guides',
        items: [
          { text: 'Rooting Guides', link: '/android-root-guides/' },
          { text: 'General Guides', link: '/guides/' }
        ]
      },
      { text: 'Quick Start', link: '/quick-start' },
      { text: 'Contribute', link: '/contributing' },
      { text: 'About', link: '/about' }
    ],
    sidebar: {
      '/quick-start': [
        {
          text: 'Quick Start',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/quick-start' },
            { text: 'Step 1: Unlock Bootloader', link: '/quick-start#step-1-unlock-bootloader' },
            { text: 'Step 2: Install Recovery', link: '/quick-start#step-2-install-custom-recovery' },
            { text: 'Step 3: Choose Root Method', link: '/quick-start#step-3-choose-and-install-root-method' },
            { text: 'Step 4: Hide Root', link: '/quick-start#step-4-hide-root-from-detection' },
            { text: 'Step 5: Create Backup', link: '/quick-start#step-5-create-complete-system-backup' }
          ]
        }
      ],

      '/android-root-guides/': [
        {
          text: 'Rooting Guides',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/android-root-guides/' },
            { text: 'Magisk Guide', link: '/android-root-guides/magisk-guide' },
            { text: 'KernelSU Guide', link: '/android-root-guides/kernelsu-guide' },
            { text: 'APatch Guide', link: '/android-root-guides/apatch-guide' },
            { text: 'Device Guides', link: '/android-root-guides/' }
          ]
        }
      ],

      '/android-root-apps/': [
            { text: '📋 Browse All Categories', link: '/android-root-apps/' },
            { text: '♿ Accessibility', link: '/android-root-apps/accessibility' },
            { text: '🚫 Ads & Tracker Blocking', link: '/android-root-apps/ads-and-tracker-blocking' },
            { text: '📦 Apps Management', link: '/android-root-apps/apps-management' },
            { text: '🔊 Audio Management', link: '/android-root-apps/audio-management' },
            { text: '🤖 Automation', link: '/android-root-apps/automation' },
            { text: '💾 Backup & E-Store', link: '/android-root-apps/backup-and-estore' },
            { text: '🔋 Battery & Power', link: '/android-root-apps/battery-and-power-management' },
            { text: '🧹 Cleaning & Maintenance', link: '/android-root-apps/cleaning-and-maintenance' },
            { text: '💬 Communication', link: '/android-root-apps/communication' },
            { text: '🎨 Customization', link: '/android-root-apps/customization' },
            { text: '🛠 Development & Debugging', link: '/android-root-apps/development-and-debugging' },
            { text: '🔧 Device Control & Hardware', link: '/android-root-apps/device-control-and-hardware' },
            { text: '🗂 File Management', link: '/android-root-apps/file-management' },
            { text: '🧩 Kernel Management', link: '/android-root-apps/kernel-management' },
            { text: '📍 Location & GPS', link: '/android-root-apps/location-and-gps' },
            { text: '🪄 Modded Apps & Tweaks', link: '/android-root-apps/modded-apps-and-tweaks' },
            { text: '🌐 Networking & Connectivity', link: '/android-root-apps/networking-and-connectivity' },
            { text: '📡 NFC Tools', link: '/android-root-apps/nfc-tools' },
            { text: '⚡ Performance Tweaks', link: '/android-root-apps/performance-tweaks' },
            { text: '🔒 Privacy & Security', link: '/android-root-apps/privacy-and-security' },
            { text: '▶️ reVanced', link: '/android-root-apps/reVanced' },
            { text: '🛡 Root Management', link: '/android-root-apps/root-management' },
            { text: '🖼 Screen & Display', link: '/android-root-apps/screen-and-display' },
            { text: '🗑 System Debloating', link: '/android-root-apps/system-debloating' },
            { text: '🔩 System Modifications', link: '/android-root-apps/system-modifications' },
            { text: '💻 Terminals & Shells', link: '/android-root-apps/terminals' },
            { text: '🧰 Tools (Utilities)', link: '/android-root-apps/tools' }
      ],

      '/guides/': [
        {
          text: 'General Guides',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/guides/' },
            { text: 'Ad Blocking', link: '/guides/android-adblocking' },
            { text: 'App Debloating', link: '/guides/android-apps-debloating' },
            { text: 'Backup & Restore', link: '/guides/app-backup-restore-using-root' }
          ]
        }
      ],

      '/': [
        {
          text: 'Get Started',
          collapsed: false,
          items: [
            { text: 'Quick Start', link: '/quick-start' },
            { text: 'FAQ', link: '/faqs' },
            { text: 'Essential Apps', link: '/android-root-apps/#essential-apps---start-here' }
          ]
        },
        {
          text: 'Collections',
          collapsed: true,
          items: [
            { text: 'Root Apps', link: '/android-root-apps/' },
            { text: 'Rooting Guides', link: '/android-root-guides/' },
            { text: 'General Guides', link: '/guides/' }
          ]
        },
        {
          text: 'Community',
          collapsed: true,
          items: [
            { text: 'Contributing', link: '/contributing' },
            { text: 'About', link: '/about' }
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