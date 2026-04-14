import { test, expect } from '../../src/fixtures';

test.describe('Visual - Cart Page', { tag: '@visual' }, () => {
  test.beforeEach(async ({ loginPage, users, inventoryPage }) => {
    await loginPage.navigate('/');
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.waitForPageLoad();
  });

  test('cart with items looks correct', async ({
    inventoryPage,
    page,
  }) => {
    await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
    await inventoryPage.addProductToCartByName('Sauce Labs Bike Light');
    await inventoryPage.goToCart();

    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('cart-with-items.png', {
      maxDiffPixels: 100,
      mask: [page.locator('.footer')],
    });
  });

  test('empty cart looks correct', async ({ inventoryPage, page }) => {
    await inventoryPage.goToCart();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('cart-empty.png', {
      maxDiffPixels: 100,
      mask: [page.locator('.footer')],
    });
  });
});
