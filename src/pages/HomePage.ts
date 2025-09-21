import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Page selectors
  private readonly warningMessage = '//div[starts-with(@class,"MuiAlert-message")]';
  private readonly logoutButton = '//div[text()="Log out"]';
  private readonly profileLink = '#long-button';
  private readonly navigationMenu = '//ul[starts-with(@class,"MuiList-root MuiList-padding")]';
  private readonly chevronRightICon = '//*[data-testid="ChevronRightIcon"]';
  private readonly stainsTypes = '//*[@data-testid="CircleIcon"]/following-sibling::span';
  private readonly orderStainsButon = '//*[text()="Order Stains"]';
  private readonly orderStatinsForBrightfield = '//div[@aria-label="Image type: Brightfield"]/../preceding-sibling::div[3]/span/input';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Get the warning message text
   * @returns The warning message text
   */
  async getWarningMessage(): Promise<string> {
    await this.waitForElement(this.warningMessage);
    return await this.getText(this.warningMessage);
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
   * Check if user is logged in (by checking if logout button is visible)
   * @returns True if user is logged in
   */
  async isUserLoggedIn(): Promise<boolean> {
    await this.clickProfileLink();
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
    return await this.page.locator(`${this.navigationMenu}/li`).count();
  }

  /**
   * Click the Chevron Right Icon
   */
  async clickChevronRightIcon(): Promise<void> {
    await this.waitForElement(this.chevronRightICon);
    await this.clickElement(this.chevronRightICon);
  }

  /**
   * Get Count of Stains Types
   * @returns The number of Stains Types
   */
  async getStainsTypesCount(): Promise<number> {
    return await this.page.locator(this.stainsTypes).count();
  }

  /**
   * Get Value of Stains Types
   * @returns List of Stains Types
   */
  async getStainsTypes(): Promise<string[]> {
    return await this.page.locator(this.stainsTypes).allTextContents();
  }

  /**
   * Check if order stains Button is Disabled
   * @returns True/False if order stains Button is Disabled/Enabled respectively
   */
  async isOrderStainsDisabled(): Promise<boolean> {
    return await this.isElementDisabled(this.orderStainsButon);
  }

  /**
   * Click the Order Stains Button
   */
  async clickOrderStains(): Promise<void> {
    await this.clickElement(this.orderStainsButon);
  }

  /**
   * ClSelect Order Statins to be Ordered from the List
   */
  async selectOrderStainsFromList(): Promise<void> {
    await this.clickElement(this.orderStatinsForBrightfield);
  }
} 
