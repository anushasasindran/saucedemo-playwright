import { test, expect } from '../../src/fixtures';

test.describe('Mobile Login', { tag: '@mobile' }, () => {
  test('login works on mobile viewport', async ({
    loginPage,
    inventoryPage,
    users,
  }) => {
    await loginPage.navigate('/');
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.waitForPageLoad();
    const count = await inventoryPage.getProductCount();
    expect(count).toBe(6);
  });

  test('error message displays correctly on small screen', async ({
    loginPage,
    users,
  }) => {
    await loginPage.navigate('/');
    await loginPage.login(users.invalid.username, users.invalid.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username and password do not match');
  });

  test('locked out user sees error on mobile', async ({
    loginPage,
    users,
  }) => {
    await loginPage.navigate('/');
    await loginPage.login(users.locked.username, users.locked.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('locked out');
  });
});
