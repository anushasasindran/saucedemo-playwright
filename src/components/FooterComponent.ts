import { Page, Locator } from '@playwright/test';

export class FooterComponent {
  private readonly page: Page;
  private readonly footerText: Locator;
  private readonly twitterLink: Locator;
  private readonly facebookLink: Locator;
  private readonly linkedinLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.footerText = page.locator('[data-test="footer-copy"]');
    this.twitterLink = page.locator('[data-test="social-twitter"]');
    this.facebookLink = page.locator('[data-test="social-facebook"]');
    this.linkedinLink = page.locator('[data-test="social-linkedin"]');
  }

  async getFooterText(): Promise<string> {
    return (await this.footerText.textContent()) ?? '';
  }

  async clickTwitter(): Promise<void> {
    await this.twitterLink.click();
  }

  async clickFacebook(): Promise<void> {
    await this.facebookLink.click();
  }

  async clickLinkedIn(): Promise<void> {
    await this.linkedinLink.click();
  }
}
