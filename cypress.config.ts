import { defineConfig } from 'cypress'

export default defineConfig({
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: './cypress/integration/**/*.{ts,tsx}',
  },
  fileServerFolder: '.',
  fixturesFolder: './cypress/fixtures',
  projectId: 'srd6dw',
  screenshotsFolder: './cypress/reports/screenshots',
  video: true,
  videosFolder: './cypress/reports/videos',
})
