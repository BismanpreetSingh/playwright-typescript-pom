import { Page } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param url - The URL to navigate to
   */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Get the current page title
   * @returns The page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Wait for the page to load completely
   * @param timeout - Timeout in milliseconds (default: 30000)
   */
  async waitForPageLoad(timeout: number = 30000): Promise<void> {
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Get the current URL
   * @returns The current URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Wait for an element to be visible
   * @param selector - Element selector
   * @param timeout - Timeout in milliseconds (default: 10000)
   */
  async waitForElement(selector: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  /**
   * Click on an element
   * @param selector - Element selector
   * @param options - Click options
   */
  async clickElement(selector: string, options?: { force?: boolean; timeout?: number }): Promise<void> {
    await this.page.click(selector, options);
  }

  /**
   * Type text into an element
   * @param selector - Element selector
   * @param text - Text to type
   * @param options - Type options
   */
  async typeText(selector: string, text: string, options?: { clear?: boolean }): Promise<void> {
    if (options?.clear) {
      await this.page.fill(selector, text);
    } else {
      await this.page.type(selector, text);
    }
  }

  /**
   * Get text content from an element
   * @param selector - Element selector
   * @returns The text content
   */
  async getText(selector: string): Promise<string> {
    return await this.page.textContent(selector) || '';
  }

  /**
   * Check if an element is visible
   * @param selector - Element selector
   * @returns True if element is visible, false otherwise
   */
  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  /**
   * Take a screenshot of the page
   * @param name - Screenshot name
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }
}
