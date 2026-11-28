import { test, expect } from '../../fixtures/test-fixtures';

test.describe('SauceDemo Product and Cart Tests', { tag: ['@ui', '@regression'] }, () => {

  test('TC_UI_003 - Verify product catalogue', async ({ page, loggedInInventoryPage: inventoryPage }) => {

    await expect(inventoryPage.productItems).toHaveCount(6);

    await expect(
      page.getByText('Products', { exact: true })
    ).toBeVisible();

  });

  test('TC_UI_004 - Verify product sorting by price low to high', async ({ loggedInInventoryPage: inventoryPage }) => {

    await inventoryPage.sortByPriceLowToHigh();

    await expect(inventoryPage.productNames.first())
      .toHaveText('Sauce Labs Onesie');

  });

  test('TC_UI_005 - Add product to shopping cart', { tag: '@smoke' }, async ({ page, loggedInInventoryPage: inventoryPage }) => {

    await inventoryPage.addBackpackToCart();

    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart.html/);

    await expect(
      page.getByText('Sauce Labs Backpack', { exact: true })
    ).toBeVisible();

  });

});