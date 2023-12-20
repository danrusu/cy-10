describe('Wait suite', () => {
  it('Wait for command output to contain "success"', () => {
    cy.task(
      'waitForExpectedValue',
      {
        supplierJsModule: './utils/command-result-supplier',
        //supplierArgs: ['echo "Tested with success"'], // uncomment to see the test pass, comment next line
        supplierArgs: ['echo "Failure"'],
        //supplierArgs: ['xyz'], // uncomment to see case of unknown command
        maxRetries: 3,
        stepTimeout: 2000,
      },
      { timeout: 60000 },
    ).then(result => {
      cy.log(result);
    });
  });
});
