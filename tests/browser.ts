import { chromium } from '@playwright/test'
import type { Browser } from '@playwright/test'

const base = process.env.SITE_BASE || '/'
export const baseURL = `http://127.0.0.1:4173${base}`

/** Bun owns the lifecycle; Playwright is only the browser driver/assertions. */
export async function startBrowser() {
  // Never silently reuse a stale preview: it may have a different build/base.
  const occupied = await fetch(baseURL).then(() => true, () => false)
  if (occupied) throw new Error('Browser test port 4173 is already in use; stop that preview first')
  const server = Bun.spawn(['bun', 'run', 'docs:preview', '--host', '0.0.0.0', '--port', '4173'], {
    stdout: 'ignore', stderr: 'pipe'
  })
  const serverLog = new Response(server.stderr).text()
  let browser: Browser | undefined
  async function stop() {
    try { await browser?.close() }
    finally {
      server.kill()
      await server.exited
    }
  }
  try {
    const deadline = Date.now() + 20_000
    while (true) {
      if (server.exitCode !== null) throw new Error(`Preview exited: ${await serverLog}`)
      if (await fetch(baseURL).then((response) => response.ok, () => false)) break
      if (Date.now() > deadline) throw new Error(`Preview did not start at ${baseURL}`)
      await Bun.sleep(100)
    }
    browser = await chromium.launch(process.env.CHROMIUM_PATH ? {
      executablePath: process.env.CHROMIUM_PATH,
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']
    } : {})
    return { browser, stop }
  } catch (error) {
    await stop()
    throw error
  }
}
