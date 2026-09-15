/**
 * Custom sitemap generation, preserving the exact output format of the old
 * hand-maintained sitemap.xml (same URL set, same URL style — section
 * indexes with trailing slash, leaf pages without — plus the image
 * extension entry for the homepage).
 *
 * Improvements: lastmod is derived from git history of the source Markdown
 * files instead of being manually maintained, and the file can never drift
 * from the actual route set.
 *
 * Replaces @astrojs/sitemap on purpose: that package cannot emit the
 * `image:` namespace or per-URL priorities used by the existing sitemap.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const SITE = 'https://awesome-android-root.zhoe.org';

/** changefreq/priority carried over from the previous sitemap.xml. */
const URL_META = {
	'/': { changefreq: 'weekly', priority: '1.00' },
	'/about': { changefreq: 'monthly', priority: '0.70' },
	'/contributing': { changefreq: 'yearly', priority: '0.70' },
	'/faqs': { changefreq: 'weekly', priority: '0.90' },
	'/troubleshooting': { changefreq: 'weekly', priority: '0.90' },
	'/resources': { changefreq: 'monthly', priority: '0.80' },
	'/legal-disclaimer': { changefreq: 'yearly', priority: '0.60' },
	'/non-root-alternatives': { changefreq: 'monthly', priority: '0.80' },
	'/apps-and-modules/': { changefreq: 'daily', priority: '0.98' },
	'/apps-and-modules/root-management': { changefreq: 'weekly', priority: '0.90' },
	'/apps-and-modules/system': { changefreq: 'weekly', priority: '0.85' },
	'/apps-and-modules/performance': { changefreq: 'weekly', priority: '0.85' },
	'/apps-and-modules/privacy': { changefreq: 'weekly', priority: '0.85' },
	'/apps-and-modules/security': { changefreq: 'weekly', priority: '0.85' },
	'/apps-and-modules/ad-blocking': { changefreq: 'weekly', priority: '0.85' },
	'/apps-and-modules/app-modifications': { changefreq: 'weekly', priority: '0.85' },
	'/apps-and-modules/debloating': { changefreq: 'weekly', priority: '0.85' },
	'/apps-and-modules/file-management': { changefreq: 'weekly', priority: '0.85' },
	'/apps-and-modules/backup': { changefreq: 'weekly', priority: '0.85' },
	'/apps-and-modules/customization': { changefreq: 'weekly', priority: '0.85' },
	'/apps-and-modules/audio': { changefreq: 'weekly', priority: '0.85' },
	'/apps-and-modules/networking': { changefreq: 'weekly', priority: '0.85' },
	'/apps-and-modules/gaming': { changefreq: 'weekly', priority: '0.85' },
	'/apps-and-modules/development': { changefreq: 'weekly', priority: '0.85' },
	'/apps-and-modules/utilities': { changefreq: 'weekly', priority: '0.80' },
	'/rooting-guides/': { changefreq: 'weekly', priority: '0.98' },
	'/general-guides/': { changefreq: 'weekly', priority: '0.85' },
	'/rooting-guides/how-to-unlock-bootloader': { changefreq: 'monthly', priority: '0.90' },
	'/rooting-guides/how-to-install-custom-recovery': { changefreq: 'monthly', priority: '0.90' },
	'/rooting-guides/custom-rom-installation': { changefreq: 'monthly', priority: '0.85' },
	'/rooting-guides/magisk-guide': { changefreq: 'monthly', priority: '0.92' },
	'/rooting-guides/kernelsu-guide': { changefreq: 'monthly', priority: '0.90' },
	'/rooting-guides/apatch-guide': { changefreq: 'monthly', priority: '0.85' },
	'/rooting-guides/lsposed-guide': { changefreq: 'monthly', priority: '0.85' },
	'/rooting-guides/root-framework-comparison': { changefreq: 'monthly', priority: '0.88' },
	'/rooting-guides/root-without-unlocking-bootloader': { changefreq: 'weekly', priority: '0.90' },
	'/rooting-guides/temporary-root-solutions': { changefreq: 'monthly', priority: '0.75' },
	'/rooting-guides/how-to-root-xiaomi-phone': { changefreq: 'monthly', priority: '0.82' },
	'/rooting-guides/how-to-root-samsung-phone': { changefreq: 'monthly', priority: '0.82' },
	'/rooting-guides/how-to-root-pixel-phone': { changefreq: 'monthly', priority: '0.80' },
	'/rooting-guides/how-to-root-oneplus-phone': { changefreq: 'monthly', priority: '0.78' },
	'/rooting-guides/how-to-root-nothing-phone': { changefreq: 'monthly', priority: '0.76' },
	'/rooting-guides/how-to-root-motorola-phone': { changefreq: 'monthly', priority: '0.76' },
	'/general-guides/android-adblocking': { changefreq: 'monthly', priority: '0.82' },
	'/general-guides/android-apps-debloating': { changefreq: 'monthly', priority: '0.80' },
	'/general-guides/stop-android-app-auto-updates-play-store': { changefreq: 'monthly', priority: '0.78' },
};

/** Pages that must never appear in the sitemap. */
const EXCLUDE_ROUTES = new Set(['/offline']);

function gitLastMod(root, relFile) {
	try {
		const out = execFileSync(
			'git',
			['log', '--follow', '--format=%cI\t%s', '--', relFile],
			{ cwd: root, encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] }
		).trim();
		if (!out) return null;
		// Prefer the newest commit that is not the framework migration itself,
		// so lastmod keeps reflecting real content edits (same as before).
		for (const line of out.split('\n')) {
			const [date, subject] = line.split('\t');
			if (!/starlight migration/i.test(subject)) return date;
		}
		return out.split('\n')[0].split('\t')[0] || null;
	} catch {
		return null;
	}
}

export function aarSitemap() {
	let projectRoot;
	return {
		name: 'aar-sitemap',
		hooks: {
			'astro:config:setup': ({ config }) => {
				projectRoot = fileURLToPath(config.root);
			},
			'astro:build:done': async ({ dir, logger }) => {
				const outDir = fileURLToPath(dir);
				const docsDir = path.join(projectRoot, 'src', 'content', 'docs');

				// Derive the route set from the Markdown sources (authoritative).
				const routes = [];
				const walk = (d, prefix) => {
					for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
						if (entry.isDirectory()) {
							walk(path.join(d, entry.name), `${prefix}/${entry.name}`);
						} else if (entry.name.endsWith('.md')) {
							const base = entry.name.replace(/\.md$/, '');
							routes.push(base === 'index' ? `${prefix}/` : `${prefix}/${base}`);
						}
					}
				};
				walk(docsDir, '');

				const today = new Date().toISOString().slice(0, 10);
				const urls = [];
				for (const route of routes.sort()) {
					if (EXCLUDE_ROUTES.has(route.replace(/\/$/, ''))) continue;
					const relFile = route.endsWith('/')
						? `${route}index.md`
						: `${route}.md`.replace(/^\//, '');
					const lastmod = gitLastMod(projectRoot, path.join('src', 'content', 'docs', relFile)) ?? today;
					const meta = URL_META[route] ?? { changefreq: 'weekly', priority: '0.70' };
					const loc = `${SITE}${route === '/' ? '/' : route}`;
					let block = `<url>\n  <loc>${loc}</loc>\n  <lastmod>${lastmod}</lastmod>\n  <changefreq>${meta.changefreq}</changefreq>\n  <priority>${meta.priority}</priority>\n`;
					if (route === '/') {
						block +=
							'  <image:image>\n' +
							`    <image:loc>${SITE}/images/og.png</image:loc>\n` +
							'    <image:title>Awesome Android Root - Ultimate Rooting Hub</image:title>\n' +
							'  </image:image>\n';
					}
					block += '</url>';
					urls.push(block);
				}

				const xml =
					'<?xml version="1.0" encoding="UTF-8"?>\n' +
					'<urlset\n' +
					'      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n' +
					'      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
					'      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n' +
					'      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n' +
					'            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n' +
					urls.join('\n') +
					'\n</urlset>\n';

				fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml);
				logger.info(`sitemap.xml written with ${urls.length} URLs`);
			},
		},
	};
}
