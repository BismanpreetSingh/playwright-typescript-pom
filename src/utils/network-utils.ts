import { Page, Request, Response } from '@playwright/test';

export class NetworkUtils {
  private page: Page;
  private networkRequests: Request[] = [];
  private networkResponses: Response[] = [];

  constructor(page: Page) {
    this.page = page;
    this.setupNetworkListeners();
  }

  /**
   * Set up network request and response listeners
   */
  private setupNetworkListeners(): void {
    this.page.on('request', (request) => {
      this.networkRequests.push(request);
    });

    this.page.on('response', (response) => {
      this.networkResponses.push(response);
    });
  }

  /**
   * Clear network logs
   */
  clearNetworkLogs(): void {
    this.networkRequests = [];
    this.networkResponses = [];
  }

  /**
   * Get all network requests
   */
  getNetworkRequests(): Request[] {
    return this.networkRequests;
  }

  /**
   * Get all network responses
   */
  getNetworkResponses(): Response[] {
    return this.networkResponses;
  }

  /**
   * Wait for a specific network request
   * @param url - URL pattern to match
   * @param method - HTTP method (optional)
   * @param timeout - Timeout in milliseconds (default: 10000)
   */
  async waitForNetworkRequest(
    url: string | RegExp,
    method?: string,
    timeout: number = 10000
  ): Promise<Request> {
    return await this.page.waitForRequest(url, { timeout });
  }

  /**
   * Wait for a specific network response
   * @param url - URL pattern to match
   * @param status - Expected status code (optional)
   * @param timeout - Timeout in milliseconds (default: 10000)
   */
  async waitForNetworkResponse(
    url: string | RegExp,
    status?: number,
    timeout: number = 10000
  ): Promise<Response> {
    return await this.page.waitForResponse(url, { timeout });
  }

  /**
   * Verify a network request was made
   * @param url - Expected URL pattern
   * @param method - Expected HTTP method
   * @returns True if request was found
   */
  async verifyNetworkRequest(url: string | RegExp, method: string): Promise<boolean> {
    const requests = this.networkRequests.filter(req =>
      (typeof url === 'string' ? req.url().includes(url) : url.test(req.url())) &&
      req.method() === method
    );
    return requests.length > 0;
  }

  /**
   * Verify a network response was received
   * @param url - Expected URL pattern
   * @param status - Expected status code
   * @returns True if response was found
   */
  async verifyNetworkResponse(url: string | RegExp, status: number): Promise<boolean> {
    const responses = this.networkResponses.filter(res =>
      (typeof url === 'string' ? res.url().includes(url) : url.test(res.url())) &&
      res.status() === status
    );
    return responses.length > 0;
  }

  /**
   * Get request by URL pattern
   * @param url - URL pattern to match
   * @returns Array of matching requests
   */
  getRequestsByUrl(url: string | RegExp): Request[] {
    return this.networkRequests.filter(req =>
      typeof url === 'string' ? req.url().includes(url) : url.test(req.url())
    );
  }

  /**
   * Get response by URL pattern
   * @param url - URL pattern to match
   * @returns Array of matching responses
   */
  getResponsesByUrl(url: string | RegExp): Response[] {
    return this.networkResponses.filter(res =>
      typeof url === 'string' ? res.url().includes(url) : url.test(res.url())
    );
  }

  /**
   * Verify API response data
   * @param url - URL pattern to match
   * @param expectedData - Expected data in response
   * @returns True if response contains expected data
   */
  async verifyApiResponseData(url: string | RegExp, expectedData: any): Promise<boolean> {
    const responses = this.getResponsesByUrl(url);
    if (responses.length === 0) return false;

    try {
      const responseData = await responses[0].json();
      return JSON.stringify(responseData) === JSON.stringify(expectedData);
    } catch (error) {
      return false;
    }
  }

  /**
   * Get failed network requests
   * @returns Array of failed requests
   */
  getFailedRequests(): Request[] {
    return this.networkRequests.filter(req => {
      const response = this.networkResponses.find(res => res.request() === req);
      return response && response.status() >= 400;
    });
  }

  /**
   * Get successful network requests
   * @returns Array of successful requests
   */
  getSuccessfulRequests(): Request[] {
    return this.networkRequests.filter(req => {
      const response = this.networkResponses.find(res => res.request() === req);
      return response && response.status() < 400;
    });
  }

  /**
   * Get request details for debugging
   * @param url - URL pattern to match
   * @returns Request details
   */
  getRequestDetails(url: string | RegExp): any[] {
    return this.getRequestsByUrl(url).map(req => ({
      url: req.url(),
      method: req.method(),
      headers: req.headers(),
      postData: req.postData()
    }));
  }

  /**
   * Get response details for debugging
   * @param url - URL pattern to match
   * @returns Response details
   */
  async getResponseDetails(url: string | RegExp): Promise<any[]> {
    const responses = this.getResponsesByUrl(url);
    const details = [];

    for (const response of responses) {
      try {
        const body = await response.text();
        details.push({
          url: response.url(),
          status: response.status(),
          headers: response.headers(),
          body: body
        });
      } catch (error) {
        details.push({
          url: response.url(),
          status: response.status(),
          headers: response.headers(),
          error: 'Failed to read response body'
        });
      }
    }

    return details;
  }
}
