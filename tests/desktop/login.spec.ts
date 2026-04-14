import { test, expect } from '../../src/fixtures';

test.describe('Login Page', { tag: '@smoke' }, () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate('/');
  });

  test('successful login with standard user', async ({
    loginPage,
    inventoryPage,
    users,
  }) => {
    await test.step('Enter credentials and submit', async () => {
      await loginPage.login(users.standard.username, users.standard.password);
    });

    await test.step('Verify inventory page loads', async () => {
      await inventoryPage.waitForPageLoad();
      const count = await inventoryPage.getProductCount();
      expect(count).toBe(6);
    });
  });

  test('locked out user sees error', async ({ loginPage, users }) => {
    await loginPage.login(users.locked.username, users.locked.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('locked out');
  });

  test('invalid credentials show error', async ({ loginPage, users }) => {
    await loginPage.login(users.invalid.username, users.invalid.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username and password do not match');
  });

  test('login page is visible on load', async ({ loginPage }) => {
    const isVisible = await loginPage.isLoginPageVisible();
    expect(isVisible).toBeTruthy();
  });
});
