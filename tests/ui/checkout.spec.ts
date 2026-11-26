
import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('SauceDemo Checkout Tests', () => {

  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Login
    await loginPage.navigate();

    await loginPage.login(
      'standard_user',
      'secret_sauce'
    );

    // Add product to cart
    await inventoryPage.addBackpackToCart();

    // Open cart
    await inventoryPage.openCart();

    // Verify cart item
    await expect(cartPage.cartItems).toHaveCount(1);

    // Proceed to checkout
    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one.html/);
  });


  test('TC_UI_006 - Validate mandatory checkout information', async () => {

    // Leave first name empty
    await checkoutPage.enterCustomerInformation(
      '',
      'TestUser',
      '411001'
    );

    await checkoutPage.continueCheckout();

    // Verify validation message
    await expect(checkoutPage.errorMessage).toBeVisible();

    await expect(checkoutPage.errorMessage)
      .toContainText('First Name is required');

  });


  test('TC_UI_007 - Verify checkout order summary and price calculation', async ({ page }) => {

    await checkoutPage.enterCustomerInformation(
      'Test',
      'User',
      '411001'
    );

    await checkoutPage.continueCheckout();

    await expect(page).toHaveURL(/checkout-step-two.html/);

    // Verify selected product
    await expect(
      page.getByText('Sauce Labs Backpack', { exact: true })
    ).toBeVisible();

    // Read price details
    const subtotalText = await checkoutPage.subtotalLabel.innerText();
    const taxText = await checkoutPage.taxLabel.innerText();
    const totalText = await checkoutPage.totalLabel.innerText();

    // Convert displayed currency into numbers
    const subtotal = Number(subtotalText.replace(/[^\d.]/g, ''));
    const tax = Number(taxText.replace(/[^\d.]/g, ''));
    const total = Number(totalText.replace(/[^\d.]/g, ''));

    // Validate total calculation
    expect(total).toBeCloseTo(subtotal + tax, 2);

    // Expected backpack price
    expect(subtotal).toBe(29.99);

  });


  test('TC_UI_008 - Complete order successfully', async ({ page }) => {

    await checkoutPage.enterCustomerInformation(
      'Test',
      'User',
      '411001'
    );

    await checkoutPage.continueCheckout();

    await expect(page).toHaveURL(/checkout-step-two.html/);

    // Complete order
    await checkoutPage.finishOrder();

    // Verify confirmation page
    await expect(page).toHaveURL(/checkout-complete.html/);

    await expect(checkoutPage.confirmationMessage)
      .toHaveText('Thank you for your order!');

    await expect(checkoutPage.backHomeButton).toBeVisible();

  });

});
