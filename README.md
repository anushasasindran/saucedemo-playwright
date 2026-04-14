# SauceDemo Playwright Framework

A production-grade Playwright test automation framework built with TypeScript OOP, Page Object Model, custom fixtures, and multi-device testing — targeting [SauceDemo](https://www.saucedemo.com).

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install --with-deps

# 3. Run all desktop tests on Chrome
npm run test:desktop

# 4. Open the HTML report
npm run report
```

## Project Structure

```
saucedemo-playwright/
├── src/
│   ├── pages/              # Page Object classes (BasePage + 6 pages)
│   ├── components/         # Reusable UI components (Header, Footer)
│   ├── fixtures/           # Custom Playwright fixtures
│   ├── helperBase/         # Shared base class with utilities
│   └── utils/              # Environment config, constants, global setup
├── tests/
│   ├── desktop/            # Desktop browser tests (login, inventory, cart, checkout)
│   ├── mobile/             # Mobile emulation tests (login, navigation, checkout)
│   └── visual/             # Visual regression tests (login, inventory, cart)
├── data/                   # External JSON test data (users, checkout, products)
├── playwright.config.ts    # Multi-project configuration
└── .github/workflows/      # CI/CD pipeline
```

## Available NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run test:desktop` | Run desktop tests on Chromium |
| `npm run test:desktop-headed` | Run desktop tests with visible browser |
| `npm run test:firefox` | Run on Firefox (headed) |
| `npm run test:webkit` | Run on WebKit/Safari (headed) |
| `npm run test:mobile-chrome` | Run mobile tests on Pixel 7 emulation |
| `npm run test:mobile-safari` | Run mobile tests on iPhone 14 emulation |
| `npm run test:visual` | Run visual regression tests |
| `npm run test:visual-update` | Update visual baseline screenshots |
| `npm run test:smoke` | Run tests tagged `@smoke` |
| `npm run test:regression` | Run tests tagged `@regression` |
| `npm run test:critical` | Run tests tagged `@critical` |
| `npm run test:all-parallel` | Run everything in parallel |
| `npm run report` | Open the HTML test report |

## Architecture Highlights

- **OOP with Abstract Base Class** — `BasePage` enforces `waitForPageLoad()` on every page object
- **Custom Fixtures** — Page objects and test data injected automatically via `test.extend()`
- **Environment Management** — `.env` files + `globalSetup.ts` + typed `ENV` class
- **Component Pattern** — Header/Footer extracted as composable components
- **Data-Driven** — All test data lives in `data/*.json`, never hardcoded in specs
- **Tag-Based Execution** — `@smoke`, `@regression`, `@critical`, `@mobile`, `@visual`
- **CI/CD Ready** — GitHub Actions workflow with matrix strategy for cross-browser testing

## Test Credentials

| User | Username | Password |
|------|----------|----------|
| Standard | `standard_user` | `secret_sauce` |
| Locked Out | `locked_out_user` | `secret_sauce` |
| Problem | `problem_user` | `secret_sauce` |
| Performance Glitch | `performance_glitch_user` | `secret_sauce` |
