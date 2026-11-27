import { expect, test } from 'bun:test'
import { onRequest } from '../../functions/_middleware.ts'

const ORIGIN = 'https://awesome-android-root.xyz'

/** Static files the Pages asset server would return, keyed by pathname. */
const FILES: Record<string, { body: string; type: string }> = {
  '/assets/style.abc123.css': { body: 'a{}', type: 'text/css' },
  '/faqs': { body: '<!doctype html><title>FAQ</title>', type: 'text/html; charset=utf-8' },
  '/faqs.md': { body: '# Android Rooting FAQ', type: 'text/markdown' }
}

function serve(request: Request) {
  const file = FILES[new URL(request.url).pathname]
  return file
    ? new Response(file.body, { headers: { 'Content-Type': file.type, ETag: '"x"' } })
    : new Response('missing', { status: 404, headers: { 'Content-Type': 'text/html' } })
}

function call(path: string, init: RequestInit = {}) {
  const request = new Request(`${ORIGIN}${path}`, init)
  return onRequest({
    request,
    env: { ASSETS: { fetch: async (assetRequest) => serve(assetRequest) } },
    next: async () => serve(request)
  })
}

test('hashed assets pass through without Vary: Accept', async () => {
  const response = await call('/assets/style.abc123.css', { headers: { Accept: 'text/markdown' } })
  expect(response.headers.get('Content-Type')).toBe('text/css')
  expect(response.headers.get('Vary')).toBeNull()
})

test('HTML pages advertise Vary: Accept because Markdown is negotiable there', async () => {
  const response = await call('/faqs', { headers: { Accept: 'text/html' } })
  expect(response.headers.get('Content-Type')).toContain('text/html')
  expect(response.headers.get('Vary')).toBe('Accept')
})

test('Accept: text/markdown returns the Markdown copy of a page', async () => {
  const response = await call('/faqs', { headers: { Accept: 'text/markdown' } })
  expect(response.status).toBe(200)
  expect(response.headers.get('Content-Type')).toBe('text/markdown; charset=utf-8')
  expect(response.headers.get('Vary')).toBe('Accept')
  expect(await response.text()).toBe('# Android Rooting FAQ')
})

test('Markdown requests for missing pages get a Markdown 404 without stale validators', async () => {
  const response = await call('/missing', { headers: { Accept: 'text/markdown;q=0.9, text/html' } })
  expect(response.status).toBe(404)
  expect(response.headers.get('Content-Type')).toBe('text/markdown; charset=utf-8')
  expect(response.headers.get('ETag')).toBeNull()
  expect(await response.text()).toStartWith('# Page not found')

  const head = await call('/missing', { method: 'HEAD', headers: { Accept: 'text/markdown' } })
  expect(head.status).toBe(404)
  expect(await head.text()).toBe('')
})

test('q=0 and non-GET requests do not negotiate Markdown', async () => {
  const refused = await call('/faqs', { headers: { Accept: 'text/markdown;q=0, text/html' } })
  expect(refused.headers.get('Content-Type')).toContain('text/html')

  const post = await call('/faqs', { method: 'POST', headers: { Accept: 'text/markdown' } })
  expect(post.headers.get('Content-Type')).toContain('text/html')
  expect(post.headers.get('Vary')).toBeNull()
})
