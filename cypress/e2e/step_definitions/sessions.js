const {
  Given,
  When,
  Then,
} = require('@badeball/cypress-cucumber-preprocessor');

Given('I set session {string} for url {string}', (sessionId, url) => {
  cy.session(sessionId, () => {
    cy.visit(url);
    cy.setCookie('session_id', `${sessionId}`);
  });
  cy.visit(url);
});

When('I use session {string} for url {string}', (sessionId, url) => {
  cy.session(sessionId);
  cy.visit(url);
  cy.getCookie('session_id').then(c => cy.log(c.value));
});

When('I get cookie {string}', cookieName => {
  cy.getCookie(cookieName).then(c => cy.log(c?.value));
});
