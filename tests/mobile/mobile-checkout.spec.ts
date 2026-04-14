import { test, expect } from '../../src/fixtures';

test.describe('Mobile Checkout', { tag: ['@mobile', '@critical'] }, () => {
  test('complete purchase on mobile device', async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutStepOne,
    checkoutStepTwo,
    checkoutComplete,
    users,
    checkout,
  }) => {
    await loginPage.navigate('/');
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.waitForPageLoad();

    await inventoryPage.addProductToCartByName('Sauce Labs Onesie');
    await inventoryPage.goToCart();

    await cartPage.waitForPageLoad();
    await cartPage.proceedToCheckout();

    const { firstName, lastName, postalCode } = checkout.validInfo;
    await checkoutStepOne.fillShippingInfo(firstName, lastName, postalCode);
    await checkoutStepOne.continue();

    await checkoutStepTwo.waitForPageLoad();
    await checkoutStepTwo.finishOrder();

    const message = await checkoutComplete.getConfirmationMessage();
    expect(message).toContain('Thank you for your order');
  });
});
