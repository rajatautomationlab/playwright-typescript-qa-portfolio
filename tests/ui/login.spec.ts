import { test, expect } from '../../fixtures/test-fixtures';
import { users } from '../../test-data/users';

test.describe('SauceDemo Login Tests', { tag: ['@ui', '@regression'] }, () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('TC_UI_001 - Login with valid credentials', { tag: '@smoke' }, async ({ page, loginPage }) => {

    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(/inventory.html/);

    await expect(
      page.getByText('Products', { exact: true })
    ).toBeVisible();

  });

  test('TC_UI_002 - Login with invalid credentials', async ({ loginPage }) => {

    await loginPage.login(users.invalid.username, users.invalid.password);

    await expect(loginPage.errorMessage).toBeVisible();

    await expect(loginPage.errorMessage).toContainText(
      'Username and password do not match'
    );

  });

  test('TC_UI_009 - Login with locked out user', async ({ loginPage }) => {

    await loginPage.login(users.locked.username, users.locked.password);

    await expect(loginPage.errorMessage).toContainText(
      'this user has been locked out'
    );

  });

});