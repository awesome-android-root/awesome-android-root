/**
 * rehype plugin: resolve cross-document Markdown links (`.md` hrefs) to
 * site routes, mirroring VitePress behavior so existing docs can keep their
 * GitHub-style relative links untouched.
 *
 *   [FAQ](./faqs.md)                     -> /faqs
 *   [Root Apps](../apps-and-modules/)    -> unchanged (no .md extension)
 *   [Guide](../general-guides/x.md#y)    -> /general-guides/x#y
 *   [Backup](/apps-and-modules/backup.md)-> /apps-and-modules/backup
 *   [Section](rooting-guides/index.md)   -> /rooting-guides
 */
import path from 'node:path';
import { visit } from 'unist-util-visit';
import { docsPathToRoute } from './routes.mjs';

const DOCS_ROOT_MARKER = `${path.sep}src${path.sep}content${path.sep}docs${path.sep}`;

function docsDirOfFile(filePath) {
	if (!filePath) return null;
	const idx = filePath.indexOf(DOCS_ROOT_MARKER);
	if (idx === -1) return null;
	const rel = filePath.slice(idx + DOCS_ROOT_MARKER.length);
	return path.posix.dirname(rel.split(path.sep).join('/'));
}

export function rehypeResolveMarkdownLinks() {
	return (tree, file) => {
		const dir = docsDirOfFile(file?.path);
		if (dir === null) return;

		visit(tree, 'element', (node) => {
			if (node.tagName !== 'a') return;
			const href = node.properties?.href;
			if (typeof href !== 'string' || href === '') return;
			if (/^(?:[a-z][a-z0-9+.-]*:|#)/i.test(href)) return; // external / anchor-only

			const [hrefPath, ...rest] = href.split(/([#?])/);
			const suffix = rest.join('');
			if (!/\.(md|mdx|markdown)$/i.test(hrefPath)) return;

			const target = hrefPath.startsWith('/')
				? hrefPath.slice(1)
				: path.posix.normalize(path.posix.join(dir, hrefPath));
			if (target.startsWith('..')) return; // points outside docs; leave for validation

			node.properties.href = docsPathToRoute(target) + suffix;
		});
	};
}
