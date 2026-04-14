import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { HeaderComponent } from '../components/HeaderComponent';
import { FooterComponent } from '../components/FooterComponent';
import userData from '../../data/users.json';
import checkoutData from '../../data/checkout.json';

// Define fixture types
type PageFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutStepOne: CheckoutStepOnePage;
  checkoutStepTwo: CheckoutStepTwoPage;
  checkoutComplete: CheckoutCompletePage;
  header: HeaderComponent;
  footer: FooterComponent;
  users: typeof userData;
  checkout: typeof checkoutData;
};

// Extend the base test with all fixtures
export const test = base.extend<PageFixtures>({
  // Page Object fixtures
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutStepOne: async ({ page }, use) => {
    await use(new CheckoutStepOnePage(page));
  },
  checkoutStepTwo: async ({ page }, use) => {
    await use(new CheckoutStepTwoPage(page));
  },
  checkoutComplete: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
  header: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
  footer: async ({ page }, use) => {
    await use(new FooterComponent(page));
  },

  // Data fixtures
  users: async ({}, use) => {
    await use(userData);
  },
  checkout: async ({}, use) => {
    await use(checkoutData);
  },
});

export { expect } from '@playwright/test';
