# AGENTS.md

## Purpose

This file defines how coding agents and automated contributors must work in the `awesome-android-root` repository.

Read this file before making any change.

`awesome-android-root` is primarily a **community-curated Android rooting knowledge base and documentation website**. It is not an Android application project. The central content lives in Markdown under `src/content/docs/`, and the website is generated with Astro + Starlight.

The repository values:

1. Accuracy over volume.
2. Maintainer intent over automated assumptions.
3. Small, reviewable changes over broad rewrites.
4. Factual descriptions over promotional copy.
5. Working links and correct categorization.
6. Consistent ordering and formatting.
7. Verification before claiming that something is correct.
8. Human curation for content quality.
9. Minimal changes to unrelated material.
10. Clear, natural writing rather than formulaic AI-generated prose.

---

# 1. Repository Architecture

Understand the repository as several related layers.

```text
.
├── README.md
├── CONTRIBUTING.md
├── LICENSE
├── SECURITY.md
├── CODE_OF_CONDUCT.md
├── package.json
├── astro.config.mjs
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
├── src/
│   ├── content/docs/        <- Markdown content (source of truth)
│   │   ├── apps-and-modules/
│   │   ├── rooting-guides/
│   │   ├── general-guides/
│   │   ├── faqs.md
│   │   ├── troubleshooting.md
│   │   ├── resources.md
│   │   ├── non-root-alternatives.md
│   │   └── other documentation
│   ├── config/              <- sidebar definition
│   ├── integrations/        <- build integrations (llms export, sitemap, PWA)
│   ├── plugins/             <- remark/rehype Markdown plugins
│   ├── overrides/           <- Starlight component overrides
│   ├── components/          <- site components (nav, footer, PWA status)
│   ├── styles/              <- global theme CSS
│   └── pages/               <- special pages (404)
├── public/                  <- static assets (favicons, images, manifest, _headers)
└── scripts/
    ├── check_links.py
    ├── counter.sh
    ├── validate.mjs
    └── migrate_frontmatter.py
```

## 1.1 Source of truth

For app and module listings:

- `src/content/docs/apps-and-modules/` is the source of truth.
- `README.md` is a lightweight index and project landing page.
- Do not treat the root README as the canonical database of applications or modules.

For website behavior:

- `astro.config.mjs` is the main Astro/Starlight configuration.
- `src/config/sidebar.mjs` defines the sidebar.
- `src/overrides/` and `src/components/` contain theme behavior and UI.
- `src/plugins/` contains Markdown processing extensions.

For validation and maintenance:

- `scripts/check_links.py` validates internal Markdown links and anchors.
- `scripts/counter.sh` counts entries in `src/content/docs/apps-and-modules/`.
- `scripts/validate.mjs` validates the built site against the archived baseline.

The contribution documentation explicitly establishes `src/content/docs/apps-and-modules/` as the collection source of truth.

---

# 2. Project Stack

The project currently uses:

- Node.js `>=22`
- Astro with the Starlight documentation theme
- Pagefind for local search (built into Starlight)
- A custom Astro integration wrapping `vite-plugin-pwa` + Workbox for PWA/service-worker behavior
- A custom Astro integration for LLM/Markdown exports (`llms.txt`, `llms-full.txt`, per-page `.md`)
- A custom Astro integration for `sitemap.xml` generation
- Markdown and YAML frontmatter (content stays plain Markdown; MDX is avoided)
- JavaScript/ECMAScript modules for Astro configuration, integrations, and remark/rehype plugins
- Python for repository validation scripts
- Bash for repository utility scripts

Relevant commands are defined in `package.json`:

```bash
npm run docs:dev
npm run docs:build
npm run docs:preview
npm run validate        # validate dist/ output (routes, headings, SEO, PWA, search)
npm run check:links     # internal Markdown link & anchor check
```

Do not invent alternative project commands unless the repository actually contains them.

---

# 3. Core Repository Philosophy

## 3.1 This is a curated knowledge base

The repository is not optimized for adding the largest possible number of links.

A valid contribution must improve the collection.

Prefer:

- one authoritative entry over several weak entries
- a correct existing entry over a duplicate
- a precise description over a long description
- a verified source over an attractive but unofficial link
- removing dead or obsolete resources over keeping them for historical reasons
- improving discoverability without damaging taxonomy

Do not optimize for contribution count, line count, or apparent comprehensiveness.

## 3.2 Content quality is part of correctness

A Markdown file can build successfully and still be wrong.

Agents must treat these as separate concerns:

- syntactic correctness
- link correctness
- taxonomy correctness
- factual correctness
- compatibility correctness
- editorial quality
- maintenance status

Passing `npm run docs:build` does not prove that a factual claim is correct.

Passing `scripts/check_links.py` does not prove that an external URL is alive or trustworthy.

---

# 4. `src/content/docs/apps-and-modules/` Rules

This directory is the most important content area in the repository.

Each entry normally belongs to exactly one topic page.

## 4.1 Categorization

Choose a category according to **what the tool does for the user**, not merely according to implementation technology.

An app, Magisk module, KernelSU module, APatch module, or LSPosed module can appear in the same topic page when they solve the same user problem.

Do not introduce a new category merely because a contributor wants a place for one item.

Before changing taxonomy:

1. Check existing category structure.
2. Search for related entries.
3. Check the taxonomy issue template.
4. Prefer an existing category when it accurately describes the item's purpose.
5. Make broader structural changes separately from routine entry additions.

Do not casually move large groups of entries while adding one application.

## 4.2 Ordering

The established ordering is:

1. `⭐` community-recommended entries first.
2. Remaining entries alphabetically.

This applies to:

- `##` categories
- `###` subcategories
- entries within categories

Do not break ordering merely because a particular entry feels more important.

When reorganizing multiple sections, preserve the ordering consistently across all affected pages.

## 4.3 Entry format

The normal form is:

```markdown
- **[Name](link)** - Short factual description. `FOSS` `[M]`
```

Possible framework tags:

```text
[M]    Magisk
[K]    KernelSU
[A]    APatch
[LSP]  LSPosed / Xposed
```

License labels:

```text
FOSS
Proprietary
```

Store badges may be appended:

```markdown
| [🌱](https://f-droid.org/...)
| [▶️](https://play.google.com/...)
```

Use only tags that are demonstrably applicable.

Do not guess compatibility based on the repository name.

Do not infer that something is FOSS merely because it is hosted on GitHub. Verify that source code is actually available and that the repository is the relevant upstream source.

## 4.4 Link priority

The project's contribution guide establishes this preference:

1. GitHub
2. F-Droid
3. Official website
4. Google Play

Use the most authoritative available source.

Do not replace an authoritative upstream project URL with an affiliate site, download mirror, blog post, scraped database, or generic search result.

For closed-source applications, use the official product page or official store listing when that is the authoritative source.

## 4.5 Descriptions

Descriptions should normally be one or two sentences.

Describe:

- what the project does
- the relevant root/framework relationship
- an important concrete function

Do not write marketing copy.

Prefer:

> Systemless module that mounts selected files through OverlayFS.

Avoid:

> A powerful, next-generation revolutionary solution that completely transforms Android customization.

Do not use adjectives merely to make an entry sound impressive.

Do not repeat the product name unnecessarily.

Do not explain obvious details when a concise technical description is sufficient.

---

# 5. Factual Verification

This repository covers software that can modify boot images, kernels, system components, app behavior, security state, and device integrity.

Incorrect information can cause real device damage.

For technical claims, verify before editing.

## 5.1 Claims that require particular care

Verify claims involving:

- Android version support
- device support
- kernel versions
- GKI requirements
- bootloader requirements
- partition names such as `boot`, `init_boot`, and `vendor_boot`
- Magisk, KernelSU, APatch, Zygisk, Riru, LSPosed or Xposed compatibility
- root hiding
- Play Integrity behavior
- SafetyNet behavior
- bootloader lock state
- Knox behavior
- data wiping
- OTA behavior
- encryption
- security implications
- CVE identifiers
- exploit availability
- exploit limitations
- claims of "undetectable" or "universal" behavior
- banking or DRM compatibility
- whether a project is still maintained

Never turn an unverified claim into a definitive statement.

## 5.2 Time-sensitive information

Rooting ecosystems change quickly.

Do not assume that information from an old article is still correct.

When updating a current project, verify:

- latest upstream activity
- current release state
- repository availability
- current installation mechanism
- framework compatibility
- current Android compatibility where relevant

Do not add "latest", "current", "actively maintained", "works on Android X", or similar claims without evidence.

## 5.3 Security-sensitive content

For security and rooting claims, be precise about what is known.

Do not write:

> This bypass works on all devices.

Write something equivalent to:

> Reported to work on the devices and firmware versions documented by the upstream project.

Do not promote speculative research as established fact.

Distinguish:

- documented behavior
- upstream claims
- observed community behavior
- experimental research
- personal anecdotal reports

---

# 6. Rooting Guides and Technical Documentation

The `src/content/docs/rooting-guides/` section is instructional documentation, not a casual article collection.

Changes here require more care than adding a simple app entry.

## 6.1 Safety first

Never remove, weaken, or hide warnings about:

- data loss
- bootloader unlocking
- device-specific requirements
- backups
- bootloops
- bricking
- incompatible images
- firmware mismatch
- security implications

Do not make a dangerous procedure appear safer through marketing language.

Never add commands without understanding what the command actually does.

## 6.2 Device-specific instructions

Before modifying device-specific instructions, verify:

- exact model or variant
- relevant Android version
- partition layout
- required bootloader state
- correct image type
- flashing mechanism
- rollback or recovery procedure

Do not generalize a procedure from one OEM or device family to another without evidence.

Do not assume that commands such as:

```bash
fastboot flash boot ...
fastboot flash recovery ...
fastboot flash init_boot ...
```

are interchangeable across devices.

## 6.3 Commands

Commands must be:

- syntactically correct
- relevant to the described platform
- safe within the documented procedure
- presented with enough context to understand what is being modified

Avoid unexplained command dumps.

Explain dangerous commands immediately around their use.

---

# 7. Markdown and Frontmatter

Most documentation pages use YAML frontmatter.

Preserve frontmatter unless the requested change actually requires changing metadata.

Common frontmatter includes:

```yaml
---
title: ...
description: ...
head:
  ...
---
```

Some pages additionally contain:

- canonical URLs
- Open Graph metadata
- Twitter metadata
- Schema.org JSON-LD
- article metadata
- custom scripts
- page-specific navigation information

## 7.1 Do not casually rewrite metadata

When editing a document body, do not regenerate or reorder the entire `head:` section unless necessary.

Avoid changing:

- canonical URLs
- JSON-LD
- SEO metadata
- social metadata
- page titles
- structured data

as collateral cleanup.

A content-only change should normally remain a content-only change.

## 7.2 Structured data

The website uses Schema.org data for several page types.

Examples include:

- `Organization`
- `WebSite`
- `WebPage`
- `BreadcrumbList`
- `CollectionPage`
- `ItemList`
- `HowTo`

When changing a page's structure, inspect any related structured data.

If a page changes its purpose, headings, URL, navigation, or major content structure, verify that its structured metadata is still truthful.

Never add structured data merely for SEO appearance.

The data must describe what the page actually contains.

---

# 8. Astro & Starlight Configuration

`astro.config.mjs` is not ordinary application code. It controls site-wide rendering behavior.

The current configuration includes:

- routing (`trailingSlash: 'never'`, per-page canonical URLs via frontmatter)
- Markdown processing (remark/rehype plugins in `src/plugins/`)
- Pagefind local search (via Starlight)
- PWA generation and service-worker caching (`src/integrations/pwa.mjs`)
- LLM/Markdown exports (`src/integrations/llms-export.mjs`)
- sitemap generation (`src/integrations/sitemap.mjs`)
- SEO metadata and JSON-LD (`src/overrides/Head.astro`)
- asset handling
- build configuration and production minification
- Starlight component overrides (`src/overrides/`)

Make configuration changes conservatively.

## 8.1 Search

Search is handled by Pagefind through Starlight. Individual pages can opt out with `pagefind: false` in frontmatter.

Do not change search behavior merely because a single page needs better visibility. Investigate the indexing behavior first.

## 8.2 PWA

The site uses service-worker based caching.

Changes affecting:

- cache names
- cache durations
- cache strategies
- runtime URL patterns
- precaching
- navigation handling
- offline behavior

must be evaluated as site-wide behavior.

Do not change caching behavior without considering stale content and offline behavior.

By design, documentation HTML is never precached or runtime-cached: the docs are network-dependent, static assets are cached for performance, and offline navigation falls back to the dedicated offline page (`/offline`) with a retry action. Do not reintroduce an offline documentation mirror.

## 8.3 Markdown plugins

The repository contains rehype plugins (`src/plugins/rehype-store-links.mjs`) that recognize F-Droid and Play Store badge links and transform them into store-badge elements with inline SVGs.

Do not replace this behavior with ordinary Markdown just because the underlying link still works.

When editing store badges, preserve the expected labels and destination domains.

The recognized labels include:

```text
🌱
🌱 F-Droid
▶️
▶️ Play Store
```

and the plugin validates the corresponding store hosts.

The plugins are intentionally stateless because Astro renders pages concurrently. Preserve that property when changing them.

Do not introduce shared mutable state into Markdown rendering.

---

# 9. Internal Links and Anchors

Internal navigation is a first-class correctness requirement.

The project provides:

```bash
python3 scripts/check_links.py
```

This script validates:

- internal Markdown paths
- local anchors
- cross-file anchors
- VitePress-compatible heading slugs (the Astro build uses the same slug algorithm)
- supported asset references

It intentionally ignores external URLs.

## 9.1 Always run the link checker after navigation changes

Run:

```bash
python3 scripts/check_links.py
```

especially after:

- renaming headings
- moving sections
- changing page paths
- adding/removing headings
- restructuring categories
- changing README or docs navigation
- reorganizing app/module pages

## 9.2 Heading changes are API changes

Treat a heading ID as a linkable interface.

Changing:

```markdown
## Play Integrity and Banking Apps
```

changes the generated anchor.

Before renaming a heading, search the repository for references to the old anchor.

Do not break links casually.

---

# 10. Build and Validation

For documentation changes, the preferred validation sequence is:

```bash
python3 scripts/check_links.py
npm run docs:build
node scripts/validate.mjs
```

For app/module entry work, also consider:

```bash
bash scripts/counter.sh
```

when entry counts or ordering are involved.

## 10.1 Reorder-only changes

When performing a sorting or reorganization-only operation:

- do not change descriptions
- do not change links
- do not silently add entries
- do not silently remove entries
- do not alter badges unless necessary to preserve correctness

For large reorder-only changes, compare counts before and after.

The repository has previously used the invariant:

> 651 entries before and after

as evidence that a pure sorting change did not accidentally modify content.

Agents should use the same principle for future reorder-only work.

## 10.2 Build success is not enough

A successful Astro build does not prove:

- external links work
- app claims are true
- categories are correct
- compatibility information is current
- entries are maintained
- descriptions are non-promotional

Validation is therefore both technical and editorial.

---

# 11. README Rules

`README.md` is the project landing page and index.

It should not become a second copy of the full application/module database.

When adding or changing entries:

- prefer modifying the relevant `src/content/docs/apps-and-modules/*.md` page
- update README navigation only when the project structure itself changes
- keep README sections concise
- preserve its role as an index

Do not paste large category inventories into the README merely to make a change visible.

## 11.1 Counts

Do not hardcode an application/module count without checking the current repository state.

README descriptions may use broad wording such as `600+`.

If exact numbers are displayed, derive them from the repository's current contents rather than copying an old count.

Do not update a count based solely on how many lines changed.

---

# 12. Taxonomy Changes

Taxonomy is different from content maintenance.

A taxonomy change may include:

- creating a new category
- deleting a category
- merging categories
- splitting categories
- moving an entire family of entries
- renaming headings used as navigation targets
- rebuilding the sidebar around a new information architecture

For substantial taxonomy changes:

1. Understand the current information architecture.
2. Check the taxonomy issue template.
3. Inspect related navigation in `config.mjs`.
4. Search all links to affected headings.
5. Update relevant page navigation.
6. Preserve alphabetical ordering.
7. Run the link checker.
8. Build the site.
9. Review the resulting diff for accidental content edits.

Do not treat taxonomy refactoring as a casual formatting task.

---

# 13. Sidebar and Navigation

The Starlight sidebar (defined in `src/config/sidebar.mjs`) and the Markdown structure must remain aligned.

When changing:

- `##` headings
- page paths
- category names
- section anchors
- documentation groups

inspect `src/config/sidebar.mjs`.

A page may build successfully while its sidebar points to obsolete anchors.

Never rename a section and assume the sidebar will update automatically.

---

# 14. Images and Public Assets

Assets in `public/` are site assets.

Be careful with:

- filenames
- case sensitivity
- image paths
- referenced variants
- dark/light assets
- icons used by PWA configuration
- Open Graph images

Do not remove an asset simply because no Markdown page appears to reference it. It may be consumed by the Astro configuration, PWA generation, HTML metadata, or theme code.

Before deleting assets, search the entire repository for references.

---

# 15. AI-Assisted Development

AI assistance is allowed in implementation, formatting, proofreading, and mechanical maintenance.

However, this repository explicitly distinguishes **AI assistance** from **AI-generated curation**.

Agents must not treat the ability to generate text as evidence that the generated text belongs in the repository.

Human judgment is required for:

- whether an app belongs
- whether a project is trustworthy
- whether a project is worth recommending
- whether a category is appropriate
- whether a technical claim is accurate
- whether wording reflects the upstream project's actual behavior

Automated systems must not fabricate those decisions.

---

# 16. Anti-AI-Slop Rules

This section is mandatory.

The goal is to prevent the repository from becoming filled with generic, repetitive, obviously machine-generated documentation.

## 16.1 Do not pad

Never add text simply to make a page appear comprehensive.

Do not add:

- generic introductions
- repetitive summaries
- obvious conclusions
- redundant "why this matters" sections
- generic "best practices" sections without repository-specific value
- fake FAQs
- repeated warnings saying the same thing
- repetitive transition paragraphs

Delete unnecessary words rather than filling space.

## 16.2 Do not generate formulaic prose

Avoid repeated templates such as:

> In today's rapidly evolving Android ecosystem...

> Whether you're a beginner or an advanced user...

> This comprehensive guide will walk you through...

> In conclusion...

> With its powerful features and seamless integration...

These phrases usually add no technical information.

Write directly.

Bad:

> KernelSU is a powerful and innovative rooting solution that provides users with a comprehensive way to gain elevated privileges.

Better:

> KernelSU provides kernel-level root access and supports per-app root profiles.

## 16.3 Do not manufacture enthusiasm

Avoid:

- amazing
- revolutionary
- powerful
- incredible
- seamless
- cutting-edge
- next-generation
- ultimate
- game-changing
- robust
- comprehensive

unless the term is meaningful and supported by the source.

The project can be enthusiastic where appropriate, but entries themselves should remain factual.

## 16.4 No fake completeness

Do not claim:

- "all Android devices"
- "works everywhere"
- "completely safe"
- "undetectable"
- "universal"
- "guaranteed"
- "100% compatible"

unless the statement is literally defensible and backed by authoritative evidence.

Prefer scoped language.

## 16.5 Do not fabricate citations or sources

Never invent:

- URLs
- repository names
- releases
- version numbers
- CVEs
- compatibility claims
- author statements
- benchmark results
- security properties
- licensing information

When evidence is unavailable, do not fill the gap with plausible text.

## 16.6 Do not duplicate information unnecessarily

Before creating a new section, search for existing coverage.

Before adding an entry, search for:

- the exact name
- repository URL
- package name
- common aliases

Do not create a second entry just because the existing entry has a slightly different capitalization.

## 16.7 Do not over-explain simple entries

An application listing normally needs a concise description.

Do not turn every application into an essay.

The purpose of the collection is fast discovery.

## 16.8 Do not rewrite untouched text

When asked to fix one entry:

- modify that entry
- preserve nearby content
- do not rephrase the whole category
- do not normalize unrelated punctuation
- do not "improve" every description you see

A small task should produce a small diff unless broader cleanup is explicitly required.

---

# 17. Punctuation and Style Rules

## 17.1 Never use em dashes

Do not use the em dash character:

```text
—
```

Use:

- commas
- parentheses
- colons
- semicolons
- periods
- a normal hyphen where appropriate

This applies to:

- Markdown
- prose
- comments
- commit messages
- PR descriptions
- generated documentation
- code comments

Before finalizing a change, search modified text for `—`.

## 17.2 Avoid unnecessary emojis

Emojis already have defined roles in this repository, such as:

- `⭐` featured/community recommended
- `🌱` F-Droid
- `▶️` Google Play
- framework/category icons in navigation

Do not introduce new decorative emojis merely for style.

Do not change established emoji semantics.

Do not add emojis to ordinary prose unless they are part of an existing visual convention.

## 17.3 Avoid artificial formatting

Do not add:

- excessive bolding
- fake "key takeaways"
- excessive callouts
- decorative separators
- giant headings
- repeated icons
- unnecessary tables

Use formatting to improve navigation, not to make generated text look impressive.

---

# 18. Code Style

When changing JavaScript or Markdown plugins:

- use modern ECMAScript syntax
- use `const` and `let` appropriately
- prefer small focused functions
- avoid unnecessary abstraction
- keep functions deterministic where possible
- preserve stateless behavior during concurrent Markdown rendering
- avoid mutating global state
- avoid adding dependencies for trivial functionality

For repository scripts:

- keep Python compatible with the repository's current environment
- keep shell scripts portable within their documented environment
- preserve existing command-line behavior unless changing it is necessary
- include error handling for new failure modes

Do not refactor functioning scripts simply to make them look more modern.

---

# 19. Dependency Changes

Before adding a dependency:

1. Check whether the functionality can be implemented with existing dependencies.
2. Check whether the requested behavior belongs in the project at all.
3. Prefer the smallest dependency footprint.
4. Understand how the dependency affects Astro builds and deploys.
5. Update lockfiles if the repository contains one.
6. Verify the full documentation build.

Do not add a package simply because it makes a small helper function easier.

---

# 20. External Links

There are two different link-quality questions:

### Internal links

Must resolve within the repository.

Use:

```bash
python3 scripts/check_links.py
```

### External links

May require live verification.

Do not assume that an HTTP URL is authoritative merely because it responds.

For project entries, favor upstream sources.

Do not replace a project URL with a third-party download page without a strong reason.

---

# 21. Dead Projects and Outdated Entries

The project explicitly values maintained resources.

For app/module additions, the contribution guide expects active maintenance and working links.

When determining whether an entry is stale:

- inspect upstream activity
- inspect releases
- check whether the project has been archived
- check whether the listed software has been replaced
- consider whether a fork has become the maintained successor
- avoid declaring a project "dead" from inactivity alone when the software is intentionally stable

When removing an outdated entry, make the diff targeted.

Do not use an obsolete project as a reason to rewrite an entire category.

---

# 22. Forks and Successors

Android root projects often have many forks.

Do not assume the newest fork is automatically the recommended one.

When dealing with forks:

- identify the upstream project
- identify what materially differs
- check current maintenance
- avoid duplicate listings unless the fork has meaningful independent value
- explain the distinction when both entries are necessary

A fork should not be listed solely because it is newer.

---

# 23. Recommended Entries

The `⭐` marker is meaningful.

It represents community recommendation/trust within the collection.

Do not assign `⭐` merely because:

- the project is popular outside this repository
- the project has many GitHub stars
- the project is new
- the project was generated or discovered by an agent
- the author requested it

Do not remove `⭐` without understanding why it exists.

---

# 24. Licenses

Use:

```text
FOSS
```

when the project's source is actually available under an identifiable free/open-source license.

Use:

```text
Proprietary
```

for closed-source software or cases where licensing is unclear according to the repository's established convention.

Do not infer licensing from:

- GitHub presence
- downloadable APK availability
- a README claiming "open source"
- source visibility alone

When uncertain, verify.

Do not invent a specific SPDX license inside an entry unless the repository's format calls for it.

---

# 25. Store Badges

Store badges are semantic metadata, not decorative icons.

Use:

```text
🌱
```

for F-Droid or IzzyOnDroid availability.

Use:

```text
▶️
```

for Google Play availability.

Only add a store badge when the link actually corresponds to the application.

Do not add a Play Store badge to a store page for a different package.

Do not add a F-Droid badge to a third-party repository merely because it distributes an APK.

Preserve the custom Markdown behavior implemented by `storeLinkPlugin.mjs`.

---

# 26. Pull Requests

The repository provides a pull request template with checklists for:

- app/module additions
- documentation changes
- link correctness
- formatting
- testing
- local preview
- commit quality

Agents should produce changes that would satisfy those checks.

## 26.1 PR scope

One PR should generally have one coherent purpose.

Good:

> Reclassify five app patchers under App Modifications and synchronize the sidebar.

Less desirable:

> Add three apps, rewrite the FAQ, redesign the PWA cache, change ten unrelated descriptions, and rename categories.

Avoid mixing unrelated cleanup into a focused contribution.

## 26.2 PR descriptions

A good PR description should state:

- what changed
- why
- what was validated
- any remaining uncertainty

Do not generate long PR descriptions with repetitive sections merely to sound thorough.

---

# 27. Commit Messages

Commit messages should describe the actual change.

Good examples:

```text
add Battery Monitor to performance tools
fix broken customization link
sort app-modification categories
update KernelSU guide links
remove unavailable project
```

Avoid vague messages such as:

```text
update stuff
changes
fix things
improvements
enhancements
```

Do not write exaggerated or AI-generated commit summaries.

---

# 28. Issues and Taxonomy

The repository contains dedicated issue templates for:

- app suggestions
- bug reports
- dead links
- documentation improvements
- questions
- taxonomy changes

Respect that structure.

For a taxonomy question, do not silently restructure categories in a regular content PR when the change should first be discussed.

---

# 29. Git History as Context

Recent project maintenance demonstrates several useful patterns:

- sorting categories and entries was intentionally separated from content rewriting
- entry counts were checked before and after reorder-only work
- internal links were explicitly validated
- documentation structure was updated together with navigation when necessary
- unnecessary tips were removed
- link formatting and taxonomy were actively maintained

Use repository history as evidence of maintainer expectations.

Do not assume that an older pattern is still valid if newer commits have intentionally changed it.

When the same kind of change has been made recently, inspect those commits before introducing a different approach.

---

# 30. Working with Existing Content

Before modifying a page:

1. Read the surrounding section.
2. Search for the item elsewhere in the repository.
3. Check related categories.
4. Check relevant contribution guidance.
5. Check navigation if headings are affected.
6. Check whether the page has custom frontmatter or structured data.
7. Make the smallest correct edit.

Do not edit from a single search-result snippet when the surrounding structure matters.

---

# 31. Search Before Add

Before adding an application or module, search for:

```text
exact project name
repository URL
package name
common alias
fork name
```

This reduces duplicates and prevents near-duplicate listings.

For projects that have changed names, verify which name is current and whether the existing entry should be updated rather than duplicated.

---

# 32. Search Before Move

Before moving a section:

- search for links to its heading
- search for references in the README
- search `config.mjs`
- search related documentation

Heading IDs function as internal public interfaces.

A heading move is not complete until its incoming links are considered.

---

# 33. Search Before Delete

Before deleting:

- a page
- an entry
- an image
- a script
- a category
- a frontmatter field

search the repository for references.

Do not rely on visual inspection of one page.

Unused-looking files may be consumed by:

- Astro / Starlight
- PWA configuration
- custom theme code
- metadata
- scripts
- external tooling

---

# 34. What Not to Change Automatically

Do not automatically:

- reformat every Markdown file
- alphabetize unrelated files
- normalize every quote or punctuation mark
- rewrite all descriptions
- replace every emoji
- update all SEO metadata
- "modernize" all JavaScript
- upgrade all dependencies
- restructure the entire sidebar
- convert all relative links to absolute links
- replace all GitHub URLs with websites
- replace all websites with GitHub URLs
- introduce a new linting system
- introduce a framework
- generate additional documentation without a concrete reason

A repository-wide change must have a repository-wide justification.

---

# 35. Large Refactors

For a broad refactor, first establish invariants.

Examples:

- entry count remains unchanged
- only ordering changes
- every internal anchor still resolves
- no category loses entries
- no links change
- no descriptions change
- site build still succeeds

Then make the change.

Afterwards, verify the invariants.

For an ordering-only operation, a diff showing hundreds of changed lines is acceptable if the semantic content is unchanged. A diff containing rewritten prose is not.

---

# 36. Generated and Derived Content

Some repository behavior is generated or influenced by configuration.

Do not manually edit derived output unless the repository explicitly tracks that output.

Prefer changing the source:

- Markdown source
- Astro/Starlight configuration
- theme/plugin source
- asset source

rather than modifying a generated artifact.

Always inspect `.gitignore` and existing repository conventions before adding generated files.

---

# 37. Security and Secrets

Never commit:

- tokens
- API keys
- credentials
- private URLs containing secrets
- personal access tokens
- secret environment values

Be especially careful when touching:

```text
.github/workflows/
```

The repository includes a scheduled GitHub-to-Codeberg mirror workflow using secrets for authentication.

Do not expose those secrets in logs, documentation, scripts, or committed configuration.

Do not replace secret-backed authentication with hardcoded credentials.

---

# 38. GitHub Actions

The repository currently has a workflow for synchronizing the repository to Codeberg.

When changing workflows:

- preserve least-privilege permissions
- avoid logging secrets
- avoid unnecessary permissions
- preserve the mirror's intended behavior
- verify YAML syntax
- inspect the complete workflow before editing

Do not add broad workflow permissions merely to make an action stop failing.

---

# 39. Browser and Site Behavior

The website is intended to be:

- searchable
- navigable by category
- installable as a PWA
- usable offline to a meaningful extent
- accessible through stable page URLs and anchors

When changing site behavior, consider:

- desktop
- mobile
- dark mode
- offline behavior
- search behavior
- deep links
- browser navigation
- generated URLs

A change that looks correct on one page can still break the website globally.

---

# 40. Validation Checklist

For a normal documentation change:

```bash
python3 scripts/check_links.py
npm run docs:build
node scripts/validate.mjs
```

For app/module additions:

```bash
python3 scripts/check_links.py
npm run docs:build
bash scripts/counter.sh
```

For configuration/theme changes:

```bash
npm run docs:build
```

and, where relevant:

```bash
npm run docs:dev
```

to inspect behavior manually.

For large structural changes, also inspect the Git diff carefully.

---

# 41. Manual Review Expectations

Before considering work complete, inspect the final diff for:

- accidental unrelated edits
- duplicate entries
- broken anchors
- incorrect badges
- wrong categories
- outdated descriptions
- unsupported technical claims
- unnecessary wording
- accidental emoji additions
- em dashes
- formatting drift
- changed URLs that were not required
- metadata changes that were not required

Do not trust the generated diff blindly.

---

# 42. Definition of Done

A change is done only when all applicable conditions are satisfied.

### Content

- The change belongs in the correct page.
- No duplicate was introduced.
- The description is factual.
- Claims have been verified where necessary.
- Ordering is correct.
- Tags are correct.
- Source links are authoritative.
- Store badges are accurate.

### Documentation

- Markdown structure is valid.
- Frontmatter remains truthful.
- Internal links work.
- Anchors remain valid.
- Navigation is synchronized where necessary.

### Build

- `python3 scripts/check_links.py` passes when applicable.
- `npm run docs:build` passes for documentation/site changes.

### Editorial quality

- No unnecessary filler.
- No promotional wording without justification.
- No fabricated claims.
- No repetitive AI-style prose.
- No unnecessary emojis.
- No em dashes.
- No unrelated rewrites.

### Scope

- The diff is limited to the requested purpose.
- Existing content was preserved where it did not need to change.
- No unrelated refactor was smuggled into the change.

---

# 43. Agent Behavior Rules

Agents working in this repository should behave like careful maintainers.

Before editing:

- inspect
- search
- understand
- verify
- change

After editing:

- validate
- inspect the diff
- check for unintended consequences

Do not:

- guess
- fabricate
- pad
- rewrite unnecessarily
- broaden scope without reason
- assume external facts are current
- treat build success as factual verification

When uncertain, preserve existing behavior rather than inventing a new convention.

When evidence conflicts, investigate before choosing.

When a requested change would degrade curation quality, favor correctness and repository conventions over literal but harmful automation.

---

# 44. Preferred Editing Pattern

For a routine content contribution, follow this pattern:

```text
1. Read AGENTS.md.
2. Read the relevant page.
3. Search for duplicates and aliases.
4. Verify the project's authoritative source.
5. Determine the correct category.
6. Add or modify the smallest possible block.
7. Preserve alphabetical ordering.
8. Preserve tags and badge conventions.
9. Run link validation.
10. Build the documentation site.
11. Inspect the diff.
```

For taxonomy or structural work, add:

```text
12. Inspect navigation and sidebar configuration.
13. Search for affected anchors.
14. Validate all changed routes and references.
```

---

# 45. Final Principle

The repository should read like it was maintained by technically knowledgeable humans who care about Android rooting, not like a language model attempting to sound knowledgeable about Android rooting.

Prefer:

**accurate + concise + sourced + maintainable**

over:

**long + polished + generic + speculative**

A smaller correct change is better than a larger impressive-looking change.