describe('Graphql test', () => {
  it('Multiple graphql with same interceptor', () => {
    cy.visit('cypress/graphql.html');

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
});

function assertResponseId(expectedId) {
  return http => {
    const { id } = http.response.body;
    cy.log(id);
    expect(id).equals(expectedId);
  };
}
