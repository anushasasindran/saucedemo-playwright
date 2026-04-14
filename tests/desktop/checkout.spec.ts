import { test, expect } from '../../src/fixtures';

test.describe('Checkout Flow', { tag: '@critical' }, () => {
  test.beforeEach(async ({ loginPage, users, inventoryPage }) => {
    await loginPage.navigate('/');
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.waitForPageLoad();
  });

  test('complete end-to-end purchase', async ({
    inventoryPage,
    cartPage,
    checkoutStepOne,
    checkoutStepTwo,
    checkoutComplete,
    checkout,
  }) => {
    await test.step('Add product to cart', async () => {
      await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
    });

    await test.step('Go to cart and proceed to checkout', async () => {
      await inventoryPage.goToCart();
      await cartPage.waitForPageLoad();
      expect(await cartPage.getCartItemCount()).toBe(1);
      await cartPage.proceedToCheckout();
    });

    await test.step('Fill shipping information', async () => {
      await checkoutStepOne.waitForPageLoad();
      const { firstName, lastName, postalCode } = checkout.validInfo;
      await checkoutStepOne.fillShippingInfo(firstName, lastName, postalCode);
      await checkoutStepOne.continue();
    });

    await test.step('Review and finish order', async () => {
      await checkoutStepTwo.waitForPageLoad();
      const total = await checkoutStepTwo.getTotalPrice();
      expect(total).toContain('$');
      await checkoutStepTwo.finishOrder();
    });

    await test.step('Verify order confirmation', async () => {
      await checkoutComplete.waitForPageLoad();
      const message = await checkoutComplete.getConfirmationMessage();
      expect(message).toContain('Thank you for your order');
    });
  });

  test('checkout fails without first name', async ({
    inventoryPage,
    cartPage,
    checkoutStepOne,
    checkout,
  }) => {
    await inventoryPage.addProductToCartByName('Sauce Labs Bike Light');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    const { firstName, lastName, postalCode } = checkout.missingFirstName;
    await checkoutStepOne.fillShippingInfo(firstName, lastName, postalCode);
    await checkoutStepOne.continue();

    const error = await checkoutStepOne.getErrorMessage();
    expect(error).toContain('First Name is required');
  });

  test('checkout fails without last name', async ({
    inventoryPage,
    cartPage,
    checkoutStepOne,
    checkout,
  }) => {
    await inventoryPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    const { firstName, lastName, postalCode } = checkout.missingLastName;
    await checkoutStepOne.fillShippingInfo(firstName, lastName, postalCode);
    await checkoutStepOne.continue();

    const error = await checkoutStepOne.getErrorMessage();
    expect(error).toContain('Last Name is required');
  });

  test('checkout fails without postal code', async ({
    inventoryPage,
    cartPage,
    checkoutStepOne,
    checkout,
  }) => {
    await inventoryPage.addProductToCartByName('Sauce Labs Onesie');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    const { firstName, lastName, postalCode } = checkout.missingPostalCode;
    await checkoutStepOne.fillShippingInfo(firstName, lastName, postalCode);
    await checkoutStepOne.continue();

    const error = await checkoutStepOne.getErrorMessage();
    expect(error).toContain('Postal Code is required');
  });

  test('user can return home after checkout', async ({
    inventoryPage,
    cartPage,
    checkoutStepOne,
    checkoutStepTwo,
    checkoutComplete,
    checkout,
  }) => {
    await inventoryPage.addProductToCartByName('Sauce Labs Fleece Jacket');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    const { firstName, lastName, postalCode } = checkout.validInfo;
    await checkoutStepOne.fillShippingInfo(firstName, lastName, postalCode);
    await checkoutStepOne.continue();

    await checkoutStepTwo.finishOrder();
    await checkoutComplete.waitForPageLoad();
    await checkoutComplete.goBackHome();
    await inventoryPage.waitForPageLoad();
  });
});
