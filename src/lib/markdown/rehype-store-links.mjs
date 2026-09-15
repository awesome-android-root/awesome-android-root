/**
 * rehype plugin: build-time replacement for the VitePress `storeLinkPlugin`
 * + `StoreLink.vue` component pair.
 *
 * Markdown entries link to apps with badge shorthand:
 *
 *   `FOSS` | [🌱](https://f-droid.org/packages/org.adaway) | [▶️](https://play.google.com/...)
 *
 * This transforms those links into accessible icon badges (identical markup
 * to the old Vue component) and styles standalone `|` separators. No client
 * JavaScript is needed: the output is plain static HTML.
 */
import { visit } from 'unist-util-visit';
import { visitParents } from 'unist-util-visit-parents';
import { toString } from 'hast-util-to-string';

const FDROID_HREF = /f-droid\.org|apt\.izzysoft\.de/;

const FDROID_ICON = {
	type: 'element',
	tagName: 'span',
	properties: { className: ['store-icon'], ariaHidden: 'true' },
	children: [
		{
			type: 'element',
			tagName: 'svg',
			properties: {
				fill: 'currentColor',
				viewBox: '0 0 24 24',
				role: 'img',
				xmlns: 'http://www.w3.org/2000/svg',
			},
			children: [
				{
					type: 'element',
					tagName: 'rect',
					properties: { x: '2', y: '2', width: '20', height: '20', rx: '5', ry: '5', fill: 'none', stroke: 'currentColor', strokeWidth: '1.5' },
					children: [],
				},
				{
					type: 'element',
					tagName: 'path',
					properties: { d: 'M8 11l4 4 4-4', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
					children: [],
				},
				{
					type: 'element',
					tagName: 'line',
					properties: { x1: '12', y1: '15', x2: '12', y2: '7', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round' },
					children: [],
				},
				{
					type: 'element',
					tagName: 'line',
					properties: { x1: '6', y1: '20', x2: '18', y2: '20', stroke: 'currentColor', strokeWidth: '1.5', strokeLinecap: 'round' },
					children: [],
				},
			],
		},
	],
};

const PLAYSTORE_ICON = {
	type: 'element',
	tagName: 'span',
	properties: { className: ['store-icon'], ariaHidden: 'true' },
	children: [
		{
			type: 'element',
			tagName: 'svg',
			properties: {
				viewBox: '0 0 48 48',
				xmlns: 'http://www.w3.org/2000/svg',
				fill: 'none',
				stroke: 'currentColor',
				strokeWidth: '2.5',
			},
			children: [
				{
					type: 'element',
					tagName: 'path',
					properties: {
						d: 'M9.3,5.52a7,7,0,0,1,2,.76L32.52,18l-5.87,6L7.68,5.9A2.46,2.46,0,0,1,9.3,5.52ZM7.68,5.9l19,18.1L7.7,42.07c-.7-.56-1.07-1.69-1.07-3.36V9.29c0-1.67.36-2.82,1-3.38ZM32.52,18l7,3.87c2.49,1.38,2.49,2.84,0,4.22l-7,3.87-5.87-6,5.87-6Zm0,12L11.34,41.72c-1.16.64-2.72,1.19-3.64.35L26.65,24Z',
						strokeLinecap: 'round',
						strokeLinejoin: 'round',
					},
					children: [],
				},
			],
		},
	],
};

function detectStore(node) {
	const href = node.properties?.href;
	if (typeof href !== 'string' || !href) return null;
	const label = toString(node).trim();
	if ((label === '🌱' || label === '🌱 F-Droid') && FDROID_HREF.test(href)) {
		return { store: 'fdroid', href };
	}
	if ((label === '▶️' || label === '▶️ Play Store') && href.includes('play.google.com')) {
		return { store: 'playstore', href };
	}
	return null;
}

function hasCodeAncestor(ancestors) {
	return ancestors.some(
		(a) => a.type === 'element' && (a.tagName === 'code' || a.tagName === 'pre')
	);
}

export function rehypeStoreLinks() {
	return (tree) => {
		// Transform badge links.
		visit(tree, 'element', (node) => {
			if (node.tagName !== 'a') return;
			const match = detectStore(node);
			if (!match) return;
			const existingClass = node.properties?.className;
			const classes = Array.isArray(existingClass)
				? existingClass
				: existingClass
					? [existingClass]
					: [];
			node.properties = {
				...(node.properties ?? {}),
				href: match.href,
				className: [...classes, 'store-badge', match.store],
				target: '_blank',
				rel: 'noopener noreferrer',
				'aria-label':
					match.store === 'fdroid' ? 'Download on F-Droid' : 'Get it on Play Store',
			};
			node.children = [match.store === 'fdroid' ? FDROID_ICON : PLAYSTORE_ICON];
		});

		// Wrap standalone "|" separators between badges.
		visitParents(tree, 'text', (node, ancestors) => {
			if (node.value.trim() !== '|') return;
			if (hasCodeAncestor(ancestors)) return;
			const parent = ancestors[ancestors.length - 1];
			const index = parent?.children?.indexOf(node);
			if (!parent || index === -1 || index === undefined) return;
			parent.children[index] = {
				type: 'element',
				tagName: 'span',
				properties: { className: ['store-separator'] },
				children: [{ type: 'text', value: '|' }],
			};
		});
	};
}
