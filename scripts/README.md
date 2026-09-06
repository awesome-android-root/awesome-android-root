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

## repo_freshness_checker

Checks GitHub repositories listed in a file (such as a category page under `docs/apps-and-modules/`) for their
last-update dates via the GitHub API. Produces a sorted Markdown or HTML report with health scores, star counts,
and freshness metrics. Supports parallel API requests for speed.

Supports both a graphical interface and command-line mode.

### Requirements

```bash
pip install -r scripts/repo_freshness_checker/requirements.txt
```

### CLI Usage

```bash
python scripts/repo_freshness_checker/repo_freshness_checker.py docs/apps-and-modules/privacy.md -o report.md -t <github_token>
```

### GUI Usage

```bash
python scripts/repo_freshness_checker/repo_freshness_checker.py
```

> **Note:** The project content lives in `docs/` (built with VitePress). There is no content auto-generation
> step anymore: category pages under `docs/apps-and-modules/` are the canonical source and are edited directly.
