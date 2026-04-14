import { test, expect } from '../../src/fixtures';

test.describe('Mobile Navigation', { tag: '@mobile' }, () => {
  test.beforeEach(async ({ loginPage, users, inventoryPage }) => {
    await loginPage.navigate('/');
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.waitForPageLoad();
  });

  test('can navigate to cart on mobile', async ({
    inventoryPage,
    cartPage,
    header,
  }) => {
    await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
    expect(await header.getCartCount()).toBe(1);
    await header.goToCart();
    await cartPage.waitForPageLoad();
  });

  test('can sort products on mobile', async ({ inventoryPage }) => {
    await inventoryPage.sortProducts('lohi');
    const prices = await inventoryPage.getProductPrices();
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
    }
  });

  test('hamburger menu logout works on mobile', async ({
    loginPage,
    header,
  }) => {
    await header.logout();
    await loginPage.waitForPageLoad();
    const isVisible = await loginPage.isLoginPageVisible();
    expect(isVisible).toBeTruthy();
  });
});
