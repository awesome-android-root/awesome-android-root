import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'
import llmstxt, { copyOrDownloadAsMarkdownButtons } from 'vitepress-plugin-llms'
import { storeLinkPlugin } from './markdown/storeLinkPlugin.mjs'

export default withPwa(defineConfig({
  lang: 'en-US',
  title: 'Awesome Android Root',
  ignoreDeadLinks: true,
  cleanUrls: true,
  lastUpdated: true,
  metaChunk: true,

  vite: {
    plugins: [
      llmstxt()
    ],
    build: {
      chunkSizeWarningLimit: 1000,
    },
    optimizeDeps: {
      exclude: ['@vite-pwa/vitepress']
    },
    server: {
      warmup: { clientFiles: ['.vitepress/theme/**/*.{js,ts,vue}'] }
    },
    css: { devSourcemap: false },
    esbuild: {
      drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
      legalComments: 'none',
      target: 'es2022'
    }
  },


  pwa: {
    strategies: 'generateSW',
    registerType: 'autoUpdate',

    // Include critical assets for immediate caching
    includeAssets: [
      'favicon.ico',
      'favicon.svg',
      'favicon-96x96.png',
      'images/logo.svg',
      'images/logo_dark.svg',
      'images/web-app-manifest-192x192.png',
      'images/web-app-manifest-512x512.png',
      'images/apple-touch-icon.png',
      'offline.html'
    ],

    workbox: {
      globPatterns: [
        '**/*.{js,css}',
        '**/index.html',
        '**/offline.html',
        '**/images/logo*.{svg,png}',
        '**/images/*-icon*.{png,svg}',
        '**/images/web-app-manifest-*.png',
        '**/{favicon,favicon-*}.{ico,svg,png}',
      ],

      globIgnores: [
        '**/node_modules/**',
        '**/dev-dist/**',
        '**/.vitepress/cache/**',
        '**/images/og/**',
      ],

      skipWaiting: true,
      clientsClaim: true,
      cleanupOutdatedCaches: true,
      navigationPreload: true,


      directoryIndex: 'index.html',

      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,

      runtimeCaching: [

        {
          urlPattern: ({ request, url, sameOrigin }) =>
            sameOrigin && (
              request.mode === 'navigate' ||
              request.destination === 'document' ||
              request.headers.get('accept')?.includes('text/html')
            ),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'aar-pages-v1',
            networkTimeoutSeconds: 5,
            expiration: {
              maxEntries: 150,
              maxAgeSeconds: 60 * 60 * 24 * 1,
              purgeOnQuotaError: true,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
            plugins: [
              {
               
                handlerDidError: async () => {
                  return caches.match('/offline.html') || Response.error()
                },
              }
            ]
          }
        },

        {
          urlPattern: ({ request, url, sameOrigin }) =>
            sameOrigin && (
              request.destination === 'script' ||
              request.destination === 'style' ||
              /\.(js|mjs|css)$/i.test(url.pathname)
            ),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'aar-assets-v1',
            expiration: {
              maxEntries: 250,
              maxAgeSeconds: 60 * 60 * 24 * 7,  // 7 days
              purgeOnQuotaError: true,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          }
        },


        {
          urlPattern: ({ request, url, sameOrigin }) => {
            const isImage = request.destination === 'image' ||
              /\.(png|jpg|jpeg|svg|gif|webp|avif|ico|bmp)$/i.test(url.pathname)

            const isAllowedOrigin = sameOrigin ||
              url.origin === 'https://raw.githubusercontent.com' ||
              url.origin === 'https://avatars.githubusercontent.com' ||
              url.origin === 'https://user-images.githubusercontent.com'

            return isImage && isAllowedOrigin
          },
          handler: 'CacheFirst',
          options: {
            cacheName: 'aar-images-v1',
            expiration: {
              maxEntries: 400,
              maxAgeSeconds: 60 * 60 * 24 * 60,  // 60 days (images rarely change)
              purgeOnQuotaError: true,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
            plugins: [
              {
                handlerDidError: async () => {
                  return new Response(
                    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">' +
                    '<rect width="200" height="200" fill="#f0f0f0"/>' +
                    '<text x="50%" y="50%" font-family="sans-serif" font-size="14" fill="#999" text-anchor="middle" dy=".3em">Image unavailable</text>' +
                    '</svg>',
                    {
                      headers: {
                        'Content-Type': 'image/svg+xml',
                        'Cache-Control': 'no-cache'
                      }
                    }
                  )
                }
              }
            ]
          }
        },

        {
          urlPattern: ({ request, url }) => {
            const isFontFile = /\.(woff2?|ttf|otf|eot)$/i.test(url.pathname)
            const isFontRequest = request.destination === 'font'
            const isFontHost = url.origin === location.origin ||
              url.hostname.includes('fonts.googleapis.com') ||
              url.hostname.includes('fonts.gstatic.com')

            return (isFontFile || isFontRequest) && isFontHost
          },
          handler: 'CacheFirst',
          options: {
            cacheName: 'aar-fonts-v1',
            expiration: {
              maxEntries: 40,
              maxAgeSeconds: 60 * 60 * 24 * 30,  // 30 days
              purgeOnQuotaError: true,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          }
        },

        {
          urlPattern: ({ url }) =>
            url.origin === 'https://img.shields.io',
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'aar-badges-v1',
            expiration: {
              maxEntries: 300,
              maxAgeSeconds: 60 * 60 * 12,  // 12 hours
              purgeOnQuotaError: true,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },

            matchOptions: {
              ignoreSearch: false,
            }
          }
        },

        {
          urlPattern: ({ url }) =>
            url.pathname.includes('search') ||
            url.pathname.includes('@localSearchIndex') ||
            url.pathname.includes('searchIndex'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'aar-search-v1',
            networkTimeoutSeconds: 3,
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24,  // 24 hours
              purgeOnQuotaError: true,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          }
        },

        {
          urlPattern: ({ url, request }) =>
            request.headers.get('accept')?.includes('application/json') ||
            url.pathname.endsWith('.json'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'aar-data-v1',
            networkTimeoutSeconds: 3,
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 6,  // 6 hours
              purgeOnQuotaError: true,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          }
        },
      ]
    },

    manifest: false,

    devOptions: {
      enabled: process.env.NODE_ENV === 'development',
      suppressWarnings: true,
      navigateFallback: 'index.html',
      type: 'module'
    },

    inlineRegister: false,
    minify: true,

  },


  markdown: {
    cache: true,
    anchor: { level: [2, 3, 4] },
    config: (md) => {
      md.use(storeLinkPlugin)
      md.use(copyOrDownloadAsMarkdownButtons)
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
    ['link', { rel: 'preconnect', href: 'https://github.com', crossorigin: '' }],
    ['link', { rel: 'dns-prefetch', href: 'https://github.com' }],

    // Sitemap
    ['link', { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' }],

    // web manifest 
    ['link', { rel: 'manifest', href: '/manifest.json' }],

    // --- SEO Meta Tags ---
    ['meta', { name: 'publisher', content: 'Awesome Android Root Project' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' }],
    ['meta', { name: 'googlebot', content: 'index, follow, max-image-preview:large' }],
    ['meta', { name: 'language', content: 'en-US' }],
    ['meta', { name: 'distribution', content: 'global' }],
    ['meta', { name: 'rating', content: 'general' }],
    ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],

    // --- Verification Tags ---
    ['meta', { name: 'ahrefs-site-verification', content: '5fd5ad82114006dedaabbb7cc47ee96924361ceedafe09795ce9abbb7d32d6ff' }],
    ['meta', { name: 'google-site-verification', content: 'LZTsUH49HHfaPFDezfkN4dE0JmLUbOrY3NJKLr1ZPrE' }]
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
              titles: 3
            },
            boostDocument: (documentId, term, storedFields) => {
              // Boost app and module pages significantly
              if (documentId.includes('apps-and-modules')) {
                return 10
              }
              // Moderate boost for guide pages
              if (documentId.includes('rooting-guides')) {
                return 2
              }
              // Default boost for other pages
              return 1
            }
          }
        },
        _render(src, env, md) {
          const html = md.render(src, env)
          if (env.frontmatter?.search === false) return ''
          return html
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
        link: '/apps-and-modules/',
        activeMatch: '^/apps-and-modules/'
      },
      {
        text: 'Rooting Guides',
        items: [
          {
            text: 'Getting Started',
            items: [
              { text: 'Introduction to Rooting', link: '/rooting-guides/' },
              { text: 'Choose Root Method', link: '/rooting-guides/root-framework-comparison' }
            ]
          },
          {
            text: 'Root Methods',
            items: [
              { text: 'Magisk (Recommended)', link: '/rooting-guides/magisk-guide' },
              { text: 'KernelSU', link: '/rooting-guides/kernelsu-guide' },
              { text: 'APatch', link: '/rooting-guides/apatch-guide' },
              { text: 'LSPosed Framework', link: '/rooting-guides/lsposed-guide' }
            ]
          },
          {
            text: 'Device-Specific',
            items: [
              { text: 'Google Pixel', link: '/rooting-guides/how-to-root-pixel-phone' },
              { text: 'Samsung Galaxy', link: '/rooting-guides/how-to-root-samsung-phone' },
              { text: 'Xiaomi/Redmi', link: '/rooting-guides/how-to-root-xiaomi-phone' },
              { text: 'OnePlus', link: '/rooting-guides/how-to-root-oneplus-phone' },
              { text: 'View All Devices', link: '/rooting-guides/#device-specific-guides' }
            ]
          }
        ]
      },
      {
        text: 'Tutorials',
        items: [
          {
            text: 'Essential Guides',
            items: [
              { text: 'All Tutorials', link: '/general-guides/' },
              { text: 'System-Wide Ad Blocking', link: '/general-guides/android-adblocking' },
              { text: 'Debloat Your Device', link: '/general-guides/android-apps-debloating' },
              { text: 'Stop Auto Updates', link: '/general-guides/stop-android-app-auto-updates-play-store' }
            ]
          },
          {
            text: 'Advanced',
            items: [
              { text: 'Custom Recovery', link: '/rooting-guides/how-to-install-custom-recovery' },
              { text: 'Unlock Bootloader', link: '/rooting-guides/how-to-unlock-bootloader' },
              { text: 'Custom ROM Installation', link: '/rooting-guides/custom-rom-installation' }
            ]
          }
        ]
      },
      {
        text: 'Help',
        items: [
          {
            text: 'Resources',
            items: [
              { text: 'Glossary', link: '/apps-and-modules/#glossary' },
              { text: 'FAQ', link: '/faqs' },
              { text: 'Troubleshooting', link: '/troubleshooting' },
              { text: 'Community Resources', link: '/resources' },
              {
                text: 'Non-Root Alternatives',
                link: '/non-root-alternatives',
              },
            ],
          },
          {
            text: 'Project',
            items: [
              { text: 'About', link: '/about' },
              { text: 'Contributing', link: '/contributing' },
              { text: 'Legal Disclaimer', link: '/legal-disclaimer' },
              {
                text: '⭐ GitHub',
                link: 'https://github.com/awesome-android-root/awesome-android-root',
              },
            ],
          },
        ],
      },
    ],

    sidebar: {
      // Main/Home Sidebar
      '/': [
        {
          text: '🚀 Quick Start',
          collapsed: false,
          items: [
            { text: 'What is Android Root?', link: '/rooting-guides/#understanding-root-access' },
            { text: 'Complete Rooting Guide', link: '/rooting-guides/' },
            { text: 'Browse All Apps & Modules', link: '/apps-and-modules/' },
            { text: 'Essential Must-Have Apps', link: '/apps-and-modules/#starter-kit-must-have-apps' }
          ]
        },
        {
          text: '🏆 Root Methods',
          collapsed: false,
          items: [
            { text: '⚖️ Compare Root Methods', link: '/rooting-guides/root-framework-comparison' },
            { text: '🏅 Magisk (Recommended)', link: '/rooting-guides/magisk-guide' },
            { text: '⚡ KernelSU', link: '/rooting-guides/kernelsu-guide' },
            { text: '🤖 APatch', link: '/rooting-guides/apatch-guide' },
            { text: '⚙️ LSPosed Framework', link: '/rooting-guides/lsposed-guide' }
          ]
        },
        {
          text: '📱 Device Guides',
          collapsed: true,
          items: [
            { text: '🔷 Google Pixel', link: '/rooting-guides/how-to-root-pixel-phone' },
            { text: '🔷 Samsung Galaxy', link: '/rooting-guides/how-to-root-samsung-phone' },
            { text: '🔷 Xiaomi/Redmi/POCO', link: '/rooting-guides/how-to-root-xiaomi-phone' },
            { text: '🔷 OnePlus', link: '/rooting-guides/how-to-root-oneplus-phone' },
            { text: '🔷 Nothing Phone', link: '/rooting-guides/how-to-root-nothing-phone' },
            { text: '🔷 Motorola', link: '/rooting-guides/how-to-root-motorola-phone' },
            { text: '📋 View All Devices', link: '/rooting-guides/#device-specific-guides' }
          ]
        },
        {
          text: '📚 Help & Resources',
          collapsed: true,
          items: [
            { text: '❓ Frequently Asked Questions', link: '/faqs' },
            { text: '🔧 Troubleshooting Guide', link: '/troubleshooting' },
            { text: '📖 Rooting Glossary', link: '/apps-and-modules/#glossary' },
            { text: '🌐 Community Resources', link: '/resources' },
            { text: '🔀 Non-Root Alternatives', link: '/non-root-alternatives' }
          ]
        }
      ],
      // Rooting Guides Sidebar
      '/rooting-guides/': [
        {
          text: '📖 Guide Overview',
          collapsed: false,
          items: [
            { text: 'Table of Contents', link: '/rooting-guides/' },
            { text: 'Understanding Root', link: '/rooting-guides/#understanding-root-access' },
            { text: 'Why Root?', link: '/rooting-guides/#why-root-your-device' },
            { text: 'Safety First', link: '/rooting-guides/#prerequisites-and-safety' }
          ]
        },
        {
          text: 'Root Methods',
          items: [
            { text: 'Compare Methods', link: '/rooting-guides/root-framework-comparison' },
            { text: 'Magisk (Recommended)', link: '/rooting-guides/magisk-guide' },
            { text: 'KernelSU', link: '/rooting-guides/kernelsu-guide' },
            { text: 'APatch', link: '/rooting-guides/apatch-guide' }
          ]
        },
        {
          text: '🔧 Step-by-Step Process',
          collapsed: false,
          items: [
            { text: '1️⃣ Unlock Bootloader', link: '/rooting-guides/how-to-unlock-bootloader' },
            { text: '2️⃣ Install Custom Recovery', link: '/rooting-guides/how-to-install-custom-recovery' },
            { text: '3️⃣ Root Your Device', link: '/rooting-guides/#universal-rooting-process' },
            { text: '4️⃣ Install LSPosed Framework', link: '/rooting-guides/lsposed-guide' },
            { text: '5️⃣ Install Custom ROM (Optional)', link: '/rooting-guides/custom-rom-installation' }
          ]
        },
        {
          text: '📱 Device-Specific Guides',
          collapsed: true,
          items: [
            { text: '📋 All Supported Devices', link: '/rooting-guides/#device-specific-guides' },
            {
              text: '🏆 Popular Brands',
              items: [
                { text: 'Google Pixel Phones', link: '/rooting-guides/how-to-root-pixel-phone' },
                { text: 'Samsung Galaxy Devices', link: '/rooting-guides/how-to-root-samsung-phone' },
                { text: 'Xiaomi/Redmi/POCO', link: '/rooting-guides/how-to-root-xiaomi-phone' },
                { text: 'OnePlus Smartphones', link: '/rooting-guides/how-to-root-oneplus-phone' },
                { text: 'Motorola Phones', link: '/rooting-guides/how-to-root-motorola-phone' },
                { text: 'Nothing Phone Series', link: '/rooting-guides/how-to-root-nothing-phone' }
              ]
            }
          ]
        },
        {
          text: 'Help & Support',
          collapsed: true,
          items: [
            { text: 'Troubleshooting Guide', link: '/troubleshooting' },
            { text: 'Frequently Asked Questions', link: '/faqs' },
            { text: 'Community Help & Resources', link: '/rooting-guides/#community-resources' },
            { text: 'Rooting Glossary', link: '/apps-and-modules/#glossary' }
          ]
        }
      ],

      // Apps and Modules Sidebar
      '/apps-and-modules/': [
        {
          text: '⭐ Quick Access',
          collapsed: false,
          items: [
            { text: '⭐ Must-Have Apps', link: '/apps-and-modules/#starter-kit-must-have-apps' },
            { text: '📘 Glossary', link: '/apps-and-modules/#glossary' },
            { text: '🔍 Browse All Apps', link: '/apps-and-modules/' }
          ]
        },
        {
          text: '🛠️ Root & Module Management',
          collapsed: true,
          items: [
            { text: 'Root Managers', link: '/apps-and-modules/#root-managers' },
            { text: 'Module Managers', link: '/apps-and-modules/#module-managers' },
            { text: 'Metamodules', link: '/apps-and-modules/#metamodules' },
            { text: 'LSPosed & Xposed', link: '/apps-and-modules/#lsposed-xposed' },
            { text: 'Zygisk', link: '/apps-and-modules/#zygisk' },
            { text: 'Root Hiding & Play Integrity', link: '/apps-and-modules/#root-hiding-play-integrity' },
            { text: 'Bootloop Protection', link: '/apps-and-modules/#bootloop-protection' },
            { text: 'Root Detection & Testing', link: '/apps-and-modules/#root-detection-testing' }
          ]
        },
        {
          text: '⚙️ System Management',
          collapsed: true,
          items: [
            { text: 'System Tweaks', link: '/apps-and-modules/#system-tweaks' },
            { text: 'VBMeta Mods', link: '/apps-and-modules/#vbmeta-mods' },
            { text: 'System UI & Framework', link: '/apps-and-modules/#system-ui-framework' },
            { text: 'AOSP', link: '/apps-and-modules/#aosp-android-open-source-project' },
            { text: 'ColorOS', link: '/apps-and-modules/#coloros-oppo' },
            { text: 'HyperOS', link: '/apps-and-modules/#hyperos-xiaomi' },
            { text: 'NothingOS', link: '/apps-and-modules/#nothingos' },
            { text: 'One UI', link: '/apps-and-modules/#one-ui-samsung' },
            { text: 'Onyx', link: '/apps-and-modules/#onyx' },
            { text: 'OxygenOS', link: '/apps-and-modules/#oxygen-os-oneplus' },
            { text: 'ZUI', link: '/apps-and-modules/#zui' },
            { text: 'Boot & Startup', link: '/apps-and-modules/#boot-startup' },
            { text: 'Debloating', link: '/apps-and-modules/#debloating' },
            { text: 'App & Package Management', link: '/apps-and-modules/#app-package-management' },
            { text: 'Permissions & AppOps', link: '/apps-and-modules/#permissions-appops' },
            { text: 'System Information & Diagnostics', link: '/apps-and-modules/#system-information-diagnostics' }
          ]
        },
        {
          text: '⚡ Performance & Battery',
          collapsed: true,
          items: [
            { text: 'Performance Optimization', link: '/apps-and-modules/#performance-optimization' },
            { text: 'Kernel Management', link: '/apps-and-modules/#kernel-management' },
            { text: 'Memory & RAM', link: '/apps-and-modules/#memory-ram' },
            { text: 'Battery Optimization', link: '/apps-and-modules/#battery-optimization' },
            { text: 'Charging & Power', link: '/apps-and-modules/#charging-power' },
            { text: 'Task & Process Management', link: '/apps-and-modules/#task-process-management' }
          ]
        },
        {
          text: '🛡️ Privacy & Security',
          collapsed: true,
          items: [
            { text: 'Ad & Tracker Blocking', link: '/apps-and-modules/#ad-tracker-blocking' },
            { text: 'Firewalls & Filtering', link: '/apps-and-modules/#firewalls-filtering' },
            { text: 'Privacy Tools', link: '/apps-and-modules/#privacy-tools' },
            { text: 'Security Tools', link: '/apps-and-modules/#security-tools' },
            { text: 'Device ID & Spoofing', link: '/apps-and-modules/#device-id-spoofing' },
            { text: 'App Isolation', link: '/apps-and-modules/#app-isolation' }
          ]
        },
        {
          text: '🔧 Apps & App Modifications',
          collapsed: true,
          items: [
            { text: 'App Patchers', link: '/apps-and-modules/#app-patchers' },
            { text: 'App Mods', link: '/apps-and-modules/#app-mods' },
            { text: 'Social Media Mods', link: '/apps-and-modules/#social-media-mods' },
            { text: 'Browser Mods', link: '/apps-and-modules/#browser-mods' },
            { text: 'YouTube & Media Mods', link: '/apps-and-modules/#youtube-media-mods' },
            { text: 'Signature & Verification', link: '/apps-and-modules/#signature-verification' }
          ]
        },
        {
          text: '🗃️ Storage & Data',
          collapsed: true,
          items: [
            { text: 'File Managers', link: '/apps-and-modules/#file-managers' },
            { text: 'Backup & Restore', link: '/apps-and-modules/#backup-restore' },
            { text: 'Cleaning', link: '/apps-and-modules/#cleaning' },
            { text: 'File & Partition Tools', link: '/apps-and-modules/#file-partition-tools' }
          ]
        },
        {
          text: '🎨 UI & Customization',
          collapsed: true,
          items: [
            { text: 'Themes & Visual Mods', link: '/apps-and-modules/#themes-visual-mods' },
            { text: 'Launchers & Home Screen', link: '/apps-and-modules/#launchers-home-screen' },
            { text: 'Status Bar & Navigation', link: '/apps-and-modules/#status-bar-navigation' },
            { text: 'Gestures & Controls', link: '/apps-and-modules/#gestures-controls' },
            { text: 'Fonts & Emojis', link: '/apps-and-modules/#fonts-emojis' },
            { text: 'Notifications', link: '/apps-and-modules/#notifications' },
            { text: 'Lockscreen & AOD', link: '/apps-and-modules/#lockscreen-aod' },
            { text: 'Screen & Display', link: '/apps-and-modules/#screen-display' }
          ]
        },
        {
          text: '🎵 Audio & Media',
          collapsed: true,
          items: [
            { text: 'Audio Enhancement', link: '/apps-and-modules/#audio-enhancement' },
            { text: 'Audio Control', link: '/apps-and-modules/#audio-control' },
            { text: 'Audio Effects', link: '/apps-and-modules/#audio-effects' }
          ]
        },
        {
          text: '🌐 Network & Connectivity',
          collapsed: true,
          items: [
            { text: 'DNS & Network Filtering', link: '/apps-and-modules/#dns-network-filtering' },
            { text: 'VPN & Proxy', link: '/apps-and-modules/#vpn-proxy' },
            { text: 'Network Tools', link: '/apps-and-modules/#network-tools' },
            { text: 'Wi-Fi & Mobile Data', link: '/apps-and-modules/#wi-fi-mobile-data' },
            { text: 'Bluetooth & NFC', link: '/apps-and-modules/#bluetooth-nfc' },
            { text: 'Location & GPS', link: '/apps-and-modules/#location-gps' }
          ]
        },
        {
          text: '🎮 Gaming',
          collapsed: true,
          items: [
            { text: 'Gaming Optimization', link: '/apps-and-modules/#gaming-optimization' },
            { text: 'Game Modifications & Tools', link: '/apps-and-modules/#game-modifications-tools' }
          ]
        },
        {
          text: '📥 Developer & Power User',
          collapsed: true,
          items: [
            { text: 'Terminal & Shell', link: '/apps-and-modules/#terminal-shell' },
            { text: 'ADB & Debugging', link: '/apps-and-modules/#adb-debugging' },
            { text: 'Developer Tools', link: '/apps-and-modules/#developer-tools' },
            { text: 'Linux Environments', link: '/apps-and-modules/#linux-environments' },
            { text: 'Automation', link: '/apps-and-modules/#automation' },
            { text: 'Hardware & Sensors', link: '/apps-and-modules/#hardware-sensors' }
          ]
        },
        {
          text: '🧰 General Utilities',
          collapsed: true,
          items: [
            { text: 'Sync & File Transfer', link: '/apps-and-modules/#sync-file-transfer' },
            { text: 'Reboot & Power', link: '/apps-and-modules/#reboot-power' },
            { text: 'Sharing & Intent Tools', link: '/apps-and-modules/#sharing-intent-tools' },
            { text: 'Communication & Messaging', link: '/apps-and-modules/#communication-messaging' },
            { text: 'General Toolboxes', link: '/apps-and-modules/#general-toolboxes' }
          ]
        },
        {
          text: '📚 Support and Safety',
          collapsed: true,
          items: [
            { text: 'Legal and Safety', link: '/apps-and-modules/#legal-and-safety' },
            { text: 'Pre-Flash Checklist', link: '/apps-and-modules/#🛠️-pre-flash-checklist' },
            { text: 'Risk Mitigation', link: '/apps-and-modules/#🛡️-risk-mitigation' }
          ]
        }
      ],



      // General Guides Sidebar
      '/general-guides/': [
        {
          text: '📚 All Tutorials',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/general-guides/' },
            { text: 'Quick Navigation', link: '/general-guides/#quick-navigation' }
          ]
        },
        {
          text: '🛡️ Privacy & Security',
          collapsed: false,
          items: [
            { text: 'Security Guides', link: '/general-guides/#privacy--security-guides' },
            { text: 'Ad Blocking', link: '/general-guides/android-adblocking' }
          ]
        },
        {
          text: '📦 App Management',
          collapsed: false,
          items: [
            { text: 'App Optimization', link: '/general-guides/#app-management-and-optimization' },
            { text: 'Debloating Guide', link: '/general-guides/android-apps-debloating' },
            { text: 'Stop Auto Updates', link: '/general-guides/stop-android-app-auto-updates-play-store' }
          ]
        },
        {
          text: '⚡ System Optimization',
          collapsed: true,
          items: [
            { text: 'Performance Guides', link: '/general-guides/#performance--system-optimization' },
            { text: 'Battery Optimization', link: '/general-guides/#battery-optimization' }
          ]
        },
        {
          text: 'Customization',
          collapsed: true,
          items: [
            { text: 'Theming Guides', link: '/general-guides/#customization--theming' },
            { text: 'UI Modifications', link: '/general-guides/#ui-modifications' }
          ]
        },
        {
          text: 'Advanced Topics',
          collapsed: true,
          items: [
            { text: 'Technical Guides', link: '/general-guides/#development--technical-guides' },
            { text: 'Android Knowledge', link: '/general-guides/#essential-android-knowledge' }
          ]
        },
        {
          text: 'Community',
          collapsed: true,
          items: [
            { text: 'Resources', link: '/general-guides/#community--resources' },
            { text: 'Contributing', link: '/general-guides/#contributing-to-our-guides' }
          ]
        }
      ],

      // Standalone pages sidebars
      '/troubleshooting': [
        {
          text: 'Troubleshooting',
          items: [
            { text: 'Common Issues', link: '/troubleshooting#common-issues' },
            { text: 'Boot Problems', link: '/troubleshooting#boot-problems' },
            { text: 'Root Issues', link: '/troubleshooting#root-issues' },
            { text: 'Recovery Guide', link: '/troubleshooting#recovery' }
          ]
        },
        {
          text: 'Related',
          items: [
            { text: 'Back to Guides', link: '/rooting-guides/' },
            { text: 'FAQ', link: '/faqs' },
            { text: 'Community Help', link: '/resources' }
          ]
        }
      ],

      '/faqs': [
        {
          text: 'FAQ',
          items: [
            { text: 'General Questions', link: '/faqs#general' },
            { text: 'Rooting Questions', link: '/faqs#rooting' },
            { text: 'Safety Concerns', link: '/faqs#safety' },
            { text: 'Troubleshooting', link: '/faqs#troubleshooting' }
          ]
        },
        {
          text: 'Related',
          items: [
            { text: 'Back to Guides', link: '/rooting-guides/' },
            { text: 'Troubleshooting', link: '/troubleshooting' },
            { text: 'Resources', link: '/resources' }
          ]
        }
      ],

      '/resources': [
        {
          text: 'Resources',
          items: [
            { text: 'Communities', link: '/resources#communities' },
            { text: 'Tools', link: '/resources#tools' },
            { text: 'Learning', link: '/resources#learning' },
            { text: 'Downloads', link: '/resources#downloads' }
          ]
        },
        {
          text: 'Quick Links',
          items: [
            { text: 'Rooting Guides', link: '/rooting-guides/' },
            { text: 'Browse Apps', link: '/apps-and-modules/' },
            { text: 'FAQ', link: '/faqs' }
          ]
        }
      ],

      '/about': [
        {
          text: 'About',
          items: [
            { text: 'Project Overview', link: '/about' },
            { text: 'Mission', link: '/about#mission' },
            { text: 'Team', link: '/about#team' },
            { text: 'History', link: '/about#history' }
          ]
        },
        {
          text: 'Get Involved',
          items: [
            { text: 'Contribute', link: '/contributing' },
            { text: 'GitHub', link: 'https://github.com/awesome-android-root/awesome-android-root' }
          ]
        }
      ],

      '/contributing': [
        {
          text: 'Contributing',
          items: [
            { text: 'How to Contribute', link: '/contributing' },
            { text: 'Guidelines', link: '/contributing#guidelines' },
            { text: 'Code of Conduct', link: '/contributing#code-of-conduct' },
            { text: 'Submit Apps', link: '/contributing#submit-apps' }
          ]
        },
        {
          text: 'Resources',
          items: [
            { text: 'GitHub Issues', link: 'https://github.com/awesome-android-root/awesome-android-root/issues' },
            { text: 'Discussions', link: 'https://github.com/awesome-android-root/awesome-android-root/discussions' },
            { text: 'Project Home', link: '/' }
          ]
        }
      ],

      '/non-root-alternatives': [
        {
          text: 'Non-Root Alternatives',
          items: [
            { text: 'Overview', link: '/non-root-alternatives' },
            { text: 'ADB Solutions', link: '/non-root-alternatives#adb-solutions' },
            { text: 'Shizuku Apps', link: '/non-root-alternatives#shizuku-apps' },
            { text: 'No-Root Apps', link: '/non-root-alternatives#no-root-apps' }
          ]
        },
        {
          text: 'Related',
          items: [
            { text: 'Why Root?', link: '/rooting-guides/#why-root-your-device' },
            { text: 'Root Apps', link: '/apps-and-modules/' },
            { text: 'Home', link: '/' }
          ]
        }
      ]
    },


    footer: {
      message: `
        <div style="display: flex; gap: 24px; justify-content: center; flex-wrap: wrap; align-items: center; margin-bottom: 8px; font-size: 14px;">
          <a href="/contributing" style="color: var(--vp-c-text-2); transition: color 0.2s; text-decoration: none; font-weight: 500;">Contribute</a>
          <span style="color: var(--vp-c-divider);">•</span>
          <a href="/legal-disclaimer" style="color: var(--vp-c-text-2); transition: color 0.2s; text-decoration: none; font-weight: 500;">Legal</a>
          <span style="color: var(--vp-c-divider);">•</span>
          <a href="https://github.com/awesome-android-root/awesome-android-root" style="color: var(--vp-c-text-2); transition: color 0.2s; text-decoration: none; font-weight: 500;">GitHub</a>
          <span style="color: var(--vp-c-divider);">•</span>
          <a href="https://x.com/awsm_and_root" style="color: var(--vp-c-text-2); transition: color 0.2s; text-decoration: none; font-weight: 500;">Twitter/X</a>
        </div>
      `,
      copyright: `Copyright © ${new Date().getFullYear()} Awesome Android Root Project`
    },

    outline: {
      level: [2, 3],
      label: 'On this page'
    },
    lastUpdatedText: 'Last updated',
    appearance: 'auto',
    socialLinks: [
      { icon: 'x', link: 'https://x.com/awsm_and_root' },
      { icon: 'github', link: 'https://github.com/awesome-android-root/awesome-android-root' }
    ],
  },
}))
