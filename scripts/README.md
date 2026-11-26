# Scripts

This directory contains utility scripts used in the awesome-android-root project.

## optimize-assets.sh

Optimizes the static assets in `docs/public`: the Open Graph cards in
`docs/public/images/og/` through a 64-colour requantization plus lossless
`oxipng`, and the remaining PNGs through `oxipng` only. SVGs are not touched -
they are committed already optimized. File names, formats and dimensions never
change, so Open Graph and favicon consumers keep working. Run it after adding or
replacing an image, then commit the result; it is idempotent.

Requires ImageMagick (`convert`) and Bun (`bunx`).

### Usage

```bash
bash scripts/optimize-assets.sh
```

## app-entries.ts

Lints and indexes the entries of the Apps & Modules category pages
(`docs/apps-and-modules/*.md`) with a single parse pass.

The lint pass checks each line against the entry format documented in
`docs/contributing.md` and the PR template and reports every `file:line`
problem; it never rewrites or reorders entries. Checks cover the entry format,
the `FOSS`/`Proprietary` and framework badges, store icon links, duplicate URLs,
and the recommended-first then alphabetical ordering inside each section.

The index pass exports every entry to `docs/public/app-index.json`. The file is
committed for other tools, which fetch it via raw.githubusercontent.com; CI drops
it from the deploy bundle, so it is no longer published at `/app-index.json`.
Each record carries the entry name (`n`), its primary
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

The default generation command reports lint findings without failing.
`bun run lint:entries` passes `--check` and exits nonzero on errors; CI runs it
as a blocking check. Warnings remain informational.

### Usage

```bash
bun scripts/app-entries.ts   # lint + write docs/public/app-index.json, docs/count.md and docs/public/count.json
```

It is also exposed as `bun run index:build` and runs inside `docs:build`.

## prepare-build.ts

Fetches full git history when `.git/shallow` is present, because VitePress needs
it to compute `lastUpdated`. A failed fetch only logs a warning; the build still
proceeds with the history available. Run through `docs:build`, which calls it
before regenerating the index.

## check-links.ts

Validates internal Markdown links, images and anchors with VitePress's actual
Markdown token stream. Site builds, link checks and search records share
`docs/.vitepress/markdown/index.ts`, including heading levels, explicit IDs and
entry anchors; there is no copied slugification algorithm to keep synchronized.

Reference links, encoded paths/fragments, query strings, clean `.html` routes,
index pages and `SITE_BASE` are supported. Fenced/inline code, frontmatter and
external URLs are skipped. Real public asset files are checked, including missing
`/images/` assets that the old checker silently accepted. Target pages are parsed
once and cached; errors include source file/line and exit nonzero. No built site,
network or Python installation is required.

### Usage

```bash
bun run check:links
```

## TypeScript and validation

Use the pinned Bun version in `.bun-version` and Node version in `.nvmrc`, then
run `bun install`. The repository intentionally does not track `bun.lock`.

```bash
bun run typecheck       # strict Vue/browser, Bun/build tools and worker checks
bun run test            # focused icon, link, Markdown, MCP and search unit tests
bun run lint            # internal links and entry lint (blocking on errors)
bun run docs:build      # generate counts, render VitePress, then index Pagefind
bunx playwright install chromium  # once; CI also installs system dependencies
bun run test:search     # real Pagefind API, desktop/mobile modal and MCP tests
bun run check           # all of the above checks, including build/browser tests
```

There is no separate ESLint or formatting configuration. Keep existing style and
use `git diff --check`. All custom JS has been evaluated and migrated: recursive
config/icon transforms, Markdown renderers, entry/build scripts, Vue components
and the Cloudflare middleware now have checked TypeScript contracts. The small
Vue components only gained typed script blocks/props, not rewrites. The separate
traffic-publication Python utility and Bash asset tool remain in their original
languages; the site/link validation pipeline uses Bun. Browser DOM types, Bun/Node tools
and worker globals have separate tsconfigs; shared entry types have no runtime
dependencies. `skipLibCheck` skips dependency declarations, not custom code.
Lucide's undeclared per-icon `__iconData` exports have a narrow ambient contract
using its official `LucideIconData` type, not an untyped module shim.

## Pagefind search

`docs/.vitepress/config.ts` invokes `scripts/search-index.ts` from VitePress's
`buildEnd` hook, after all HTML is rendered. This uses Pagefind's official Node
API directly. The community plugin supports VitePress 2 alpha; the reasons for
not adopting it here are its current integration/loading model and our entry/MCP
requirements, not a claim of incompatibility. See
[the source-reviewed pros and cons](PAGEFIND-DECISION.md).
The index is written to the ignored `docs/.vitepress/dist/pagefind/` directory.
Deploy the entire build output, including this directory, on any static host.
Do not run a separate search server or commit generated search files.

For local search, use a production preview:

```bash
bun run docs:build
bun run docs:preview
```

`docs:dev` supports theme/content editing but does not generate or serve an index.
Its search error message links the workflow above. After editing entries,
rebuild before testing search. A failed index request shows an accessible error
with a Retry button that resets Pagefind's failed module/worker state.

### Indexing and ranking

- Only `.vp-doc` content is indexed. Navigation, sidebar, footer, Markdown action
  buttons, SVGs, store badges and heading permalinks are excluded.
- `search: false` frontmatter, the landing layout and 404 are excluded.
- Each app/module gets one synthetic HTML record with a stable anchor in its
  existing category page. The Markdown plugin adds anchors without changing any
  Markdown files or existing heading URLs, and excludes those list items from
  the category's index to avoid duplicate descriptions.
- App names use Pagefind's default h1 weight (7). Category, section, verified
  framework tags and repository/developer terms use weight 0.5. Descriptions
  retain normal weight. There is no blanket boost for every directory page.
- Aliases come automatically from existing names/descriptions and GitHub/GitLab
  owner/repository names, including split CamelCase and hyphens. Maintain those
  source fields; there is no second manually synchronized alias database.
- English stemming and prefix matching remain enabled; `+` and `#` are kept for
  technical terms such as C++. In the first 12 Pagefind candidates, the client
  promotes exact titles, then focused title prefixes, leaving other ordering
  intact. This avoids arbitrarily inflating index weights for exact names.
- Pagefind is not edit-distance fuzzy search. Its inverse-prefix fallback handles
  some typos (for example `AdAwayy`), but a missing/internal letter can give broad
  matches. Use another spelling or quoted exact terms to narrow those results.

The themed native-dialog UI and Pagefind engine/metadata lazy-load on opening.
Index chunks and fragments load only for nonempty queries. Only the top 12 result fragments are fetched, not the whole
corpus. Queries are debounced, stale responses ignored and failed imports retried
with a fresh module URL only on failure. The same lazy Pagefind instance powers
WebMCP `search_site`; other MCP tools retain on-demand Markdown page retrieval.
Search's `/` and Ctrl/Cmd+K shortcuts, arrow/Enter selection, Escape, reset,
focus restoration, mobile layout and both color schemes remain supported.

### Subpath deployments

Set `SITE_BASE` to a leading/trailing-slash path at build and preview time:

```bash
SITE_BASE=/android-root/ bun run docs:build
SITE_BASE=/android-root/ bun run docs:preview
# In a separate terminal:
SITE_BASE=/android-root/ bun run test:search
```

Pagefind imports use VitePress's base; its `baseUrl` prefixes clean result URLs.
No browser code calls a search backend. If requests 404 after deployment, check
that the base matches hosting and that `/BASE/pagefind/` was uploaded. Search
requires fetching its index, so an uncached index is unavailable offline; normal
site navigation still works. The existing image-only PWA precache is unchanged.

`test:search` starts its own preview on port 4173. An installed Chromium is
required; `CHROMIUM_PATH` can point to a system-compatible binary in constrained
environments.

### Which tests cover search?

- `scripts/search.test.ts`: exact/prefix ranking and deterministic out-of-order
  search/fragment completion and cancellation. Run `bun test scripts/search.test.ts`.
- `tests/search.spec.ts`: the real generated Pagefind API, realistic queries,
  keyboard/focus/reset/no-results behavior, entry navigation, mobile/dark mode,
  module/fragment failure recovery and MCP integration. Run `bun run test:search`.

The one-time gzip-fragment inspector (`test:index`) and corpus-size audit were
removed. Build-time Pagefind errors and duplicate entry IDs already fail the
build; the source link checker validates the shared anchor pipeline. Broad
mechanical-migration smoke tests and a redundant browser race scenario were
removed rather than maintained alongside focused regression tests.

### Version policy

Dependencies use the latest compatible stable releases; VitePress intentionally
stays on its newest alpha (`2.0.0-alpha.21`). Vue and Vite are declared directly
because custom code imports them rather than depending on transitive hoisting.
The standalone Markdown-it runtime dependency was removed: use the shared
VitePress renderer instead of introducing Markdown-it 15 beside VitePress's 14.x
pipeline. Its latest 14.x type declarations are retained for token/plugin types.

TypeScript 6.0.3 is the current compatibility exception: stable 7.0.2 was tested,
but latest vue-tsc 3.3.14 fails with `ERR_PACKAGE_PATH_NOT_EXPORTED` for
`typescript/lib/tsc`. Keep the newest compatible 6.0 patch until vue-tsc supports
TypeScript 7; do not bypass typechecking to upgrade. Bun 1.4.5 and Node 26 remain
on stable releases. GitHub Actions are pinned to verified stable release tags.
