
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('SauceDemo Product and Cart Tests', () => {

  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.navigate();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory.html/);
  });

  test('TC_UI_003 - Verify product catalogue', async ({ page }) => {

    await expect(inventoryPage.productItems).toHaveCount(6);

    await expect(
      page.getByText('Products', { exact: true })
    ).toBeVisible();

  });

  test('TC_UI_004 - Verify product sorting by price low to high', async () => {

    await inventoryPage.sortByPriceLowToHigh();

    await expect(inventoryPage.productNames.first())
      .toHaveText('Sauce Labs Onesie');

  });

  test('TC_UI_005 - Add product to shopping cart', async ({ page }) => {

    await inventoryPage.addBackpackToCart();

    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart.html/);

    await expect(
      page.getByText('Sauce Labs Backpack', { exact: true })
    ).toBeVisible();

  });

});
