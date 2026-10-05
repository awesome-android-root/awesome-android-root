# Algolia search setup

Search on Awesome Android Root uses **Algolia DocSearch** through VitePress'
built-in `search.provider: 'algolia'` integration (Algolia for Open Source
plan). No custom search UI, no backend, no search API of our own.

Site code involved:

| File | Role |
| --- | --- |
| `.vitepress/search.mjs` | Builds the `themeConfig.search` object from environment variables. Falls back to the local MiniSearch provider when credentials are absent. |
| `.vitepress/theme/algoliaAttribution.js` | Points the DocSearch "Search by Algolia" footer logo at the Algolia for Open Source referral URL. |
| `.vitepress/algolia/crawler.config.js` | The crawler configuration (records, exclusions, ranking, index settings). |

## 1. Build environment variables

Set these in the hosting provider (Cloudflare Pages → Settings → Environment
variables) and in any local shell that should build with Algolia enabled:

```bash
ALGOLIA_APP_ID=<application id>            # public
ALGOLIA_SEARCH_API_KEY=<search-only key>   # public, read-only
ALGOLIA_INDEX_NAME=awesome-android-root    # optional, this is the default
```

Rules:

* `ALGOLIA_SEARCH_API_KEY` **must** be the *Search-Only API key*. VitePress
  inlines it into the client bundle, so it is public by design.
* Never put the Admin API key, a Write key, or the Crawler key in these
  variables or anywhere in the repository. The crawler authenticates in the
  Algolia dashboard only.
* If `ALGOLIA_APP_ID` or `ALGOLIA_SEARCH_API_KEY` is missing, the build prints
  a warning and ships the previous local search index instead, so forks and
  offline development keep a working search box.

## 2. Crawler

`crawler.config.js` mirrors the configuration used by the Algolia Crawler.
After editing it, paste the file into the crawler editor at
<https://crawler.algolia.com/> and save; use **Restart crawling** for a full
re-index. The crawler is also scheduled daily.

What gets indexed:

* Only the rendered article body (`main .vp-doc`): headings `h1`–`h4`,
  paragraphs, list items and table cells. Navigation, sidebar, "last updated"
  and pager links are outside that scope and are never indexed.
* `lvl0` (the section label in the result list) is derived from the URL and
  matches the site navigation: Apps & Modules, Rooting Guides, Tutorials,
  Help & FAQ, Resources.
* Ranking: each content area gets a `pageRank`, consumed by
  `customRanking: desc(weight.pageRank)`. Apps & Modules (10) rank above
  rooting guides (8), tutorials (6), help pages (5) and everything else (1).
  This preserves the intent of the old MiniSearch `boostDocument` rule, which
  boosted `apps-and-modules` pages 10x.
* Excluded: `llms.txt`, `llms-full.txt`, the generated `count` page, raw `.md`
  copies produced by `vitepress-plugin-llms`, `sitemap.xml`, `robots.txt`,
  `/assets/**` and `/images/**`. These are machine-oriented files and should
  not compete with human documentation.

### Language facet (important)

VitePress always queries DocSearch with `facetFilters: ['lang:<site lang>']`
(`en-US` here). Records therefore need a `lang` attribute, and `lang` must be
in `attributesForFaceting`. Both are handled by `crawler.config.js`; if search
ever returns zero results for every query, check these two settings first.

## 3. Attribution

The Algolia for Open Source plan requires visible attribution. DocSearch
renders a logo in the modal footer; the configuration customises it so that it
reads **"Search by Algolia"** (`translations.modal.footer.poweredByText`) and
links to:

```
https://www.algolia.com/?utm_medium=AOS-referral
```

The link is rewritten by `.vitepress/theme/algoliaAttribution.js` because
DocSearch hardcodes its own referral URL. Do not hide, remove or restyle the
footer logo.

Ask AI is deliberately **not** enabled: the goal is conventional, fast keyword
search.

## 4. Re-indexing checklist

1. Content changes are picked up by the daily scheduled crawl.
2. After a structural change (new section, renamed path, changed selectors),
   update `crawler.config.js`, sync it to the dashboard and run a full crawl.
3. Verify in the crawler UI that the record count is in the expected range
   (roughly 2,000-4,000 records for the current content) and that
   `maxLostRecordsPercentage` did not block publishing.
4. Spot-check the live search for: an app name, a module name, a device guide
   ("Pixel"), and an FAQ phrase.

## 5. Plan limits

The Algolia for Open Source plan grants 200k records/month, 200k search
requests/month and 2M indexing operations/month. A daily full crawl of ~45
pages stays well inside those limits; there is no need for more frequent
crawling.
