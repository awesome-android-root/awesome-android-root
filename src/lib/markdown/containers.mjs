/**
 * Build-time normalization of VitePress custom-container syntax into the
 * directive syntax understood by Starlight's asides:
 *
 *   ::: danger RELOCK WARNING   ->   :::danger[RELOCK WARNING]
 *   :::tip Quick Help           ->   :::tip[Quick Help]
 *   ::: warning                 ->   :::caution
 *   ::: info                    ->   :::note
 *
 * Runs before Markdown parsing (via the docs collection loader), so the
 * Markdown source files themselves stay untouched and GitHub-friendly.
 * Code fences are respected: fences inside ``` blocks are left as-is.
 */
const TYPE_MAP = {
	tip: 'tip',
	warning: 'caution',
	danger: 'danger',
	info: 'note',
	note: 'note',
};

const OPEN_RE = /^:::\s*(tip|warning|danger|info|note)\s*(.*)$/i;
const FENCE_RE = /^\s*(`{3,}|~{3,})/;

export function normalizeVitePressContainers(src) {
	if (!src.includes(':::')) return src;
	const lines = src.split('\n');
	const out = [];
	let fence = null; // current fence marker while inside a code block

	for (const line of lines) {
		const fenceMatch = line.match(FENCE_RE);
		if (fenceMatch) {
			const marker = fenceMatch[1][0];
			if (!fence) {
				fence = marker;
			} else if (marker === fence) {
				fence = null;
			}
			out.push(line);
			continue;
		}

		if (!fence) {
			const open = line.match(OPEN_RE);
			if (open) {
				const type = TYPE_MAP[open[1].toLowerCase()] ?? 'note';
				const title = open[2].trim();
				out.push(title ? `:::${type}[${escapeLabel(title)}]` : `:::${type}`);
				continue;
			}
		}
		out.push(line);
	}
	return out.join('\n');
}

/** Escape square brackets so they cannot terminate the directive label early. */
function escapeLabel(title) {
	return title.replace(/\\/g, '\\\\').replace(/\[/g, '\\[').replace(/\]/g, '\\]');
}
