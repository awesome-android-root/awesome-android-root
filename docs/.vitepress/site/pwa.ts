import type { UserConfig } from 'vitepress'
// Loads the `pwa` option that @vite-pwa/vitepress adds to VitePress's UserConfig.
import type {} from '@vite-pwa/vitepress'

/** Online-first PWA: only images are precached; see the runtime caches below. */
export const pwa: NonNullable<UserConfig['pwa']> = {
  strategies: 'generateSW',
  registerType: 'autoUpdate',

  generateSW: {
    globPatterns: [
      '**/*.{png,jpg,jpeg,svg,gif,webp,avif,ico}',
    ],

    globIgnores: [
      '**/node_modules/**',
      '**/dev-dist/**',
      '**/.vitepress/cache/**',
      '**/images/og/**',
    ],

    cleanupOutdatedCaches: true,

    runtimeCaching: [
      {

        urlPattern: ({ url, sameOrigin }) =>
          sameOrigin && url.pathname.startsWith('/assets/'),
        handler: 'CacheFirst',
        options: {
          cacheName: 'aar-static-assets',
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 60 * 60 * 24 * 365,  // filenames are content-hashed
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
            url.origin === 'https://user-images.githubusercontent.com'

          return isImage && isAllowedOrigin
        },
        handler: 'CacheFirst',
        options: {
          cacheName: 'aar-images-v1',
          expiration: {
            maxEntries: 120,
            maxAgeSeconds: 60 * 60 * 24 * 60,  // 60 days (images rarely change)
            purgeOnQuotaError: true,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        }
      },
      {

        urlPattern: ({ url }) => url.origin === 'https://avatars.githubusercontent.com',
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'aar-github-avatars',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 * 7,  // 7 days
            purgeOnQuotaError: true,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        }
      },
      {
        urlPattern: ({ url }) => url.origin === 'https://img.shields.io',
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'aar-badges',
          expiration: {
            maxEntries: 40,
            maxAgeSeconds: 60 * 60 * 24,  // 1 day
            purgeOnQuotaError: true,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        }
      },
      {
        // WebMCP's page index (titles and paths only); pages are fetched on demand.
        urlPattern: ({ url, sameOrigin }) => sameOrigin && url.pathname.endsWith('/page-index.json'),
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'aar-page-index',
          expiration: {
            maxEntries: 1,
            maxAgeSeconds: 60 * 60 * 24 * 7,  // 7 days; regenerated per build
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
    type: 'module'
  },

  injectRegister: 'script',
  minify: true,
  maximumFileSizeToCacheInBytes: 2 * 1024 * 1024,

}
