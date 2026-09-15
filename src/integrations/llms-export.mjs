/**
 * LLM/Markdown export — Astro replacement for `vitepress-plugin-llms`.
 *
 * Externally useful behavior preserved from the VitePress plugin:
 *   - /llms.txt         index of the whole documentation, grouped like the
 *                       sidebar, each entry linking to a plain-Markdown file
 *   - /llms-full.txt    full documentation concatenated as Markdown
 *   - /<route>.md       one plain-Markdown export per documentation page
 *                       (section indexes export at the parent level:
 *                       rooting-guides/index -> /rooting-guides.md)
 *
 * Improvements over the old plugin (documented in MIGRATION.md):
 *   - complete coverage of every page (the old index omitted large parts of
 *     the Apps & Modules section)
 *   - the offline page and 404 are excluded from LLM exports
 *   - VitePress containers are normalized to GitHub-style alerts
 *
 * The Markdown files under src/content/docs remain the single source of
 * truth; everything here is derived from them at build time.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalizeVitePressContainers } from '../lib/markdown/containers.mjs';
import { docsPathToMarkdownOutFile, docsPathToMarkdownUrl } from '../lib/markdown/routes.mjs';
import { sidebar } from '../config/sidebar.mjs';

const SITE_TITLE = 'Awesome Android Root';
const HERO_TEXT = 'Master Android Rooting in 2026';
const TAGLINE =
	'Explore 600+ root apps and modules, step-by-step rooting guides, and practical troubleshooting for Android power users.';

/** Very small frontmatter reader (title/description only). */
function readFrontmatter(src) {
	const fm = {};
	if (!src.startsWith('---')) return { fm, body: src };
	const end = src.indexOf('\n---', 3);
	if (end === -1) return { fm, body: src };
	const block = src.slice(4, end);
	for (const key of ['title', 'description']) {
		const m = block.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
		if (m) {
			let v = m[1].trim();
			if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
				v = v.slice(1, -1);
			}
			fm[key] = v;
		}
	}
	const body = src.slice(end + 4).replace(/^\r?\n/, '');
	return { fm, body };
}

/**
 * Convert (normalized) VitePress container blocks into GitHub-style alerts:
 *   :::danger[Title] ... :::   ->   > [!CAUTION]\n> **Title**\n> ...
 * Block contents are prefixed with `> ` so the whole container becomes one
 * alert blockquote, matching what the old vitepress-plugin-llms emitted.
 */
function containersToGitHubAlerts(src) {
	const ALERT = { tip: 'TIP', caution: 'WARNING', warning: 'WARNING', danger: 'CAUTION', note: 'NOTE', info: 'NOTE' };
	const OPEN = /^:::(tip|caution|warning|danger|note|info)(?:\[([^\]]*)\])?\s*$/i;
	const lines = src.split('\n');
	const out = [];
	let i = 0;
	while (i < lines.length) {
		const m = lines[i].match(OPEN);
		if (!m) {
			out.push(lines[i++]);
			continue;
		}
		let j = i + 1;
		while (j < lines.length && !/^:::\s*$/.test(lines[j])) j++;
		const bodyLines = lines.slice(i + 1, j);
		const alert = ALERT[m[1].toLowerCase()] ?? 'NOTE';
		out.push(`> [!${alert}]`);
		if (m[2]) out.push(`> **${m[2]}**`);
		for (const b of bodyLines) out.push(b.trim() === '' ? '>' : `> ${b}`);
		i = Math.min(j + 1, lines.length);
		if (j >= lines.length) break; // unterminated container: don't loop
	}
	return out.join('\n');
}

function escapeListMarkers(src) {
	// Match the old plugin output: `- **[…` list markers were emitted as
	// `* **[…`; keep source list style (dash) but escape literal `[` after
	// a `> ` quote marker as the old output did for callout lines.
	return src.replace(/^(>\s*)\[/gm, '$1\\[');
}

/** Rewrite internal .md links in exports to absolute site routes. */
function absolutizeLinks(src, docDir) {
	return src.replace(/(\]\()((?:\.{1,2}\/|\/)?[^)\s]+\.mdx?)(#[^)\s]*)?(\))/g, (m, open, href, frag, close) => {
		if (/^https?:/.test(href)) return m;
		let rel;
		if (href.startsWith('/')) rel = href.slice(1);
		else rel = path.posix.normalize(path.posix.join(docDir, href));
		if (rel.startsWith('..')) return m;
		const route = '/' + rel.replace(/\.(md|mdx)$/i, '').replace(/\/index$/, '');
		return `${open}${route}${frag ?? ''}${close}`;
	});
}

function collectDocs(docsDir) {
	const docs = [];
	const walk = (dir) => {
		for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
			const full = path.join(dir, entry.name);
			if (entry.isDirectory()) walk(full);
			else if (entry.name.endsWith('.md')) docs.push(full);
		}
	};
	walk(docsDir);
	return docs.sort();
}

export function aarLlmsExport() {
	return {
		name: 'aar-llms-export',
		hooks: {
			'astro:config:setup': ({ config }) => {
				aarLlmsExport._root = config.root;
			},
			'astro:build:done': async ({ dir, logger }) => {
				const root = fileURLToPath(aarLlmsExport._root);
				const docsDir = path.join(root, 'src', 'content', 'docs');
				const outDir = fileURLToPath(dir);
				const files = collectDocs(docsDir).filter((f) => !f.endsWith('offline.md'));

				const meta = new Map(); // relPath -> { title, description, md }
				for (const file of files) {
					const relPath = path.relative(docsDir, file).split(path.sep).join('/');
					const raw = fs.readFileSync(file, 'utf-8');
					const { fm, body } = readFrontmatter(raw);
					const docDir = path.posix.dirname(relPath);
					let md = normalizeVitePressContainers(body);
					md = containersToGitHubAlerts(md);
					md = absolutizeLinks(md, docDir === '.' ? '' : docDir);
					md = escapeListMarkers(md);

					const frontmatter = [
						'---',
						`url: ${docsPathToMarkdownUrl(relPath)}`,
						`description: >-`,
						...wrapText(fm.description ?? fm.title ?? '', 2).map((l) => `  ${l}`),
						'---',
						'',
						'',
					].join('\n');

					meta.set(relPath, {
						title: fm.title ?? relPath,
						description: fm.description ?? '',
						md: frontmatter + md.replace(/^\s+/, ''),
					});

					const outPath = path.join(outDir, docsPathToMarkdownOutFile(relPath));
					fs.mkdirSync(path.dirname(outPath), { recursive: true });
					fs.writeFileSync(outPath, meta.get(relPath).md);
				}

				// llms-full.txt — concatenation of every page export.
				const full = [...meta.values()].map((m) => m.md).join('\n\n');
				fs.writeFileSync(path.join(outDir, 'llms-full.txt'), full);

				// llms.txt — sidebar-organized index.
				const used = new Set();
				const sections = [];
				const addEntry = (label, link) => {
					if (!link || link.startsWith('http') || used.has(link)) return;
					const rel = mdRelForLink(link, meta);
					if (!rel || !meta.has(rel)) return;
					used.add(link);
					const m = meta.get(rel);
					const desc = m.description ? `: ${m.description}` : '';
					sections.at(-1).push(`- [${m.title}](${docsPathToMarkdownUrl(rel)})${desc}`);
				};
				const walkSidebar = (items) => {
					for (const item of items ?? []) {
						if (item.items) {
							sections.push([`### ${item.label}`]);
							walkSidebar(item.items);
							if (sections.at(-1).length === 1) sections.pop(); // empty group
						} else if (item.link && !item.link.includes('#')) {
							addEntry(item.label, item.link);
						}
					}
				};
				walkSidebar(sidebar);
				// Anything not reachable from the sidebar (e.g. home, legal pages).
				const leftovers = [...meta.keys()].filter((rel) => {
					const noExt = rel.replace(/\.md$/, '');
					const route = noExt === 'index' ? '/' : '/' + noExt.replace(/\/index$/, '');
					return !used.has(route);
				});
				if (leftovers.length) {
					sections.push(['### Other']);
					for (const rel of leftovers) {
						const m = meta.get(rel);
						sections
							.at(-1)
							.push(`- [${m.title}](${docsPathToMarkdownUrl(rel)})${m.description ? `: ${m.description}` : ''}`);
					}
				}

				const llmsTxt = [
					`# ${SITE_TITLE}`,
					'',
					`> ${HERO_TEXT}`,
					'',
					TAGLINE,
					'',
					'## Table of Contents',
					'',
					sections.map((section) => section.join('\n')).join('\n\n'),
					'',
				].join('\n');
				fs.writeFileSync(path.join(outDir, 'llms.txt'), llmsTxt);

				logger.info(
					`Generated LLM exports: ${meta.size} Markdown files, llms.txt, llms-full.txt`
				);
			},
		},
	};
}

/** Map a sidebar route link back to the docs-relative .md path. */
function mdRelForLink(link, meta) {
	const route = link.replace(/^https?:\/\/[^/]+/, '').split('#')[0];
	const parts = route.split('/').filter(Boolean);
	if (parts.length === 0) return 'index.md';
	const asFile = parts.join('/') + '.md';
	if (meta?.has(asFile)) return asFile;
	const asIndex = parts.join('/') + '/index.md';
	if (meta?.has(asIndex)) return asIndex;
	return asFile;
}

function wrapText(text, indent) {
	const words = String(text).split(/\s+/);
	const lines = [];
	let line = '';
	for (const w of words) {
		if ((line + ' ' + w).trim().length > 76 && line) {
			lines.push(line.trim());
			line = w;
		} else {
			line = `${line} ${w}`;
		}
	}
	if (line.trim()) lines.push(line.trim());
	return lines.length ? lines : [''];
}
