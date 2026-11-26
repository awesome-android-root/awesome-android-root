import { defineConfig } from '@playwright/test'

const base = process.env.SITE_BASE || '/'
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  use: {
    baseURL: `http://127.0.0.1:4173${base}`,
    browserName: 'chromium',
    launchOptions: process.env.CHROMIUM_PATH ? {
      executablePath: process.env.CHROMIUM_PATH,
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']
    } : {}
  },
  webServer: {
    command: 'bun run docs:preview --host 0.0.0.0 --port 4173',
    url: `http://127.0.0.1:4173${base}`,
    reuseExistingServer: !process.env.CI
  }
})
