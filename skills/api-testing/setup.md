# Setup Guide

Configure your Playwright project for API testing.

## Step 1: Install Dependencies

```bash
npm install @playwright/test --save-dev
npm install dotenv --save
```

## Step 2: Create Environment Configuration

Create a `.env` file in the project root:

```
# .env
API_BASE_URL=https://api.example.com
API_KEY=your-api-key
```

## Step 3: Configure Playwright

Update your `playwright.config.ts`:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: process.env.API_BASE_URL,
    extraHTTPHeaders: {
      'Authorization': `Bearer ${process.env.API_KEY}`,
      'Content-Type': 'application/json',
    },
  },
});
```

## Step 4: Create Test Directories

```bash
mkdir -p tests/api
mkdir -p src/utils
```

## Step 5: Create Base Client

Create `src/utils/api-client.ts`:

```typescript
import { test, APIRequestContext } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export async function createAPIRequest(): Promise<APIRequestContext> {
  const baseURL = process.env.API_BASE_URL || 'http://localhost:3000';
  
  return await request.newContext({
    baseURL,
    extraHTTPHeaders: {
      'Authorization': `Bearer ${process.env.API_KEY}`,
      'Content-Type': 'application/json',
    },
  });
}
```

## Step 6: Run a Test

```bash
npx playwright test tests/api/health.spec.ts
```

---

## Next Steps

- [HTTP Utilities](http-utilities.md) - Create API helper functions
- [Test Patterns](test-patterns.md) - Common test scenarios
- [Code Templates](code-templates.md) - Copy-paste examples