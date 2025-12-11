import { defineConfig, devices } from "@playwright/test";

const port = process.env.PORT ?? "4321";
const baseURL = process.env.BASE_URL ?? `http://localhost:${port}`;
const isCI = Boolean(process.env.CI);

export default defineConfig({
  forbidOnly: isCI,
  fullyParallel: true,
  projects: [
    {
      name: "chromium",
      use: devices["Desktop Chrome"],
    },
    {
      name: "firefox",
      use: devices["Desktop Firefox"],
    },
    {
      name: "webkit",
      use: devices["Desktop Safari"],
    },
  ],
  retries: isCI ? 2 : 0,
  testDir: "./e2e",
  use: { baseURL, trace: "on-first-retry" },
  webServer: {
    command: "astro preview",
    reuseExistingServer: isCI,
    timeout: 10 * 1000,
    url: baseURL,
  },
  ...(isCI && { workers: 1 }),
});
