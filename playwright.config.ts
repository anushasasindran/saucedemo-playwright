import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 4,
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  globalSetup: './src/utils/globalSetup.ts',
  projects: [
    // ── Desktop Browsers ──
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testDir: './tests/desktop',
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testDir: './tests/desktop',
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testDir: './tests/desktop',
    },
    // ── Mobile Devices ──
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] },
      testDir: './tests/mobile',
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 14'] },
      testDir: './tests/mobile',
    },
    // ── Visual Regression (single browser for consistency) ──
    {
      name: 'visual',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
      testDir: './tests/visual',
    },
  ],
});
