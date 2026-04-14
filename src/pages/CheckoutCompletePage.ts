import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {
  private readonly title: Locator;
  private readonly completeHeader: Locator;
  private readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('[data-test="title"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async waitForPageLoad(): Promise<void> {
    await expect(this.title).toHaveText('Checkout: Complete!');
  }

  async getConfirmationMessage(): Promise<string> {
    return (await this.completeHeader.textContent()) ?? '';
  }

  async goBackHome(): Promise<void> {
    await this.backHomeButton.click();
  }
}
