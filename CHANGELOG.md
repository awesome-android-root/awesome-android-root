# Changelog

Release notes for tagged versions of Awesome Android Root. Notes for releases before 5.1 are on the [GitHub Releases page](https://github.com/awesome-android-root/awesome-android-root/releases).

## 5.1 (2026-09-23)

Release 5.1 builds on the 5.0 restructure. The database grows from 603 to 652 entries, every category page now follows the documented ordering rules, the highest-traffic guides were rewritten around what people actually search for, and the site was simplified: the filter bar is gone, the PWA no longer precaches pages, the navigation is flatter, and the build runs on Bun.

### Highlights

- **62 new apps and modules across 12 category pages.** The largest additions are in Development (+13, including a new Frida & Reverse Engineering subsection), App Modifications (+10), System (+8), Networking (+5) and Root Management (+5). The full list is below.
- **Consistent ordering on every page.** PR #160 applied the rules from the hub page to all 16 category pages: categories A-Z, subcategories A-Z, and within each list the community-recommended entries first, then A-Z. 13 pages were out of order before. Root Managers and Temporary Root stay pinned at the top of the root-management page.
- **Guides reworked for search intent.** The bootloader unlocking, KernelSU, Magisk, Samsung, temporary root, GhostLock and troubleshooting pages have new titles, openings and section maps. Manufacturer and Samsung guidance now stresses model- and region-specific verification instead of blanket claims. No URL changed.
- **Structured data standardized.** A site-wide `transformHead` emits Organization, WebSite, WebPage and BreadcrumbList JSON-LD on every page, and TechArticle schema was added to the bootloader, temporary root and GhostLock guides (the KernelSU guide's existing schema was rewritten to match). The `keywords` meta blocks were removed from all 44 pages that had them.
- **Simpler site.** The AppSearch filter bar component (1,042 lines) was removed from all category pages, the offline page was dropped, the navigation dropdowns were replaced with direct links, and the PWA now caches images only and always fetches current pages online.
- **Tooling.** The package manager switched from pnpm to Bun 1.4.2, the repo freshness checker moved to its own repository, and `AGENTS.md`, `SECURITY.md` and `.gitattributes` were added.

### Apps and modules

New entries by page:

- **App Modifications (+10):** Enhance Google Phone, GH FastPass, MiFitnessAdAway, Pixel Mask, Pixelify Infinity (App Mods); ReVanced Extended, ReVanced Magisk Module by j-hc (App Patchers); Threads Hide Ads (new Threads subsection), XBlocker (X/Twitter), Zalo Patch (new Zalo subsection). App Patchers now opens the page, and NexAlloy moved there with an updated description.
- **Audio (+1):** Equalizer314.
- **Customization (+3):** Keep Screen Off (Screen & Display); Quick-Tile Settings, Smart Dock (Status Bar & Navigation).
- **Development (+13):** ReTerminal (Terminal & Shell); Loki, Logcat Extreme (ADB & Debugging); Nano for Android NDK, SQLite3 for Android (Developer Tools); Florida, Jezail, MagiskFrida, MagiskHluda, Undetected Frida, ZygiskFrida in a new Frida & Reverse Engineering subsection with a short Frida explainer; FIRERPA (lamda), Geto (Automation).
- **File Management (+3):** StorageFixer, StorageRedirect (File & Partition Tools); Ultimate File Manager Pro (File Managers).
- **Networking (+5):** AsteriskBOX, AsteriskMETA, AsteriskNG (VPN & Proxy); NetToggle (Wi-Fi & Mobile Data); Unlock AI & EN Services for Russia (Network Tools).
- **Performance (+4):** Auto Sleep, Battery Info Enabler, Battery Monitor (Battery Optimization); KillMyApps (Task & Process Management).
- **Privacy (+4):** FakeGPS-next (Location & GPS); Mantle, Mantle Verify (Device ID & Spoofing); TargetedHide (App Isolation).
- **Root Management (+5):** AuditPatch (Root Hiding & Play Integrity); Key Attestation, Kknd Root Detector (Root Detection & Testing); OnyxZygisk, VexZygisk (Zygisk).
- **Security (+3):** Anti SafetyCore, SafetyCore Placeholder, Zygisk Cacerts (Security Tools).
- **System (+8):** AnyWebView, Vanadium WebView & Browser (System Tweaks); VBMeta Tool (VBMeta Mods); AppControl-X, Buge App Manager, PI (PackageInstaller) (App & Package Management); PixelInjector in a new Pixel subsection under System UI & Framework; VD Infos (System Information & Diagnostics).
- **Utilities (+3):** ACR Phone, XposedSmsCode by Rove24 (Communication & Messaging); Kaorios Toolbox (General Toolboxes).

Other entry changes:

- **Temporary Root section trimmed.** The root-management page now lists Root My Galaxy plus links to the two guides. The 12 device-specific GhostLock tools (GhostLock App, GhostLock-5.10, GhostLock-Galaxy, ghostlock-oneplus, IonStack-S22U, iQOO Z9 5G / vivo T3 5G Root, oppo-ghostlock, pixel-ksu-root, QuestStack, Root My Device, Root-My-Galaxy-Payloads, Root My Pixel) stay listed on the GhostLock guide, which also gained Root My Galaxy SM-S918B and UniRoot.
- **Removed:** ReSuSFS, at the author's request. The BRENE vs ReSuSFS comparison table went with it.
- **Stars added** to InstallerX-Revived and, on the GhostLock guide, to GhostLock App.
- **Links and descriptions:** ZygiskNext now points to the LSPosed organization (root-management, resources, rooting guides index and KernelSU guide); XposedSmsCode gained a Play Store link; the page descriptions of 12 category pages were shortened.

### Guides and documentation

- **How to Unlock an Android Bootloader.** Retitled, new opening, table of contents rewritten as questions, and the manufacturer table now states the real limitation per vendor instead of a "success rate" percentage. TechArticle schema added.
- **Samsung.** Rewritten around eligibility: a "what to verify before doing anything" table by device situation, absolute statements about One UI 8 replaced with model- and region-specific checks, and GhostLock described as a narrow temporary option rather than a general method.
- **KernelSU.** New KernelSU WebUI (ksuwebui) section linking to the official module WebUI documentation and module repository, topic links at the top, rewritten description.
- **Magisk.** New title, opening and topic map.
- **Temporary Root for Android** (formerly Bootloader Modification & Temporary Root Solutions). New method comparison table (standard root vs MediaTek Kaeru/Fenrir vs GhostLock) and a seven-question FAQ on persistence, reboot behavior, modules, safety and device support.
- **GhostLock guide.** Retitled "GhostLock: Root Android Without Unlocking the Bootloader" with a direct answer up front: what it is, what it is not, and what happens after a reboot.
- **Troubleshooting.** New problem directory table (bootloop, missing root, module failure, Play Integrity, cannot flash) pointing to the right section or guide.
- **Rooting guides index.** The intro tip now sends readers to the device-specific guides section.
- **Legal disclaimer.** Rewritten and reorganized into fewer, clearer sections; new Third-Party Software & Links and Accuracy & Updates sections; the per-region legal notes and the age recommendation section were removed.
- **Hub and home page.** The apps-and-modules hub uses a category table with one-line descriptions instead of a bare list and drops the filter bar instructions. Home page and hub titles changed, decorative emoji removed from headings and buttons, the "Fix Issues Now" button is now "Troubleshooting", and the GitHub star count was updated to 4.7k.
- **Contributing.** `docs/contributing.md` no longer duplicates the category table and points to the pull request template for the submission format. The root `CONTRIBUTING.md` is a short quick start that links to the full guide.
- **README.** Website badge added, filter bar bullet removed, PWA description updated, emoji removed from the guides table, and a note that the project is maintained by humans, with AI used for coding, formatting and proofreading only.

### Site and infrastructure

- **Package manager:** pnpm replaced by Bun (`packageManager: bun@1.4.2`, `.bun-version`, VS Code build task updated). `package.json` version bumped to 5.0.0.
- **PWA:** the service worker precaches images only and uses a single CacheFirst image cache (same origin plus GitHub image hosts). The HTML, script, font, badge, search and JSON runtime caches, `navigateFallback`, `navigationPreload` and the `offline.html` asset were removed. Registration switched to `injectRegister: 'script'`, and the update toast is gone: `PwaReload.vue` now only shows the offline banner.
- **Navigation:** Rooting Guides and General Guides are direct links with `activeMatch`; the More menu is a flat list.
- **Search:** rooting guides no longer get a 2x boost in local search; apps-and-modules pages keep their 10x boost.
- **Head:** the GitHub preconnect and dns-prefetch hints and the Ahrefs verification meta tag were removed.
- **llms.txt:** `vitepress-plugin-llms` bumped to 1.14.0, and a new `llmsSidebar` helper strips anchor-only, external and home links from the sidebar passed to the plugin so the generated files only reference real pages.
- **Styles:** unused CSS comments removed, lazy-loading image styles moved off the deleted `.app-search-content` wrapper, new `.apps-lede` class for the hub intro.
- **Scripts:** `repo_freshness_checker` (1,442 lines) moved to a separate repository; `scripts/README.md` now documents only `counter.sh` and `check_links.py`.
- **Repository files:** `AGENTS.md` (guidelines for coding agents and automated contributors), `SECURITY.md` (reporting policy and scope) and `.gitattributes` (Linguist configuration so Markdown counts and the VitePress code does not) were added.
- **Sitemap:** the same 46 URLs, with `lastmod` timestamps refreshed.

### Fixes

- Restored the Social Media Mods (15 subsections, 39 entries) and YouTube & Media Mods (6 entries) sections of `app-modifications.md`, which were dropped by mistake in the Sep 16 App Patchers reorganization. The content is identical to the pre-deletion version; only NexAlloy now lives under App Patchers instead of YouTube & Media Mods.
- Fixed the `system.md#system-ui-framework` anchor in `customization.md`. `check_links.py` is clean again (1,971 links).
- Fixed a stray backtick in the Susfs note of `root-management.md` that made `check_links.py` skip 17 links (PR #160).
- Closed an unclosed `<div>` and removed a stray line break in `root-management.md`.

### Numbers

| Metric | 5.0 | 5.1 |
| --- | --- | --- |
| Total entries | 603 | 652 |
| Root apps | 176 | 189 |
| Magisk modules | 213 | 231 |
| KernelSU modules | 105 | 120 |
| LSPosed modules | 205 | 223 |
| Category pages | 16 | 16 |
| Internal links checked | 1,895 | 1,971 |
| Sitemap URLs | 46 | 46 |

Entries that carry several framework tags are counted under each, so the per-tag numbers do not add up to the total. Counts come from `scripts/counter.sh`.

### Merged pull requests

- #157 - Add 30 new root apps and modules across 10 category pages
- #159 - Improve priority SEO pages and app discovery UX
- #160 - Sort categories, sub-categories and entries in docs/apps-and-modules

The remaining 79 commits on `main` cover the entry additions, guide rewrites, PWA and navigation changes, and repository housekeeping listed above.

### Full changelog

[Compare 5.0...5.1](https://github.com/awesome-android-root/awesome-android-root/compare/5.0...5.1)
