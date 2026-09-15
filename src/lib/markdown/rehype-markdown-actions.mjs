/**
 * rehype plugin: static replacement for vitepress-plugin-llms's
 * `CopyOrDownloadAsMarkdownButtons` widget.
 *
 * Injects a "Copy page / View as Markdown / Download as Markdown" action bar
 * directly after the first H1 of every documentation page (exactly where the
 * old VitePress component rendered). The bar links to the page's generated
 * plain-Markdown export; the copy behavior is handled by a tiny global
 * script in the PWA/status component.
 */
import path from 'node:path';
import { docsPathToMarkdownUrl } from './routes.mjs';

const DOCS_ROOT_MARKER = `${path.sep}src${path.sep}content${path.sep}docs${path.sep}`;

const COPY_ICON = {
	type: 'element',
	tagName: 'svg',
	properties: {
		xmlns: 'http://www.w3.org/2000/svg',
		fill: 'none',
		stroke: 'currentColor',
		strokeLinecap: 'round',
		strokeLinejoin: 'round',
		strokeWidth: '2',
		viewBox: '0 0 24 24',
		ariaHidden: 'true',
	},
	children: [
		{ type: 'element', tagName: 'rect', properties: { width: '14', height: '14', x: '8', y: '8', rx: '2', ry: '2' }, children: [] },
		{ type: 'element', tagName: 'path', properties: { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' }, children: [] },
	],
};

const MARKDOWN_ICON = {
	type: 'element',
	tagName: 'svg',
	properties: {
		xmlns: 'http://www.w3.org/2000/svg',
		fill: 'none',
		stroke: 'currentColor',
		strokeLinecap: 'round',
		strokeLinejoin: 'round',
		strokeWidth: '2',
		viewBox: '0 0 24 24',
		ariaHidden: 'true',
	},
	children: [
		{ type: 'element', tagName: 'path', properties: { d: 'M3 5h18v14H3z' }, children: [] },
		{ type: 'element', tagName: 'path', properties: { d: 'M7 15V9l2.5 3L12 9v6' }, children: [] },
		{ type: 'element', tagName: 'path', properties: { d: 'M17.5 12v3m0 0l-2.5-2.5m2.5 2.5l2.5-2.5' }, children: [] },
	],
};

const DOWNLOAD_ICON = {
	type: 'element',
	tagName: 'svg',
	properties: {
		xmlns: 'http://www.w3.org/2000/svg',
		fill: 'none',
		stroke: 'currentColor',
		strokeLinecap: 'round',
		strokeLinejoin: 'round',
		strokeWidth: '2',
		viewBox: '0 0 24 24',
		ariaHidden: 'true',
	},
	children: [
		{ type: 'element', tagName: 'path', properties: { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }, children: [] },
		{ type: 'element', tagName: 'path', properties: { d: 'M7 10l5 5 5-5' }, children: [] },
		{ type: 'element', tagName: 'path', properties: { d: 'M12 15V3' }, children: [] },
	],
};

function text(value) {
	return { type: 'text', value };
}

export function rehypeMarkdownActions() {
	return (tree, file) => {
		const filePath = file?.path ?? '';
		const idx = filePath.indexOf(DOCS_ROOT_MARKER);
		if (idx === -1) return;
		const relPath = filePath.slice(idx + DOCS_ROOT_MARKER.length).split(path.sep).join('/');
		// No export/actions for the offline state page.
		if (relPath === 'offline.md') return;

		const mdUrl = docsPathToMarkdownUrl(relPath);

		// Find the first H1 at the root of the document.
		let h1Index = -1;
		for (let i = 0; i < tree.children.length; i++) {
			const child = tree.children[i];
			if (child.type === 'element' && child.tagName === 'h1') {
				h1Index = i;
				break;
			}
		}
		if (h1Index === -1) return; // e.g. home page: hero template, no body H1

		const widget = {
			type: 'element',
			tagName: 'div',
			properties: { className: ['markdown-copy-buttons'] },
			children: [
				{
					type: 'element',
					tagName: 'div',
					properties: { className: ['markdown-copy-buttons-inner'] },
					children: [
						{
							type: 'element',
							tagName: 'button',
							properties: {
								type: 'button',
								className: ['copy-page'],
								'data-md-url': mdUrl,
							},
							children: [
								{ type: 'element', tagName: 'span', properties: { className: ['icon'] }, children: [COPY_ICON] },
								{ type: 'element', tagName: 'span', properties: { className: ['label'] }, children: [text('Copy page')] },
							],
						},
						{
							type: 'element',
							tagName: 'a',
							properties: {
								className: ['view-md'],
								href: mdUrl,
								target: '_blank',
								rel: 'noopener noreferrer',
								title: 'View as Markdown',
							},
							children: [
								{ type: 'element', tagName: 'span', properties: { className: ['icon'] }, children: [MARKDOWN_ICON] },
								{ type: 'element', tagName: 'span', properties: { className: ['label'] }, children: [text('View as Markdown')] },
							],
						},
						{
							type: 'element',
							tagName: 'a',
							properties: {
								className: ['download-btn'],
								href: mdUrl,
								download: '',
								title: 'Download as Markdown',
								'aria-label': 'Download as Markdown',
							},
							children: [DOWNLOAD_ICON],
						},
					],
				},
			],
		};

		tree.children.splice(h1Index + 1, 0, widget);
	};
}
