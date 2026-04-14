import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutStepTwoPage extends BasePage {
  private readonly title: Locator;
  private readonly totalLabel: Locator;
  private readonly finishButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('[data-test="title"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async waitForPageLoad(): Promise<void> {
    await expect(this.title).toHaveText('Checkout: Overview');
  }

  async getTotalPrice(): Promise<string> {
    return (await this.totalLabel.textContent()) ?? '';
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }
}
