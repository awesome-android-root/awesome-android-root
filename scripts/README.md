# Scripts

This directory contains utility scripts used in the awesome-android-root project.

## counter.sh

Counts entries in the Apps & Modules category pages (`docs/apps-and-modules/*.md`), displays a categorized
summary, and writes a copyable Markdown table to `docs/count.md`. The documentation build runs this script
before VitePress, publishing the table at `/count`.

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

## check_links.py

Validates all internal Markdown links and heading anchors across `docs/` against
VitePress' exact slugify rules (so anchors resolve the same way the site renders them).
Skips links inside code fences, ignores external URLs, and tolerates `/images/` assets.

### Usage

```bash
python3 scripts/check_links.py
```