# HTTP Utilities

Create reusable API helper functions for consistent testing.

## Step 1: Create API Helpers

Create `src/utils/api-helpers.ts`:

```typescript
import { APIRequestContext } from '@playwright/test';

export class APIHelpers {
  constructor(private request: APIRequestContext) {}

  async get(endpoint: string, params?: Record<string, string>) {
    return await this.request.get(endpoint, { params });
  }

  async post(endpoint: string, data: object) {
    return await this.request.post(endpoint, { data });
  }

  async put(endpoint: string, data: object) {
    return await this.request.put(endpoint, { data });
  }

  async patch(endpoint: string, data: object) {
    return await this.request.patch(endpoint, { data });
  }

  async delete(endpoint: string) {
    return await this.request.delete(endpoint);
  }
}
```

## Step 2: Create Response Assertions

Create `src/utils/api-assertions.ts`:

```typescript
import { APIResponse } from '@playwright/test';

export async function assertStatus(response: APIResponse, expected: number) {
  expect(response.status()).toBe(expected);
}

export async function assertJSON(response: APIResponse, schema: object) {
  const data = await response.json();
  expect(data).toMatchObject(schema);
}

export async function assertHeader(response: APIResponse, name: string, value: string) {
  expect(response.headers()[name.toLowerCase()]).toBe(value);
}

export async function getJSON<T = unknown>(response: APIResponse): Promise<T> {
  return await response.json() as T;
}
```

## Step 3: Create Fixtures

Create `src/fixtures/api.fixture.ts`:

```typescript
import { test as base } from '@playwright/test';
import { APIHelpers } from '../utils/api-helpers';

export const apiTest = base.extend<{ api: APIHelpers }>({
  api: async ({ request }, use) => {
    const api = new APIHelpers(request);
    await use(api);
  },
});
```

## Usage

```typescript
import { apiTest } from '../../fixtures/api.fixture';
import { assertStatus, getJSON } from '../../utils/api-assertions';

apiTest('GET users', async ({ api }) => {
  const response = await api.get('/users');
  assertStatus(response, 200);
  const users = await getJSON<{ users: object[] }>(response);
  expect(users.users).toHaveLength(5);
});
```

---

## Next Steps

- [Test Patterns](test-patterns.md) - Common test scenarios
- [Code Templates](code-templates.md) - Copy-paste examples