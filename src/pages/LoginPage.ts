import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Page selectors
  private readonly usernameInput = '#username';
  private readonly passwordInput = '#password';
  private readonly loginButton = '#login-button';
  private readonly errorMessage = '.error-message';
  private readonly loginForm = '.login-form';

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
  async clickLoginButton(): Promise<void> {
    await this.waitForElement(this.loginButton);
    await this.clickElement(this.loginButton);
  }

  /**
   * Perform complete login
   * @param username - The username
   * @param password - The password
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Get error message text
   * @returns The error message text
   */
  async getErrorMessage(): Promise<string> {
    if (await this.isElementVisible(this.errorMessage)) {
      return await this.getText(this.errorMessage);
    }
    return '';
  }

  /**
   * Check if login form is visible
   * @returns True if login form is visible
   */
  async isLoginFormVisible(): Promise<boolean> {
    return await this.isElementVisible(this.loginForm);
  }

  /**
   * Check if error message is displayed
   * @returns True if error message is displayed
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    return await this.isElementVisible(this.errorMessage);
  }
}
