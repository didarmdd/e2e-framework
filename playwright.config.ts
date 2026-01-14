import { defineConfig } from '@playwright/test';
import { env } from './src/env';

export default defineConfig({
  testDir: './src/tests',
  retries: process.env.CI ? 2 : 0,
  timeout: env.timeout,
  expect: { timeout: 5000 },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['allure-playwright', { outputFolder: 'reports/allure-results' }],
  ],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: env.headless,
  },
  projects: [
    {
      name: 'ui-chromium',
      testMatch: /.*(auth|dashboard).*\.test\.ts/,
      use: {
        baseURL: env.uiBaseUrl,
        browserName: 'chromium',
      },
    },
    {
      name: 'ui-firefox',
      testMatch: /.*(auth|dashboard).*\.test\.ts/,
      use: {
        baseURL: env.uiBaseUrl,
        browserName: 'firefox',
      },
    },
    {
      name: 'ui-webkit',
      testMatch: /.*(auth|dashboard).*\.test\.ts/,
      use: {
        baseURL: env.uiBaseUrl,
        browserName: 'webkit',
      },
    },
    {
      name: 'api',
      testMatch: /.*api.*\.test\.ts/,
      use: {
        baseURL: env.apiBaseUrl,
      },
    },
  ],
});
