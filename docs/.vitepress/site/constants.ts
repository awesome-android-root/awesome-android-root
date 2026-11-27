/** Site identity and structured-data nodes shared by the SEO helpers. */
export type SchemaNode = { '@type': string; '@id': string; [key: string]: unknown }

export const SITE = 'https://awesome-android-root.xyz'
export const SITE_NAME = 'Awesome Android Root'
export const TWITTER_SITE = '@awsm_and_root'
export const DEFAULT_OG_IMAGE = '/images/og.png'

export const ORGANIZATION_ID = `${SITE}/#organization`
export const WEBSITE_ID = `${SITE}/#website`

export const ORGANIZATION_NODE = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  description: 'A community-curated resource for Android rooting guides, troubleshooting, and root apps and modules.',
  url: `${SITE}/`,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'general support',
      url: 'https://github.com/awesome-android-root/awesome-android-root/issues/new'
    },
    {
      '@type': 'ContactPoint',
      contactType: 'security reports',
      email: 'security@awesome-android-root.xyz',
      url: 'https://github.com/awesome-android-root/awesome-android-root/security/advisories/new'
    }
  ],
  logo: {
    '@type': 'ImageObject',
    url: `${SITE}/images/logo.png`,
    width: 330,
    height: 330
  },
  sameAs: [
    'https://github.com/awesome-android-root',
    'https://x.com/awsm_and_root'
  ]
}

export const WEBSITE_NODE = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE_NAME,
  url: `${SITE}/`,
  inLanguage: 'en-US',
  publisher: { '@id': ORGANIZATION_ID }
}

export const FOLDER_LABELS: Record<string, string> = {
  'rooting-guides': 'Rooting Guides',
  'apps-and-modules': 'Apps & Modules',
  'general-guides': 'Tutorials'
}
