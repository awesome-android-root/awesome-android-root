# AGENTS.md

Guidelines for coding agents and automated contributors working in `awesome-android-root`.

## 1. Repository Fundamentals

* This is a community-curated Android rooting knowledge base and VitePress documentation site.
* Primary content lives in `docs/`.
* App and module listings in `docs/apps-and-modules/` are the source of truth.
* `README.md` is an index and landing page, not a duplicate database.
* Site configuration and theme code live under `docs/.vitepress/`.
* Validation utilities are under `scripts/`.
* Contribution guidelines are in `CONTRIBUTING.md`.
* Prefer small, focused, reviewable changes.
* Preserve existing conventions unless there is a clear reason to change them.
* Never fabricate facts, links, compatibility claims, licenses, releases, CVEs, or project status.

## 2. Before Editing

1. Read the relevant file and surrounding content.
2. Search for duplicates, aliases, references, and affected headings.
3. Check existing taxonomy and formatting conventions.
4. Verify important technical claims against authoritative upstream sources.
5. Make the smallest change that fully solves the task.

Do not rewrite unrelated content or perform broad cleanup unless explicitly requested.

## 3. Apps and Modules

For entries in `docs/apps-and-modules/`:

* Put each project in the category that best matches its purpose.
* Prefer an existing category over creating a new one.
* Do not duplicate an existing project.
* Keep categories, subcategories, and entries consistently ordered.
* Follow the existing convention: recommended entries first, then alphabetical order.
* Prefer authoritative links, generally:

  1. GitHub
  2. F-Droid
  3. Official website
  4. Google Play
* Keep descriptions short, factual, and technical.
* Avoid promotional language and unsupported superlatives.
* Use framework tags only when verified:
  `[M]` Magisk, `[K]` KernelSU, `[A]` APatch, `[LSP]` LSPosed/Xposed.
* Mark `FOSS` only when the source and license support it.
* Store badges must point to the correct application.
* Do not add or remove `⭐` without understanding its existing meaning.

Typical format:

```markdown
- **[Name](link)** - Short factual description. `FOSS` `[M]`
```

## 4. Technical and Rooting Content

Rooting instructions can cause data loss, bootloops, or device damage.

Verify claims involving:

* Android and device compatibility
* Bootloader and partition requirements
* `boot`, `init_boot`, `vendor_boot`, and firmware
* Magisk, KernelSU, APatch, Zygisk, LSPosed/Xposed
* Play Integrity, SafetyNet, root hiding, Knox, OTA, and encryption
* Exploits, CVEs, security behavior, and maintenance status

For device-specific guides, verify the exact model, Android version, partition layout, bootloader state, image type, flashing method, and recovery procedure.

Never generalize device-specific instructions without evidence.

Do not weaken warnings about backups, data loss, bricking, firmware mismatch, or security implications.

Commands must be understood and relevant before being added.

## 5. Markdown, Links, and Navigation

* Preserve frontmatter and metadata unless the task requires changes.
* Do not casually modify SEO, JSON-LD, canonical URLs, or social metadata.
* Treat headings and generated anchors as public interfaces.
* Before renaming or moving headings, search for references to their anchors.
* Keep VitePress navigation and sidebars synchronized with page structure.
* Do not delete assets, scripts, or configuration without checking references.
* Preserve custom Markdown plugins and their expected behavior.
* Do not introduce shared mutable state into Markdown rendering.

For internal links:

```bash
python3 scripts/check_links.py
```

External links should be authoritative and verified when relevant.

### Titles and meta descriptions

Target lengths for every page:

* Title: 50 to 60 characters. Absolute maximum 70.
* Meta description: 110 to 155 characters. Absolute range 70 to 160.

Rules:

* Put the primary keyword first. Drop trailing qualifiers before shortening a
  keyword-rich title.
* The site suffix `| Awesome Android Root` counts toward the title length.
* Never put the site name in a frontmatter `title`. VitePress appends it, which
  renders a duplicated title such as `Privacy | Awesome Android Root |
  Awesome Android Root`. The only exception is `docs/index.md`, which sets
  `titleTemplate: Awesome Android Root` and therefore uses its title verbatim.
* Write descriptions from the actual page content. Do not pad them to reach a
  length and do not use claims the page does not support.
* Quote a frontmatter `description` in YAML when it contains a colon.
* Keep `og:title`, `twitter:title`, `og:description`, and `twitter:description`
  overrides in sync with `title` and `description` when they repeat them.
* `docs/count.md` and `docs/public/count.json` are generated and gitignored.
  Edit the page frontmatter and JSON fields in `scripts/app-entries.mjs`, since the
  build regenerates both files.

## 6. Site and Code Changes

The project uses Node.js, VitePress, Markdown/YAML, JavaScript, Python, and Bash.

Use the existing commands from `package.json`:

```bash
bun run docs:dev
bun run docs:build
bun run docs:preview
```

When changing JavaScript:

* Use modern ECMAScript syntax.
* Prefer `const` and `let`.
* Keep functions focused and deterministic.
* Avoid unnecessary dependencies and abstractions.
* Preserve existing behavior unless a change is required.

For dependency changes, check existing dependencies before adding new ones.

## 7. Validation

For documentation changes:

```bash
bun run check:links
bun run docs:build
```

For app and module entries, also run:

```bash
bun run index:build  # regenerates the app index, count page and reports entry format, ordering and badge problems
```

CI runs `check:links` and `docs:build` as blocking steps. `docs:build` runs
`index:build` itself, so entry lint findings appear in the build job logs; keep
lint clean even though nothing gates on it. The build needs full git history
because of `lastUpdated`.

For Cloudflare Pages, use `bun run docs:build` as the build command and
`docs/.vitepress/dist` as the output directory. Pin the build environment using
`.bun-version` and the `engines.node` field in `package.json`.

For site configuration or theme changes, build the site and manually inspect affected behavior when practical.

Build success alone does not prove factual correctness or external link validity.

## 8. Contributions

Keep each contribution focused and reviewable.

A good PR should explain:

* What changed
* Why it changed
* What was validated
* Any relevant uncertainty

Commit messages should describe the actual change, for example:

```text
add Battery Monitor to performance tools
fix broken customization link
sort app-modification categories
update KernelSU guide links
```

Avoid vague messages such as `update stuff` or `changes`.

Follow existing issue and PR templates.

## 9. AI-Assisted Work

AI may assist with implementation, formatting, proofreading, and mechanical maintenance.

Human judgment is required for:

* Project inclusion
* Categorization
* Recommendations
* Technical claims
* Compatibility
* Trustworthiness
* Licensing
* Statements about upstream behavior

Do not treat generated text as evidence.

Do not generate filler, fake completeness, repetitive summaries, or formulaic prose.

## 10. Scope and Safety

Do not automatically:

* Rewrite unrelated descriptions
* Reformat unrelated files
* Upgrade dependencies
* Redesign navigation
* Change SEO metadata
* Replace links without reason
* Add new categories for a single entry
* Introduce frameworks or tooling
* Perform unrelated refactors

For large structural changes, verify important invariants such as entry counts, links, anchors, categories, and unchanged content where applicable.

Never commit secrets, credentials, tokens, or private authentication data.

Preserve least-privilege permissions in GitHub Actions.

## 11. Style

* Write concise, natural, factual prose.
* Avoid marketing language and unsupported claims such as "universal", "undetectable", "100% compatible", or "completely safe".
* Use existing emojis only where they have an established semantic purpose.
* Do not add decorative formatting.
* Never use the em dash character (`—`).

## 12. Definition of Done

All checks in section 7 pass, the change sits in the correct category with
correct links, tags, and badges, and the diff contains no unrelated edits.

**Core principle:** Prefer accurate, concise, sourced, and maintainable changes over large, speculative, or impressive-looking changes.
