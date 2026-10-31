# AI Agent Project Guide

Welcome to the **Automation Exercise Playwright Test Automation Project**.

This project uses modern Playwright + TypeScript test automation practices. Any AI agent or developer assisting in this repository must strictly adhere to the project conventions and architectural rules.

---

## 📌 Quick Summary of Golden Rules

1. **Test Runner:** Strictly `@playwright/test` Native Runner. Do NOT generate Cucumber/Gherkin features or step definitions.
2. **Page Objects:** Use **Inline Property Initialization** for all locators (`readonly myButton = this.page.locator(...)`).
3. **Methods:** Use `async` arrow functions for POM action methods (`action = async () => { ... }`).
4. **Fixtures:** Always use Dependency Injection from `@fixtures` (`import { test, expect } from "@fixtures";`). Do not manually instantiate page objects in tests with `new PageObject(page)`.
5. **No Wrappers:** Do not create Selenium-style wrapper methods for `click`, `fill`, or `wait` inside `BasePage`. Use Playwright's native locator methods.
6. **Locators:** Prioritize `getByRole()`, `getByLabel()`, and `[data-qa="..."]`.
7. **Test Data:** Store test data in `test-data/users.json` (or respective json files), never hardcoded in tests.

---

## 📚 Detailed Rules & Standards

For detailed coding conventions, project structure, locator priorities, and failure analysis procedures, see:
- [playwright-standards.md](file:///.agents/rules/playwright-standards.md)

