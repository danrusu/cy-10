import { Given } from '@badeball/cypress-cucumber-preprocessor';

Given('I execute a custom command', () => {
  cy.logToTerminal('@this is a terminal logger');
});
