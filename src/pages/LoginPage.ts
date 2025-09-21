import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Page selectors
  private readonly usernameInput = '#username-label';
  private readonly passwordInput = '#password-label';
  private readonly continueButton = '//button[text()="Continue"]';
  private readonly errorMessage = '#error-element-password';
  private readonly signInButton = '//p[text()="Sign In"]';
  private readonly errorMessageUserNameEmpty = '#error-cs-username-required';
  private readonly errorMessagePasswordEmpty = '#error-cs-password-required';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the login page
   */
  async navigateToLoginPage(): Promise<void> {
    await this.navigateTo('/login');
    await this.waitForPageLoad();
  }

  /**
   * Enter username
   * @param username - The username to enter
   */
  async enterUsername(username: string): Promise<void> {
    await this.waitForElement(this.usernameInput);
    await this.typeText(this.usernameInput, username, { clear: true });
  }

  /**
   * Enter password
   * @param password - The password to enter
   */
  async enterPassword(password: string): Promise<void> {
    await this.waitForElement(this.passwordInput);
    await this.typeText(this.passwordInput, password, { clear: true });
  }

  /**
   * Click the login button
   */
  async clickContinueButton(): Promise<void> {
    await this.waitForElement(this.continueButton);
    await this.clickElement(this.continueButton);
  }

  /**
   * Perform complete login
   * @param username - The username
   * @param password - The password
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickContinueButton();
  }

  /**
   * Check if login form is visible
   * @returns True if login form is visible
   */
  async isSignInButtonVisible(): Promise<boolean> {
    return await this.isElementVisible(this.signInButton);
  }

  async clickOnSignInButton(): Promise<void> {
     await this.clickElement(this.signInButton);
  }

  /**
   * Check if error message is displayed
   * @returns True if error message is displayed
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    return await this.isElementVisible(this.errorMessage);
  }

  /**
   * Check if error message is displayed When username is empty
   * @returns True if error message is displayed
   */
  async isErrorMessageDisplayedForEmptyUsername(): Promise<boolean> {
    return await this.isElementVisible(this.errorMessageUserNameEmpty);
  }

  /**
   * Check if error message is displayed When password is empty
   * @returns True if error message is displayed
   */
  async isErrorMessageDisplayedForEmptyPassword(): Promise<boolean> {
    return await this.isElementVisible(this.errorMessagePasswordEmpty);
  }
}
