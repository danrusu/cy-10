const { defineConfig } = require('cypress');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const browserify = require('@badeball/cypress-cucumber-preprocessor/browserify');

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on('file:preprocessor', browserify.default(config));
  on('task', {
    logToTerminal(message) {
      console.log(message);
      return null;
    },
  });
  return config;
}

const configuration = {
  supportFile: 'cypress/support/e2e.js',
  specPattern: 'cypress/e2e/{features/**/*.feature,spec/**/*.js}',
  experimentalSessionAndOrigin: true,
  video: false,
  screenshotOnRunFailure: false,
};

module.exports = defineConfig({
  e2e: {
    ...configuration,
    setupNodeEvents,
  },
});
