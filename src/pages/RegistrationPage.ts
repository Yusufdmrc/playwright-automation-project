import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegistrationPage extends BasePage {
  // Step 1: Initial Signup section (located on /login page)
  readonly signupHeading = this.page.getByRole("heading", { name: "New User Signup!" });
  readonly signupNameInput = this.page.locator('input[data-qa="signup-name"]');
  readonly signupEmailInput = this.page.locator('input[data-qa="signup-email"]');
  readonly signupButton = this.page.locator('button[data-qa="signup-button"]');

  // Step 2: Account Information Form (/signup page)
  readonly accountInfoHeading = this.page.getByText("Enter Account Information", { exact: false });

  constructor(page: Page) {
    super(page);
  }

  // Starts the registration by entering name/email on /login
  startRegistration = async (name: string, email: string): Promise<void> => {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  };
}
