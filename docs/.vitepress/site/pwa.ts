import type { UserConfig } from 'vitepress'
// Loads the `pwa` option that @vite-pwa/vitepress adds to VitePress's UserConfig.
import type {} from '@vite-pwa/vitepress'

/**
 * Online-first PWA. Only images the web app itself renders are precached:
 * favicons, the nav logos, the home page sponsor logo and the install icons.
 *
 * Social and structured-data images (`/images/og.png`, `/images/og/**`,
 * `/images/logo.png`) appear only in `og:image`, `twitter:image` and JSON-LD.
 * Crawlers fetch them, browsers never render them, so no cache stores them.
 * The runtime rules below are serialized into sw.js, so each `urlPattern`
 * must be self-contained (no references to module-level constants).
 */
export const pwa: NonNullable<UserConfig['pwa']> = {
  strategies: 'generateSW',
  registerType: 'autoUpdate',

  generateSW: {
    globPatterns: [
      'favicon.{ico,svg}',
      'favicon-96x96.png',
      'images/apple-touch-icon.png',
      'images/{logo,logo_dark,addy-logo}.svg',
      'images/{web-app-manifest,maskable}-{192x192,512x512}.png',
    ],

    globIgnores: [
      '**/node_modules/**',
      '**/dev-dist/**',
      '**/.vitepress/cache/**',
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
        // Same-origin images a page actually renders (<img>, CSS). Direct
        // visits to an image URL are navigations and are not cached.
        urlPattern: ({ request, url, sameOrigin }) =>
          sameOrigin &&
          request.destination === 'image' &&
          !/\/images\/(og\/|og\.png$|logo\.png$)/.test(url.pathname),
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
        // Live third-party badges (release versions, stars): reuse a copy for
        // at most 4 hours, then fetch a fresh one.
        urlPattern: ({ url }) =>
          url.origin === 'https://img.shields.io' ||
          url.origin === 'https://avatars.githubusercontent.com',
        handler: 'CacheFirst',
        options: {
          cacheName: 'aar-badges',
          plugins: [{
            // <img> badge responses are opaque, so ExpirationPlugin cannot read
            // their Date header, and it renews an entry's age on every hit. Key
            // each copy by a fixed 4-hour window instead; the network request
            // URL is unchanged.
            cacheKeyWillBeUsed: async ({ request }) => {
              const key = new URL(request.url)
              key.searchParams.set('sw-window', String(Math.floor(Date.now() / (4 * 60 * 60 * 1000))))
              return key.href
            },
          }],
          expiration: {
            maxEntries: 40,
            maxAgeSeconds: 60 * 60 * 4,  // removes copies from earlier windows
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
