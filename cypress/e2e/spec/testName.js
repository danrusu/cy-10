const suiteName = 'Suite1';
const testName1 = 'Should have a good test name';
const testName2 = 'Should have a good test path';

describe(suiteName, () => {
  //
  it(testName1, () => {
    const currentTestName = Cypress.currentTest.title;
    cy.log(`Test name: ${currentTestName}`);
    expect(currentTestName).to.eq(testName1);
  });

  it(testName2, () => {
    const { currentTest } = Cypress;
    cy.log(`Test path: ${JSON.stringify(currentTest.titlePath)}`);
    cy.logToTerminal(
      `Test path: ${JSON.stringify(currentTest.titlePath, null, 2)}`,
    );
    expect(currentTest.titlePath).to.deep.eq([suiteName, testName2]);
  });

  it('Has spec name', () => {
    cy.log(JSON.stringify(Cypress.spec));
    cy.logToTerminal(JSON.stringify(Cypress.spec, null, 2));
    expect(Cypress.spec.fileName).to.eq('testName');
  });
});
