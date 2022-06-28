const {
  Given,
  When,
  Then,
} = require('@badeball/cypress-cucumber-preprocessor');

Given('I visit {string}', url => {
  cy.visit(url);
});

When('I click {string}', text => {
  cy.contains(text).click();
});

Then('I should see {string}', text => {
  cy.contains(text, { timeout: 3000 });
});
