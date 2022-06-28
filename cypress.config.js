const { defineConfig } = require('cypress');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const browserify = require('@badeball/cypress-cucumber-preprocessor/browserify');

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on('file:preprocessor', browserify.default(config));
  return config;
}

const configuration = {
  specPattern: '**/*.feature',
  video: false,
  screenshotOnRunFailure: false,
  supportFile: false,
};

module.exports = defineConfig({
  e2e: {
    ...configuration,
    setupNodeEvents,
  },
});
