describe('Wait suite', () => {
  it('Wait for command output to contain "success"', () => {
    cy.task(
      'waitForExpectedValue',
      {
        supplierJsModule: './utils/command-result-supplier',
        //supplierArgs: ['echo "Tested with success"'], // uncomment to see the test pass, comment next line
        supplierArgs: ['echo "Failure"'],
        maxRetries: 5,
        stepTimeout: 2000,
      },
      { timeout: 60000 },
    ).then(result => {
      cy.log(result);
    });
  });
});
