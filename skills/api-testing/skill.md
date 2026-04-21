# Playwright API Testing Skill

A comprehensive guide for building REST API tests with Playwright.

## Overview

This skill provides workflows, patterns, and code templates for testing REST APIs using Playwright's built-in HTTP utilities.

### What You'll Learn

1. **Setup** - Configure your project for API testing
2. **HTTP Utilities** - Create reusable API helpers
3. **Test Patterns** - Standard patterns for common scenarios
4. **Code Templates** - Ready-to-use test examples

---

## Table of Contents

1. [Setup Guide](setup.md) - Project configuration and base setup
2. [HTTP Utilities](http-utilities.md) - Creating API helper functions
3. [Test Patterns](test-patterns.md) - Common test scenarios
4. [Code Templates](code-templates.md) - Copy-paste examples

---

## Quick Start

```typescript
import { test, expect } from '@playwright/test';

test('GET request example', async ({ request }) => {
  const response = await request.get('https://api.example.com/users');
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data).toHaveProperty('users');
});
```

---

## When to Use This Skill

- Building API test suites from scratch
- Adding API tests to existing Playwright project
- Standardizing API testing patterns across team
- Creating reusable API utilities

---

## Prerequisites

- Playwright v1.32+ installed
- TypeScript knowledge
- Basic REST API understanding