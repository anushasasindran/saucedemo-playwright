import { Page, Locator } from '@playwright/test';

export class HeaderComponent {
  private readonly page: Page;
  private readonly menuButton: Locator;
  private readonly cartLink: Locator;
  private readonly cartBadge: Locator;
  private readonly logoutLink: Locator;
  private readonly closeMenuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.closeMenuButton = page.getByRole('button', { name: 'Close Menu' });
  }

  async openMenu(): Promise<void> {
    await this.menuButton.click();
  }

  async closeMenu(): Promise<void> {
    await this.closeMenuButton.click();
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async getCartCount(): Promise<number> {
    const isVisible = await this.cartBadge.isVisible();
    if (!isVisible) return 0;
    const text = await this.cartBadge.textContent();
    return parseInt(text ?? '0', 10);
  }
}
