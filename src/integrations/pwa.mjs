/**
 * PWA integration — wraps vite-plugin-pwa for Astro (the official
 * @vite-pwa/astro package does not support Astro 7 yet, and its integration
 * is a thin wrapper like this one).
 *
 * Caching policy (deliberately different from the old VitePress site):
 *   - Static assets (hashed JS/CSS, icons, favicons, manifest) are precached
 *     or cache-first: performance + resilience.
 *   - Documentation HTML is NOT precached and NOT runtime-cached. The site
 *     stays fundamentally network-dependent: there is no offline mirror of
 *     the docs.
 *   - Navigation while offline falls back to a dedicated offline page that
 *     explains the situation and offers retry (see src/content/docs/offline.md).
 *   - Service worker updates: autoUpdate + skipWaiting + clientsClaim with
 *     cleanup of outdated caches, mirroring the old update behavior.
 */
import { VitePWA } from 'vite-plugin-pwa';

const pwaOptions = {
		strategies: 'generateSW',
		registerType: 'autoUpdate',
		// Registration is handled by src/components/PwaStatus.astro
		// through virtual:pwa-register (same module as before).
		injectRegister: null,
		// The manifest stays a hand-maintained public/manifest.json,
		// exactly as in the VitePress setup.
		manifest: false,
		devOptions: { enabled: false },
		minify: true,
		workbox: {
			// Precache: static/immutable assets + the dedicated offline
			// page ONLY. No documentation HTML is precached.
			globPatterns: [
				'offline/index.html',
				'_astro/**/*.{js,css,woff,woff2}',
				'images/logo*.{svg,png}',
				'images/*-icon*.{png,svg}',
				'images/web-app-manifest-*.png',
				'images/apple-touch-icon.png',
				'images/fdroid.svg',
				'images/playstore.svg',
				'favicon.ico',
				'favicon.svg',
				'favicon-96x96.png',
				'manifest.json',
			],
			globIgnores: [
				'**/node_modules/**',
				'dev-dist/**',
				'images/og/**',
				'pagefind/**',
				'**/*.md',
				'llms.txt',
				'llms-full.txt',
			],
			skipWaiting: true,
			clientsClaim: true,
			cleanupOutdatedCaches: true,
			navigationPreload: true,
			directoryIndex: 'index.html',
			maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,

			// Offline navigation: show the dedicated offline page.
			// The docs themselves are never served from cache.
			navigateFallback: '/offline/',
			navigateFallbackDenylist: [
				/^\/pagefind\//,
				/^\/llms/,
				/\.md$/,
				/^\/images\//,
				/^\/_astro\//,
			],

			runtimeCaching: [
				// Hashed static assets: stale-while-revalidate as a
				// safety net for anything not already precached.
				{
					urlPattern: ({ request, url, sameOrigin }) =>
						sameOrigin &&
						(request.destination === 'script' ||
							request.destination === 'style' ||
							/\.(js|mjs|css)$/i.test(url.pathname)),
					handler: 'StaleWhileRevalidate',
					options: {
						cacheName: 'aar-assets-v1',
						expiration: {
							maxEntries: 250,
							maxAgeSeconds: 60 * 60 * 24 * 7,
							purgeOnQuotaError: true,
						},
						cacheableResponse: { statuses: [0, 200] },
					},
				},

				// Images: cache-first, same allowed origins as before.
				{
					urlPattern: ({ request, url, sameOrigin }) => {
						const isImage =
							request.destination === 'image' ||
							/\.(png|jpg|jpeg|svg|gif|webp|avif|ico|bmp)$/i.test(url.pathname);
						const isAllowedOrigin =
							sameOrigin ||
							url.origin === 'https://raw.githubusercontent.com' ||
							url.origin === 'https://avatars.githubusercontent.com' ||
							url.origin === 'https://user-images.githubusercontent.com';
						return isImage && isAllowedOrigin;
					},
					handler: 'CacheFirst',
					options: {
						cacheName: 'aar-images-v1',
						expiration: {
							maxEntries: 400,
							maxAgeSeconds: 60 * 60 * 24 * 60,
							purgeOnQuotaError: true,
						},
						cacheableResponse: { statuses: [0, 200] },
					},
				},

				// Fonts: cache-first (own origin + Google Fonts).
				{
					urlPattern: ({ request, url }) => {
						const isFontFile = /\.(woff2?|ttf|otf|eot)$/i.test(url.pathname);
						const isFontRequest = request.destination === 'font';
						const isFontHost =
							url.origin === self.location.origin ||
							url.hostname.includes('fonts.googleapis.com') ||
							url.hostname.includes('fonts.gstatic.com');
						return (isFontFile || isFontRequest) && isFontHost;
					},
					handler: 'CacheFirst',
					options: {
						cacheName: 'aar-fonts-v1',
						expiration: {
							maxEntries: 40,
							maxAgeSeconds: 60 * 60 * 24 * 30,
							purgeOnQuotaError: true,
						},
						cacheableResponse: { statuses: [0, 200] },
					},
				},

				// shields.io badges: stale-while-revalidate (short TTL).
				{
					urlPattern: ({ url }) => url.origin === 'https://img.shields.io',
					handler: 'StaleWhileRevalidate',
					options: {
						cacheName: 'aar-badges-v1',
						expiration: {
							maxEntries: 300,
							maxAgeSeconds: 60 * 60 * 12,
							purgeOnQuotaError: true,
						},
						cacheableResponse: { statuses: [0, 200] },
						matchOptions: { ignoreSearch: false },
					},
				},

				// Pagefind core files: network-first so a fresh deploy's
				// index version is picked up quickly.
				{
					urlPattern: ({ url, sameOrigin }) =>
						sameOrigin && /\/pagefind\/(pagefind\.js|meta\.json)$/.test(url.pathname),
					handler: 'NetworkFirst',
					options: {
						cacheName: 'aar-search-core-v1',
						networkTimeoutSeconds: 3,
						expiration: {
							maxEntries: 10,
							maxAgeSeconds: 60 * 60 * 24,
							purgeOnQuotaError: true,
						},
						cacheableResponse: { statuses: [0, 200] },
					},
				},

				// Pagefind index fragments/wasm are content-addressed:
				// safe to cache-first.
				{
					urlPattern: ({ url, sameOrigin }) =>
						sameOrigin && url.pathname.startsWith('/pagefind/'),
					handler: 'CacheFirst',
					options: {
						cacheName: 'aar-search-index-v1',
						expiration: {
							maxEntries: 300,
							maxAgeSeconds: 60 * 60 * 24 * 30,
							purgeOnQuotaError: true,
						},
						cacheableResponse: { statuses: [0, 200] },
					},
				},

				// JSON data (manifest.json etc.): network-first.
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
							maxAgeSeconds: 60 * 60 * 6,
							purgeOnQuotaError: true,
						},
						cacheableResponse: { statuses: [0, 200] },
					},
				},

				// NOTE: there is intentionally NO runtime caching rule
				// for HTML/document requests. Documentation pages are
				// network-dependent by design (see MIGRATION.md).
			],
		},
};

let bridgeApi;

export function aarPwa() {
	return {
		name: 'aar-pwa',
		hooks: {
			'astro:config:setup': ({ updateConfig, command, logger }) => {
				if (command === 'preview' || command === 'sync') return;
				// Astro 7 runs Vite with multiple environments; vite-plugin-pwa's own
				// build hooks are not invoked for the client build there, so bridge
				// them the same way the official @vite-pwa/astro integration does.
				let api;
				const plugins = VitePWA(pwaOptions).filter(
					(p) => !['vite-plugin-pwa:build', 'vite-plugin-pwa:dev-sw'].includes(p.name)
				);
				if (command === 'build') {
					plugins.push({
						name: 'aar-pwa:build-bridge',
						applyToEnvironment: (env) => env.name === 'client',
						configResolved(resolvedConfig) {
							if (!resolvedConfig.build.ssr) {
								api = resolvedConfig.plugins
									.flat(Number.POSITIVE_INFINITY)
									.find((p) => p.name === 'vite-plugin-pwa')?.api;
							}
						},
						generateBundle(_, bundle) {
							api?.generateBundle(bundle, this);
						},
					});
				}
				updateConfig({ vite: { plugins } });
				if (command === 'build') {
					logger.info('PWA enabled: asset caching without offline doc mirroring');
				}
				// expose for astro:build:done
				bridgeApi = () => api;
			},
			'astro:build:done': async ({ logger }) => {
				const api = bridgeApi?.();
				if (api && !api.disabled) {
					await api.generateSW();
					logger.info('Service worker generated (sw.js)');
				}
			},
		},
	};
}
