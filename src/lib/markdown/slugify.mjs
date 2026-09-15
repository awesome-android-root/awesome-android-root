/**
 * VitePress-compatible heading slugify.
 *
 * The VitePress site generated heading ids with @mdit-vue/plugin-slug. This is
 * a faithful port (identical to `vp_slugify` in scripts/check_links.py) so
 * every existing fragment URL keeps resolving after the Astro + Starlight
 * migration. Notably it differs from github-slugger (Astro's default):
 *   - runs of special characters collapse to a single hyphen
 *   - leading-digit slugs are prefixed with `_`
 */
const rCombining = /[\u0300-\u036F]/g;
const rControl = /[\u0000-\u001f]/g;
const rSpecial =
	/[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'\u201c\u201d\u2018\u2019<>,.?/]+/g;
const rMultiHyphen = /-{2,}/g;
const rEdgeHyphen = /^-+|-+$/g;
const rLeadingDigit = /^(\d)/;

export function vpSlugify(str) {
	return str
		.normalize('NFKD')
		.replace(rCombining, '')
		.replace(rControl, '')
		.replace(rSpecial, '-')
		.replace(rMultiHyphen, '-')
		.replace(rEdgeHyphen, '')
		.replace(rLeadingDigit, '_$1')
		.toLowerCase();
}

/**
 * Slugger with per-document duplicate handling, mirroring VitePress's use of
 * github-slugger occurrence counts (`foo`, `foo-1`, `foo-2`, ...).
 */
export function createVpSlugger() {
	const occurrences = new Map();
	return (text) => {
		const base = vpSlugify(text);
		const count = occurrences.get(base) ?? 0;
		occurrences.set(base, count + 1);
		return count === 0 ? base : `${base}-${count}`;
	};
}
