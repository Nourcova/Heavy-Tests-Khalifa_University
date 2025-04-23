const { defineConfig } = require("cypress");
const { beforeRunHook } = require('cypress-mochawesome-reporter/lib');

module.exports = defineConfig({
  e2e: {
    baseUrl:"https://test2.ku-ai-instructor.azzammourad.org",
    setupNodeEvents(on, config) {
      on('before:run', async (details) => {
        await beforeRunHook(details);
      });
    },
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/report',
    charts: true,
    reportPageTitle: 'Khalifa Univercity Automation',
    embeddedScreenshots: true,
    inlineAssets: true,
    video: true,
    saveAllAttempts: false,
  },
});
