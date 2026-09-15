#!/usr/bin/env node
/**
 * Post-build validation for the VitePress → Astro/Starlight migration.
 * Compares the new dist/ output against the archived VitePress baseline
 * (/home/user/baseline) — routes, heading IDs, canonicals, titles, sitemap,
 * LLM exports, service worker caching policy and search index.
 *
 * Usage: node scripts/validate.mjs [--baseline /path/to/baseline]
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const distDir = path.join(projectRoot, 'dist');
const baselineIdx = process.argv.indexOf('--baseline');
const baselineDir = baselineIdx === -1 ? '/home/user/baseline' : process.argv[baselineIdx + 1];
// Baseline comparisons (old URLs, heading IDs, canonicals, titles) only run
// where the archived VitePress build is available; self-contained checks
// (routes, llms exports, service worker, search index, SEO) always run.
const hasBaseline = fs.existsSync(path.join(baselineDir, 'dist', 'sitemap.xml'));
if (!hasBaseline) console.warn('ℹ No baseline archive found — skipping VitePress parity checks');

let failures = 0;
let warnings = 0;
const fail = (msg) => {
	failures++;
	console.error(`✗ ${msg}`);
};
const warn = (msg) => {
	warnings++;
	console.warn(`⚠ ${msg}`);
};
const ok = (msg) => console.log(`✓ ${msg}`);

function read(p) {
	return fs.readFileSync(p, 'utf-8');
}

function extract(html, regex, all = false) {
	if (all) return [...html.matchAll(regex)].map((m) => m[1]);
	const m = html.match(regex);
	return m ? m[1] : null;
}

/** Decode common HTML entities for text comparisons. */
function decodeEntities(s) {
	return s
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'");
}

/** Map a baseline dist file name to the new dist file name. */
function newFileForOld(oldRel) {
	if (oldRel === 'index.html' || oldRel === '404.html') return oldRel;
	if (oldRel.endsWith('/index.html') || oldRel.endsWith('index.html')) {
		return oldRel.replace(/index\.html$/, 'index.html');
	}
	return oldRel.replace(/\.html$/, '/index.html');
}

// ---------------------------------------------------------------------------
// 1. Route existence — every sitemap URL must resolve in dist.
// ---------------------------------------------------------------------------
{
	const sitemapSource = hasBaseline
		? path.join(baselineDir, 'dist', 'sitemap.xml')
		: path.join(distDir, 'sitemap.xml');
	const oldSitemap = read(sitemapSource);
	const urls = extract(oldSitemap, /<loc>(.*?)<\/loc>/g, true);
	const missing = [];
	for (const url of urls) {
		const u = new URL(url);
		let rel = decodeURIComponent(u.pathname).replace(/^\//, '');
		if (!rel) rel = 'index.html';
		else if (!rel.endsWith('.html')) rel = rel.endsWith('/') ? rel + 'index.html' : rel + '/index.html';
		const candidates = [path.join(distDir, rel), path.join(distDir, rel.replace(/\/index\.html$/, '.html'))];
		if (!candidates.some((c) => fs.existsSync(c))) missing.push(url);
	}
	if (missing.length) fail(`Missing routes in new dist: ${missing.join(', ')}`);
	else ok(`All ${urls.length} sitemap URLs resolve in the new dist`);

	// Offline + 404 pages must exist.
	for (const p of ['offline/index.html', '404.html']) {
		if (fs.existsSync(path.join(distDir, p))) ok(`${p} exists`);
		else fail(`${p} is missing`);
	}
}

// ---------------------------------------------------------------------------
// 2. Heading IDs — every baseline heading ID must survive (fragment URLs).
// ---------------------------------------------------------------------------
if (hasBaseline) {
	const headings = JSON.parse(read(path.join(baselineDir, 'headings.json')));
	let total = 0;
	let missingIds = 0;
	for (const [oldRel, info] of Object.entries(headings)) {
		if (!info.ids?.length) continue;
		// The offline page was deliberately rewritten (new offline policy:
		// network-required with retry, instead of the old offline mirror).
		if (oldRel === 'offline.html') continue;
		const newRel = newFileForOld(oldRel);
		const newFile = path.join(distDir, newRel);
		if (!fs.existsSync(newFile)) {
			fail(`Cannot validate headings: ${newRel} missing`);
			continue;
		}
		const html = read(newFile);
		const ids = new Set(extract(html, /id="([^"]+)"/g, true));
		for (const entry of info.ids) {
			const id = Array.isArray(entry) ? entry[1] : entry;
			total++;
			if (!ids.has(id)) {
				missingIds++;
				if (missingIds <= 20) fail(`Heading ID lost on ${newRel}: #${id}`);
			}
		}
	}
	if (missingIds === 0) ok(`All ${total} baseline heading IDs preserved`);
	else fail(`${missingIds}/${total} baseline heading IDs missing`);
}

// ---------------------------------------------------------------------------
// 3. Canonicals — old canonical URLs must appear on the matching page.
// ---------------------------------------------------------------------------
if (hasBaseline) {
	const canonicals = JSON.parse(read(path.join(baselineDir, 'canonicals.json')));
	let checked = 0;
	for (const [oldRel, canonical] of Object.entries(canonicals)) {
		if (!canonical) continue;
		const newFile = path.join(distDir, newFileForOld(oldRel));
		if (!fs.existsSync(newFile)) continue;
		checked++;
		const html = read(newFile);
		const linkTags = [...html.matchAll(/<link\b[^>]*>/g)].map((m) => m[0]);
		const found = linkTags.find((t) => /rel="canonical"/.test(t)) ?? null;
		const href = found ? extract(found, /href="([^"]*)"/) : null;
		if (href !== canonical) fail(`Canonical mismatch on ${oldRel}: expected ${canonical}, got ${href}`);
	}
	ok(`Canonicals verified on ${checked} pages (mismatches reported above, if any)`);
}

// ---------------------------------------------------------------------------
// 4. Titles — baseline <title> text must match the new build.
// ---------------------------------------------------------------------------
if (hasBaseline) {
	const headings = JSON.parse(read(path.join(baselineDir, 'headings.json')));
	let checked = 0;
	for (const [oldRel, info] of Object.entries(headings)) {
		if (!info.title) continue;
		const newFile = path.join(distDir, newFileForOld(oldRel));
		if (!fs.existsSync(newFile)) continue;
		const title = extract(read(newFile), /<title>(.*?)<\/title>/);
		if (decodeEntities(title ?? '') !== decodeEntities(info.title))
			fail(`Title mismatch on ${oldRel}: expected "${info.title}", got "${title}"`);
		checked++;
	}
	ok(`Titles verified on ${checked} pages (mismatches reported above, if any)`);
}

// ---------------------------------------------------------------------------
// 5. Sitemap — URL set must match the old sitemap exactly (when available).
// ---------------------------------------------------------------------------
{
	const newSitemap = read(path.join(distDir, 'sitemap.xml'));
	const newUrls = new Set(extract(newSitemap, /<loc>(.*?)<\/loc>/g, true));
	if (hasBaseline) {
		const oldUrls = new Set(
			extract(read(path.join(baselineDir, 'dist', 'sitemap.xml')), /<loc>(.*?)<\/loc>/g, true)
		);
		const gone = [...oldUrls].filter((u) => !newUrls.has(u));
		const added = [...newUrls].filter((u) => !oldUrls.has(u));
		if (gone.length) fail(`Sitemap lost URLs: ${gone.join(', ')}`);
		if (added.length) fail(`Sitemap gained URLs: ${added.join(', ')}`);
		if (!gone.length && !added.length) ok(`Sitemap URL set identical (${oldUrls.size} URLs)`);
	} else {
		ok(`Sitemap lists ${newUrls.size} URLs`);
	}
	if (/<image:image>/.test(newSitemap)) ok('Sitemap image:image block present for home');
	else warn('Sitemap image:image block missing');
}

// ---------------------------------------------------------------------------
// 6. LLM / Markdown exports.
// ---------------------------------------------------------------------------
{
	const sitemapSource = hasBaseline
		? path.join(baselineDir, 'dist', 'sitemap.xml')
		: path.join(distDir, 'sitemap.xml');
	const oldSitemap = read(sitemapSource);
	const urls = extract(oldSitemap, /<loc>(.*?)<\/loc>/g, true);
	let missingMd = 0;
	for (const url of urls) {
		const u = new URL(url);
		let rel = decodeURIComponent(u.pathname).replace(/^\//, '');
		const mdRel = rel ? rel.replace(/\/$/, '') + '.md' : 'index.md';
		if (!fs.existsSync(path.join(distDir, mdRel))) {
			missingMd++;
			fail(`Missing Markdown export: /${mdRel}`);
		}
	}
	if (!missingMd) ok(`All ${urls.length} per-page .md exports present`);

	for (const f of ['llms.txt', 'llms-full.txt']) {
		if (fs.existsSync(path.join(distDir, f))) ok(`${f} present`);
		else fail(`${f} missing`);
	}

	// Every internal link inside llms.txt / llms-full.txt must resolve.
	const llms = read(path.join(distDir, 'llms.txt'));
	const links = extract(llms, /\]\(([^)]+\.md)\)/g, true);
	const broken = links.filter((l) => {
		const abs = l.startsWith('http') ? l : `https://awesome-android-root.zhoe.org${l.startsWith('/') ? l : '/' + l}`;
		const rel = new URL(abs).pathname.replace(/^\//, '');
		return !fs.existsSync(path.join(distDir, rel));
	});
	if (broken.length) fail(`llms.txt links broken: ${broken.slice(0, 5).join(', ')}`);
	else ok(`All ${links.length} llms.txt links resolve to exported Markdown`);
}

// ---------------------------------------------------------------------------
// 7. Service worker — assets/offline page precached, doc HTML never precached.
// ---------------------------------------------------------------------------
{
	const swPath = path.join(distDir, 'sw.js');
	if (!fs.existsSync(swPath)) {
		fail('sw.js missing from dist — PWA build integration did not run');
	} else {
		const sw = read(swPath);
		const precachedUrls = extract(sw, /url:\s*"([^"]+)"/g, true);
		const hasOffline = precachedUrls.some((u) => u.includes('offline')) && /offline/.test(sw);
		const docHtmlPrecached = precachedUrls.some(
			(u) => u.endsWith('.html') && !u.startsWith('offline/') && !u.startsWith('_astro/')
		);
		if (hasOffline) ok('Service worker precaches the offline page (navigateFallback target)');
		else fail('Service worker does not precache the offline page');
		if (docHtmlPrecached) fail('Service worker precaches documentation HTML (offline mirror!)');
		else ok('Service worker does not precache documentation HTML');
		if (/skipWaiting|clientsClaim/.test(sw)) ok('Service worker update strategy present');
		else warn('Could not confirm service worker update strategy');
	}
}

// ---------------------------------------------------------------------------
// 8. Search index.
// ---------------------------------------------------------------------------
{
	const pf = path.join(distDir, 'pagefind');
	if (fs.existsSync(path.join(pf, 'pagefind.js')) && fs.existsSync(path.join(pf, 'pagefind-entry.json'))) {
		const fragments = fs.readdirSync(path.join(pf, 'fragment')).length;
		ok(`Pagefind index present (${fragments} fragments)`);
	} else fail('Pagefind index missing');
}

// ---------------------------------------------------------------------------
// 9. SEO spot checks on key pages.
// ---------------------------------------------------------------------------
{
	const home = read(path.join(distDir, 'index.html'));
	const ldBlocks = extract(home, /<script type="application\/ld\+json">(.*?)<\/script>/gs, true);
	let types = new Set();
	for (const block of ldBlocks) {
		try {
			const data = JSON.parse(block);
			const graph = data['@graph'] ?? [data];
			for (const node of graph) {
			if (!node['@type']) continue;
			for (const t of [].concat(node['@type'])) types.add(t);
		}
		} catch {
			/* ignore */
		}
	}
	for (const t of ['Organization', 'WebSite', 'WebPage']) {
		if (types.has(t)) ok(`Home JSON-LD graph contains ${t}`);
		else fail(`Home JSON-LD graph missing ${t}`);
	}

	const page = read(path.join(distDir, 'rooting-guides', 'index.html'));
	if (/BreadcrumbList/.test(page)) ok('Content pages include BreadcrumbList JSON-LD');
	else fail('Content pages missing BreadcrumbList JSON-LD');
	const metas = [...page.matchAll(/<meta\b[^>]*>/g)].map((m) => m[0]);
	const ogTag = metas.find((t) => /property="og:url"/.test(t));
	const ogUrl = ogTag ? extract(ogTag, /content="([^"]*)"/) : null;
	const linkTags = [...page.matchAll(/<link\b[^>]*>/g)].map((m) => m[0]);
	const canTag = linkTags.find((t) => /rel="canonical"/.test(t));
	const canonical = canTag ? extract(canTag, /href="([^"]*)"/) : null;
	if (ogUrl && canonical && ogUrl === canonical) ok('og:url matches canonical on content pages');
	else fail(`og:url/canonical mismatch: ${ogUrl} vs ${canonical}`);
}

// ---------------------------------------------------------------------------
console.log('');
if (failures) {
	console.error(`FAILED: ${failures} problem(s), ${warnings} warning(s)`);
	process.exit(1);
} else {
	console.log(`ALL CHECKS PASSED (${warnings} warning(s))`);
}
