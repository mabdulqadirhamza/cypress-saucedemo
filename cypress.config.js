const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
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