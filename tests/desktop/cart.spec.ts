import { test, expect } from '../../src/fixtures';

test.describe('Cart Page', { tag: '@regression' }, () => {
  test.beforeEach(async ({ loginPage, users, inventoryPage }) => {
    await loginPage.navigate('/');
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.waitForPageLoad();
  });

  test('added product appears in cart', async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.waitForPageLoad();

    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(1);

    const itemNames = await cartPage.getCartItemNames();
    expect(itemNames).toContain('Sauce Labs Backpack');
  });

  test('multiple products appear in cart', async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
    await inventoryPage.addProductToCartByName('Sauce Labs Onesie');
    await inventoryPage.goToCart();
    await cartPage.waitForPageLoad();

    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(2);

    const itemNames = await cartPage.getCartItemNames();
    expect(itemNames).toContain('Sauce Labs Backpack');
    expect(itemNames).toContain('Sauce Labs Onesie');
  });

  test('remove product from cart', async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
    await inventoryPage.addProductToCartByName('Sauce Labs Bike Light');
    await inventoryPage.goToCart();
    await cartPage.waitForPageLoad();

    await cartPage.removeItem('Sauce Labs Backpack');
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(1);

    const itemNames = await cartPage.getCartItemNames();
    expect(itemNames).not.toContain('Sauce Labs Backpack');
    expect(itemNames).toContain('Sauce Labs Bike Light');
  });

  test('continue shopping returns to inventory', async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.goToCart();
    await cartPage.waitForPageLoad();
    await cartPage.continueShopping();
    await inventoryPage.waitForPageLoad();
  });
});
