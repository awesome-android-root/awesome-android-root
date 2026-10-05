/**
 * Algolia Crawler configuration for Awesome Android Root.
 *
 * This file is the source of truth for what the site puts into Algolia. It is
 * NOT executed by the build: paste/sync it into the Algolia Crawler editor
 * (https://crawler.algolia.com/) for the `awesome-android-root` crawler.
 * Keeping it in the repository means index changes are reviewed like code.
 *
 * Credentials: the crawler's own API key lives in the Algolia dashboard and is
 * never stored here. Only the public Search-Only key reaches the browser, via
 * the ALGOLIA_* build environment variables (see ./README.md).
 *
 * Design notes
 * - Records come from the rendered pages, scoped to `main .vp-doc`, so nav,
 *   sidebar, breadcrumbs, "last updated" and pager links are never indexed.
 * - `lvl0` is derived from the URL and mirrors the site's own navigation
 *   taxonomy (Apps & Modules / Rooting Guides / Tutorials / Help / Resources).
 *   No new frontmatter or metadata system is introduced for search.
 * - Ranking replaces the old MiniSearch `boostDocument` rule (apps & modules
 *   x10): actions set `pageRank`, which DocSearch index settings consume via
 *   `customRanking: desc(weight.pageRank)`.
 * - Machine-oriented output (`llms.txt`, `llms-full.txt`, the generated
 *   `count` page, raw `.md` copies, `sitemap.xml`, hashed assets) is excluded,
 *   so it never competes with human documentation in the results.
 * - `lang` is required: VitePress always queries DocSearch with
 *   `facetFilters: ['lang:<site lang>']`. Records without a matching `lang`
 *   attribute return zero results.
 */

const SITE = 'https://awesome-android-root.zhoe.org'

/** Section label shown as the first line of a DocSearch result. */
const sectionFor = (pathname) => {
  if (pathname.startsWith('/apps-and-modules')) return 'Apps & Modules'
  if (pathname.startsWith('/rooting-guides')) return 'Rooting Guides'
  if (pathname.startsWith('/general-guides')) return 'Tutorials'
  if (/^\/(faqs|troubleshooting|non-root-alternatives)/.test(pathname)) return 'Help & FAQ'
  if (/^\/(resources|contributing|about|legal-disclaimer)/.test(pathname)) return 'Resources'
  return 'Awesome Android Root'
}

/** Shared DocSearch extraction rules for every action. */
const recordProps = {
  lvl0: {
    selectors: '',
    defaultValue: 'Documentation'
  },
  lvl1: 'main .vp-doc h1',
  lvl2: 'main .vp-doc h2',
  lvl3: 'main .vp-doc h3',
  lvl4: 'main .vp-doc h4',
  content: 'main .vp-doc p, main .vp-doc li, main .vp-doc td',
  // VitePress filters queries with `lang:<site lang>`; keep this in sync with
  // `lang` in .vitepress/config.mjs.
  lang: {
    selectors: '/html/@lang',
    defaultValue: 'en-US'
  }
}

const extractor = ({ $, helpers, url }) => {
  const section = sectionFor(new URL(url.href ?? url.toString()).pathname)

  return helpers.docsearch({
    recordProps: {
      ...recordProps,
      lvl0: { selectors: '', defaultValue: section }
    },
    indexHeadings: true,
    aggregateContent: true,
    recordVersion: 'v3'
  })
}

new Crawler({
  appId: 'ALGOLIA_APP_ID',
  apiKey: 'CRAWLER_API_KEY_FROM_DASHBOARD',
  indexPrefix: '',
  rateLimit: 8,
  maxDepth: 10,
  maxUrls: 1000,
  schedule: 'every 1 day at 4:00 am',
  renderJavaScript: false,
  startUrls: [`${SITE}/`],
  sitemaps: [`${SITE}/sitemap.xml`],
  discoveryPatterns: [`${SITE}/**`],
  exclusionPatterns: [
    `${SITE}/llms.txt`,
    `${SITE}/llms-full.txt`,
    `${SITE}/**/*.md`,
    `${SITE}/count`,
    `${SITE}/404`,
    `${SITE}/assets/**`,
    `${SITE}/images/**`,
    `${SITE}/sitemap.xml`,
    `${SITE}/robots.txt`,
    `${SITE}/.well-known/**`
  ],
  ignoreCanonicalTo: false,
  ignoreQueryParams: ['utm_*', 'fbclid', 'ref'],
  safetyChecks: {
    beforeIndexPublishing: {
      // The site has ~45 pages; a sudden large drop means a broken crawl.
      maxLostRecordsPercentage: 20
    }
  },

  /**
   * One action per content area so that ranking mirrors the previous local
   * search boosting: app/module pages first, then rooting guides, tutorials,
   * help pages and finally everything else.
   */
  actions: [
    {
      indexName: 'awesome-android-root',
      pathsToMatch: [`${SITE}/apps-and-modules/**`, `${SITE}/apps-and-modules`],
      pageRank: 10,
      recordExtractor: extractor
    },
    {
      indexName: 'awesome-android-root',
      pathsToMatch: [`${SITE}/rooting-guides/**`, `${SITE}/rooting-guides`],
      pageRank: 8,
      recordExtractor: extractor
    },
    {
      indexName: 'awesome-android-root',
      pathsToMatch: [`${SITE}/general-guides/**`, `${SITE}/general-guides`],
      pageRank: 6,
      recordExtractor: extractor
    },
    {
      indexName: 'awesome-android-root',
      pathsToMatch: [
        `${SITE}/faqs`,
        `${SITE}/troubleshooting`,
        `${SITE}/non-root-alternatives`,
        `${SITE}/resources`
      ],
      pageRank: 5,
      recordExtractor: extractor
    },
    {
      indexName: 'awesome-android-root',
      pathsToMatch: [`${SITE}/**`],
      pageRank: 1,
      recordExtractor: extractor
    }
  ],

  /**
   * Applied only when the index is created. Existing index settings are not
   * overwritten by the crawler, so change them in the dashboard afterwards.
   */
  initialIndexSettings: {
    'awesome-android-root': {
      attributesForFaceting: ['type', 'lang'],
      attributesToRetrieve: ['hierarchy', 'content', 'anchor', 'url', 'url_without_anchor', 'type'],
      attributesToHighlight: ['hierarchy', 'content'],
      attributesToSnippet: ['content:12'],
      camelCaseAttributes: ['hierarchy', 'content'],
      searchableAttributes: [
        'unordered(hierarchy.lvl0)',
        'unordered(hierarchy.lvl1)',
        'unordered(hierarchy.lvl2)',
        'unordered(hierarchy.lvl3)',
        'unordered(hierarchy.lvl4)',
        'content'
      ],
      distinct: true,
      attributeForDistinct: 'url',
      customRanking: ['desc(weight.pageRank)', 'desc(weight.level)', 'asc(weight.position)'],
      ranking: ['words', 'filters', 'typo', 'attribute', 'proximity', 'exact', 'custom'],
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
      highlightPostTag: '</span>',
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      allowTyposOnNumericTokens: false,
      minProximity: 1,
      ignorePlurals: true,
      advancedSyntax: true,
      attributeCriteriaComputedByMinProximity: true,
      removeWordsIfNoResults: 'allOptional',
      // Keep `root_management`, `init_boot`, `vendor_boot` searchable as words.
      separatorsToIndex: '_'
    }
  }
})
