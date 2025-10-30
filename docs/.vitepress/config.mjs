import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'
import { storeLinkPlugin } from './markdown/storeLinkPlugin.mjs'

export default withPwa(defineConfig({
  lang: 'en-US',
  title: 'Awesome Android Root',
  ignoreDeadLinks: true,
  cleanUrls: true,

  vite: {
    build: {
      chunkSizeWarningLimit: 1000,
      minify: 'esbuild'
    },
    optimizeDeps: {
      include: ['vue'],
      exclude: ['@vite-pwa/vitepress']
    },
    server: {
      warmup: { clientFiles: ['.vitepress/theme/**/*.{js,ts,vue}'] }
    },
    css: { devSourcemap: false },
    esbuild: {
      drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
      legalComments: 'none',
      target: 'es2020'
    }
  },


  pwa: {
    strategies: 'generateSW',
    registerType: 'autoUpdate',
    includeAssets: [
      'favicon.ico',
      'favicon.svg',
      'images/web-app-manifest-192x192.png',
      'images/web-app-manifest-512x512.png',
      'offline.html',
    ],
    workbox: {
      globPatterns: [],

      // Service worker behavior
      skipWaiting: true,
      clientsClaim: true,
      cleanupOutdatedCaches: true,

      // Navigation fallback for offline
      navigateFallback: '/offline.html',
      navigationPreload: true,

      // Direct URL navigation handling
      directoryIndex: 'index.html',
      
      // Maximum file size to cache (10MB)
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
      
     // Runtime caching strategies
      runtimeCaching: [
        // HTML Pages - Network First with offline fallback

         {
          urlPattern: ({ request, url, sameOrigin }) => 
            sameOrigin && (request.mode === 'navigate' || 
            request.headers.get('accept')?.includes('text/html')),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pages-cache-v1',
            networkTimeoutSeconds: 3,
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              purgeOnQuotaError: true
            },
            cacheableResponse: {
              statuses: [0, 200]
            },
            plugins: [
              {
                handlerDidError: async () => {
                  return caches.match('/offline.html') || Response.error()
                },
                fetchDidFail: async ({ originalRequest, error }) => {
                  console.error('Fetch failed:', originalRequest.url, error)
                },
                requestWillFetch: async ({ request }) => {
                  // Add custom headers if needed
                  return request
                }
              }
            ]
          }
        },

         {
          urlPattern: ({ request, url, sameOrigin }) => 
            sameOrigin && (
              request.destination === 'script' || 
              request.destination === 'style' ||
              /\.(js|css)$/i.test(url.pathname)
            ),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'assets-cache-v1',
            expiration: {
              maxEntries: 200,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              purgeOnQuotaError: true
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
         // Images - Cache First with progressive loading
        {
          urlPattern: ({ request, url, sameOrigin }) => 
            sameOrigin && (
              request.destination === 'image' ||
              /\.(png|jpg|jpeg|svg|gif|webp|ico|bmp|tiff)$/i.test(url.pathname)
            ),
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-cache-v1',
            expiration: {
              maxEntries: 300,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              purgeOnQuotaError: true
            },
            cacheableResponse: {
              statuses: [0, 200]
            },
            plugins: [
              {
                handlerDidError: async () => {
                  // Return placeholder image on error
                  return new Response(
                    '<svg width="1" height="1" xmlns="http://www.w3.org/2000/svg"></svg>',
                    { headers: { 'Content-Type': 'image/svg+xml' } }
                  )
                }
              }
            ]
          }
        },
         // Fonts - Cache First (long term)
        {
          urlPattern: ({ request, url, sameOrigin }) => 
            sameOrigin && (
              request.destination === 'font' ||
              /\.(woff2?|ttf|otf|eot)$/i.test(url.pathname)
            ),
          handler: 'CacheFirst',
          options: {
            cacheName: 'fonts-cache-v1',
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              purgeOnQuotaError: true
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        // Shield.io badges - Stale While Revalidate
        {
          urlPattern: ({ url }) => 
            url.origin === 'https://img.shields.io',
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'shields-cache-v1',
            expiration: {
              maxEntries: 200,
              maxAgeSeconds: 60 * 60 * 24, // 24 hours
              purgeOnQuotaError: true
            },
            cacheableResponse: {
              statuses: [0, 200]
            },
            plugins: [
              {
                requestWillFetch: async ({ request }) => {
                  // Add cache busting for badges
                  const url = new URL(request.url)
                  url.searchParams.set('cacheBust', Date.now().toString())
                  return new Request(url.href, request)
                }
              }
            ]
          }
        },
        // GitHub assets - Cache First
        {
          urlPattern: ({ url }) => 
            url.origin === 'https://github.com' || 
            url.origin === 'https://raw.githubusercontent.com' ||
            url.origin === 'https://avatars.githubusercontent.com' ||
            url.origin === 'https://user-images.githubusercontent.com',
          handler: 'CacheFirst',
          options: {
            cacheName: 'github-cache-v1',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              purgeOnQuotaError: true
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        // Search index - Network First
        {
          urlPattern: ({ url }) => 
            url.pathname.includes('search-index') ||
            url.pathname.includes('@localSearchIndex'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'search-index-cache-v1',
            networkTimeoutSeconds: 3,
            expiration: {
              maxEntries: 5,
              maxAgeSeconds: 60 * 60 * 24, // 24 hours
              purgeOnQuotaError: true
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
      display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'],
      orientation: 'any',
      lang: 'en-US',
      dir: 'ltr',
      prefer_related_applications: false,
      
      // Categories for app stores
      categories: ['utilities', 'developer', 'education', 'productivity'],
       // Icons with multiple purposes
      icons: [
        {
          src: '/favicon.ico',
          sizes: '16x16 24x24 32x32 48x48',
          type: 'image/x-icon'
        },
        {
          src: '/favicon-96x96.png',
          sizes: '96x96',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/images/web-app-manifest-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/images/web-app-manifest-192x192-maskable.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/images/web-app-manifest-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/images/web-app-manifest-512x512-maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ],
    },
    // Development options
    devOptions: {
      enabled: process.env.NODE_ENV === 'development',
      suppressWarnings: true,
      navigateFallback: '/index.html',
      type: 'module'
    },

    // Filename for the service worker
    filename: 'sw.js',
    
    // Scope for the service worker
    scope: '/',
    
    // Use credentials for fetching
    useCredentials: false,
    
    // Inline the service worker
    inlineRegister: false,
    
    // Minify the service worker
    minify: true
  },

  // End of pwa config

  markdown: { 
    cache: true, 
    anchor: { level: [2, 3, 4] },
    config: (md) => {
      md.use(storeLinkPlugin)
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
              titles: 3
            },
            boostDocument: (documentId, term, storedFields) => {
              // Boost app and module pages significantly
              if (documentId.includes('android-root-apps')) {
                return 10
              }
              // Moderate boost for guide pages
              if (documentId.includes('android-root-guides')) {
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
        link: '/android-root-apps/',
        activeMatch: '^/android-root-apps/'
      },
      {
        text: 'Rooting Guides',
        items: [
          {
            text: 'Getting Started',
            items: [
              { text: 'Introduction to Rooting', link: '/android-root-guides/' },
              { text: 'Choose Root Method', link: '/android-root-guides/root-framework-comparison' }
            ]
          },
          {
            text: 'Root Methods',
            items: [
              { text: 'Magisk (Recommended)', link: '/android-root-guides/magisk-guide' },
              { text: 'KernelSU', link: '/android-root-guides/kernelsu-guide' },
              { text: 'APatch', link: '/android-root-guides/apatch-guide' },
              { text: 'LSPosed Framework', link: '/android-root-guides/lsposed-guide' }
            ]
          },
          {
            text: 'Device-Specific',
            items: [
              { text: 'Google Pixel', link: '/android-root-guides/how-to-root-pixel-phone' },
              { text: 'Samsung Galaxy', link: '/android-root-guides/how-to-root-samsung-phone' },
              { text: 'Xiaomi/Redmi', link: '/android-root-guides/how-to-root-xiaomi-phone' },
              { text: 'OnePlus', link: '/android-root-guides/how-to-root-oneplus-phone' },
              { text: 'View All Devices', link: '/android-root-guides/#device-specific-guides' }
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
              { text: 'All Tutorials', link: '/guides/' },
              { text: 'System-Wide Ad Blocking', link: '/guides/android-adblocking' },
              { text: 'Debloat Your Device', link: '/guides/android-apps-debloating' },
              { text: 'Stop Auto Updates', link: '/guides/stop-android-app-auto-updates-play-store' }
            ]
          },
          {
            text: 'Advanced',
            items: [
              { text: 'Custom Recovery', link: '/android-root-guides/how-to-install-custom-recovery' },
              { text: 'Unlock Bootloader', link: '/android-root-guides/how-to-unlock-bootloader' },
              { text: 'Custom ROM Installation', link: '/android-root-guides/custom-rom-installation' }
            ]
          }
        ]
      },
      {
        text: 'Support',
        items: [
          {
            text: 'Help Center',
            items: [
              { text: 'Frequently Asked Questions', link: '/faqs' },
              { text: 'Troubleshooting Guide', link: '/troubleshooting' },
              { text: 'Community Resources', link: '/resources' },
              { text: 'Rooting Glossary', link: '/android-root-apps/#glossary' }
            ]
          },
          {
            text: 'Alternatives',
            items: [
              { text: 'Non-Root Solutions', link: '/non-root-alternatives' }
            ]
          }
        ]
      },
      {
        text: 'About',
        items: [
          {
            text: 'Information',
            items: [
              { text: 'About the Project', link: '/about' },
              { text: 'How to Contribute', link: '/contributing' },
              { text: 'Legal Disclaimer', link: '/legal-disclaimer' }
            ]
          },
          {
            text: 'Connect',
            items: [
              { text: '💝 Support Us', link: 'https://opencollective.com/awesome-android-root-official' },
              { text: '⭐ GitHub Repository', link: 'https://github.com/awesome-android-root/awesome-android-root' },
              { text: '🐦 Follow on Twitter/X', link: 'https://x.com/awsm_and_root' }
            ]
          }
        ]
      }
    ],

    sidebar: {
    // Main/Home Sidebar
    '/': [
      {
        text: '🚀 Quick Start',
        collapsed: false,
        items: [
          { text: 'What is Android Root?', link: '/android-root-guides/#understanding-root-access' },
          { text: 'Complete Rooting Guide', link: '/android-root-guides/' },
          { text: 'Browse All Apps & Modules', link: '/android-root-apps/' },
          { text: 'Essential Must-Have Apps', link: '/android-root-apps/#starter-kit-must-have-apps' }
        ]
      },
      {
        text: '🏆 Root Methods',
        collapsed: false,
        items: [
          { text: '⚖️ Compare Root Methods', link: '/android-root-guides/root-framework-comparison' },
          { text: '🏅 Magisk (Recommended)', link: '/android-root-guides/magisk-guide' },
          { text: '⚡ KernelSU', link: '/android-root-guides/kernelsu-guide' },
          { text: '🤖 APatch', link: '/android-root-guides/apatch-guide' },
          { text: '⚙️ LSPosed Framework', link: '/android-root-guides/lsposed-guide' }
        ]
      },
      {
        text: '📱 Device Guides',
        collapsed: true,
        items: [
          { text: '🔷 Google Pixel', link: '/android-root-guides/how-to-root-pixel-phone' },
          { text: '🔷 Samsung Galaxy', link: '/android-root-guides/how-to-root-samsung-phone' },
          { text: '🔷 Xiaomi/Redmi/POCO', link: '/android-root-guides/how-to-root-xiaomi-phone' },
          { text: '🔷 OnePlus', link: '/android-root-guides/how-to-root-oneplus-phone' },
          { text: '🔷 Nothing Phone', link: '/android-root-guides/how-to-root-nothing-phone' },
          { text: '🔷 Motorola', link: '/android-root-guides/how-to-root-motorola-phone' },
          { text: '📋 View All Devices', link: '/android-root-guides/#device-specific-guides' }
        ]
      },
      {
        text: '📚 Help & Resources',
        collapsed: true,
        items: [
          { text: '❓ Frequently Asked Questions', link: '/faqs' },
          { text: '🔧 Troubleshooting Guide', link: '/troubleshooting' },
          { text: '📖 Rooting Glossary', link: '/android-root-apps/#glossary' },
          { text: '🌐 Community Resources', link: '/resources' },
          { text: '🔀 Non-Root Alternatives', link: '/non-root-alternatives' }
        ]
      }
    ],
  // Rooting Guides Sidebar
  '/android-root-guides/': [
    {
      text: '📖 Guide Overview',
      collapsed: false,
      items: [
        { text: 'Table of Contents', link: '/android-root-guides/' },
        { text: 'Understanding Root', link: '/android-root-guides/#understanding-root-access' },
        { text: 'Why Root?', link: '/android-root-guides/#why-root-your-device' },
        { text: 'Safety First', link: '/android-root-guides/#prerequisites-and-safety' }
      ]
    },
    {
      text: 'Root Methods',
      items: [
        { text: 'Compare Methods', link: '/android-root-guides/root-framework-comparison' },
        { text: 'Magisk (Recommended)', link: '/android-root-guides/magisk-guide' },
        { text: 'KernelSU', link: '/android-root-guides/kernelsu-guide' },
        { text: 'APatch', link: '/android-root-guides/apatch-guide' }
      ]
    },
    {
      text: '🔧 Step-by-Step Process',
      collapsed: false,
      items: [
        { text: '1️⃣ Unlock Bootloader', link: '/android-root-guides/how-to-unlock-bootloader' },
        { text: '2️⃣ Install Custom Recovery', link: '/android-root-guides/how-to-install-custom-recovery' },
        { text: '3️⃣ Root Your Device', link: '/android-root-guides/#universal-rooting-process' },
        { text: '4️⃣ Install LSPosed Framework', link: '/android-root-guides/lsposed-guide' },
        { text: '5️⃣ Install Custom ROM (Optional)', link: '/android-root-guides/custom-rom-installation' }
      ]
    },
    {
      text: '📱 Device-Specific Guides',
      collapsed: true,
      items: [
        { text: '📋 All Supported Devices', link: '/android-root-guides/#device-specific-guides' },
        { 
          text: '🏆 Popular Brands',
          items: [
            { text: 'Google Pixel Phones', link: '/android-root-guides/how-to-root-pixel-phone' },
            { text: 'Samsung Galaxy Devices', link: '/android-root-guides/how-to-root-samsung-phone' },
            { text: 'Xiaomi/Redmi/POCO', link: '/android-root-guides/how-to-root-xiaomi-phone' },
            { text: 'OnePlus Smartphones', link: '/android-root-guides/how-to-root-oneplus-phone' },
            { text: 'Motorola Phones', link: '/android-root-guides/how-to-root-motorola-phone' },
            { text: 'Nothing Phone Series', link: '/android-root-guides/how-to-root-nothing-phone' }
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
        { text: 'Community Help & Resources', link: '/android-root-guides/#community-resources' },
        { text: 'Rooting Glossary', link: '/android-root-apps/#glossary' }
      ]
    }
  ],

  // Apps & Modules Sidebar
  '/android-root-apps/': [
    {
      text: '⭐ Quick Access',
      collapsed: false,
      items: [
        { text: '⭐ Must-Have Apps', link: '/android-root-apps/#starter-kit-must-have-apps' },
        { text: '📘 Glossary', link: '/android-root-apps/#glossary' },
        { text: '🔍 Browse All Apps', link: '/android-root-apps/' }
      ]
    },
    {
      text: '🎨 Customization & Themes',
      collapsed: false,
      items: [
        { text: 'UI Customization & Mods', link: '/android-root-apps/#customization-and-ui' },
        { text: 'Themes & Visual Styles', link: '/android-root-apps/#themes-and-ui' },
        { text: 'Boot Animations', link: '/android-root-apps/#boot-animations' },
        { text: 'Display & Screen Tweaks', link: '/android-root-apps/#screen-and-display' },
        { text: 'Custom Launchers', link: '/android-root-apps/#launchers' }
      ]
    },
    {
      text: '⚡ Performance & Optimization',
      collapsed: false,
      items: [
        { text: 'Gaming & Speed Boost', link: '/android-root-apps/#performance-and-gaming' },
        { text: 'Battery Optimizations', link: '/android-root-apps/#battery-and-power-management' },
        { text: 'System Cleanup & Maintenance', link: '/android-root-apps/#cleaning-and-maintenance' },
        { text: 'Debloating & Bloatware Removal', link: '/android-root-apps/#debloating-and-system-app-removal' },
        { text: 'Kernel Management', link: '/android-root-apps/#kernel-management' }
      ]
    },
    {
      text: '🛠️ Root & System Control',
      collapsed: false,
      items: [
        { text: 'Root Access Managers', link: '/android-root-apps/#root-management' },
        { text: 'Safety & Play Integrity', link: '/android-root-apps/#root-management' },
        { text: 'Bootloop Protection Tools', link: '/android-root-apps/#bootloop-protection' },
        { text: 'System Modifications', link: '/android-root-apps/#system-modifications' }
      ]
    },
    {
      text: '🛡️ Privacy & Security',
      collapsed: true,
      items: [
        { text: 'Privacy Protection Tools', link: '/android-root-apps/#privacy-and-security' },
        { text: 'Ad & Tracker Blockers', link: '/android-root-apps/#ads-and-tracking-blockers' },
        { text: 'Permission Managers', link: '/android-root-apps/#app-permissions-management' }
      ]
    },
    {
      text: '📦 App Management',
      collapsed: true,
      items: [
        { text: 'Complete App Control', link: '/android-root-apps/#app-management-and-control' },
        { text: 'App Isolation & Cloning', link: '/android-root-apps/#app-isolation-and-cloning' },
        { text: 'Signature Verification Mods', link: '/android-root-apps/#app-signature-verification-mods' },
        { text: 'App Managers', link: '/android-root-apps/#app-managers' }
      ]
    },
    {
      text: '🔧 Modified & Patched Apps',
      collapsed: true,
      items: [
        { text: 'Modified App Collection', link: '/android-root-apps/#modded-apps--tweaks' },
        { text: 'Social Media Mods', link: '/android-root-apps/#social-media-mods' },
        { text: 'ReVanced Patches', link: '/android-root-apps/#revanced' },
        { text: 'Other App Modifications', link: '/android-root-apps/#misc-app-mods' }
      ]
    },
    {
      text: '💾 Storage & Backup',
      collapsed: true,
      items: [
        { text: 'File Managers', link: '/android-root-apps/#file-management' },
        { text: 'Backup & Restore Solutions', link: '/android-root-apps/#backup-and-restore' }
      ]
    },
    {
      text: '🌐 Network & Connectivity',
      collapsed: true,
      items: [
        { text: 'Network Control & Tools', link: '/android-root-apps/#network-and-connectivity' },
        { text: 'GPS & Location Tools', link: '/android-root-apps/#location-and-gps' },
        { text: 'NFC Utilities', link: '/android-root-apps/#nfc-tools' }
      ]
    },
    {
      text: '📞 Communication',
      collapsed: true,
      items: [
        { text: 'Call Recording & Management', link: '/android-root-apps/#call-recording' },
        { text: 'SMS Tools & Utilities', link: '/android-root-apps/#sms-management' },
        { text: 'Other Communication Tools', link: '/android-root-apps/#communication' }
      ]
    },
    {
      text: '🎵 Audio & Media',
      collapsed: true,
      items: [
        { text: 'Audio Tools & Utilities', link: '/android-root-apps/#audio-and-media' },
        { text: 'Sound Enhancement', link: '/android-root-apps/#audio-enhancement' },
        { text: 'Audio Configuration', link: '/android-root-apps/#audio-configuration' }
      ]
    },
    {
      text: '👨‍💻 Developer & Advanced',
      collapsed: true,
      items: [
        { text: 'Dev Tools', link: '/android-root-apps/#development-and-debugging' },
        { text: 'Terminal', link: '/android-root-apps/#terminal-and-shell-tools' },
        { text: 'Hardware Control', link: '/android-root-apps/#device-control-and-hardware' },
        { text: 'LSPosed', link: '/android-root-apps/#lsposed-framework' }
      ]
    }
  ],

  // General Guides Sidebar
  '/guides/': [
    {
      text: '📚 All Tutorials',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/guides/' },
        { text: 'Quick Navigation', link: '/guides/#quick-navigation' }
      ]
    },
    {
      text: '🛡️ Privacy & Security',
      collapsed: false,
      items: [
        { text: 'Security Guides', link: '/guides/#privacy--security-guides' },
        { text: 'Ad Blocking', link: '/guides/android-adblocking' }
      ]
    },
    {
      text: '📦 App Management',
      collapsed: false,
      items: [
        { text: 'App Optimization', link: '/guides/#app-management--optimization' },
        { text: 'Debloating Guide', link: '/guides/android-apps-debloating' },
        { text: 'Stop Auto Updates', link: '/guides/stop-android-app-auto-updates-play-store' }
      ]
    },
    {
      text: '⚡ System Optimization',
      collapsed: true,
      items: [
        { text: 'Performance Guides', link: '/guides/#performance--system-optimization' },
        { text: 'Battery Optimization', link: '/guides/#battery-optimization' }
      ]
    },
    {
      text: 'Customization',
      collapsed: true,
      items: [
        { text: 'Theming Guides', link: '/guides/#customization--theming' },
        { text: 'UI Modifications', link: '/guides/#ui-modifications' }
      ]
    },
    {
      text: 'Advanced Topics',
      collapsed: true,
      items: [
        { text: 'Technical Guides', link: '/guides/#development--technical-guides' },
        { text: 'Android Knowledge', link: '/guides/#essential-android-knowledge' }
      ]
    },
    {
      text: 'Community',
      collapsed: true,
      items: [
        { text: 'Resources', link: '/guides/#community--resources' },
        { text: 'Contributing', link: '/guides/#contributing-to-our-guides' }
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
        { text: 'Back to Guides', link: '/android-root-guides/' },
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
        { text: 'Back to Guides', link: '/android-root-guides/' },
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
        { text: 'Rooting Guides', link: '/android-root-guides/' },
        { text: 'Browse Apps', link: '/android-root-apps/' },
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
        { text: 'Support Us', link: 'https://opencollective.com/awesome-android-root-official' },
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
        { text: 'Why Root?', link: '/android-root-guides/#why-root-your-device' },
        { text: 'Root Apps', link: '/android-root-apps/' },
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
          <a href="https://opencollective.com/awesome-android-root-official" style="color: var(--vp-c-text-2); transition: color 0.2s; text-decoration: none; font-weight: 500;">Support Us</a>
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
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'medium',
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
