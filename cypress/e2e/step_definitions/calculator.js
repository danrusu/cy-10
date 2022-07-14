const {
  Given,
  When,
  Then,
} = require('@badeball/cypress-cucumber-preprocessor');

const simpleCalculatorPage = require('../../support/pom/qatools/simpleCalculator');

Given('I visit {string}', url => {
  cy.visit(url);
});

When('I click {string}', text => {
  cy.contains(text).click();
});

Then('I should see {string}', text => {
  cy.contains(text, { timeout: 3000 });
});

When('I {string} {int} and {int}', (operation, nr1, nr2) => {
  simpleCalculatorPage.typeFirstNumber(nr1);
  simpleCalculatorPage.typeSecondNumber(nr2);
  simpleCalculatorPage.selectOperation(operation.toUpperCase());
  simpleCalculatorPage.calculate();
});

Then('Result is {string}', result => {
  simpleCalculatorPage.result().should('eq', result);
});
