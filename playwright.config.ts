import { defineConfig, devices } from '@playwright/test'

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000'

export default defineConfig({
  globalSetup: './tests/e2e/global-setup.ts',
  testDir: './tests/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? [['html', { open: 'never' }], ['list']] : 'list',
  // First-compile of dev-mode routes can take 20+ s (Turbopack), so give the
  // tests plenty of headroom. After warmup most assertions complete in ms.
  timeout: 120_000,
  expect: { timeout: 15_000 },
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
    locale: 'ru-RU',
    actionTimeout: 30_000,
    navigationTimeout: 60_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // Mobile project runs UI tests only — HTTP smoke is browser-agnostic and
    // would just duplicate dev-compile cost for no extra coverage.
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'] },
      testIgnore: /smoke\.spec\.ts/,
    },
  ],
})
