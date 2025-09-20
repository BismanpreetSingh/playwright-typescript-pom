import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Page selectors
  private readonly welcomeMessage = '.welcome-message';
  private readonly logoutButton = '#logout-button';
  private readonly profileLink = '.profile-link';
  private readonly navigationMenu = '.nav-menu';
  private readonly searchInput = '#search-input';
  private readonly searchButton = '#search-button';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the home page
   */
  async navigateToHomePage(): Promise<void> {
    await this.navigateTo('/home');
    await this.waitForPageLoad();
  }

  /**
   * Get the welcome message text
   * @returns The welcome message text
   */
  async getWelcomeMessage(): Promise<string> {
    await this.waitForElement(this.welcomeMessage);
    return await this.getText(this.welcomeMessage);
  }

  /**
   * Click the logout button
   */
  async clickLogoutButton(): Promise<void> {
    await this.waitForElement(this.logoutButton);
    await this.clickElement(this.logoutButton);
  }

  /**
   * Click the profile link
   */
  async clickProfileLink(): Promise<void> {
    await this.waitForElement(this.profileLink);
    await this.clickElement(this.profileLink);
  }

  /**
   * Search for content
   * @param searchTerm - The term to search for
   */
  async searchFor(searchTerm: string): Promise<void> {
    await this.waitForElement(this.searchInput);
    await this.typeText(this.searchInput, searchTerm, { clear: true });
    await this.clickElement(this.searchButton);
  }

  /**
   * Check if user is logged in (by checking if logout button is visible)
   * @returns True if user is logged in
   */
  async isUserLoggedIn(): Promise<boolean> {
    return await this.isElementVisible(this.logoutButton);
  }

  /**
   * Check if navigation menu is visible
   * @returns True if navigation menu is visible
   */
  async isNavigationMenuVisible(): Promise<boolean> {
    return await this.isElementVisible(this.navigationMenu);
  }

  /**
   * Get navigation menu items count
   * @returns The number of navigation menu items
   */
  async getNavigationMenuItemsCount(): Promise<number> {
    return await this.page.locator(`${this.navigationMenu} li`).count();
  }
}
