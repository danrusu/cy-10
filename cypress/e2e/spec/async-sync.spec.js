let customKey = 0;

function setCustomKey(val) {
  cy.request('https://qatools.ro/testfiles/x.json').then(response => {
    customKey = parseInt(response.body.operation) + val;
  });
}

describe('Graphql test', () => {
  beforeEach(() => {
    cy.visit('cypress/graphql.html');
  });

  it('test1', () => {
    cy.intercept('https://qatools.ro/gql', { key: 1234 }).as('gql');

    cy.get('#gql1').click();

    cy.wait('@gql').then(xhr => {
      setCustomKey(xhr.response.body.key);
      console.log(customKey);
    });

    cy.wrap(null).then(() => {
      console.log('test1: from wrap(null) context', customKey);
      expect(customKey).equals(1235);
    });
  });

  it('test2', () => {
    cy.wrap(null).then(() => {
      console.log('test2: from wrap(null) context', customKey);
      expect(customKey).equals(1235);
    });
  });
});
