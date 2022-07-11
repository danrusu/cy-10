const { Given, And } = require('@badeball/cypress-cucumber-preprocessor');

Given('I get the scenario name', () => {
  const currentTestName = Cypress.currentTest.title;
  cy.log(`Scenario name: ${currentTestName}`);
  expect(currentTestName).to.eq('Scenario name demo');
});

And('I get the scenario path', () => {
  const { titlePath } = Cypress.currentTest;
  cy.log(`Scenario path: ${JSON.stringify(titlePath)}`);
  expect(titlePath).to.deep.eq(['Feature name demo', 'Scenario name demo']);
});
