import { expect, test } from 'bun:test'
import { onRequest } from '../../functions/_middleware.ts'

const FILES: Record<string, { body: string; type: string }> = {
  '/assets/style.abc123.css': { body: 'a{}', type: 'text/css' },
  '/faqs': { body: '<!doctype html>', type: 'text/html; charset=utf-8' },
  '/faqs.md': { body: '# Android Rooting FAQ', type: 'text/markdown' }
}

function serve(request: Request) {
  const file = FILES[new URL(request.url).pathname]
  return file
    ? new Response(file.body, { headers: { 'Content-Type': file.type, ETag: '"x"' } })
    : new Response('missing', { status: 404, headers: { 'Content-Type': 'text/html' } })
}

function call(path: string, accept: string, method = 'GET') {
  const request = new Request(`https://awesome-android-root.xyz${path}`, { method, headers: { Accept: accept } })
  return onRequest({ request, env: { ASSETS: { fetch: async (r) => serve(r) } }, next: async () => serve(request) })
}

test('Markdown negotiation: assets untouched, pages vary on Accept, Markdown served on request', async () => {
  const asset = await call('/assets/style.abc123.css', 'text/markdown')
  expect(asset.headers.get('Vary')).toBeNull()

  const html = await call('/faqs', 'text/html')
  expect(html.headers.get('Content-Type')).toContain('text/html')
  expect(html.headers.get('Vary')).toBe('Accept')

  const markdown = await call('/faqs', 'text/markdown')
  expect(markdown.headers.get('Content-Type')).toBe('text/markdown; charset=utf-8')
  expect(markdown.headers.get('Vary')).toBe('Accept')
  expect(await markdown.text()).toBe('# Android Rooting FAQ')

  expect((await call('/faqs', 'text/markdown;q=0, text/html')).headers.get('Content-Type')).toContain('text/html')
})

test('Markdown requests for missing pages get a Markdown 404 without stale validators', async () => {
  const response = await call('/missing', 'text/markdown')
  expect(response.status).toBe(404)
  expect(response.headers.get('Content-Type')).toBe('text/markdown; charset=utf-8')
  expect(response.headers.get('ETag')).toBeNull()
  expect(await response.text()).toStartWith('# Page not found')
  expect(await (await call('/missing', 'text/markdown', 'HEAD')).text()).toBe('')
})
