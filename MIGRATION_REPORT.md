# Awesome Android Root — Content Architecture Migration Report

**Session:** `arena/01a07772-awesome-android-root` (branch from `d08d2ad94b733bad748e2d0d9c3a1f5920db70ca`)
**Date:** 2026-09-06
**Scope:** Refactor the monolithic `README.md` database into a maintainable, SEO-friendly, multi-file VitePress documentation set; keep every piece of existing content; preserve the site's infrastructure.

---

## A. Executive Summary

The repository previously stored its entire curated database (600+ root apps and Magisk/KernelSU/APatch/LSPosed modules) as a single 1,523-line `README.md`, which a custom build script (`scripts/build-docs.js`) spliced into one giant site page (`/apps-and-modules/`) at build time. One page held everything; there was no per-topic URL, no per-topic SEO, and no way to deep-link a category.

The migration turned that into a **16-category, one-file-per-topic structure** under `docs/apps-and-modules/`, each page with its own SEO frontmatter, contextual intro, section anchors, and an `AppSearch` filter bar. `README.md` is now a 113-line, GitHub-first landing page. The site builds with plain `vitepress build docs` (no content-generation step), keeps the existing VitePress theme, PWA, local search with boosts, clean URLs, store-link/LLMs plugins, and Cloudflare-ready output. A full build passes, all 1,895 internal links/anchors validate, and every migrated entry (603) is accounted for.

**Outcome:** the site now has real per-category URLs like `/apps-and-modules/privacy` and `/apps-and-modules/root-management`, which search engines and users can reach, share, and bookmark independently.

---

## B. Pre-Work Audit (What Existed)

Findings from the initial audit of the repo at `d08d2ad`:

1. **Content was monolithic.** `README.md` (1,523 lines) contained: an HTML hero, intro/navigation blocks, root-app DB in 12 top-level `##` sections (`Root & Module Management` → `General Utilities`), glossary, starter kit, resources/help and safety sections. ~603 entry bullets of the form `- **[Name](url)** - description` with `` `FOSS` `[M]` `[K]` `` badges and `[🌱]`/`[▶️]` store links.
2. **Site generation depended on the README.** `package.json`'s `docs:build` ran `node scripts/build-docs.js && vitepress build docs`. `build-docs.js` extracted chunks of README text, injected them under a sentinel (`<!-- AUTO-GENERATED-CONTENT -->`) in `docs/apps-and-modules/index.md`, wrapped content in `.app-search-content`, mounted `<AppSearch/>`, rewrote some links, and failed the build on content/format warnings.
3. **One page, one URL.** Every app/module lived under `/apps-and-modules/` with only fragment anchors (`#privacy-security`, `#ad-tracker-blocking`, …). Guides already had their own topic pages under `docs/rooting-guides/` and `docs/general-guides/` with clean URLs.
4. **Infrastructure was already strong:** VitePress 2.x config with nav, per-section sidebars, local search (`miniSearch`) with hard boosts (`apps-and-modules` documents boosted ×10), `cleanUrls`, PWA (VitePress PWA plugin), lazy images, `StoreLink` custom component + markdown plugin (`storeLinkPlugin`), LLMs.txt plugin, canonical/OG/Twitter head per page, static `sitemap.xml` + `robots.txt` + `_headers` in `docs/public/`.
5. **Cross-document references pointed into the single page**, e.g. `./apps-and-modules/index.md#root-hiding-play-integrity` from guides, FAQs, troubleshooting and about pages — all would need retargeting to the new topic pages.
6. **Helper utilities** (`scripts/counter.sh`, `scripts/repo_freshness_checker/`) parsed `README.md`; `.github` issue/PR templates and `docs/contributing.md` told contributors to edit the README's giant list.

### FMHY architecture study

Before designing the target structure, the FMHY project was studied for how a large, continuously-updated curated list survives as documentation: FMHY keeps content in `docs/` as one Markdown file per major topic, every topic page is fully self-describing (title + intro + sections), URLs equal filenames, the README is only a pointer/hub, contributors edit small topic files, and PR size stays reviewable. Those lessons directly shaped this migration: topic-level files (not per-app files), self-contained pages, clean per-topic URLs, hub → category navigation, and a light README that points to the site.

---

## C. Target Architecture

### URL and file map

All new category pages live in `docs/apps-and-modules/`; `index.md` there remains the hub at the unchanged URL `/apps-and-modules/` (so no redirect is needed for the old entry point). 16 topic pages:

| File | Page title (H1) | Sections within the page |
| :--- | :--- | :--- |
| `root-management.md` | Root Management | Root Managers; Temporary Root (Locked Bootloader); Module Managers; Metamodules; LSPosed & Xposed; Zygisk; Root Hiding & Play Integrity; Susfs; Bootloop Protection; Root Detection & Testing |
| `system.md` | System | System Tweaks; VBMeta Mods; System UI & Framework (AOSP, ColorOS, HyperOS, NothingOS, One UI, Onyx, Oxygen OS, ZUI); Boot & Startup; App & Package Management; Permissions & AppOps; System Information & Diagnostics |
| `debloating.md` | Debloating | Debloating Apps & Modules |
| `performance.md` | Performance & Battery | Performance Optimization; Kernel Management; Memory & RAM; Battery Optimization; Charging & Power; Task & Process Management |
| `privacy.md` | Privacy | Privacy Tools; Device ID & Spoofing; App Isolation; Location & GPS |
| `security.md` | Security | Security Tools; Firewalls & Filtering |
| `ad-blocking.md` | Ad Blocking | Ad & Tracker Blocking; DNS & Network Filtering |
| `app-modifications.md` | App Modifications | App Patchers; App Mods; Social Media Mods; Browser Mods; YouTube & Media Mods; Signature & Verification |
| `file-management.md` | File Management | File Managers; Cleaning; File & Partition Tools |
| `backup.md` | Backup & Restore | Backup Apps & Tools |
| `customization.md` | Customization | Themes & Visual Mods; Launchers & Home Screen; Status Bar & Navigation; Gestures & Controls; Fonts & Emojis; Notifications; Lockscreen & AOD; Screen & Display |
| `audio.md` | Audio | Audio Enhancement; Audio Control; Audio Effects |
| `networking.md` | Networking | VPN & Proxy; Network Tools; Wi-Fi & Mobile Data; Bluetooth & NFC |
| `gaming.md` | Gaming | Gaming Optimization; Game Modifications & Tools |
| `development.md` | Development & Automation | Terminal & Shell; ADB & Debugging; Developer Tools; Linux Environments; Automation; Hardware & Sensors |
| `utilities.md` | General Utilities | Sync & File Transfer; Reboot & Power; Sharing & Intent Tools; Communication & Messaging; General Toolboxes |
| `index.md` | Root Apps & Modules (hub) | Browse by Category (16 cards); Starter Kit: Must have Apps; Glossary; Resources and Help; Safety & Legal |

### Taxonomy decisions (applied from the task rules)

- **Apps and modules stay combined everywhere** — every page mixes root apps, Magisk modules, KernelSU modules, APatch and LSPosed modules; there is no Apps/Modules split.
- **Categories are organized by user intent** and named in plain words without redundant "Root/"Android Root" prefixes ("Privacy", "Ad Blocking", "Networking", "Debloating", …). "Root Management" is the genuine intent name of the root-manager/module-manager page.
- **No hundreds of tiny per-app files** — one file per topic, with per-section anchors for deep linking.
- **Guides are not duplicated.** The root-apps DB moved; guide content stays exclusively in `docs/rooting-guides/` and `docs/general-guides/`. New category pages *link* to the relevant guides (and vice versa) instead of restating instructions.
- Where the old README split topics across a large section (e.g. Privacy & Security), subsections were **regrouped by intent** (firewalls → Security, DNS filtering → Ad Blocking, location spoofing → Privacy, etc.). Every subsection and its entries moved as a whole; nothing was dropped or merged into the wrong intent.
- Small-but-meaningful topics (Backup 6 entries, Debloating 6, Audio 16) were kept as separate pages deliberately: they are strong, distinct search intents, each page stands alone in SEO, and the hub + sidebar make them discoverable.

---

## D. Content Preservation & Verification

The migration was executed by a purpose-built one-off parser (`scripts/migrate_readme_to_pages.py`, since removed) rather than manual copy-paste, so entries were carried over **byte-for-byte** including badges, store links, description text, warning/note callouts, `> [!TIP]` blocks, and per-entry URLs.

Verification performed after generation:

- **Canonical entry comparison** between the old README DB span and the new 16 files: **603 vs 603 entries**, diff = zero missing entries and zero extras (the only difference being one intentionally rewritten anchor to a new page target).
- `python3 scripts/check_links.py` (new maintained utility in `scripts/`, documented in `scripts/README.md`) — checks every internal Markdown link and heading anchor across `docs/` using VitePress' exact slugify rules: **1,895 links checked, all OK** (after fixing 5 stale anchors).
- `node --check docs/.vitepress/config.mjs` — syntax OK; every `link:` in nav/sidebar verified programmatically to resolve to a real page + anchor.
- Stale legacy references scan — no remaining `500+` mentions and no old single-page anchors left except the two that intentionally point at the hub (`#starter-kit-must-have-apps`, `#glossary`), which exist on the hub.
- `docs/public/sitemap.xml` updated: +16 category URLs (now 46 entries, dates refreshed) so the new pages are submitted to search engines.

### Page SEO structure (per topic file)

Each of the 16 pages opens with VitePress frontmatter (`title`, `description`, canonical `head` link to the clean URL, robots, OG/Twitter meta), then an **H1 + contextual intro paragraph** written to mention Android root/apps/modules naturally and explain what the page covers, a `> [!TIP]` related-pages line, the `<ClientOnly><AppSearch /></ClientOnly>` filter bar, and the content in `<div class="app-search-content">`. Descriptions are unique per page and keyword-aware (e.g. "privacy tools for rooted Android devices: privacy apps, Magisk modules, KernelSU modules and LSPosed modules…").

---

## E. Site Configuration & Navigation Changes

1. **`docs/.vitepress/config.mjs`** — the single-page sidebar for `/apps-and-modules/` was replaced by a **per-topic sidebar**: 16 collapsed category groups (emoji-labeled), each with a `link:` to its page plus per-section anchor items, so the sidebar deep-links straight to subsections (e.g. `…/root-management#susfs`). Nav's *Apps & Modules* entry keeps `/apps-and-modules/` with `activeMatch: '^/apps-and-modules/'` so all topic pages highlight correctly. Search `boostDocument` logic is untouched and its `documentId.includes('apps-and-modules')` test now automatically boosts every new topic page (nothing config-side needed per page).
2. **`docs/index.md`** (home) — feature cards now link to the topic pages instead of one-page anchors.
3. **Cross-document link migration** — every guide/FAQ/about/troubleshooting/resource page that referenced `/apps-and-modules/#…` was retargeted to the new pages/anchors (12 files: `about.md`, `faqs.md`, `index.md`, `troubleshooting.md`, `resources.md`, `offline.md`, both `general-guides/*`, and the rooting guides). Where an anchor moved across categories (e.g. `#firewalls-filtering`), the link now points at the new owning page.
4. **README.md** — rewritten from 1,523 lines to a **113-line standard-Markdown landing page** (GitHub-compatible: no VitePress components): logo, intro, "use the website" call-to-action with the search/navigation/PWA benefits, a **16-row category table** (category → what you'll find → GitHub file → website URL), a guides table, contributing links, and license/disclaimer. It uses only GitHub-native Markdown (including one `> [!IMPORTANT]` callout) — no giant content, no `<details>` dump.
5. **Contributing paths** — `docs/contributing.md` now explains the category-page workflow with a "Category Pages" table (16 slugs), and the root-level `CONTRIBUTING.md` pointer file was added; `.github` issue/PR templates updated to reference `docs/apps-and-modules/` and the 16 topic slugs. `scripts/counter.sh` now counts across the category pages instead of the README; `scripts/README.md` updated.
6. **URL compatibility** — the old public entry `/apps-and-modules/` still exists (hub), so no inbound page-level redirect is required; internal old-style fragment links were rewritten rather than left to rot. (Server-side redirect of external `#fragment` bookmarks is not possible/needed since fragments are never sent to the server and the page-level URL survived.)
7. **Build chain** — `package.json`: `docs:build` is now `vitepress build docs`; `scripts/build-docs.js` was deleted (its auto-generation role ended with the single-page layout; content is now authored directly and reviewed via PR). `package-lock.json` (accidental artifact of dependency install) and throwaway generator scripts were removed; the final tree contains only intentional files. `scripts/check_links.py` was added as a permanent validation utility.

---

## F. Validation & Build Results (Commands Actually Run)

| Check | Command | Result |
| :--- | :--- | :--- |
| Config syntax | `node --check docs/.vitepress/config.mjs` | ✅ passed |
| Config link integrity | programmatic scan of every nav/sidebar `link:` | ✅ all resolve |
| Internal links/anchors | `python3 scripts/check_links.py` | ✅ 1,895 links OK |
| Legacy-link residue | grep for old `/apps-and-modules/#…` + `500+` | ✅ only valid hub links remain |
| Entry parity | canonical compare README span vs new pages | ✅ 603 / 603 |
| Entry counter | `bash scripts/counter.sh` | ✅ 603 total (root apps 176 · Magisk 213 · KernelSU 105 · LSPosed 205) |
| Production build (clean dist) | `npm run docs:build` | ✅ **build complete in 10.82s**, exit 0 |
| Built-page anchors | grep of generated HTML ids | ✅ all hub/section anchors present |
| Live smoke test | `vitepress preview docs` + curl | ✅ 200 on `/`, `/apps-and-modules/`, `/apps-and-modules/{privacy,root-management,ad-blocking,backup,debloating,utilities}`; correct `<title>` and hub content served |

Notes on claims: the earlier in-session failed build (a leaked `<div align="center">` inside a generated page) was fixed at the source (migration boundaries for the Resources & Help block) and the content regenerated; final builds shown above ran from a clean `docs/.vitepress/dist` and pass.

---

## G. Preserved Infrastructure (Untouched or Intact)

- VitePress theme, layout, `docs/.vitepress/theme/` customization — untouched.
- Local search with miniSearch and `boostDocument` hard-boost for `apps-and-modules` document IDs — intact and now covering all 16 pages automatically.
- PWA (`registerSW`, manifest, `_headers` service-worker rules, workbox) — untouched.
- Clean URLs (`cleanUrls`), lazy images, `storeLinkPlugin`/`StoreLink` badges (`🌱` F-Droid, `▶️` Play Store) — untouched; entry syntax preserved verbatim so badges still render.
- LLMs.txt plugin output, static `sitemap.xml`/`robots.txt`/`_headers`, custom components (`AppSearch`, etc.) — intact; `AppSearch` filter component is mounted on every category page (it filters that page's DOM content, so it works per-topic).
- Canonical URLs + per-page OG/Twitter/JSON-LD conventions — extended to all new pages.
- Cloudflare Pages deployment contract unchanged (`npm run docs:build` → `docs/.vitepress/dist`).

---

## H. Caveats & Decisions Worth Knowing

1. **Counter groups don't sum to 603** by design: an entry can carry several badges (e.g. `[M] [K]`), so group counts overlap; 603 is the number of entry bullets.
2. **`susfs`, OEM `####` headings** were "heading-only" landmarks in the old README with no entries of their own; they were preserved as headings/anchors on the target pages (and in the sidebar) so nothing visually disappears and old subsection anchors keep working where meaningful.
3. **Guides kept canonical in `rooting-guides/`** — no competing pages were created; instead cross-links were added/retargeted in both directions.
4. **Old single-page sidebar anchors were replaced** by per-page entries; sidebar JS state remains consistent since each topic is its own route.
5. **Nothing is committed in this session** (per workspace rules, changes are left on the working tree on branch `arena/01a07772-awesome-android-root`); review with `git status` / `git diff` before pushing/opening a PR.
6. Deleted files: `scripts/build-docs.js` (staged deletion). Removed (never tracked, session-only): the migration parser, the sidebar generator, `package-lock.json`, `scripts/__pycache__/`.
7. One-off generator scripts were intentionally **removed after use**: the canonical source of truth is now the Markdown files themselves, and the sidebar lives directly in `config.mjs` where maintainers edit it by hand.

---

## I. Change Manifest (as of report date)

**Rewritten / heavily edited (tracked):** `README.md` (1,523 → 113 lines), `docs/.vitepress/config.mjs` (nav/sidebar/activeMatch; sidebar block replaced), `docs/apps-and-modules/index.md` (static hub: SEO/JSON-LD header, 16 category cards, Starter Kit, Glossary, Resources, Safety & Legal), `docs/index.md` (home cards), `docs/contributing.md`, `package.json`, `scripts/README.md`, `scripts/counter.sh`.

**Link retargets (tracked):** `docs/about.md`, `docs/faqs.md`, `docs/troubleshooting.md`, `docs/resources.md`, `docs/offline.md`, `docs/general-guides/android-adblocking.md`, `docs/general-guides/android-apps-debloating.md`, `docs/rooting-guides/{index,magisk-guide,kernelsu-guide,how-to-unlock-bootloader,custom-rom-installation,root-without-unlocking-bootloader,temporary-root-solutions}.md`, `docs/public/sitemap.xml` (+16 URLs).

**Templates:** `.github/ISSUE_TEMPLATE/app-suggestion.md`, `.github/ISSUE_TEMPLATE/taxonomy-change.md`, `.github/PULL_REQUEST_TEMPLATE.md`; new `CONTRIBUTING.md` pointer at repo root.

**New files (untracked, to be added in the PR):** the 16 topic pages in `docs/apps-and-modules/`, `CONTRIBUTING.md`, `scripts/check_links.py`.

**Deleted:** `scripts/build-docs.js` (staged). Everything else in the repo is untouched.

### Final acceptance status

- ✅ README is a lightweight, GitHub-compatible landing page (no VitePress components, no mass content)
- ✅ Content split into one practical topic file per category under `docs/apps-and-modules/`
- ✅ Apps & modules combined everywhere; categories by user intent; no "Root/Android Root" prefixes; short names
- ✅ Guides remain canonical in `rooting-guides/`/`general-guides/` — no duplicated guide pages
- ✅ Every page SEO-standalone: descriptive filename + H1 + title + intro + internal cross-links
- ✅ All entries preserved & verified (603/603); warnings, badges, store links and references intact
- ✅ Infrastructure preserved: theme, search + boosts, PWA, clean URLs, lazy images, plugins, components, `_headers`, Cloudflare flow
- ✅ URL design clean (`/apps-and-modules/<topic>`); hub URL stable; all internal links rewritten and validated
- ✅ Sidebar is per-page; nav/search boost logic updated/covered; sitemap extended
- ✅ `scripts/build-docs.js` replaced by direct `vitepress build docs`
- ✅ **`npm run docs:build` passes** on a clean `dist`; live preview smoke test returns 200s
