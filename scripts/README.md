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

The default generation command (`bun run index:build`) reports lint findings
without failing and writes all three files. `bun run lint:entries` passes
`--check`, which writes nothing: it exits nonzero on lint errors or when the
committed `docs/public/app-index.json` differs from what the current entries
produce, so a PR that forgot to regenerate the index fails instead of being
fixed silently in the working tree. CI runs it as a blocking check before the
build. Warnings remain informational.

`/count` and `/count.json` stay published for maintainers and badges, but the
count page is not linked from the nav, sidebar or other pages, and is excluded
from the sitemap, `llms.txt`, `llms-full.txt`, the WebMCP page index and
Pagefind. Its HTML carries `noindex`.

### Usage

```bash
bun scripts/app-entries.ts           # lint + write docs/public/app-index.json, docs/count.md and docs/public/count.json
bun scripts/app-entries.ts --check   # lint + stale-index check, writes nothing
```

It is also exposed as `bun run index:build` and runs inside `docs:build`.

## page-index.ts

Runs from VitePress `buildEnd` and writes `page-index.json` to the build output:
one `{ title, route, markdown }` record per published page, where `route` is the
clean URL (`/`, `/rooting-guides/`, `/faqs`) and `markdown` the per-page copy
emitted by vitepress-plugin-llms (`/index.md`, `/rooting-guides.md`,
`/faqs.md`). The 404 page and the maintainer-only count page are left out. The
build fails if a listed page has no Markdown copy, since WebMCP `get_page` would
otherwise return an error.

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
bun run typecheck       # native Bun checks, separate runtime environments
bun run test            # unit tests in tests/unit (entries, icons, links, Markdown, MCP, middleware, page index, search, SEO)
bun run lint            # internal links and entry lint (blocking on errors)
bun run docs:build      # generate counts, render VitePress, then index Pagefind
bun run test:search     # two search smoke tests; uses installed Google Chrome
bun run check           # all of the above checks, including build/browser tests
```

There is no separate ESLint or formatting configuration. Keep existing style and
use `git diff --check`.

### Native Bun typechecking

All project/CI typechecks use **`bun check`**, not the standalone `tsc` command.
Bun 1.4.5 embeds TypeScript **7.0.2** semantics and standard-library types; verify
with `bun -p process.versions.typescript`. No direct `typescript` dependency is
needed: Bun includes the checker and standard-library declarations. Editors use
their own TypeScript installation, whose version can differ from Bun's; use the
reported version when investigating editor/CLI differences. There is no older
compiler/alias or `vue-tsc` fallback.

The command is `bun check --no-script -p tsconfig.<environment>.json`.
`--no-script` matters here: this repository already has a `check` package script
for the **full** validation pipeline. Without the flag, `bun check` would run
that script rather than the built-in checker, causing recursion from typecheck.
Keep `bun run check` for the full pipeline and `bun run typecheck` for types only.

`bun test --check` is useful for test-local checks, but not a replacement for all
four configurations: it only follows test files and their imports, which need
not cover every theme/config/build/worker source. We keep explicit whole-project
checks and do not run a redundant second checker through the test command.

The tsconfigs select environments, **not TypeScript versions**:

- `tsconfig.browser.json`: theme components/utilities, DOM and Vite client types.
- `tsconfig.tools.json`: build/config/Markdown scripts, Bun and Node types.
- `tsconfig.worker.json`: Cloudflare middleware, WebWorker types.
- `tsconfig.tests.json`: unit/browser-test harnesses, Bun and DOM types.

All use the same built-in Bun checker and shared strict configuration. `skipLibCheck`
skips dependency declarations, not custom code. No custom-code typechecks are
disabled. Lucide's undeclared per-icon `__iconData` exports have a narrow ambient
contract using its official `LucideIconData` type, not an untyped module shim.

### Vue render code and TypeScript 7

Stable vue-tsc 3.3.14 still depends on the removed legacy JavaScript compiler API;
changing an import path does not make it compatible with native TypeScript 7.
Rather than installing a second/older compiler or maintaining a compiler shim,
our ten custom Vue SFCs were ported to **Vue TSX render components**. This is still
Vue's `defineComponent`, refs, lifecycle, native dialog and Teleport, not React or
a new framework. Both setup logic **and rendered expressions/props/handlers** are
checked directly by TypeScript 7.

Vite's existing Oxc transform uses Vue's shipped automatic JSX runtime. There is
no extra JSX plugin/compiler dependency. `jsx: preserve` lets Bun check the render
code without emitting it; Vite performs the actual transform. In TSX, read/write
refs with `.value`, use `onClick`/`onInput` handlers and pass typed props normally.
CSS lives beside the component in namespaced stylesheets; search styles still
lazy-load with the dialog. Preserve those boundaries when adding selectors.
The third-party Markdown-actions SFC remains upstream code; its only published
prop (`showDownload`) has a narrow explicit declaration rather than a wildcard
SFC shim. VitePress's own vendor SFCs are still built normally.

The separate traffic-publication Python utility and Bash asset tool remain in
their original languages; site/link validation uses Bun.

### Bun tests, including browser tests

Both `bun run test` (unit tests) and `bun run test:search` use `bun:test` and
Bun's `expect`. Browser tests use `puppeteer-core` to drive **installed Google
Chrome**, or `CHROMIUM_PATH` for an explicit compatible binary. There is no
Playwright dependency, browser bundle/downloader or second test runner.
Unit tests live in `tests/unit/*.test.ts`; the browser smoke tests and their
harness are `tests/search.spec.ts` and `tests/browser.ts`. After building, plain
`bun test` runs both suites; `bunfig.toml` excludes local audit checkouts and
generated output from discovery.

`tests/browser.ts` starts a fresh production preview, waits for readiness, launches
the browser and closes both during teardown, including launch failures. Each test
gets an isolated browser context. Port 4173 must be free; an existing preview is
rejected rather than silently testing stale output. Tests are serial and use
Puppeteer's built-in locators/condition waits, not fixed sleeps or a new assertion
framework. The tradeoff is relying on installed Chrome rather than a driver-pinned
browser; a runner Chrome update may require a driver update.

### CI cost

The pre-trim hosted run spent 7s building the site, **26s installing Chromium**,
8s on browser tests, and 29s in a separate deployment job. The approximately
1m45s total was pipeline overhead, not a 1m45s VitePress build.

CI now uses the Ubuntu runner's existing Chrome, runs just the two search smoke
checks below and deploys the validated workspace directly. There is no browser
installation/apt step, artifact upload/download or second checkout/runtime/cache
setup for deployment. The named links check is retained; build/deployment waits
for it, and typechecks, unit tests, entry lint, build and smoke tests remain
blocking. Fork PRs still build/test without accessing deployment secrets. These
changes reduce orchestration work, not the amount of content being generated.

Hosted measurement for this cleanup (`71c8b7b`, run `45878710548`): first job
start through deployment/last-job completion fell from **101s to 48s (-52.5%)**.
The combined build/test/deploy job took 39s; the site build step took 5s and the
two browser smoke tests 3s. The separate named links job took 7s. These are one
observed run each, including the new dependency-cache save, not an SLA or
controlled VitePress performance benchmark. Compare with pre-trim run
`45876641490`; full job timestamps, not the sum of parallel jobs, define total.


## Pagefind search

`docs/.vitepress/config.ts` invokes `scripts/search-index.ts` from VitePress's
`buildEnd` hook, after all HTML is rendered. This uses Pagefind's official Node
API directly. The community plugin supports VitePress 2 alpha; the reasons for
not adopting it here are its current integration/loading model and our entry/MCP
requirements, not a claim of incompatibility. See
[the source-reviewed pros and cons](PAGEFIND-DECISION.md).
The index is written to the ignored `docs/.vitepress/dist/pagefind/` directory.
Every build verifies that all synthetic entry URLs match unique, rendered app
anchors and that those list items carry Pagefind's category-exclusion attribute.
Each rendered entry ID must be consumed exactly once by the shared entry parser.
Excluded category pages do not leak synthetic entries into search. Category
introductions/headings remain searchable; app lists are not indexed twice.

Output is written to `.pagefind-staging` and published as `pagefind/` only after
successful indexing and service cleanup. A failed build removes stale/staging
output rather than leaving a partial index. This uses cheap build-time invariants,
not another browser suite or private-fragment-format inspector.

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
WebMCP `search_site`. `list_pages` and `navigate_to_page` read the small
build-time `page-index.json` (titles, routes and Markdown paths, a few KB), and
`get_page` fetches only the requested page's Markdown copy. No tool downloads
`llms-full.txt`, which stays published for other consumers. `navigate_to_page`
goes to the canonical route from the index, so `/index.md` opens `/`, and the
404 and count pages are never listed or returned.
The WebMCP component loads only after mount when `document.modelContext` or
`navigator.modelContext` exposes `registerTool`. Unsupported browsers do not
fetch its module; supported browsers register all four tools without fetching
the page index or Pagefind until a tool needs them. Keep the Pagefind loader
shared with the search dialog to avoid duplicate engines/workers.
Ctrl/Cmd+K intentionally opens search even from an editable field; `/` does not
interrupt typing. Enter with no arrow selection opens the first result. Search's
shortcuts, arrow/Enter selection, Escape, reset,
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

`test:search` starts and stops its own preview on port 4173. Install Google Chrome
locally, or set `CHROMIUM_PATH=/absolute/path/to/chrome` for a compatible Chromium
binary. CI uses Google Chrome already provided by `ubuntu-latest`; it does not
download a browser.

### Which tests cover search?

- `tests/unit/search.test.ts`: exact/prefix ranking and deterministic out-of-order
  search/fragment completion and cancellation; late-import Retry isolation and
  active-instance destruction. Run `bun test tests/unit/search.test.ts`.
- `tests/search.spec.ts`: **two** production-output smoke tests. One exercises
  strict lazy loading, real Pagefind/WASM/index results, highlights, keyboard
  selection (including initial ArrowUp), IME Enter safety, entry navigation,
  Escape and focus restoration. It also checks the destination page's named
  Markdown-action buttons and keyboard disclosure/Escape behavior. The other
  blocks the engine request and verifies in-place Retry recovery. Both fail on page
  errors/Vue warnings. Run `bun run test:search`.

Removed the broad third-party relevance matrix, generic theme-controls journey,
mobile duplicate of entry navigation, separate browser MCP audit and fragment
retry duplicate. The owned ranking/race logic and MCP input/route validation stay
in cheap Bun unit tests. This is deliberately not automated certification of all
mobile/theme/MCP interactions; make targeted manual checks when changing those
areas.
The one-time gzip-fragment inspector (`test:index`) and corpus-size audit were
removed. Build-time Pagefind errors and duplicate entry IDs already fail the
build; the source link checker validates the shared anchor pipeline. Broad
mechanical-migration smoke tests and a redundant browser race scenario were
removed rather than maintained alongside focused regression tests.

### Accessibility maintenance

Search uses one option element per result, with input focus retained through
`aria-activedescendant`; options are not separate Tab stops or nested controls.
Keep its instructions associated with the input and its selection styling intact.
The theme switch's checked state means **dark theme is enabled**.

`patches/vitepress-plugin-llms@1.15.0.patch` is applied by `bun install` through
`patchedDependencies`. It adds names/state to the upstream icon buttons, Escape
and focus restoration to the disclosure, and makes closing content inert. It
also removes the closed panel immediately with reduced motion. The dependency
is pinned to that exact release so the patch cannot silently stop applying.
When upgrading, check upstream's fixes and remove or refresh the patch; do not
replace it with post-mount DOM mutations. Its existing UI/styles are preserved;
the theme adds a clipped-container-safe keyboard focus outline.

### Version policy

Dependencies use the latest compatible stable releases; VitePress intentionally
stays on its newest alpha (`2.0.0-alpha.21`). Vue and Vite are declared directly
because custom code imports them rather than depending on transitive hoisting.
The standalone Markdown-it runtime dependency was removed: use the shared
VitePress renderer instead of introducing Markdown-it 15 beside VitePress's 14.x
pipeline. Its latest 14.x type declarations are retained for token/plugin types.

Bun's TypeScript 7.0.2-compatible checker checks all custom code directly; the former 6.0.3/vue-tsc
compatibility exception was removed by the Vue TSX port described above. Bun
1.4.5 and Node 26 remain on stable releases. GitHub Actions use verified stable
release commit SHAs with version comments.
