import { test, expect } from '../fixtures/test-setup';
import * as testData from '../../test-data/test-data.json';

test.describe('Login Functionality with Network Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application before each test
    await page.goto(testData.urls.baseUrl);
  });

  test('should successfully login with valid credentials - Network Verified', async ({
    loginPage,
    homePage,
    networkUtils
  }) => {
    // Clear any existing network logs
    networkUtils.clearNetworkLogs();

    // Navigate to login page
    await loginPage.navigateToLoginPage();

    // Verify SignIn Button is visible
    expect(await loginPage.isSignInButtonVisible()).toBe(true);

    // Click on SignIn Button
    await loginPage.clickOnSignInButton();

    // Perform login
    await loginPage.login(
      testData.users.validUser.username,
      testData.users.validUser.password
    );

    // Verify successful login by checking if user is redirected to home page
    await homePage.waitForPageLoad();
    expect(await homePage.isUserLoggedIn()).toBe(true);

    // Network Verification: Verify login API call was made
    const loginRequests = networkUtils.getRequestsByUrl('/login');
    expect(loginRequests.length).toBeGreaterThan(0);

    // Verify login request method (actual: GET)
    const loginRequest = loginRequests[0];
    expect(loginRequest.method()).toBe('GET');

    // Verify successful login response
    const loginResponses = networkUtils.getResponsesByUrl('/login');
    expect(loginResponses.length).toBeGreaterThan(0);

    const loginResponse = loginResponses[0];
    expect(loginResponse.status()).toBe(200);

    // Verify warning message
    const warningMessage = await homePage.getWarningMessage();
    expect(warningMessage).toContain(testData.messages.warningMessage);
  });

  test('should handle empty username and password - Network Verified', async ({
    loginPage,
    networkUtils
  }) => {
    // Clear any existing network logs
    networkUtils.clearNetworkLogs();

    // Navigate to login page
    await loginPage.navigateToLoginPage();

    // Click on SignIn Button
    await loginPage.clickOnSignInButton();

    // Attempt login with empty credentials
    await loginPage.login('', '');

    // Verify error message is displayed for Empty Username
    expect(await loginPage.isErrorMessageDisplayedForEmptyUsername()).toBe(true);

    // Verify error message is displayed for Empty Password
    expect(await loginPage.isErrorMessageDisplayedForEmptyPassword()).toBe(true);

    // Network Verification: Verify login API call was made with empty credentials
    const loginRequests = networkUtils.getRequestsByUrl('/login');
    expect(loginRequests.length).toBeGreaterThan(0);

    // Verify login request method (actual: GET)
    const loginRequest = loginRequests[0];
    expect(loginRequest.method()).toBe('GET');

    // Verify error response for empty credentials
    const loginResponses = networkUtils.getResponsesByUrl('/login');
    expect(loginResponses.length).toBeGreaterThan(0);

    const loginResponse = loginResponses[0];
    expect(loginResponse.status()).toBe(200);
  });
});
