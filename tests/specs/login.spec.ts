import { test, expect } from '../fixtures/test-setup';
import * as testData from '../../test-data/test-data.json';

test.describe('Login Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application before each test
    await page.goto(testData.urls.baseUrl);
  });

  test('should successfully login with valid credentials', async ({
    loginPage,
    homePage
  }) => {
    // Navigate to login page
    await loginPage.navigateToLoginPage();

    // Verify login form is visible
    expect(await loginPage.isLoginFormVisible()).toBe(true);

    // Perform login
    await loginPage.login(
      testData.users.validUser.username,
      testData.users.validUser.password
    );

    // Verify successful login by checking if user is redirected to home page
    await homePage.waitForPageLoad();
    expect(await homePage.isUserLoggedIn()).toBe(true);

    // Verify welcome message
    const welcomeMessage = await homePage.getWelcomeMessage();
    expect(welcomeMessage).toContain(testData.messages.welcomeMessage);
  });

  test('should show error message with invalid credentials', async ({
    loginPage
  }) => {
    // Navigate to login page
    await loginPage.navigateToLoginPage();

    // Verify login form is visible
    expect(await loginPage.isLoginFormVisible()).toBe(true);

    // Attempt login with invalid credentials
    await loginPage.login(
      testData.users.invalidUser.username,
      testData.users.invalidUser.password
    );

    // Verify error message is displayed
    expect(await loginPage.isErrorMessageDisplayed()).toBe(true);

    // Verify error message text
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(testData.messages.loginError);
  });

  test('should display login form elements correctly', async ({
    loginPage
  }) => {
    // Navigate to login page
    await loginPage.navigateToLoginPage();

    // Verify all login form elements are visible
    expect(await loginPage.isLoginFormVisible()).toBe(true);

    // Take screenshot for visual verification
    await loginPage.takeScreenshot('login-form');
  });

  test('should handle empty username and password', async ({
    loginPage
  }) => {
    // Navigate to login page
    await loginPage.navigateToLoginPage();

    // Attempt login with empty credentials
    await loginPage.login('', '');

    // Verify error message is displayed
    expect(await loginPage.isErrorMessageDisplayed()).toBe(true);
  });
});
