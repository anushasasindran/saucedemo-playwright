import { test, expect } from '../../src/fixtures';

test.describe('Visual - Inventory Page', { tag: '@visual' }, () => {
  test.beforeEach(async ({ loginPage, users }) => {
    await loginPage.navigate('/');
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('product grid looks correct', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('inventory-grid.png', {
      maxDiffPixels: 100,
      mask: [page.locator('.footer')],
    });
  });

  test('individual product card looks correct', async ({ page }) => {
    const firstProduct = page.locator('[data-test="inventory-item"]').first();

    await expect(firstProduct).toHaveScreenshot('product-card.png', {
      maxDiffPixels: 50,
    });
  });
});
