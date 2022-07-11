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
    expect(currentTest.titlePath).to.deep.eq([suiteName, testName2]);
  });
});
