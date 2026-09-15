import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { normalizeVitePressContainers } from './lib/markdown/containers.mjs';

/**
 * Wraps Starlight's docs loader so the documented VitePress container syntax
 * still in the Markdown files (`::: danger TITLE`) is normalized to
 * Starlight aside directives *before* parsing. The Markdown sources stay
 * untouched; this only affects the in-memory copy used at build time.
 */
function aarDocsLoader() {
	const base = docsLoader();
	return {
		name: base.name,
		load: async (context: any) => {
			const entryTypes = new Map(context.entryTypes as Map<string, any>);
			const mdType = entryTypes.get('.md');
			if (mdType?.getEntryInfo) {
				entryTypes.set('.md', {
					...mdType,
					getEntryInfo: (opts: any) =>
						mdType.getEntryInfo({
							...opts,
							contents: normalizeVitePressContainers(opts.contents),
						}),
				});
			}
			await base.load({ ...context, entryTypes });
		},
	};
}

export const collections = {
	docs: defineCollection({ loader: aarDocsLoader(), schema: docsSchema() }),
};
