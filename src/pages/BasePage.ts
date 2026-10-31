import { Page } from "@playwright/test";
import { Navbar } from "./components/Navbar";

export abstract class BasePage {
  protected readonly page: Page;
  readonly navbar: Navbar;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new Navbar(page);
  }

  // Navigate to a specific path relative to baseURL
  navigateTo = async (path: string = "/"): Promise<void> => {
    await this.page.goto(path);
  };

  // Get current page title
  getPageTitle = async (): Promise<string> => {
    return await this.page.title();
  };

  // Get current URL
  getCurrentUrl = (): string => {
    return this.page.url();
  };
}
