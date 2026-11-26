
import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;

  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;

  readonly confirmationMessage: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Checkout information
    this.firstNameInput = page.locator(
      '[data-test="firstName"]'
    );

    this.lastNameInput = page.locator(
      '[data-test="lastName"]'
    );

    this.postalCodeInput = page.locator(
      '[data-test="postalCode"]'
    );

    this.continueButton = page.locator(
      '[data-test="continue"]'
    );

    this.errorMessage = page.locator(
      '[data-test="error"]'
    );

    // Checkout overview
    this.finishButton = page.locator(
      '[data-test="finish"]'
    );

    this.cancelButton = page.locator(
      '[data-test="cancel"]'
    );

    this.subtotalLabel = page.locator(
      '[data-test="subtotal-label"]'
    );

    this.taxLabel = page.locator(
      '[data-test="tax-label"]'
    );

    this.totalLabel = page.locator(
      '[data-test="total-label"]'
    );

    // Order confirmation
    this.confirmationMessage = page.locator(
      '.complete-header'
    );

    this.backHomeButton = page.locator(
      '[data-test="back-to-products"]'
    );
  }

  async enterCustomerInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueCheckout() {
    await this.continueButton.click();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async backToProducts() {
    await this.backHomeButton.click();
  }
}
