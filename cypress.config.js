const { defineConfig } = require('cypress');
// const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
// const browserify = require('@badeball/cypress-cucumber-preprocessor/browserify');
const { waitForExpectedValue, getResults } = require('./utils/wait');

async function setupNodeEvents(on, config) {
  // await preprocessor.addCucumberPreprocessorPlugin(on, config);
  // on('file:preprocessor', browserify.default(config));
  on('task', {
    logToTerminal(message) {
      console.log(`@@@ ${message}`);
      return null;
    },
    waitForApiResponse({
      url,
      requestOptions = {},
      maxRetries = 1,
      stepTimeout = 1000,
    }) {
      return waitForExpectedValue({
        valueSupplierFn: () => getResults(url, requestOptions),
        // HARDCODED - cypress limitation - cannot pass functions values in a task argument
        valueExpectedConditionFn: res => res.length > 0,
        maxRetries,
        stepTimeout,
      });
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
  chromeWebSecurity: false,
  hideXHR: true, // custom
};

module.exports = defineConfig({
  e2e: {
    ...configuration,
    setupNodeEvents,
  },
});
