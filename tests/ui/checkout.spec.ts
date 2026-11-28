import { test, expect } from '../../fixtures/test-fixtures';
import { customer } from '../../test-data/users';

test.describe('SauceDemo Checkout Tests', { tag: ['@ui', '@regression'] }, () => {

  test.beforeEach(async ({ page, loggedInInventoryPage, cartPage }) => {

    await loggedInInventoryPage.addBackpackToCart();
    await loggedInInventoryPage.openCart();

    await expect(cartPage.cartItems).toHaveCount(1);

    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one.html/);
  });


  test('TC_UI_006 - Validate mandatory checkout information', async ({ checkoutPage }) => {

    // Leave first name empty
    await checkoutPage.enterCustomerInformation(
      '',
      customer.lastName,
      customer.postalCode
    );

    await checkoutPage.continueCheckout();

    await expect(checkoutPage.errorMessage).toBeVisible();

    await expect(checkoutPage.errorMessage)
      .toContainText('First Name is required');

  });


  test('TC_UI_007 - Verify checkout order summary and price calculation', async ({ page, checkoutPage }) => {

    await checkoutPage.enterCustomerInformation(
      customer.firstName,
      customer.lastName,
      customer.postalCode
    );

    await checkoutPage.continueCheckout();

    await expect(page).toHaveURL(/checkout-step-two.html/);

    await expect(
      page.getByText('Sauce Labs Backpack', { exact: true })
    ).toBeVisible();

    const subtotalText = await checkoutPage.subtotalLabel.innerText();
    const taxText = await checkoutPage.taxLabel.innerText();
    const totalText = await checkoutPage.totalLabel.innerText();

    const subtotal = Number(subtotalText.replace(/[^\d.]/g, ''));
    const tax = Number(taxText.replace(/[^\d.]/g, ''));
    const total = Number(totalText.replace(/[^\d.]/g, ''));

    expect(total).toBeCloseTo(subtotal + tax, 2);

    expect(subtotal).toBe(29.99);

  });


  test('TC_UI_008 - Complete order successfully', { tag: '@smoke' }, async ({ page, checkoutPage }) => {

    await checkoutPage.enterCustomerInformation(
      customer.firstName,
      customer.lastName,
      customer.postalCode
    );

    await checkoutPage.continueCheckout();

    await expect(page).toHaveURL(/checkout-step-two.html/);

    await checkoutPage.finishOrder();

    await expect(page).toHaveURL(/checkout-complete.html/);

    await expect(checkoutPage.confirmationMessage)
      .toHaveText('Thank you for your order!');

    await expect(checkoutPage.backHomeButton).toBeVisible();

  });

});