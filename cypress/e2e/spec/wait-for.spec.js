describe('Wait suite', () => {
  it('Wait test', () => {
    cy.task(
      'waitForApiResponse',
      {
        url: 'http://localhost:1113/results/5',
        maxRetries: 5,
        stepTimeout: 1000,
      },
      { timeout: 10000 },
    ).then(result => {
      cy.log(result.toString());
    });
  });
});
