const { Given, And } = require('@badeball/cypress-cucumber-preprocessor');

Given('I get the scenario name', () => {
  const currentTestName = Cypress.currentTest.title;
  cy.log(`Scenario name: ${currentTestName}`);
  cy.logToTerminal(`Scenario name: ${currentTestName}`);
  expect(currentTestName).to.eq('Scenario name demo');
});

And('I get the scenario path', () => {
  const { titlePath } = Cypress.currentTest;
  cy.log(`Scenario path: ${JSON.stringify(titlePath)}`);
  cy.logToTerminal(`Scenario path: ${JSON.stringify(titlePath)}`);
  expect(titlePath).to.deep.eq(['Feature name demo', 'Scenario name demo']);
});

And('Test has spec name', () => {
  cy.log(JSON.stringify(Cypress.spec));
  cy.logToTerminal(JSON.stringify(Cypress.spec, null, 2));
  expect(Cypress.spec.fileName).to.eq('testName');
});
