# Scripts

This directory contains utility scripts used in the awesome-android-root project.

## counter.sh

Counts entries in the Apps & Modules category pages (`docs/apps-and-modules/*.md`), displays a categorized
summary, and writes a rendered Markdown table to `docs/count.md` plus the same counts as JSON to
`docs/public/count.json`. The documentation build runs this script before VitePress, publishing the table at
`/count` and the JSON at `/count.json`.

The JSON works with the shields.io dynamic JSON endpoint, for example:

```markdown
[![Apps & Modules](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fawesome-android-root.xyz%2Fcount.json&query=%24.total&label=apps%20%26%20modules&color=blue&logo=android&style=for-the-badge)](https://awesome-android-root.xyz/apps-and-modules/)
```

### Usage

```bash
cd scripts && bash counter.sh
```

## optimize-assets.sh

Optimizes the static assets in `docs/public`: SVGs through SVGO (using
`scripts/svgo.config.mjs`), the Open Graph cards in `docs/public/images/og/`
through a 64-colour requantization plus lossless `oxipng`, and the remaining
PNGs through `oxipng` only. File names, formats and dimensions never change, so
Open Graph and favicon consumers keep working. Run it after adding or replacing
an image, then commit the result; it is idempotent.

Requires ImageMagick (`convert`) and Node.js (`npx`).

### Usage

```bash
bash scripts/optimize-assets.sh
```

## build-app-index.mjs

Exports every entry of the Apps & Modules category pages to `docs/public/app-index.json`, published
at `/app-index.json`. Each record carries the entry name (`n`), its primary link (`u`), every link on
the line (`a`), the badges (`t`), the category page (`p`) and the section heading inside that page
(`s`).

Regenerate it whenever an entry is added, removed or relinked; CI runs `index:check` as a
non-blocking step to catch a stale index.

### Usage

```bash
node scripts/build-app-index.mjs           # write docs/public/app-index.json
node scripts/build-app-index.mjs --check   # fail when the committed file is stale
```

## check_links.py

Validates all internal Markdown links and heading anchors across `docs/` against
VitePress' exact slugify rules (so anchors resolve the same way the site renders them).
Skips links inside code fences, ignores external URLs, and tolerates `/images/` assets.

### Usage

```bash
python3 scripts/check_links.py
```