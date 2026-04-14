import { test, expect } from '../../src/fixtures';

test.describe('Inventory Page', { tag: '@regression' }, () => {
  test.beforeEach(async ({ loginPage, users, inventoryPage }) => {
    await loginPage.navigate('/');
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.waitForPageLoad();
  });

  test('displays 6 products', async ({ inventoryPage }) => {
    const count = await inventoryPage.getProductCount();
    expect(count).toBe(6);
  });

  test('sort products by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortProducts('lohi');
    const prices = await inventoryPage.getProductPrices();
    // Verify prices are in ascending order
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
    }
  });

  test('sort products by price high to low', async ({ inventoryPage }) => {
    await inventoryPage.sortProducts('hilo');
    const prices = await inventoryPage.getProductPrices();
    // Verify prices are in descending order
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i - 1]);
    }
  });

  test('sort products by name A to Z', async ({ inventoryPage }) => {
    await inventoryPage.sortProducts('az');
    const names = await inventoryPage.getProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('sort products by name Z to A', async ({ inventoryPage }) => {
    await inventoryPage.sortProducts('za');
    const names = await inventoryPage.getProductNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test('add and remove product from cart', async ({
    inventoryPage,
    header,
  }) => {
    await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
    expect(await header.getCartCount()).toBe(1);

    await inventoryPage.removeProductFromCartByName('Sauce Labs Backpack');
    expect(await header.getCartCount()).toBe(0);
  });

  test('add multiple products to cart', async ({
    inventoryPage,
    header,
  }) => {
    await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
    await inventoryPage.addProductToCartByName('Sauce Labs Bike Light');
    await inventoryPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');
    expect(await header.getCartCount()).toBe(3);
  });
});
