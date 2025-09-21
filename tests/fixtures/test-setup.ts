import { test as base } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { HomePage } from '../../src/pages/HomePage';
import { NetworkUtils } from '../../src/utils/network-utils';
import { ConsoleUtils } from '../../src/utils/console-utils';

// Extend the base test with page objects
type TestFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  networkUtils: NetworkUtils;
  consoleUtils: ConsoleUtils;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  networkUtils: async ({ page }, use) => {
    const networkUtils = new NetworkUtils(page);
    await use(networkUtils);
  },

  consoleUtils: async ({ page }, use) => {
    const consoleUtils = new ConsoleUtils(page);
    consoleUtils.startListening();
    await use(consoleUtils);
  },
});

export { expect } from '@playwright/test';
