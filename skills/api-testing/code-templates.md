# Code Templates

Ready-to-use code templates for your API tests.

## Template 1: Basic Test File

```typescript
// tests/api/basic.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Basic API Tests', () => {
  test('GET - fetch all resources', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users');
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
  });

  test('POST - create resource', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        title: 'Test Title',
        body: 'Test Body',
        userId: 1,
      },
    });
    expect(response.status()).toBe(201);
    const data = await response.json();
    expect(data.id).toBeDefined();
  });
});
```

## Template 2: Using API Fixtures

```typescript
// tests/api/users.spec.ts
import { apiTest } from '../../src/fixtures/api.fixture';

apiTest.describe('User API', () => {
  apiTest('get all users', async ({ api }) => {
    const response = await api.get('/users');
    expect(response.status()).toBe(200);
    const users = await response.json();
    expect(users.length).toBeGreaterThan(0);
  });

  apiTest('create user', async ({ api }) => {
    const response = await api.post('/users', {
      name: 'John Doe',
      email: 'john@example.com',
    });
    expect(response.status()).toBe(201);
  });
});
```

## Template 3: CRUD Test Suite

```typescript
// tests/api/crud.spec.ts
import { apiTest } from '../../src/fixtures/api.fixture';

let userId: number;

apiTest.describe.serial('User CRUD', () => {
  apiTest('create user', async ({ api }) => {
    const response = await api.post('/users', {
      name: 'Test User',
      email: 'test@example.com',
    });
    expect(response.status()).toBe(201);
    const user = await response.json();
    userId = user.id;
  });

  apiTest('get user', async ({ api }) => {
    const response = await api.get(`/users/${userId}`);
    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user.name).toBe('Test User');
  });

  apiTest('update user', async ({ api }) => {
    const response = await api.patch(`/users/${userId}`, {
      name: 'Updated Name',
    });
    expect(response.status()).toBe(200);
  });

  apiTest('delete user', async ({ api }) => {
    const response = await api.delete(`/users/${userId}`);
    expect(response.status()).toBe(204);
  });
});
```

## Template 4: Authentication Tests

```typescript
// tests/api/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication API', () => {
  test('login success', async ({ request }) => {
    const response = await request.post('https://dummyjson.com/auth/login', {
      data: {
        username: 'kminchelle',
        password: '0lelplR',
      },
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.accessToken).toBeDefined();
  });

  test('login invalid credentials', async ({ request }) => {
    const response = await request.post('https://dummyjson.com/auth/login', {
      data: {
        username: 'invalid',
        password: 'wrong',
      },
    });
    expect(response.status()).toBe(400);
  });

  test('access protected route', async ({ request }) => {
    const loginResponse = await request.post('https://dummyjson.com/auth/login', {
      data: { username: 'kminchelle', password: '0lelplR' },
    });
    const { accessToken } = await loginResponse.json();

    const protectedResponse = await request.get('https://dummyjson.com/auth/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    expect(protectedResponse.status()).toBe(200);
  });
});
```

## Template 5: Data-Driven Tests

```typescript
// tests/api/data-driven.spec.ts
import { test, expect } from '@playwright/test';

const testCases = [
  { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz' },
  { id: 2, name: 'Ervin Howell', email: 'Shanna@melissa.tv' },
  { id: 3, name: 'Clementine Bauch', email: 'Nathan@yesenia.net' },
];

testCases.forEach(({ id, name, email }) => {
  test(`get user ${id}`, async ({ request }) => {
    const response = await request.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user.name).toBe(name);
    expect(user.email).toBe(email);
  });
});
```

## Template 6: Test Data Factory

```typescript
// src/utils/test-data.factory.ts
export function createUser(overrides = {}) {
  return {
    name: 'Test User',
    email: 'test@example.com',
    ...overrides,
  };
}

export function createPost(overrides = {}) {
  return {
    title: 'Test Post',
    body: 'Post content',
    userId: 1,
    ...overrides,
  };
}

export function generateRandomEmail() {
  return `user${Date.now()}@example.com`;
}
```

---

## Best Practices

1. **Use fixtures** for consistent test setup
2. **Group related tests** with `test.describe`
3. **Use descriptive test names** (`GET /users returns 200`)
4. **Keep tests isolated** - each test should be independent
5. **Store test data** outside test files
6. **Use environment variables** for sensitive data