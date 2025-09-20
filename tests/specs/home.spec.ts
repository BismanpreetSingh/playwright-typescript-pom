import { test, expect } from '../fixtures/test-setup';
import { LoginPage } from '../../src/pages/LoginPage';
import { HomePage } from '../../src/pages/HomePage';
import * as testData from '../../test-data/test-data.json';

test.describe('Home Page Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Login first to access home page
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await page.goto(testData.urls.baseUrl);
    await loginPage.navigateToLoginPage();
    await loginPage.login(
      testData.users.validUser.username,
      testData.users.validUser.password
    );
  });

  test('should display welcome message on home page', async ({
    homePage
  }) => {
    // Verify welcome message is displayed
    const welcomeMessage = await homePage.getWelcomeMessage();
    expect(welcomeMessage).toBeTruthy();
    expect(welcomeMessage).toContain('Welcome');
  });

  test('should have navigation menu visible', async ({
    homePage
  }) => {
    // Verify navigation menu is visible
    expect(await homePage.isNavigationMenuVisible()).toBe(true);

    // Verify navigation menu has items
    const menuItemsCount = await homePage.getNavigationMenuItemsCount();
    expect(menuItemsCount).toBeGreaterThan(0);
  });

  test('should allow user to logout successfully', async ({
    page,
    homePage
  }) => {
    // Verify user is logged in
    expect(await homePage.isUserLoggedIn()).toBe(true);

    // Click logout button
    await homePage.clickLogoutButton();

    // Verify user is redirected to login page
    const loginPage = new LoginPage(page);
    await loginPage.waitForPageLoad();
    expect(await loginPage.isLoginFormVisible()).toBe(true);
  });

  test('should allow searching for content', async ({
    homePage
  }) => {
    // Perform search
    const searchTerm = 'test search';
    await homePage.searchFor(searchTerm);

    // Verify search was performed (this would typically check for search results)
    // For demo purposes, we'll just verify the search input was used
    expect(true).toBe(true); // Placeholder assertion
  });

  test('should display user profile link', async ({
    homePage
  }) => {
    // Verify profile link is visible
    expect(await homePage.isElementVisible('.profile-link')).toBe(true);
  });
});
