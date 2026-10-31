import { Page } from "@playwright/test";

export class Navbar {
  readonly homeLink = this.page.getByRole("link", { name: "Home" });
  readonly productsLink = this.page.getByRole("link", { name: "Products" });
  readonly cartLink = this.page.getByRole("link", { name: "Cart" });
  readonly loginLink = this.page.getByRole("link", { name: "Signup / Login" });
  readonly logoutLink = this.page.getByRole("link", { name: "Logout" });
  readonly deleteAccountLink = this.page.getByRole("link", { name: "Delete Account" });
  readonly loggedInAsUser = this.page.getByText(/Logged in as/i);

  constructor(private readonly page: Page) {}
}
