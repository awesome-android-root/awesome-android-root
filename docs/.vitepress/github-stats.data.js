/**
 * Build-time data loader for repository stats shown on the homepage.
 *
 * VitePress turns `*.data.js` files into a virtual module exporting `data`,
 * so the fetch happens during the build and never in the browser
 * (the CSP connect-src is 'self').
 */

const REPO = 'awesome-android-root/awesome-android-root'
const API = `https://api.github.com/repos/${REPO}`

/** 4783 -> "4,700+", 5001 -> "5,000+" */
function formatStars(count) {
  const rounded = Math.floor(count / 100) * 100
  return `${rounded.toLocaleString('en-US')}+`
}

export default {
  async load() {
    try {
      const response = await fetch(API, {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'awesome-android-root-docs-build',
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {})
        },
        signal: AbortSignal.timeout(10_000)
      })
      if (!response.ok) throw new Error(`GitHub API responded ${response.status}`)
      const repo = await response.json()
      if (typeof repo.stargazers_count !== 'number') throw new Error('no stargazers_count')
      return { stars: repo.stargazers_count, starsLabel: formatStars(repo.stargazers_count) }
    } catch (error) {
      // No stale number: the homepage hides the count when the fetch fails.
      console.warn(`[github-stats] ${error.message}, omitting star count`)
      return { stars: null, starsLabel: '' }
    }
  }
}