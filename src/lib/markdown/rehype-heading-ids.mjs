/**
 * rehype plugin: assign heading ids using the VitePress slugify algorithm.
 *
 * Runs before @astrojs/markdown-remark's rehypeHeadingIds, which skips any
 * heading that already has an `id`. This keeps every fragment URL generated
 * by the old VitePress site (and documented in scripts/check_links.py)
 * working unchanged under Astro + Starlight.
 */
import { visit } from 'unist-util-visit';
import { toString } from 'hast-util-to-string';
import { createVpSlugger } from './slugify.mjs';

const HEADING = /^h[1-6]$/;

export function rehypeHeadingIdsVitePress() {
	return (tree, file) => {
		const slug = createVpSlugger();
		visit(tree, 'element', (node) => {
			if (!HEADING.test(node.tagName)) return;
			node.properties = node.properties || {};
			if (typeof node.properties.id === 'string' && node.properties.id !== '') return;
			const text = toString(node).replace(/\u200b/g, '').trim();
			if (!text) return;
			node.properties.id = slug(text);
		});
	};
}
