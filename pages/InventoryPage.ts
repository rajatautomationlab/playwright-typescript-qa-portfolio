
import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly productItems: Locator;
  readonly productNames: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly backpackAddButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productItems = page.locator('.inventory_item');

    this.productNames = page.locator('.inventory_item_name');

    this.sortDropdown = page.locator(
      '[data-test="product-sort-container"]'
    );

    this.cartBadge = page.locator('.shopping_cart_badge');

    this.cartLink = page.locator('.shopping_cart_link');

    this.backpackAddButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    );
  }

  async sortByPriceLowToHigh() {
    await this.sortDropdown.selectOption('lohi');
  }

  async addBackpackToCart() {
    await this.backpackAddButton.click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
