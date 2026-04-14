import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Abstract method — every child MUST implement this
  abstract waitForPageLoad(): Promise<void>;

  // Shared navigation
  async navigate(path: string): Promise<void> {
    await this.page.goto(path);
    await this.waitForPageLoad();
  }

  // Shared utility: get current URL
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  // Shared utility: take a screenshot with a custom name
  async takeScreenshot(name: string): Promise<Buffer> {
    return await this.page.screenshot({
      path: `screenshots/${name}.png`,
      fullPage: true,
    });
  }

  // Shared utility: wait for network to settle
  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  // Shared utility: check if element is visible
  async isElementVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  // Shared utility: get page title
  async getTitle(): Promise<string> {
    return await this.page.title();
  }
}
