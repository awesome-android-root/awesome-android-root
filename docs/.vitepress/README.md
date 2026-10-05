# VitePress configuration notes

Short rationale for the non-obvious parts of this directory. Keep it in sync
when the configuration changes.

| Path | Purpose |
| --- | --- |
| `config.mjs` | Site, SEO/JSON-LD, Vite, PWA, markdown and theme configuration. |
| `search.mjs` | Builds `themeConfig.search` (Algolia, with a local fallback). |
| `algolia/` | Crawler configuration and search setup documentation. |
| `markdown/storeLinkPlugin.mjs` | Turns F-Droid / Play Store badge links into `<StoreLink>`. |
| `theme/` | Custom theme: styles, back-to-top, offline toast, store links. |

## Why VitePress 2 alpha is pinned

`package.json` pins `vitepress` to the exact version `2.0.0-alpha.20` (the
current `next` release). This is deliberate, not an accident of `bun update`:

* `markdown.config` and `markdown/storeLinkPlugin.mjs` rely on VitePress 2's
  `markdown-it-async` rendering (`md.renderAsync`, stateless renderer rules for
  concurrent page rendering).
* `vite.oxc` and `vite.rolldownOptions` only exist because VitePress 2 builds
  on rolldown-vite. VitePress 1.6.4 is still on Vite 5.
* The Algolia integration targets DocSearch v4, which VitePress 2 ships;
  VitePress 1.6.4 ships DocSearch v3 with different option and translation
  names (`searchByText` instead of `footer.poweredByText`).

Moving to VitePress 1.6.4 would therefore mean rewriting the markdown plugin,
the build configuration and the search configuration, with no functional gain.
Pin the exact alpha, upgrade intentionally, and re-run `bun run docs:build`
plus a manual pass over the home page, Apps & Modules, Rooting Guides and the
search modal after any bump.

## System fonts instead of bundled Inter

The default theme self-hosts the Inter variable font (16 woff2 subsets, about
880 kB of build output) and makes VitePress emit a `<link rel="preload">` for
the latin subset on every page. `config.mjs` contains a ~10 line Vite plugin
(`aar-system-fonts`) that redirects the theme's `styles/fonts.css` import to
`theme/fonts.css`, which defines the same `--vp-font-family-base` variable with
a platform font stack.

If a future VitePress release moves that file, the plugin simply stops matching
and the bundled font returns - the build does not fail.

## Search

See `algolia/README.md`. In short: `ALGOLIA_APP_ID` +
`ALGOLIA_SEARCH_API_KEY` (Search-Only, public) enable Algolia DocSearch;
without them the build falls back to the local MiniSearch index so forks and
offline development keep working.

## PWA runtime caching

`generateSW` precaches images only. Runtime caching is split by how volatile
each origin is:

| Rule | Strategy | Why |
| --- | --- | --- |
| `/assets/*` | CacheFirst, 1 year | Content-hashed, immutable build output. |
| Site + GitHub content images | CacheFirst, 60 days | Stable URLs. |
| `avatars.githubusercontent.com` | StaleWhileRevalidate, 7 days | Users change avatars. |
| `img.shields.io` | StaleWhileRevalidate, 1 day | Badge values change on upstream releases. |

HTML documents are intentionally **not** runtime cached: the site is a
frequently updated catalog and serving stale pages would be worse than a
network fetch.
