describe('Graphql test', () => {
  beforeEach(() => {
    cy.visit('cypress/graphql.html');
  });

  it('Multiple graphql with same interceptor', () => {
    cy.intercept('https://qatools.ro/gql', req => {
      const id = req.body.variables.id;
      req.reply({
        statusCode: 200,
        body: { id },
        delay: 100,
      });
    }).as('gql');

    // Trigger all 3 graphql requests
    cy.get('#gql1').click();
    cy.get('#gql2').click();
    cy.get('#gql3').click();

    // Wait for all requests!
    cy.wait('@gql').wait('@gql').wait('@gql');

    // Assert each intercept by index
    cy.get('@gql.1').then(assertResponseId('gql1'));
    cy.get('@gql.2').then(assertResponseId('gql2'));
    cy.get('@gql.3').then(assertResponseId('gql3'));

    // Assert from all intercepts array
    cy.get('@gql.all').then(intercepts => {
      intercepts.forEach((http, index) => {
        const { id } = http.response.body;
        expect(id).equals(`gql${index + 1}`); // index starts from 0
      });
    });
  });

  it('Multiple graphql with same interceptor using req.alias', () => {
    cy.intercept('https://qatools.ro/gql', req => {
      if (req.body.operationName == 'testOperation') {
        req.alias = 'gql';
        req.reply({
          statusCode: 200,
          body: { id: req.body?.variables?.id },
          delay: 100,
        });
      }
    });

    // Trigger all 3 graphql requests
    cy.get('#gql1').click();
    cy.get('#gql2').click();
    cy.get('#gql3').click();

    // Wait for all requests!
    [1, 2, 3].forEach(index => {
      cy.wait('@gql').then(assertResponseId(`gql${index}`));
    });
  });
});

function assertResponseId(expectedId) {
  return http => {
    const { id } = http.response.body;
    cy.log(id);
    expect(id).equals(expectedId);
  };
}
