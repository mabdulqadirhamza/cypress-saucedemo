const { defineConfig } = require('cypress')
const dotenv = require('dotenv')

dotenv.config()

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
    }, 
    env: {
      username:        process.env.CYPRESS_USERNAME,
      password:        process.env.CYPRESS_PASSWORD,
      invalidUsername: process.env.CYPRESS_INVALID_USERNAME,
      invalidPassword: process.env.CYPRESS_INVALID_PASSWORD,
    },
    setupNodeEvents(on, config) {
      return config
    },
  },
})