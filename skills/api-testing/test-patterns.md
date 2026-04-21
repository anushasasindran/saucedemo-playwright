# Test Patterns

Standard patterns for common API testing scenarios.

## Pattern 1: CRUD Operations

### Create Resource

```typescript
apiTest('POST /users - create new user', async ({ api }) => {
  const payload = { name: 'John Doe', email: 'john@example.com' };
  const response = await api.post('/users', payload);
  expect(response.status()).toBe(201);
  const user = await response.json();
  expect(user).toHaveProperty('id');
  expect(user.name).toBe('John Doe');
});
```

### Read Resource

```typescript
apiTest('GET /users/:id - get user by ID', async ({ api }) => {
  const response = await api.get('/users/1');
  expect(response.status()).toBe(200);
  const user = await response.json();
  expect(user.id).toBe(1);
});
```

### Update Resource

```typescript
apiTest('PUT /users/:id - update user', async ({ api }) => {
  const payload = { name: 'Jane Doe' };
  const response = await api.put('/users/1', payload);
  expect(response.status()).toBe(200);
  const user = await response.json();
  expect(user.name).toBe('Jane Doe');
});
```

### Delete Resource

```typescript
apiTest('DELETE /users/:id - delete user', async ({ api }) => {
  const response = await api.delete('/users/1');
  expect(response.status()).toBe(204);
});
```

---

## Pattern 2: Authentication

### Login Flow

```typescript
apiTest('POST /auth/login - successful login', async ({ api }) => {
  const response = await api.post('/auth/login', {
    email: 'test@example.com',
    password: 'password123',
  });
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data).toHaveProperty('token');
});
```

### Protected Endpoint

```typescript
apiTest('GET /profile - with auth token', async ({ request }) => {
  const response = await request.get('/profile', {
    headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
  });
  expect(response.status()).toBe(200);
});
```

---

## Pattern 3: Validation

### Required Fields

```typescript
apiTest('POST /users - missing required fields', async ({ api }) => {
  const response = await api.post('/users', { name: 'John' });
  expect(response.status()).toBe(400);
  const error = await response.json();
  expect(error.message).toContain('email');
});
```

### Invalid Data Types

```typescript
apiTest('POST /users - invalid email format', async ({ api }) => {
  const response = await api.post('/users', { email: 'invalid' });
  expect(response.status()).toBe(422);
});
```

---

## Pattern 4: Pagination

```typescript
apiTest('GET /users - paginated list', async ({ api }) => {
  const response = await api.get('/users', { page: '1', limit: '10' });
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data.users).toHaveLength(10);
  expect(data).toHaveProperty('pagination');
});
```

---

## Pattern 5: Error Handling

```typescript
apiTest('GET /users/:id - not found', async ({ api }) => {
  const response = await api.get('/users/99999');
  expect(response.status()).toBe(404);
  const error = await response.json();
  expect(error.code).toBe('USER_NOT_FOUND');
});
```

---

## Next Steps

- [Code Templates](code-templates.md) - Copy-paste ready-to-use examples