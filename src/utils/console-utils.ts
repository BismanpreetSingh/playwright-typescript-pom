import { Page, ConsoleMessage } from '@playwright/test';

export class ConsoleUtils {
  private page: Page;
  private consoleMessages: ConsoleMessage[] = [];

  constructor(page: Page) {
    this.page = page;
  }

  public startListening() {
    this.page.on('console', (msg) => {
      this.consoleMessages.push(msg);
    });
  }

  public getMessages(): ConsoleMessage[] {
    return this.consoleMessages;
  }

  public clearMessages() {
    this.consoleMessages = [];
  }
}
