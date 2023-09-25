import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    chromeWebSecurity: false,
    viewportWidth: 1440,
    viewportHeight: 900,
    setupNodeEvents(on, config) {
    },
  },
})
