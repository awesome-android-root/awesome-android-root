function acceptsMarkdown(request) {
  return (request.headers.get('Accept') ?? '').split(',').some((mediaRange) => {
    const [mediaType, ...parameters] = mediaRange.trim().toLowerCase().split(';')
    if (mediaType.trim() !== 'text/markdown') return false

    const qualityParameter = parameters.find((parameter) => parameter.trim().startsWith('q='))
    const quality = qualityParameter ? Number(qualityParameter.trim().slice(2)) : 1
    return Number.isFinite(quality) && quality > 0 && quality <= 1
  })
}

function markdownPath(pathname) {
  if (pathname === '/') return '/index.md'
  if (pathname.endsWith('/')) return `${pathname.slice(0, -1)}.md`
  if (pathname.endsWith('.html')) return `${pathname.slice(0, -5)}.md`
  if (/\.[^/]+$/.test(pathname)) return null
  return `${pathname}.md`
}

function addAcceptVary(headers) {
  const current = headers.get('Vary') ?? ''
  // Fast path: nothing to do when Accept (or wildcard) is already advertised.
  if (/(^|,)\s*accept\s*(,|$)/i.test(current) || /(^|,)\s*\*\s*(,|$)/.test(current)) {
    return
  }
  const varyValues = current.split(',').map((value) => value.trim()).filter(Boolean)
  varyValues.push('Accept')
  headers.set('Vary', varyValues.join(', '))
}

function responseWithAcceptVary(response) {
  const headers = new Headers(response.headers)
  addAcceptVary(headers)
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  })
}

const NOT_FOUND_BODY =
  '# Page not found\n\nThe requested page could not be found. Browse the [rooting guides](/rooting-guides/), [sitemap](/sitemap.xml), or [home page](/).\n'

const STRIPPED_HEADERS = [
  'Content-Encoding',
  'Content-Length',
  'Content-Range',
  'ETag',
  'Last-Modified',
  'Transfer-Encoding'
]

export async function onRequest(context) {
  const { request } = context
  const url = new URL(request.url)
  const path = markdownPath(url.pathname)

  if (!path || (request.method !== 'GET' && request.method !== 'HEAD')) {
    return context.next()
  }

  if (acceptsMarkdown(request)) {
    url.pathname = path
    const markdownResponse = await context.env.ASSETS.fetch(new Request(url, request))

    if (markdownResponse.status !== 404) {
      const headers = new Headers(markdownResponse.headers)
      headers.set('Content-Type', 'text/markdown; charset=utf-8')
      addAcceptVary(headers)
      return new Response(markdownResponse.body, {
        status: markdownResponse.status,
        statusText: markdownResponse.statusText,
        headers
      })
    }

    const headers = new Headers(markdownResponse.headers)
    headers.set('Content-Type', 'text/markdown; charset=utf-8')
    addAcceptVary(headers)
    for (const header of STRIPPED_HEADERS) {
      headers.delete(header)
    }

    const body = request.method === 'HEAD' ? null : NOT_FOUND_BODY
    return new Response(body, { status: 404, statusText: 'Not Found', headers })
  }

  return responseWithAcceptVary(await context.next())
}
