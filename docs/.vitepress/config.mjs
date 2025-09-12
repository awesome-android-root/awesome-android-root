import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'

export default withPwa(defineConfig({
  lang: "en-US",
  title: "Awesome Android Root",
  description: "Ultimate Android rooting hub with 400+ curated root apps, Magisk modules, and step-by-step guides for Android customization and freedom.",
  ignoreDeadLinks: true,
  cleanUrls: true,

  // Performance optimizations for Vite
  vite: {

    // Build optimizations
    build: {
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 1000,
  // Enable minification (use esbuild for stability in SSR builds)
  minify: 'esbuild'
    },
    
    // Optimize dependencies - remove vitepress from here
    optimizeDeps: {
      include: ['vue'],
      // Exclude PWA plugin from optimization
      exclude: ['@vite-pwa/vitepress']
    },

    // Ensure mark.js is bundled for SSR to avoid Node ESM resolver limitations
    ssr: {
      noExternal: ['mark.js']
    },

    // Improve dev server performance
    server: {
      warmup: {
        clientFiles: [
          '.vitepress/theme/**/*.{js,ts,vue}'
        ]
      }
    },

    // CSS optimizations
    css: {
      devSourcemap: false
    },

    // ESBuild optimizations
    esbuild: {
      drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
      legalComments: 'none',
      target: 'es2020'
    }
  },

  // PWA Configuration - Runtime caching only, no precaching
  pwa: {
    strategies: 'generateSW',
    registerType: 'autoUpdate',
    
    // Only include critical assets that must be precached
    includeAssets: [
      'favicon.ico',
      'offline.html' // Only precache the offline page
    ],
    
    workbox: {
      // Disable precaching of build artifacts
      globPatterns: [], // Empty array = no precaching
      
      // Service worker behavior
      skipWaiting: true,
      clientsClaim: true,
      cleanupOutdatedCaches: true,
      navigateFallback: null, // Disable navigateFallback for runtime-only caching
      navigationPreload: true,
      
      // Ignore URL parameters for caching
      ignoreURLParametersMatching: [/^utm_/, /^fbclid$/, /^gclid$/],
      
      // Runtime caching strategies (cache on demand)
      runtimeCaching: [
        // HTML pages - Network First with offline fallback
        {
          urlPattern: ({ request, url }) => 
            request.mode === 'navigate' || 
            url.pathname.endsWith('.html') ||
            url.pathname.endsWith('/'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pages-runtime',
            networkTimeoutSeconds: 3,
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 1 // 1 day
            },
            cacheableResponse: {
              statuses: [0, 200]
            },
            plugins: [
              {
                handlerDidError: async () => {
                  return caches.match('/offline.html') || Response.error()
                }
              }
            ]
          }
        },
        
        // JavaScript and CSS - Stale While Revalidate
        {
          urlPattern: ({ request, url }) => 
            request.destination === 'script' || 
            request.destination === 'style' ||
            /\.(js|css)$/.test(url.pathname),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'assets-runtime',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 1, // 1 day
              purgeOnQuotaError: true
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        
        // Images - Cache First
        {
          urlPattern: ({ request, url }) => 
            request.destination === 'image' ||
            /\.(png|jpg|jpeg|svg|gif|webp|ico)$/i.test(url.pathname),
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-runtime',
            expiration: {
              maxEntries: 200,
              maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              purgeOnQuotaError: true
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        
        // Fonts - Cache First (long cache)
        {
          urlPattern: ({ request, url }) => 
            request.destination === 'font' || 
            /\.(woff2?|ttf|otf|eot)$/i.test(url.pathname),
          handler: 'CacheFirst',
          options: {
            cacheName: 'fonts-runtime',
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        
        // API/JSON data - Network First
        {
          urlPattern: ({ url }) => 
            url.pathname.startsWith('/api/') || 
            url.pathname.endsWith('.json'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-runtime',
            networkTimeoutSeconds: 5,
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 // 1 hour
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        
        // External resources - Stale While Revalidate
        {
          urlPattern: ({ url }) => 
            url.origin === 'https://img.shields.io',
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'external-runtime',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 1, // 1 day
              purgeOnQuotaError: true
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        
        // GitHub avatars and images
        {
          urlPattern: ({ url }) => 
            url.origin === 'https://github.com' || 
            url.origin === 'https://avatars.githubusercontent.com',
          handler: 'CacheFirst',
          options: {
            cacheName: 'github-assets',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    },
    
    manifest: {
      name: 'Awesome Android Root',
      short_name: 'AAR',
      description: 'Ultimate Android rooting hub with curated apps, modules and guides.',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      orientation: 'portrait',
      lang: 'en',
      dir: 'ltr',
      categories: ['utilities', 'developer'],
      icons: [
        { 
          src: '/images/web-app-manifest-192x192.png', 
          sizes: '192x192', 
          type: 'image/png', 
          purpose: 'any maskable' 
        },
        { 
          src: '/images/web-app-manifest-512x512.png', 
          sizes: '512x512', 
          type: 'image/png', 
          purpose: 'any maskable' 
        }
      ]
    },
    
    devOptions: {
      enabled: process.env.NODE_ENV === 'development',
      suppressWarnings: true,
      type: 'module'
    }
  },

  // VitePress build optimizations
  markdown: {
    // Use cache for markdown rendering
    cache: true,
    // Optimize anchor generation
    anchor: {
      level: [2, 3, 4]
    }
  },

  head: [
        
    // Favicons and Touch Icons
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/apple-touch-icon.png' }],
    
    // Browser Meta
    ['meta', { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' }],
    ['meta', { name: 'theme-color', content: '#0b0b0c', media: '(prefers-color-scheme: dark)' }],
    ['meta', { name: 'color-scheme', content: 'light dark' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'AAR' }],
    ['meta', { name: 'application-name', content: 'Awesome Android Root' }],
    ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
    
    // Resource Hints
    ['link', { rel: 'preconnect', href: 'https://img.shields.io', crossorigin: '' }],
    ['link', { rel: 'dns-prefetch', href: 'https://img.shields.io' }],
    ['link', { rel: 'preconnect', href: 'https://github.com', crossorigin: '' }],
    ['link', { rel: 'dns-prefetch', href: 'https://github.com' }],
    
  
    // --- SEO Meta Tags ---
    ['meta', { name: 'keywords', content: 'android root, magisk, kernelsu, lsposed, custom recovery, twrp, bootloader unlock, android customization, root apps, system modifications, xposed, android debloating, performance optimization, privacy tools, custom rom, rooting tutorial' }],
    ['meta', { name: 'author', content: 'Awesome Android Root Project' }],
    ['meta', { name: 'publisher', content: 'Awesome Android Root Project' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' }],
    ['meta', { name: 'googlebot', content: 'index, follow, max-image-preview:large' }],
    ['meta', { name: 'language', content: 'en-US' }],
    ['meta', { name: 'distribution', content: 'global' }],
    ['meta', { name: 'rating', content: 'general' }],
    ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],

    // --- Twitter Card ---
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@awsm_and_root' }],
    ['meta', { name: 'twitter:creator', content: '@awsm_and_root' }],

    // --- JSON-LD Structured Data ---
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Awesome Android Root",
      "description": "Ultimate Android rooting hub with 400+ curated root apps, Magisk modules, and step-by-step guides for Android customization and freedom.",
      "url": "https://awesome-android-root.org/",
      "publisher": {
        "@type": "Organization",
        "name": "Awesome Android Root Project",
        "url": "https://github.com/awesome-android-root",
        "sameAs": [
          "https://github.com/awesome-android-root/awesome-android-root",
          "https://x.com/awsm_and_root",
          "https://opencollective.com/awesome-android-root-official"
        ]
      }
    })],

    // --- Verification Tags ---
    ['meta', { name: 'ahrefs-site-verification', content: '5fd5ad82114006dedaabbb7cc47ee96924361ceedafe09795ce9abbb7d32d6ff' }]
  ],

  themeConfig: {
    logo: {
      light: '/images/logo.svg',
      dark: '/images/logo_dark.svg',
      alt: 'Awesome Android Root Logo'
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
            buttonText: 'Search',
            buttonAriaLabel: 'Search'
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
        text: 'Apps & Modules',
        link: '/android-root-apps/',
        activeMatch: '^/android-root-apps/'
      },
      {
        text: 'Guides',
        items: [
          { text: 'Rooting Guide', link: '/android-root-guides/', activeMatch: '^/android-root-guides/' },
          { text: 'Device Guides', link: '/android-root-guides/#device-specific-guides' },
          { text: 'How-To Guides', link: '/guides/', activeMatch: '^/guides/' }
        ]
      },
      {
        text: 'Resources',
        items: [
          { text: 'FAQ & Troubleshooting', link: '/faqs', activeMatch: '^/faqs' },
          { text: 'Resources Hub', link: '/resources' },
          { text: 'Glossary', link: '/#glossary' }
        ]
      },
      {
        text: 'More',
        items: [
          { text: 'About Project', link: '/about' },
          { text: 'Contributing', link: '/contributing' },
          { text: 'Support Us', link: 'https://opencollective.com/awesome-android-root-official' },
          { text: 'GitHub', link: 'https://github.com/awesome-android-root/awesome-android-root' }
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
            { text: 'Table of Contents', link: '/android-root-guides/#table-of-contents' },
            { text: 'Understanding Root Access', link: '/android-root-guides/#understanding-root-access' },
            { text: 'Why Root Your Device?', link: '/android-root-guides/#why-root-your-device' },
            { text: 'Prerequisites and Safety', link: '/android-root-guides/#prerequisites-and-safety' }
          ]
        },
        {
          text: 'Root Methods',
          collapsed: false,
          items: [
            { text: 'Root Solutions Comparison', link: '/android-root-guides/#root-solutions-comparison' },
            { text: 'Universal Rooting Process', link: '/android-root-guides/#universal-rooting-process' },
            { text: 'Magisk Guide', link: '/android-root-guides/magisk-guide' },
            { text: 'KernelSU Guide', link: '/android-root-guides/kernelsu-guide' },
            { text: 'APatch Guide', link: '/android-root-guides/apatch-guide' }
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
          text: 'Advanced Frameworks',
          collapsed: false,
          items: [
            { text: 'LSPosed Framework', link: '/android-root-guides/lsposed-guide' }
          ]
        },
        {
          text: 'Device-Specific Guides',
          collapsed: true,
          items: [
            { text: 'Device Guides Overview', link: '/android-root-guides/#device-specific-guides' },
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
            { text: 'Troubleshooting and Recovery', link: '/android-root-guides/#troubleshooting-and-recovery' },
            { text: 'Community Resources', link: '/android-root-guides/#community-resources' },
            { text: 'FAQ & Emergency Help', link: '/faqs/' }
          ]
        }
      ],

      // Root Apps Sidebar
      '/android-root-apps/': [
        { text: '📚 Glossary', link: '/#glossary' },
        { text: '⭐ Featured Essentials', link: '/#featured-apps-the-essentials' },
        {
          text: '🛠️ Root & System Management',
          collapsed: false,
          items: [
            { text: 'Root Management', link: '/#root-management' },
            { text: 'System Modifications', link: '/#system-modifications' },
            { text: 'Developer Tools', link: '/#developer-and-debugging-tools' },
            { text: 'Terminal Tools', link: '/#terminal-and-shell-tools' }
          ]
        },
        {
          text: '🛡️ Security & Privacy',
          collapsed: false,
          items: [
            { text: 'Privacy and Security', link: '/#privacy-and-security' },
            { text: 'Ads and Tracking Blockers', link: '/#ads-and-tracking-blockers' }
          ]
        },
        {
          text: '📦 App Management & Control',
          collapsed: false,
          items: [
            { text: 'App Management', link: '/#app-management-and-control' },
            { text: 'Modded Apps & Tweaks', link: '/#modded-apps--tweaks' }
          ]
        },
        {
          text: '⚡ Performance & System',
          collapsed: false,
          items: [
            { text: 'Performance Tweaks', link: '/#performance-tweaks--optimizations' },
            { text: 'Battery Management', link: '/#battery-and-power-management' },
            { text: 'Kernel Management', link: '/#kernel-management' },
            { text: 'Automation', link: '/#automation-and-scheduling' }
          ]
        },
        {
          text: '🖴 Data & Storage',
          collapsed: true,
          items: [
            { text: 'File Management', link: '/#file-management' },
            { text: 'Backup and Restore', link: '/#backup-and-restore' },
            { text: 'Debloating and Cleaning', link: '/#debloating-and-cleaning' }
          ]
        },
        {
          text: '🎨 Customization & UI',
          collapsed: true,
          items: [
            { text: 'Customization and UI', link: '/#customization-and-ui' },
            { text: 'Screen and Display', link: '/#screen-and-display' }
          ]
        },
        {
          text: '🎵 Audio & Media',
          collapsed: true,
          items: [
            { text: 'Audio and Media', link: '/#audio-and-media' }
          ]
        },
        {
          text: '🌐 Network & Communication',
          collapsed: true,
          items: [
            { text: 'Network and Connectivity', link: '/#network-and-connectivity' },
            { text: 'Location and GPS', link: '/#location-and-gps' },
            { text: 'Communication', link: '/#communication' }
          ]
        },
        {
          text: '🔧 Hardware & Device Control',
          collapsed: true,
          items: [
            { text: 'Device Control', link: '/#device-control-and-hardware' },
            { text: 'Accessibility Tools', link: '/#accessibility-tools' }
          ]
        },
        {
          text: '🔍 Frameworks & Advanced',
          collapsed: true,
          items: [
            { text: 'LSPosed Framework', link: '/#lsposed-framework' },
            { text: 'Tools', link: '/#tools' }
          ]
        }
      ],

      // General Android Guides Sidebar
      '/guides/': [
        {
          text: 'Quick Navigation',
          collapsed: false,
          items: [
            { text: 'Guide Overview', link: '/guides/#quick-navigation' }
          ]
        },
        {
          text: 'Privacy & Security',
          collapsed: false,
          items: [
            { text: 'Privacy & Security Guides', link: '/guides/#privacy--security-guides' },
            { text: 'Android Ad Blocking', link: '/guides/android-adblocking' }
          ]
        },
        {
          text: 'App Management',
          collapsed: false,
          items: [
            { text: 'App Management & Optimization', link: '/guides/#app-management--optimization' },
            { text: 'App Debloating Guide', link: '/guides/android-apps-debloating' },
            { text: 'Stop App Auto Updates', link: '/guides/stop-android-app-auto-updates-play-store' },
            { text: 'App Backup & Restore', link: '/guides/app-backup-restore-using-root' }
          ]
        },
        {
          text: 'System Optimization',
          collapsed: false,
          items: [
            { text: 'Performance & System Optimization', link: '/guides/#performance--system-optimization' }
          ]
        },
        {
          text: 'Advanced Topics',
          collapsed: true,
          items: [
            { text: 'Customization & Theming', link: '/guides/#customization--theming' },
            { text: 'Essential Android Knowledge', link: '/guides/#essential-android-knowledge' },
            { text: 'Development & Technical Guides', link: '/guides/#development--technical-guides' }
          ]
        },
        {
          text: 'Community & Support',
          collapsed: true,
          items: [
            { text: 'Community & Resources', link: '/guides/#community--resources' },
            { text: 'Contributing to Guides', link: '/guides/#contributing-to-our-guides' }
          ]
        }
      ],

      // Homepage Sidebar
      '/': [
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/#introduction' },
            { text: 'Rooting Guides', link: '/android-root-guides/' },
            { text: 'Root Methods Comparison', link: '/android-root-guides/#root-solutions-comparison' },
            { text: 'Device-Specific Guides', link: '/android-root-guides/#device-specific-guides' }
          ]
        },
        {
          text: 'Root Apps & Modules',
          collapsed: false,
          items: [
            { text: 'Browse All Apps', link: '/#root-apps-and-modules' },
            { text: 'Featured Essentials', link: '/#featured-apps-the-essentials' },
            { text: 'Root Management', link: '/#root-management' },
            { text: 'Ad Blockers', link: '/#ads-and-tracking-blockers' },
            { text: 'App Management', link: '/#app-management-and-control' }
          ]
        },
        {
          text: 'Popular Categories',
          collapsed: false,
          items: [
            { text: 'Privacy & Security', link: '/#privacy-and-security' },
            { text: 'Performance Tweaks', link: '/#performance-tweaks--optimizations' },
            { text: 'Customization & UI', link: '/#customization-and-ui' },
            { text: 'Modded Apps & Tweaks', link: '/#modded-apps--tweaks' },
            { text: 'System Modifications', link: '/#system-modifications' }
          ]
        },
        {
          text: 'Advanced Features',
          collapsed: true,
          items: [
            { text: 'LSPosed Framework', link: '/#lsposed-framework' },
            { text: 'Developer Tools', link: '/#developer-and-debugging-tools' },
            { text: 'Kernel Management', link: '/#kernel-management' },
            { text: 'Network & Connectivity', link: '/#network-and-connectivity' },
            { text: 'Terminal & Shell Tools', link: '/#terminal-and-shell-tools' }
          ]
        },
        {
          text: 'How-To Guides',
          collapsed: true,
          items: [
            { text: 'All Android Guides', link: '/guides/' },
            { text: 'Android Ad Blocking', link: '/guides/android-adblocking' },
            { text: 'App Debloating', link: '/guides/android-apps-debloating' },
            { text: 'Stop Auto Updates', link: '/guides/stop-android-app-auto-updates-play-store' },
            { text: 'App Backup & Restore', link: '/guides/app-backup-restore-using-root' }
          ]
        },
        {
          text: 'Support & Community',
          collapsed: true,
          items: [
            { text: 'FAQ & Troubleshooting', link: '/faqs/' },
            { text: 'Resources Hub', link: '/resources' },
            { text: 'Glossary', link: '/#glossary' },
            { text: 'Contributing', link: '/contributing' },
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
      { icon: 'x', link: 'https://x.com/awsm_and_root' }
    ],
  },
}))
