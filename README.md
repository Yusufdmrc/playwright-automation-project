# Playwright Test Automation Framework

A modern, scalable end-to-end test automation framework built with **Playwright**, **TypeScript**, and the **Page Object Model (POM)** design pattern. It automates UI and API test scenarios for the [Automation Exercise](https://automationexercise.com/) web application.

---

## 🚀 Features

- **Playwright Test Runner**: Native parallel execution, auto-waiting, resilient locators, and cross-browser testing.
- **Page Object Model (POM)**: Maintainable, modular architecture with reusable page components (e.g., `Navbar`).
- **Custom Fixtures (Dependency Injection)**: Automatic instantiation and injection of Page Objects into tests without boilerplate `new Page()` calls.
- **TypeScript**: Strict type-checking, autocompletion, and clean path aliases (`@pages/*`, `@fixtures`, `@test-data/*`).
- **Reporting & Artifacts**: Built-in HTML reports, failure screenshots, videos, and full Playwright Trace archives.
- **Data-Driven Testing**: Externalized test data stored in JSON format (`test-data/`).
- **Configurable Environments**: Environment variable support powered by `dotenv` (`.env`).

---

## 📁 Project Structure

```text
playwright-automation-project/
├── .github/
│   └── workflows/              # CI/CD pipeline definitions
├── reports/                    # HTML and JSON test execution reports (git-ignored)
├── screenshots/                # Failure screenshots (git-ignored)
├── src/
│   ├── pages/                  # Page Object classes
│   │   ├── BasePage.ts         # Shared base page class with common methods
│   │   ├── LoginPage.ts
│   │   ├── RegistrationPage.ts
│   │   ├── ProductsPage.ts
│   │   ├── CartPage.ts
│   │   ├── CheckoutPage.ts
│   │   └── components/         # Shared UI components (e.g., Navbar)
│   ├── fixtures/
│   │   └── index.ts            # Custom fixtures with dependency injection
│   ├── types/                  # Custom TypeScript types and interfaces
│   └── utils/                  # Helper utilities and reusable functions
├── test-data/
│   ├── users.json              # User credentials and test data
│   └── products.json           # Product catalog test data
├── tests/
│   ├── ui/                     # UI test specs
│   │   ├── login.spec.ts
│   │   ├── registration.spec.ts
│   │   ├── products.spec.ts
│   │   ├── cart.spec.ts
│   │   └── checkout.spec.ts
│   └── api/                    # API test specs
├── .env.example                # Sample environment variables template
├── package.json                # Project dependencies and test scripts
├── playwright.config.ts        # Central Playwright configuration
├── tsconfig.json               # TypeScript compiler options and path aliases
└── README.md                   # Project documentation
```

---

## 🛠️ Prerequisites

Before running the tests, ensure you have the following installed:

- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher

---

## ⚙️ Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd playwright-automation-project
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

4. **Configure environment variables:**
   Copy `.env.example` to create your local `.env` file:
   ```bash
   cp .env.example .env
   ```
   *Edit `.env` if you need to customize `BASE_URL`, `HEADLESS`, or `TIMEOUT`.*

---

## 🧪 Running Tests

| Command | Description |
|---|---|
| `npm test` | Runs all tests in headless mode |
| `npm run test:headed` | Runs all tests with visible browser window |
| `npm run test:ui` | Opens the interactive Playwright UI Mode (recommended for local development) |
| `npm run test:debug` | Runs tests in debug mode with Playwright Inspector |
| `npm run test:report` | Opens the generated HTML test report in your browser |

### Running Specific Tests

- **Run a single test file:**
  ```bash
  npx playwright test tests/ui/login.spec.ts
  ```

- **Run tests in a specific browser:**
  ```bash
  npx playwright test --project=chromium
  ```

- **Run a specific test by title:**
  ```bash
  npx playwright test -g "TC01"
  ```

---

## 📊 Test Reporting & Diagnostics

Playwright generates rich diagnostic artifacts on test failure:

- **HTML Report**: Run `npm run test:report` to view step-by-step execution details.
- **Screenshots**: Automatically captured on failure under `test-results/` and `screenshots/`.
- **Trace Viewer**: Inspect the DOM, network requests, console logs, and action timeline:
  ```bash
  npx playwright show-trace test-results/<test-folder>/trace.zip
  ```

---

## 💡 Best Practices Implemented

1. **Native Waiting**: Avoided arbitrary `sleep` or manual element wait wrappers; leveraged Playwright's built-in actionability checks.
2. **Accessible & Resilient Locators**: Preferred `getByRole()`, `getByLabel()`, and custom `data-qa` attributes over fragile XPath selectors.
3. **Fixture-Driven DI**: Tests receive pre-configured page instances via fixtures (`{ loginPage }`), keeping spec files clean and focused solely on assertions and test logic.
4. **Single Responsibility**: Divided UI concerns between pages (`LoginPage`) and shared components (`Navbar`).

