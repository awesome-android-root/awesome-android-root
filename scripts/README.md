# Scripts

This directory contains utility scripts used in the awesome-android-root project.

## counter.sh

Counts entries in the Apps & Modules category pages (`docs/apps-and-modules/*.md`) and displays a categorized
summary (root apps, Magisk modules, KernelSU modules, LSPosed modules).

### Usage

```bash
cd scripts && bash counter.sh
```

## check_links.py

Validates all internal Markdown links and heading anchors across `docs/` against
VitePress' exact slugify rules (so anchors resolve the same way the site renders them).
Skips links inside code fences, ignores external URLs, and tolerates `/images/` assets.

### Usage

```bash
python3 scripts/check_links.py
```