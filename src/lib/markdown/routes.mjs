/**
 * Route math shared by the Markdown link rewriter, the LLM/Markdown export
 * integration and the "Copy/Download as Markdown" buttons.
 *
 * The collection ids mirror the old VitePress route structure:
 *   about.md                     -> /about          (/about.md export)
 *   rooting-guides/index.md      -> /rooting-guides (rooting-guides.md export)
 *   apps-and-modules/system.md   -> /apps-and-modules/system
 */

/** Normalize a docs-relative path: strip extension, collapse `index`. */
export function docsPathToRoute(relPath) {
	const noExt = relPath.replace(/\.(md|mdx|markdown)$/i, '');
	const parts = noExt.split('/').filter(Boolean);
	if (parts.length && parts[parts.length - 1] === 'index') parts.pop();
	return '/' + parts.join('/');
}

/** URL of the generated plain-Markdown export for a docs-relative path. */
export function docsPathToMarkdownUrl(relPath) {
	const noExt = relPath.replace(/\.(md|mdx|markdown)$/i, '');
	const parts = noExt.split('/').filter(Boolean);
	// Section indexes export at the parent level: rooting-guides/index -> /rooting-guides.md
	if (parts.length > 1 && parts[parts.length - 1] === 'index') parts.pop();
	return `/${parts.join('/')}.md`;
}

/** Absolute file path of the Markdown export inside the build output dir. */
export function docsPathToMarkdownOutFile(relPath) {
	return docsPathToMarkdownUrl(relPath).slice(1); // strip leading "/"
}
