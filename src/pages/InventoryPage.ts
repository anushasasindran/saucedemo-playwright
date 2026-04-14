import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  private readonly title: Locator;
  private readonly inventoryItems: Locator;
  private readonly sortDropdown: Locator;
  private readonly cartBadge: Locator;
  private readonly cartLink: Locator;
  private readonly menuButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
  }

  async waitForPageLoad(): Promise<void> {
    await expect(this.title).toHaveText('Products');
  }

  async getProductCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async addProductToCartByName(productName: string): Promise<void> {
    const product = this.page.locator('[data-test="inventory-item"]', {
      hasText: productName,
    });
    await product.locator('button', { hasText: 'Add to cart' }).click();
  }

  async removeProductFromCartByName(productName: string): Promise<void> {
    const product = this.page.locator('[data-test="inventory-item"]', {
      hasText: productName,
    });
    await product.locator('button', { hasText: 'Remove' }).click();
  }

  async getCartItemCount(): Promise<string> {
    return (await this.cartBadge.textContent()) ?? '0';
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    return await this.page
      .locator('[data-test="inventory-item-name"]')
      .allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.page
      .locator('[data-test="inventory-item-price"]')
      .allTextContents();
    return priceTexts.map((p) => parseFloat(p.replace('$', '')));
  }
}
