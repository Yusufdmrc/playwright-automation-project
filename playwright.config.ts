import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  // Directory where test files are looked for
  testDir: "./tests",

  // Run all test files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI 2 times, and locally 1 time for failed tests
  retries: process.env.CI ? 2 : 1,

  // Opt out of parallel tests on CI (sequential with 1 worker), auto-balance based on CPU locally
  workers: process.env.CI ? 1 : undefined,

  // Test reporters
  reporter: [
    ["list"], // Terminal output
    ["html", { outputFolder: "reports/html", open: "never" }], // HTML report
  ],

  use: {
    baseURL: process.env.BASE_URL || "https://automationexercise.com",

    // Headless mode
    headless: process.env.HEADLESS !== "false",

    // Screen resolution / Viewport size
    viewport: { width: 1280, height: 720 },

    // Capture screenshot automatically only on failure
    screenshot: "only-on-failure",

    // Record video on failure
    video: "retain-on-failure",

    // Trace: records all steps, DOM snapshots, and network requests on failure
    trace: "retain-on-failure",
  },

  // Configure projects for major browsers and devices
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
    // {
    //   name: "Mobile Chrome",
    //   use: { ...devices["Pixel 5"] },
    // },
  ],
});
