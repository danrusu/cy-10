const locators = {
  firstNumberInput: '#nr1',
  secondNumberInput: '#nr2',
  calculateBtn: 'button[name="calculate"]',
  operationSelect: '.operation-selector',
  operationOption: '.operation-selector option',
  result: '[data-qa-test="result"]',
};

const elements = Object.entries(locators).reduce(
  (acc, [locatorName, locator]) => {
    acc[locatorName] = () => cy.get(locator);
    return acc;
  },
  {},
);

const api = {
  typeFirstNumber(nr) {
    elements.firstNumberInput().type(nr);
  },
  typeSecondNumber(nr) {
    elements.secondNumberInput().type(nr);
  },
  calculate() {
    elements.calculateBtn().click();
  },
  selectOperation(operationName) {
    elements.operationSelect().select(operationName);
  },
  result() {
    return elements.result().invoke('text');
  },
};

module.exports = api;
