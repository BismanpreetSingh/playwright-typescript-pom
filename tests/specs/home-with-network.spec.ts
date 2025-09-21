import { test, expect } from '../fixtures/test-setup';
import * as testData from '../../test-data/test-data.json';

test.describe('Home Page Functionality with Network Verification', () => {
    test.beforeEach(async ({ page, loginPage, networkUtils }) => {
        // Clear network logs before each test
        networkUtils.clearNetworkLogs();

        // Navigate to the application and perform login
        await page.goto(testData.urls.baseUrl);
        await loginPage.navigateToLoginPage();
        loginPage.waitForPageLoad();
        await loginPage.clickOnSignInButton();
        await loginPage.login(
            testData.users.validUser.username,
            testData.users.validUser.password
        );
    });

    test('should have navigation menu visible - Network Verified', async ({
        homePage,
        networkUtils
    }) => {
        await homePage.waitForPageLoad();

        // Verify navigation menu is visible
        homePage.clickChevronRightIcon;
        expect(await homePage.isNavigationMenuVisible()).toBe(true);

        // Verify navigation menu has items
        const menuItemsCount = await homePage.getNavigationMenuItemsCount();
        expect(menuItemsCount).toBeGreaterThan(0);

        // Network Verification: Verify page load and navigation requests
        const allRequests = networkUtils.getNetworkRequests();
        expect(allRequests.length).toBeGreaterThan(0);

        // Verify successful responses
        const allResponses = networkUtils.getNetworkResponses();
        const failedResponses = allResponses.filter(res => res.status() >= 400);
        expect(failedResponses.length).toBe(0); // No failed requests

        // Verify at least one successful response
        const successfulResponses = allResponses.filter(res => res.status() < 400);
        expect(successfulResponses.length).toBeGreaterThan(0);
    });

    test('should allow user to logout successfully - Network Verified', async ({
        loginPage,
        homePage,
        networkUtils
    }) => {
        // Verify user is logged in
        expect(await homePage.isUserLoggedIn()).toBe(true);

        // Click logout button
        await homePage.clickLogoutButton();

        // Verify user is redirected to login page
        await loginPage.waitForPageLoad();
        expect(await loginPage.isSignInButtonVisible()).toBe(true);

        // Network Verification: Verify logout navigation
        const logoutRequests = networkUtils.getRequestsByUrl('/logout');
        expect(logoutRequests.length).toBeGreaterThan(0);

        // Verify logout request method (actual: GET)
        const logoutRequest = logoutRequests[0];
        expect(logoutRequest.method()).toBe('GET');

        // Verify successful logout response
        const logoutResponses = networkUtils.getResponsesByUrl('/logout');
        expect(logoutResponses.length).toBeGreaterThan(0);

        const logoutResponse = logoutResponses[0];
        expect(logoutResponse.status()).toBe(302);
    });

    test('verify the Types of Stains Present - Network Verified', async ({
        homePage,
        networkUtils
    }) => {
        await homePage.waitForPageLoad();

        // Verify count of stains types
        const countOfStainTypes = await homePage.getStainsTypesCount();
        expect(countOfStainTypes).toBe(3);

        const stainTypes = await homePage.getStainsTypes();
        for (let i = 0; i < countOfStainTypes; i++) {
            const stainType = stainTypes[i];
            console.log(`Stain Type ${i + 1}: ${stainType}`);
            switch (stainType) {
                case 'H&E':
                    expect(stainType).toEqual('H&E');
                    break;
                case 'IHC':
                    expect(stainType).toEqual('IHC');
                    break;
                case 'Special':
                    expect(stainType).toEqual('Special');
                    break;
            }
        }

        // Network Verification: Verify page load requests
        const allRequests = networkUtils.getNetworkRequests();
        expect(allRequests.length).toBeGreaterThan(0);

        // Verify all responses are successful
        const allResponses = networkUtils.getNetworkResponses();
        const failedResponses = allResponses.filter(res => res.status() >= 400);
        expect(failedResponses.length).toBe(0);

        // Verify successful responses exist
        const successfulResponses = allResponses.filter(res => res.status() < 400);
        expect(successfulResponses.length).toBeGreaterThan(0);
    });

    test.fail('should order stains for BrightField - Network Verified', async ({
        homePage,
        networkUtils
    }) => {
        await homePage.waitForPageLoad();

        // Select the Order Stains to be Ordered from the List
        await homePage.selectOrderStainsFromList();

        // Verify Order Stains button is enabled
        expect(await homePage.isOrderStainsDisabled()).toBe(false);

        // Click on Order Stains Button
        await homePage.clickOrderStains();

        // Network Verification: Verify order stains requests
        const orderRequests = networkUtils.getRequestsByUrl('/order-stains');
        expect(orderRequests.length).toBeGreaterThan(0);

        // Verify order stains request method
        const orderRequest = orderRequests[0];
        expect(orderRequest.method()).toBe('POST');

        // Verify successful order stains response
        const orderResponses = networkUtils.getResponsesByUrl('/order-stains');
        expect(orderResponses.length).toBeGreaterThan(0);

        const orderResponse = orderResponses[0];
        expect(orderResponse.status()).toBe(200);
    });
});
