# Playwright Test Automation Standards & Guidelines

This document serves as the persistent memory and execution guide for any AI assistant working on this repository.

---

## 1. Core Architecture & Tech Stack

- **Test Runner:** `@playwright/test` Native Runner.
  - **STRICT RULE:** Do **NOT** use Cucumber, Gherkin, `.feature` files, or `step-definitions`. All tests are native Playwright specs (`.spec.ts`).
- **Language:** TypeScript with strict type checking and configured path aliases.
- **Design Pattern:** Page Object Model (POM) + Component Object Model (e.g., `src/pages/components/Navbar.ts`).
- **Dependency Injection (Fixtures):** Custom fixture system defined in `src/fixtures/index.ts`.
  - In spec files, always import: `import { test, expect } from "@fixtures";`
  - Never manually instantiate Page Objects inside test blocks with `new LoginPage(page)`. Use fixture parameters like `{ loginPage, page }`.

---

## 2. Directory Structure & Path Aliases

- `src/pages/`: Page Object classes extending `BasePage`.
- `src/pages/components/`: Reusable site-wide components (e.g., `Navbar.ts`).
- `src/fixtures/`: Custom Playwright fixtures for DI.
- `src/utils/`: Helper functions.
- `src/types/`: Custom TypeScript interfaces and types.
- `test-data/`: JSON fixtures for test data (`users.json`, `products.json`).
  - Sensitive test data files are git-ignored; templates exist as `*.example.json`.
- `tests/ui/`: UI test specifications.
- `tests/api/`: API test specifications.

**Path Aliases:**
- `@pages/*` -> `src/pages/*`
- `@fixtures` -> `src/fixtures/index`
- `@test-data/*` -> `test-data/*`
- `@utils/*` -> `src/utils/*`

---

## 3. Page Object Coding Conventions

1. **Inline Property Initialization (Mandatory):**
   - Declare locators directly where they are defined, NOT inside the constructor.
   ```typescript
   export class LoginPage extends BasePage {
     readonly loginHeading = this.page.getByRole("heading", { name: "Login to your account" });
     readonly emailInput = this.page.locator('input[data-qa="login-email"]');
     readonly passwordInput = this.page.locator('input[data-qa="login-password"]');
     readonly loginButton = this.page.locator('button[data-qa="login-button"]');

     constructor(page: Page) {
       super(page);
     }
   }
   ```

2. **Arrow Functions for Methods:**
   - Define all action methods as async arrow functions:
   ```typescript
   login = async (email: string, pass: string): Promise<void> => {
     await this.emailInput.fill(email);
     await this.passwordInput.fill(pass);
     await this.loginButton.click();
   };
   ```

3. **No Wrapper Anti-Patterns:**
   - Do **NOT** wrap Playwright's native `click()`, `fill()`, or `waitFor()` in `BasePage`. Playwright has built-in auto-waiting and actionability checks.
   - `BasePage` is minimal: holds `protected readonly page: Page`, `readonly navbar: Navbar`, and common cross-page navigation (`navigateTo(path)`).

4. **Locator Strategy Priority:**
   1. `page.getByRole(...)` / `page.getByLabel(...)` (Semantic / Accessible)
   2. `page.locator('[data-qa="..."]')` (Stable test attribute)
   3. `page.getByText(...)` (Visible text)
   4. Avoid brittle XPaths or styling-based CSS classes whenever possible.

---

## 4. Test Spec Guidelines

- Use `test.describe("Feature Name", () => { ... })` blocks.
- Test names must follow `TC0X - Clear description` format.
- Assertions must use web-first Playwright matchers (`await expect(...).toBeVisible()`, `toHaveURL()`, `toContainText()`), never manual boolean checks.
- Keep test bodies concise: test logic should orchestrate POM actions and assert outcomes.

---

## 5. Workflow for Adding New Pages & Tests

1. Inspect target page using Playwright MCP or existing selectors.
2. Create/update Page class in `src/pages/<Name>Page.ts` using inline properties.
3. Register the new Page Object in `src/fixtures/index.ts` so it can be injected.
4. Write test spec in `tests/ui/<name>.spec.ts` using `@fixtures`.
5. Run test to verify: `npx playwright test tests/ui/<name>.spec.ts`.
   - *Note:* External network access (e.g. `automationexercise.com`) requires elevated execution (`BypassSandbox: true` if sandboxed).

---

## 6. Debugging & Failure Analysis

- When a test fails:
  1. Check terminal output and error call logs.
  2. Inspect trace files in `test-results/` using `npx playwright show-trace <trace.zip>`.
  3. Inspect failure screenshots in `test-results/`.
  4. Use headed mode (`npm run test:headed`) or UI mode (`npm run test:ui`) for interactive debugging.

