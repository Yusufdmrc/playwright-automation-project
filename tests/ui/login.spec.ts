import { test, expect } from "@fixtures";
import users from "@test-data/users.json";

test.describe("Login Functionality", () => {
  test("TC01 - User should login successfully with valid credentials", async ({ loginPage, page }) => {
    // 1. Navigate to login page
    await loginPage.goto();

    // 2. Verify 'Login to your account' is visible
    await expect(loginPage.loginHeading).toBeVisible();

    // 3. Fill email, password and submit
    await loginPage.login(users.validUser.email, users.validUser.password);

    // 4. Verify user is redirected to home page
    await expect(page).toHaveURL("https://automationexercise.com/");

    // 5. Verify navbar reflects authenticated user state
    await expect(loginPage.navbar.loggedInAsUser).toBeVisible();
    await expect(loginPage.navbar.loggedInAsUser).toContainText(users.validUser.name);
    await expect(loginPage.navbar.logoutLink).toBeVisible();
  });
});

