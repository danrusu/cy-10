let customKey;

function setCustomKey(val) {
  customKey = val;
}

describe('Graphql test', () => {
  beforeEach(() => {
    cy.visit('cypress/graphql.html');
  });

  it('test1', () => {
    cy.intercept('https://qatools.ro/gql', req => {
      const id = req.body.variables.id;
      req.reply({
        statusCode: 200,
        body: { id, key: 1234 },
        delay: 100,
      });
    }).as('gql');

    cy.get('#gql1').click();
    cy.wait('@gql').then(xhr => {
      setCustomKey(xhr.response.body.key);
      console.log(customKey);
    });

    cy.wrap(null).then(() => {
      console.log('test1: from wrap(null) context', customKey);
      expect(customKey).equals(1234);
    });
  });

  it('test2', () => {
    cy.wrap(null).then(() => {
      console.log('test2: from wrap(null) context', customKey);
      expect(customKey).equals(1234);
    });
  });
});
