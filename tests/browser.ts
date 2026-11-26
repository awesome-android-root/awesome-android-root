import { launch } from 'puppeteer-core'
import type { Browser } from 'puppeteer-core'

const base = process.env.SITE_BASE || '/'
export const baseURL = `http://127.0.0.1:4173${base}`

/** Use installed Chrome: no bundled browser, browser download or second runner. */
export async function startBrowser() {
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
    browser = await launch({
      ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : { channel: 'chrome' }),
      args: ['--no-sandbox', '--disable-dev-shm-usage']
    })
    return { browser, stop }
  } catch (error) {
    await stop()
    throw error
  }
}
