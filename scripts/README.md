# Scripts

This directory contains utility scripts used in the awesome-android-root project.

## optimize-assets.sh

Optimizes the static assets in `docs/public`: the Open Graph cards in
`docs/public/images/og/` through a 64-colour requantization plus lossless
`oxipng`, and the remaining PNGs through `oxipng` only. SVGs are not touched -
they are committed already optimized. File names, formats and dimensions never
change, so Open Graph and favicon consumers keep working. Run it after adding or
replacing an image, then commit the result; it is idempotent.

Requires ImageMagick (`convert`) and Node.js (`npx`).

### Usage

```bash
bash scripts/optimize-assets.sh
```

## app-entries.mjs

Lints and indexes the entries of the Apps & Modules category pages
(`docs/apps-and-modules/*.md`) with a single parse pass.

The lint pass checks each line against the entry format documented in
`docs/contributing.md` and the PR template and reports every `file:line`
problem; it never rewrites or reorders entries. Checks cover the entry format,
the `FOSS`/`Proprietary` and framework badges, store icon links, duplicate URLs,
and the recommended-first then alphabetical ordering inside each section.

The index pass exports every entry to `docs/public/app-index.json`, published
at `/app-index.json`. Each record carries the entry name (`n`), its primary
link (`u`), every link on the line (`a`), the badges (`t`), the category page
(`p`) and the section heading inside that page (`s`). Regenerate it whenever an
entry is added, removed or relinked.

The same run regenerates the count page and JSON consumed by shields.io
badges: `docs/count.md` (published at `/count`) and `docs/public/count.json`
(published at `/count.json`) with the total entry count, root apps and the
Magisk/KernelSU/APatch/LSPosed module counts. The JSON works with the
shields.io dynamic JSON endpoint, for example:

```markdown
[![Apps & Modules](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fawesome-android-root.xyz%2Fcount.json&query=%24.total&label=apps%20%26%20modules&color=blue&logo=android&style=for-the-badge)](https://awesome-android-root.xyz/apps-and-modules/)
```

Lint findings are printed but never change the exit code, so neither
`docs:build`, which regenerates the index, nor CI, which runs `index:build`
non-blocking, are ever blocked by them.

### Usage

```bash
node scripts/app-entries.mjs   # lint + write docs/public/app-index.json, docs/count.md and docs/public/count.json
```

It is also exposed as `bun run index:build` and runs inside `docs:build`.

## check_links.py

Validates all internal Markdown links and heading anchors across `docs/` against
VitePress' exact slugify rules (so anchors resolve the same way the site renders them).
Skips links inside code fences, ignores external URLs, and tolerates `/images/` assets.

### Usage

```bash
python3 scripts/check_links.py
```