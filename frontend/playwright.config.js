import { defineConfig, devices } from '@playwright/test';

/**
 * E2E tests start the Vite dev server (see webServer).
 * API calls are not started here — tests focus on static routing and public pages.
 * For full-stack flows, run the backend and use VITE_API_BASE_URL in .env and optional MSW.
 *
 * Browsers: run `npm run test:e2e:install` after `npm install` (or set PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 to skip postinstall).
 *
 * Reports (after `npm run test:e2e`) are written under `playwright-report/`: HTML site, `results.json`, `junit.xml`.
 * Open the HTML report: `npm run test:e2e:report`.
 */
const reportDir = 'playwright-report';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ...(process.env.CI ? [['github']] : []),
    ['list'],
    [
      'html',
      {
        outputFolder: reportDir,
        open: process.env.CI ? 'never' : 'on-failure',
      },
    ],
    ['json', { outputFile: `${reportDir}/results.json` }],
    ['junit', { outputFile: `${reportDir}/junit.xml` }],
  ],
  timeout: 30_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:4173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
