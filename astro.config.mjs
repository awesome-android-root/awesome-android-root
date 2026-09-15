import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { unified } from '@astrojs/markdown-remark';

import { sidebar } from './src/config/sidebar.mjs';
import { aarPwa } from './src/integrations/pwa.mjs';
import { aarLlmsExport } from './src/integrations/llms-export.mjs';
import { aarSitemap } from './src/integrations/sitemap.mjs';
import { rehypeHeadingIdsVitePress } from './src/lib/markdown/rehype-heading-ids.mjs';
import { rehypeResolveMarkdownLinks } from './src/lib/markdown/rehype-md-links.mjs';
import { rehypeStoreLinks } from './src/lib/markdown/rehype-store-links.mjs';
import { rehypeMarkdownActions } from './src/lib/markdown/rehype-markdown-actions.mjs';

const SITE = 'https://awesome-android-root.zhoe.org';

export default defineConfig({
	site: SITE,
	// Allow reverse-proxied preview hosts (CI / sandbox previews).
	server: { host: true, allowedHosts: true },
	preview: { host: true, allowedHosts: true },
	// The old VitePress site used cleanUrls: leaf pages without trailing
	// slashes (/about). Section indexes still resolve with or without the
	// slash because they build to `<section>/index.html`.
	trailingSlash: 'never',
	build: { format: 'directory' },

	markdown: {
		processor: unified({
			rehypePlugins: [
				// Must run before Astro/Starlight's rehypeHeadingIds so the
				// VitePress-compatible slug wins (existing fragment URLs keep working).
				rehypeHeadingIdsVitePress,
				rehypeResolveMarkdownLinks,
				rehypeStoreLinks,
				rehypeMarkdownActions,
			],
		}),
	},

	integrations: [
		starlight({
			title: 'Awesome Android Root',
			description:
				'Browse 600+ Android root apps and modules, practical rooting guides, and troubleshooting help for rooted devices.',
			logo: {
				light: './src/assets/logo.svg',
				dark: './src/assets/logo_dark.svg',
				replacesTitle: false,
			},
			favicon: '/favicon.svg',
			social: [
				{
					icon: 'github',
					label: 'View source code on GitHub',
					href: 'https://github.com/awesome-android-root/awesome-android-root',
				},
				{
					icon: 'x.com',
					label: 'Follow us on Twitter/X',
					href: 'https://x.com/awsm_and_root',
				},
			],
			editLink: {
				// Starlight appends the entry file path (src/content/docs/…) itself.
				baseUrl: 'https://github.com/awesome-android-root/awesome-android-root/edit/main',
			},
			lastUpdated: true,
			// Our own src/pages/404.astro replaces Starlight's built-in page.
			disable404Route: true,
			sidebar,
			customCss: ['./src/styles/custom.css'],
			components: {
				Head: './src/overrides/Head.astro',
				Header: './src/overrides/Header.astro',
				Footer: './src/overrides/Footer.astro',
				PageTitle: './src/overrides/PageTitle.astro',
			},
			head: [
				// Viewport parity with the old site (viewport-fit=cover).
				{
					tag: 'meta',
					attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' },
				},
				// Theme colors (light/dark) + PWA/browser metadata.
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' } },
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#0b0b0c', media: '(prefers-color-scheme: dark)' } },
				{ tag: 'meta', attrs: { name: 'color-scheme', content: 'light dark' } },
				{ tag: 'meta', attrs: { name: 'apple-mobile-web-app-title', content: 'AAR' } },
				{ tag: 'meta', attrs: { name: 'application-name', content: 'Awesome Android Root' } },
				{ tag: 'meta', attrs: { name: 'mobile-web-app-capable', content: 'yes' } },
				{ tag: 'meta', attrs: { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' } },
				// Favicons / touch icons.
				{ tag: 'link', attrs: { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' } },
				{ tag: 'link', attrs: { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' } },
				{ tag: 'link', attrs: { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/apple-touch-icon.png' } },
				// Web app manifest (hand-maintained public/manifest.json).
				{ tag: 'link', attrs: { rel: 'manifest', href: '/manifest.json' } },
				// Resource hints.
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://github.com', crossorigin: '' } },
				{ tag: 'link', attrs: { rel: 'dns-prefetch', href: 'https://github.com' } },
				// Sitemap (custom generator keeps the old /sitemap.xml URL).
				{ tag: 'link', attrs: { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' } },
				// SEO directives carried over from the VitePress head config.
				{ tag: 'meta', attrs: { name: 'publisher', content: 'Awesome Android Root Project' } },
				{ tag: 'meta', attrs: { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' } },
				{ tag: 'meta', attrs: { name: 'googlebot', content: 'index, follow, max-image-preview:large' } },
				{ tag: 'meta', attrs: { name: 'language', content: 'en-US' } },
				{ tag: 'meta', attrs: { name: 'distribution', content: 'global' } },
				{ tag: 'meta', attrs: { name: 'rating', content: 'general' } },
				{ tag: 'meta', attrs: { name: 'referrer', content: 'no-referrer-when-downgrade' } },
				// Verification tags.
				{ tag: 'meta', attrs: { name: 'ahrefs-site-verification', content: '5fd5ad82114006dedaabbb7cc47ee96924361ceedafe09795ce9abbb7d32d6ff' } },
				{ tag: 'meta', attrs: { name: 'google-site-verification', content: 'LZTsUH49HHfaPFDezfkN4dE0JmLUbOrY3NJKLr1ZPrE' } },
			],
			pagefind: {},
		}),
		aarSitemap(),
		aarLlmsExport(),
		aarPwa(),
	],
});
