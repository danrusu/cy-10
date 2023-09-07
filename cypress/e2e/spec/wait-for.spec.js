describe('Wait suite', () => {
  it('Wait test', () => {
    cy.task(
      'waitForExpectedValue',
      {
        supplierJsModule: './utils/api-check-supplier',
        supplierArgs: ['http://localhost:1113/results/3'],
        maxRetries: 3,
        stepTimeout: 100,
      },
      { timeout: 60000 },
    ).then(result => {
      cy.log(result.toString());
    });
  });
});
