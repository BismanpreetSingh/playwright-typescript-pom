import { Page } from '@playwright/test';

/**
 * Utility class for common test helper functions
 */
export class TestHelpers {
  /**
   * Generate a random string of specified length
   * @param length - Length of the string to generate
   * @returns Random string
   */
  static generateRandomString(length: number = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate a random email address
   * @param domain - Domain for the email (default: 'test.com')
   * @returns Random email address
   */
  static generateRandomEmail(domain: string = 'test.com'): string {
    const randomString = this.generateRandomString(8);
    return `${randomString}@${domain}`;
  }

  /**
   * Wait for a specific amount of time
   * @param ms - Milliseconds to wait
   */
  static async waitFor(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Clear all input fields on a page
   * @param page - Playwright page object
   */
  static async clearAllInputs(page: Page): Promise<void> {
    await page.evaluate(() => {
      const inputs = document.querySelectorAll('input');
      inputs.forEach((input: HTMLInputElement) => {
        input.value = '';
      });
    });
  }

  /**
   * Get current timestamp in ISO format
   * @returns Current timestamp
   */
  static getCurrentTimestamp(): string {
    return new Date().toISOString();
  }

  /**
   * Format date for test reports
   * @param date - Date object
   * @returns Formatted date string
   */
  static formatDateForReport(date: Date = new Date()): string {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
}
