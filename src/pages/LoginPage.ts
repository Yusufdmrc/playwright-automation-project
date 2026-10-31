import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  // Login Form Locators
  readonly loginHeading = this.page.getByRole("heading", { name: "Login to your account" });
  readonly emailInput = this.page.locator('input[data-qa="login-email"]');
  readonly passwordInput = this.page.locator('input[data-qa="login-password"]');
  readonly loginButton = this.page.locator('button[data-qa="login-button"]');
  readonly errorMessage = this.page.locator('form[action="/login"] p');

  constructor(page: Page) {
    super(page);
  }

  // Navigation
  goto = async (): Promise<void> => {
    await this.navigateTo("/login");
  };

  // Actions
  login = async (email: string, password: string): Promise<void> => {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  };
}
