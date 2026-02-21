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
      // ============================================================================
      // PRE-CACHE CONFIGURATION
      // ============================================================================
      // Pre-cache critical files during service worker installation
      // This ensures essential files are available offline immediately
      globPatterns: [
        // Core application shell - VitePress theme and framework
        '**/*.{js,css}',
        
        // Essential HTML pages for offline navigation
        '**/index.html',
        '**/offline.html',
        
        // Critical images (logo, icons, etc.)
        '**/images/logo*.{svg,png}',
        '**/images/*-icon*.{png,svg}',
        '**/images/web-app-manifest-*.png',
        
        // Favicons for proper offline branding
        '**/{favicon,favicon-*}.{ico,svg,png}',
      ],
      
      // Exclude patterns - don't pre-cache these
      globIgnores: [
        // Build artifacts and development files
        '**/node_modules/**',
        '**/dev-dist/**',
        '**/.vitepress/cache/**',
        
        // Large files that should be cached on-demand
        '**/images/og/**',
        
        // Don't pre-cache all markdown pages (too many)
        // They'll be cached on-demand via runtimeCaching
      ],

      // ============================================================================
      // SERVICE WORKER BEHAVIOR
      // ============================================================================
      // Immediate service worker activation and control
      skipWaiting: true,              // Activate new SW immediately
      clientsClaim: true,             // Take control of all pages immediately
      cleanupOutdatedCaches: true,    // Remove old caches automatically
      
      // Navigation and offline handling
      navigateFallback: '/offline.html',        // Offline page fallback
      navigateFallbackDenylist: [
        // Don't use offline fallback for these patterns
        /^\/_/,                       // VitePress internal routes
        /^\/api\//,                   // API routes
        /\.[^/]+$/,                   // Files with extensions (assets)
      ],
      navigationPreload: true,        // Speed up navigation requests
      
      // Directory and file handling
      directoryIndex: 'index.html',   // Default file for directories
      
      // Maximum file size to cache (15MB - increased for large guide pages)
      maximumFileSizeToCacheInBytes: 15 * 1024 * 1024,

      // ============================================================================
      // RUNTIME CACHING STRATEGIES
      // ============================================================================
      // Define how different types of resources are cached at runtime
      
      runtimeCaching: [
        // ------------------------------------------------------------------------
        // STRATEGY 1: HTML Pages (Documentation & Guides)
        // Network First - Always try to get fresh content, fallback to cache
        // ------------------------------------------------------------------------
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
            networkTimeoutSeconds: 5,  // Wait 5s for network before using cache
            expiration: {
              maxEntries: 150,         // Store up to 150 pages
              maxAgeSeconds: 60 * 60 * 24 * 1,  // 1 day
              purgeOnQuotaError: true, // Auto-cleanup if storage is full
            },
            cacheableResponse: {
              statuses: [0, 200],      // Cache successful responses
            },
            plugins: [
              {
                // Fallback to offline page if both network and cache fail
                handlerDidError: async ({ request }) => {
                  return caches.match('/offline.html') || Response.error()
                },
                // Log fetch failures for debugging
                fetchDidFail: async ({ originalRequest, error }) => {
                  if (process.env.NODE_ENV === 'development') {
                    console.warn('Page fetch failed:', originalRequest.url, error)
                  }
                },
              }
            ]
          }
        },

        // ------------------------------------------------------------------------
        // STRATEGY 2: JavaScript & CSS Assets
        // Stale While Revalidate - Serve from cache, update in background
        // ------------------------------------------------------------------------
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
              maxEntries: 250,         // More entries for various JS/CSS chunks
              maxAgeSeconds: 60 * 60 * 24 * 7,  // 7 days
              purgeOnQuotaError: true,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          }
        },

        // ------------------------------------------------------------------------
        // STRATEGY 3: Images (Local & External)
        // Cache First - Fastest loading, long-term storage
        // ------------------------------------------------------------------------
        {
          urlPattern: ({ request, url, sameOrigin }) => {
            // Match local images and common external image hosts
            const isImage = request.destination === 'image' ||
              /\.(png|jpg|jpeg|svg|gif|webp|avif|ico|bmp)$/i.test(url.pathname)
            
            // Include external image hosts used in documentation
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
              maxEntries: 400,         // Large capacity for many app icons/images
              maxAgeSeconds: 60 * 60 * 24 * 60,  // 60 days (images rarely change)
              purgeOnQuotaError: true,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
            plugins: [
              {
                // Return placeholder SVG if image fails to load
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

        // ------------------------------------------------------------------------
        // STRATEGY 4: Web Fonts
        // Cache First - Fonts never change, permanent storage
        // ------------------------------------------------------------------------
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
              maxEntries: 40,          // Fonts are few but important
              maxAgeSeconds: 60 * 60 * 24 * 30,  // 30 days
              purgeOnQuotaError: true,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          }
        },

        // ------------------------------------------------------------------------
        // STRATEGY 5: Shield.io Badges
        // Stale While Revalidate - Show cached badge, update in background
        // ------------------------------------------------------------------------
        {
          urlPattern: ({ url }) => 
            url.origin === 'https://img.shields.io',
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'aar-badges-v1',
            expiration: {
              maxEntries: 300,         // Many badges across different pages
              maxAgeSeconds: 60 * 60 * 12,  // 12 hours (shorter as badges can change)
              purgeOnQuotaError: true,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
            // Optional: Add cache name to request for better tracking
            matchOptions: {
              ignoreSearch: false,     // Different params = different badges
            }
          }
        },


        // ------------------------------------------------------------------------
        // STRATEGY 6: VitePress Search Index
        // Network First - Keep search results fresh but cache for offline
        // ------------------------------------------------------------------------
        {
          urlPattern: ({ url }) => 
            url.pathname.includes('search') ||
            url.pathname.includes('@localSearchIndex') ||
            url.pathname.includes('searchIndex'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'aar-search-v1',
            networkTimeoutSeconds: 3,   // Quick timeout for search
            expiration: {
              maxEntries: 10,           // Limited search index files
              maxAgeSeconds: 60 * 60 * 24,  // 24 hours
              purgeOnQuotaError: true,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          }
        },


        // ------------------------------------------------------------------------
        // STRATEGY 7: API/JSON Data (if any)
        // Network First - Fresh data priority with offline fallback
        // ------------------------------------------------------------------------
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
    // ============================================================================
    // PWA MANIFEST CONFIGURATION
    // ============================================================================
    // Defines how the app appears when installed on user devices
    manifest: {
      // Application identity
      name: 'Awesome Android Root',
      short_name: 'AAR',
      description: 'Ultimate Android rooting hub with 470+ curated apps, Magisk modules, KernelSU modules, LSPosed modules, and comprehensive step-by-step rooting guides for Android customization.',
      
      // Visual theming
      theme_color: '#ffffff',
      background_color: '#ffffff',
      
      // App behavior and navigation
      start_url: '/',
      scope: '/',
      display: 'standalone',                    // Full-screen app experience
      display_override: [
        'window-controls-overlay',              // Modern window controls (if supported)
        'standalone',                           // Fallback to standalone
        'minimal-ui'                            // Fallback to minimal UI
      ],
      orientation: 'any',                       // Allow all orientations
      
      // Localization
      lang: 'en-US',
      dir: 'ltr',
      
      // App store settings
      prefer_related_applications: false,       // Prefer PWA over native app
      categories: [
        'utilities', 
        'developer', 
        'education', 
        'productivity',
        'reference'                             // Added reference category
      ],
      
      // Icons with multiple purposes for different contexts
      icons: [
        // Favicon - Browser tab icon
        {
          src: '/favicon.ico',
          sizes: '16x16 24x24 32x32 48x48',
          type: 'image/x-icon',
          purpose: 'any'
        },
        // Medium size - Browser bookmark, Windows taskbar
        {
          src: '/favicon-96x96.png',
          sizes: '96x96',
          type: 'image/png',
          purpose: 'any'
        },
        // Standard PWA icon - Android home screen, Chrome app drawer
        {
          src: '/images/web-app-manifest-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any'
        },
        // Maskable icon for adaptive icons on Android 8+
        {
          src: '/images/web-app-manifest-192x192-maskable.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        // Large icon - Splash screens, app stores
        {
          src: '/images/web-app-manifest-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        // Large maskable icon for high-res adaptive icons
        {
          src: '/images/web-app-manifest-512x512-maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ],
      
      
    },
    
    // ============================================================================
    // DEVELOPMENT & BUILD OPTIONS
    // ============================================================================
    // Development mode configuration for testing PWA features locally
    devOptions: {
      enabled: process.env.NODE_ENV === 'development',
      suppressWarnings: true,
      navigateFallback: 'index.html',
      type: 'module'
    },

    // ============================================================================
    // SERVICE WORKER FILE OPTIONS
    // ============================================================================
    // Service worker file settings
    filename: 'sw.js',              // Service worker filename
    scope: '/',                     // Service worker scope (entire site)
    inlineRegister: false,          // Don't inline registration (better for updates)
    minify: true,                   // Minify service worker in production
    
    // Credentials handling for cross-origin requests
    useCredentials: false,
    
    // Inject manifest link automatically
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico,jpg,jpeg,gif,webp}']
    }
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
    ['link', { rel: 'preconnect', href: 'https://github.com', crossorigin: '' }],
    ['link', { rel: 'dns-prefetch', href: 'https://github.com' }],
    
    // Sitemap
    ['link', { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' }],
    
  
    // --- SEO Meta Tags ---
    ['meta', { name: 'keywords', content: 'android root 2025, how to root android, magisk installation guide, kernelsu tutorial, lsposed framework, best root apps, magisk modules 2025, systemless root, custom recovery twrp, bootloader unlock guide, android customization apps, rooting tutorial step by step, pixel root guide, samsung root knox, xiaomi unlock bootloader, oneplus root guide, android privacy tools, ad blocker root, android debloating, system-wide adblock, play integrity fix, root hide banking apps, custom rom installation, android performance optimization, root apps collection, xposed modules 2025, apatch android, android power user, superuser apps, root manager apps, android system tweaks, kernel management, titanium backup alternative, android automation root, tasker root plugins, firewall root android, network monitor root, android theming root, substratum android, android terminal emulator, adb commands root, fastboot guide, android modding, app cloning root, dual apps android, android backup root, nandroid backup, root detection bypass, safetynet fix, google pay root' }],
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
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://awesome-android-root.org/#website",
          "name": "Awesome Android Root",
          "description": "Ultimate Android rooting hub with 470+ curated root apps, Magisk/KernelSU/APatch modules, LSPosed framework, and comprehensive rooting guides.",
          "url": "https://awesome-android-root.org/",
          "inLanguage": "en-US",
          "publisher": {
            "@type": "Organization",
            "@id": "https://awesome-android-root.org/#organization",
            "name": "Awesome Android Root Project",
            "url": "https://awesome-android-root.org/",
            "logo": {
              "@type": "ImageObject",
              "url": "https://awesome-android-root.org/images/logo.png",
              "width": 330,
              "height": 330
            },
            "sameAs": [
              "https://github.com/awesome-android-root/awesome-android-root",
              "https://x.com/awsm_and_root",
              "https://opencollective.com/awesome-android-root-official"
            ]
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://awesome-android-root.org/?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "ItemList",
          "@id": "https://awesome-android-root.org/#mainnavigation",
          "name": "Main Navigation",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Root Apps & Modules",
              "url": "https://awesome-android-root.org/apps-and-modules/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Rooting Guides",
              "url": "https://awesome-android-root.org/rooting-guides/"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Tutorials",
              "url": "https://awesome-android-root.org/general-guides/"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "FAQ",
              "url": "https://awesome-android-root.org/faqs"
            },
            {
              "@type": "ListItem",
              "position": 5,
              "name": "Troubleshooting",
              "url": "https://awesome-android-root.org/troubleshooting"
            }
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://awesome-android-root.org/#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://awesome-android-root.org/"
            }
          ]
        }
      ]
    })],
    
    // Open Graph Enhanced
    ['meta', { property: 'og:site_name', content: 'Awesome Android Root' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],

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
              if (documentId.includes('apps-and-modules')) {
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
        text: 'Support',
        items: [
          {
            text: 'Help Center',
            items: [
              { text: 'Frequently Asked Questions', link: '/faqs' },
              { text: 'Troubleshooting Guide', link: '/troubleshooting' },
              { text: 'Community Resources', link: '/resources' },
              { text: 'Rooting Glossary', link: '/apps-and-modules/#glossary' }
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
      text: '🎨 Customization & Themes',
      collapsed: false,
      items: [
        { text: 'Boot and Startup', link: '/apps-and-modules/#boot-and-startup' },
        { text: 'Customization and Theming', link: '/apps-and-modules/#customization-and-theming' },
        { text: 'Themes and Visual Styles', link: '/apps-and-modules/#themes-and-visual-mods' },
        { text: 'Launchers and Home Screen', link: '/apps-and-modules/#launchers-and-home-screen' },
        { text: 'Gestures and Navigation', link: '/apps-and-modules/#gestures-and-navigation' },
        { text: 'Notifications and UI Elements', link: '/apps-and-modules/#notifications-and-ui-elements' },
        { text: 'Display and Screen Tweaks', link: '/apps-and-modules/#screen-and-display' },
        { text: 'OS-Specific Customization', link: '/apps-and-modules/#os-specific-customization' }
      ]
    },
    {
      text: '⚡ Performance & Optimization',
      collapsed: false,
      items: [
        { text: 'Performance and Optimization', link: '/apps-and-modules/#performance-and-optimization' },
        { text: 'Battery and Power Management', link: '/apps-and-modules/#battery-and-power-management' },
        { text: 'System Cleanup and Maintenance', link: '/apps-and-modules/#debloating-and-cleaning' },
        { text: 'Kernel Management', link: '/apps-and-modules/#kernel-management' }
      ]
    },
    {
      text: '🛠️ Root & System Control',
      collapsed: false,
      items: [
        { text: 'Root Access Managers', link: '/apps-and-modules/#root-management' },
        { text: 'Safety and Play Integrity', link: '/apps-and-modules/#root-hiding-and-play-integrity' },
        { text: 'Bootloop Protection Tools', link: '/apps-and-modules/#bootloop-protection' },
        { text: 'System Modifications', link: '/apps-and-modules/#system-modifications' }
      ]
    },
    {
      text: '🛡️ Privacy and Security',
      collapsed: true,
      items: [
        { text: 'Privacy and Security', link: '/apps-and-modules/#privacy-and-security' },
        { text: 'Firewalls and Network Control', link: '/apps-and-modules/#firewall-tools' },
        { text: 'Ad and Tracker Blocking', link: '/apps-and-modules/#ads-and-tracking-blockers' }
      ]
    },
    {
      text: '📦 App Management',
      collapsed: true,
      items: [
        { text: 'Complete App Control', link: '/apps-and-modules/#app-management-and-control' },
        { text: 'App Isolation and Cloning', link: '/apps-and-modules/#app-isolation-and-cloning' },
        { text: 'Signature Verification Mods', link: '/apps-and-modules/#signature-and-verification' },
        { text: 'App Managers', link: '/apps-and-modules/#app-managers' }
      ]
    },
    {
      text: '🔧 Modified & Patched Apps',
      collapsed: true,
      items: [
        { text: 'Modified App Collection', link: '/apps-and-modules/#app-modifications' },
        { text: 'Social Media Mods', link: '/apps-and-modules/#social-media-mods' },
        { text: 'ReVanced Patches', link: '/apps-and-modules/#revanced' },
        { text: 'Other App Modifications', link: '/apps-and-modules/#misc-app-mods' }
      ]
    },
    {
      text: '💾 Storage & Backup',
      collapsed: true,
      items: [
        { text: 'File Managers', link: '/apps-and-modules/#file-management' },
        { text: 'Backup and Restore Solutions', link: '/apps-and-modules/#backup-and-restore' }
      ]
    },
    {
      text: '🌐 Browser & Web Tools',
      collapsed: true,
      items: [
        { text: 'Browser Extensions', link: '/apps-and-modules/#browser-extensions' },
        { text: 'Webview Modifications', link: '/apps-and-modules/#webview-mods' }
      ]
    },
    {
      text: '🌐 Network & Connectivity',
      collapsed: true,
      items: [
        { text: 'Network Control and Tools', link: '/apps-and-modules/#network-and-connectivity' },
        { text: 'GPS and Location Tools', link: '/apps-and-modules/#location-and-gps' },
        { text: 'NFC Utilities', link: '/apps-and-modules/#nfc-and-wireless' }
      ]
    },
    {
      text: '📞 Communication',
      collapsed: true,
      items: [
        { text: 'Call Recording and Management', link: '/apps-and-modules/#call-recording' },
        { text: 'SMS Tools and Utilities', link: '/apps-and-modules/#sms-and-messaging' },
        { text: 'Other Communication Tools', link: '/apps-and-modules/#communication-and-messaging' }
      ]
    },
    {
      text: '🎵 Audio & Media',
      collapsed: true,
      items: [
        { text: 'Audio Tools and Utilities', link: '/apps-and-modules/#audio-and-media' },
        { text: 'Sound Enhancement', link: '/apps-and-modules/#audio-enhancement' },
        { text: 'Audio Configuration', link: '/apps-and-modules/#audio-configuration' }
      ]
    },
    {
      text: '👨‍💻 Developer & Advanced',
      collapsed: true,
      items: [
        { text: 'Dev Tools', link: '/apps-and-modules/#development-and-debugging' },
        { text: 'Terminal', link: '/apps-and-modules/#terminal-and-shell-tools' },
        { text: 'Hardware Control', link: '/apps-and-modules/#hardware-and-sensors' },
        { text: 'LSPosed', link: '/apps-and-modules/#lsposed-framework' }
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
      { icon: 'x', link: 'https://x.com/awsm_and_root' },
      { icon: 'github', link: 'https://github.com/awesome-android-root/awesome-android-root' }
    ],
  },
}))
