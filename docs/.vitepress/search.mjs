const DEFAULT_INDEX_NAME = 'AAR'

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
