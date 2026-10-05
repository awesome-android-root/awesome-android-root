/**
 * Search configuration for Awesome Android Root.
 *
 * Primary provider: Algolia DocSearch (Algolia for Open Source plan), using
 * VitePress' built-in `provider: 'algolia'` integration.
 *
 * Credentials are read from the build environment so that no key is committed
 * to the repository and so that only a *Search-Only* key can ever reach the
 * browser:
 *
 *   ALGOLIA_APP_ID          Algolia Application ID            (public)
 *   ALGOLIA_SEARCH_API_KEY  Algolia Search-Only API key       (public)
 *   ALGOLIA_INDEX_NAME      Index name, defaults to `awesome-android-root`
 *
 * Never set the Admin API key here: VitePress inlines these values into the
 * client bundle. See `docs/.vitepress/algolia/README.md` for the full setup
 * (crawler configuration, index settings, re-indexing).
 *
 * Fallback: when the credentials are absent (local `docs:dev`, forks, preview
 * builds without secrets) the site falls back to the previous MiniSearch-based
 * local provider so that search keeps working everywhere. The fallback keeps
 * the original ranking behaviour; its Algolia equivalent lives in the crawler
 * configuration (`customRanking` + `pageRank`).
 */

const DEFAULT_INDEX_NAME = 'awesome-android-root'

/** Shared wording so both providers present the same UI copy. */
const BUTTON_TEXT = 'Search'
const PLACEHOLDER = 'Search apps, modules and guides'

function algoliaSearch({ appId, apiKey, indexName }) {
  return {
    provider: 'algolia',
    options: {
      appId,
      apiKey,
      indexName,
      placeholder: PLACEHOLDER,
      // Conventional keyword search only - Ask AI is deliberately not enabled.
      translations: {
        button: {
          buttonText: BUTTON_TEXT,
          buttonAriaLabel: BUTTON_TEXT
        },
        modal: {
          searchBox: {
            placeholderText: PLACEHOLDER,
            clearButtonTitle: 'Clear the query',
            closeButtonText: 'Close'
          },
          noResultsScreen: {
            noResultsText: 'No results for'
          },
          footer: {
            // Algolia for Open Source attribution. The logo itself is rendered
            // by DocSearch; `theme/algoliaAttribution.js` points it at the
            // required AOS referral URL.
            poweredByText: 'Search by',
            selectText: 'to select',
            navigateText: 'to navigate',
            closeText: 'to close'
          }
        }
      }
    }
  }
}

function localSearch() {
  return {
    provider: 'local',
    options: {
      detailedView: true,
      miniSearch: {
        searchOptions: {
          fuzzy: 0.2,
          prefix: true,
          boost: {
            title: 4,
            text: 2,
            titles: 3
          },
          boostDocument: (documentId) => {
            // Boost app and module pages in search results.
            if (documentId.includes('apps-and-modules')) return 10
            return 1
          }
        }
      },
      async _render(src, env, md) {
        const html = await md.renderAsync(src, env)
        if (env.frontmatter?.search === false) return ''
        return html
      },
      translations: {
        button: {
          buttonText: BUTTON_TEXT,
          buttonAriaLabel: BUTTON_TEXT
        },
        modal: {
          displayDetails: 'Display detailed list',
          resetButtonTitle: 'Reset search',
          backButtonTitle: 'Close search',
          noResultsText: 'No results for',
          footer: {
            selectText: 'to select',
            navigateText: 'to navigate',
            closeText: 'to close'
          }
        }
      }
    }
  }
}

export function resolveSearchConfig(env = process.env) {
  const appId = env.ALGOLIA_APP_ID?.trim()
  const apiKey = env.ALGOLIA_SEARCH_API_KEY?.trim()
  const indexName = env.ALGOLIA_INDEX_NAME?.trim() || DEFAULT_INDEX_NAME

  if (appId && apiKey) {
    return algoliaSearch({ appId, apiKey, indexName })
  }

  console.warn(
    '[aar] ALGOLIA_APP_ID / ALGOLIA_SEARCH_API_KEY are not set - building with the local search index.'
  )
  return localSearch()
}
