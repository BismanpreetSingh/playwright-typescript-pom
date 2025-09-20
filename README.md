# Playwright TypeScript Framework with Page Object Model and Allure Reporting

A comprehensive test automation framework built with Playwright, TypeScript, Page Object Model pattern, and Allure reporting.

## 🚀 Features

- **Playwright**: Modern web testing framework
- **TypeScript**: Type-safe development
- **Page Object Model**: Clean and maintainable test structure
- **Allure Reporting**: Beautiful and detailed test reports
- **Multi-browser Support**: Chrome, Firefox, Safari
- **Test Fixtures**: Reusable test setup and teardown
- **Test Data Management**: Separate test data from test logic
- **Utility Helpers**: Common test helper functions

## 📁 Project Structure

```
playwright-typescript-pom/
├── src/
│   ├── pages/              # Page Object Model classes
│   │   ├── BasePage.ts     # Base page class with common methods
│   │   ├── LoginPage.ts    # Login page object
│   │   └── HomePage.ts     # Home page object
│   └── utils/              # Utility functions
│       └── test-helpers.ts # Common test helper functions
├── tests/
│   ├── fixtures/           # Test fixtures and setup
│   │   └── test-setup.ts   # Extended test setup with page objects
│   └── specs/              # Test specification files
│       ├── login.spec.ts   # Login functionality tests
│       └── home.spec.ts    # Home page functionality tests
├── test-data/              # Test data files
│   └── test-data.json      # Test data in JSON format
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Node.js dependencies and scripts
└── README.md              # This file
```

## 🛠️ Installation

1. **Clone the repository** (or use the provided structure)
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Install Playwright browsers**:
   ```bash
   npm run install:browsers
   ```
4. **Install system dependencies** (if needed):
   ```bash
   npm run install:deps
   ```

## 🏃‍♂️ Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (visible browser)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests with UI mode
```bash
npm run test:ui
```

### Run tests on specific browser
```bash
# Chrome only
npm run test:chromium

# Firefox only
npm run test:firefox

# Safari only
npm run test:webkit
```

## 📊 Allure Reporting

### Generate Allure report
```bash
npm run allure:generate
```

### Open Allure report in browser
```bash
npm run allure:open
```

### Serve Allure report (live updates)
```bash
npm run allure:serve
```

## 🎯 Page Object Model

The framework uses the Page Object Model pattern to create maintainable and reusable page objects.

### Base Page
All page objects extend the `BasePage` class which provides common methods like:
- `navigateTo(url)` - Navigate to a specific URL
- `getTitle()` - Get page title
- `waitForPageLoad()` - Wait for page to load
- `clickElement(selector)` - Click on an element
- `typeText(selector, text)` - Type text into an element
- `getText(selector)` - Get text from an element
- `isElementVisible(selector)` - Check if element is visible
- `takeScreenshot(name)` - Take a screenshot

### Creating New Page Objects

```typescript
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class YourPage extends BasePage {
  // Define selectors as private properties
  private readonly yourElement = '.your-selector';

  constructor(page: Page) {
    super(page);
  }

  // Add page-specific methods
  async performAction(): Promise<void> {
    await this.clickElement(this.yourElement);
  }
}
```

## 🧪 Writing Tests

### Using Test Fixtures

```typescript
import { test, expect } from '../fixtures/test-setup';

test('should perform some action', async ({ loginPage, homePage }) => {
  // Use page objects from fixtures
  await loginPage.navigateToLoginPage();
  await loginPage.login('user@example.com', 'password');

  expect(await homePage.isUserLoggedIn()).toBe(true);
});
```

### Test Data Management

Store test data in `test-data/test-data.json`:

```json
{
  "users": {
    "validUser": {
      "username": "testuser@example.com",
      "password": "TestPassword123"
    }
  }
}
```

Import and use in tests:

```typescript
import * as testData from '../../test-data/test-data.json';

await loginPage.login(
  testData.users.validUser.username,
  testData.users.validUser.password
);
```

## 🔧 Configuration

### Playwright Configuration

The `playwright.config.ts` file contains:
- Test directory settings
- Browser configurations
- Reporter settings (HTML, JSON, JUnit, Allure)
- Screenshots and video settings
- Parallel execution settings

### TypeScript Configuration

The `tsconfig.json` file is configured for:
- ES2020 target
- CommonJS modules
- DOM types for browser testing
- Source maps for debugging

## 📝 Best Practices

1. **Page Object Model**: Keep page logic separate from test logic
2. **Test Data**: Store test data in separate files
3. **Fixtures**: Use fixtures for common setup and teardown
4. **Selectors**: Use data-testid attributes for reliable element selection
5. **Waits**: Use appropriate waits for dynamic content
6. **Screenshots**: Take screenshots on failures for debugging
7. **Reports**: Use Allure for detailed test reporting

## 🐛 Debugging

### Debug Mode
```bash
npm run test:debug
```

### UI Mode
```bash
npm run test:ui
```

### View Test Reports
```bash
npm run test:report
```

## 🤝 Contributing

1. Follow the existing code structure
2. Add appropriate TypeScript types
3. Include JSDoc comments for public methods
4. Add tests for new functionality
5. Update documentation as needed

## 📄 License

This project is licensed under the ISC License.
