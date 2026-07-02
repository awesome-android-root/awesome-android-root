# Scripts

This directory contains utility scripts used in the awesome-android-root project.

## build-docs.js

Builds the documentation site. Reads the project `README.md`, filters out specific HTML sections, adjusts link and image paths for the docs structure, and writes the result to `docs/apps-and-modules/index.md`. Called automatically by `pnpm run docs:build`.

### Usage

```bash
node scripts/build-docs.js
```

## counter.sh

Counts entries in `README.md` and displays a categorized summary (root apps, Magisk modules, KernelSU modules, LSPosed modules).

### Usage

```bash
cd scripts && bash counter.sh
```

## repo_freshness_checker

Checks GitHub repositories listed in a file (such as `README.md`) for their last-update dates via the GitHub API. Produces a sorted Markdown or HTML report with health scores, star counts, and freshness metrics. Supports parallel API requests for speed.

Supports both a graphical interface and command-line mode.

### Requirements

```bash
pip install -r scripts/repo_freshness_checker/requirements.txt
```

### CLI Usage

```bash
python scripts/repo_freshness_checker/repo_freshness_checker.py README.md -o report.md -t <github_token>
```

### GUI Usage

```bash
python scripts/repo_freshness_checker/repo_freshness_checker.py
```
