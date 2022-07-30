const { expect } = require('chai');
const { describe } = require('mocha');
const {
  getFeaturesInfo,
  getFunctionalAreas,
} = require('../../utils/gherkinParse');

describe('scripts/gherkinParse.js', () => {
  it('Test getFeaturesInfo', async () => {
    const functionalAreas = await getFunctionalAreas(
      'test/utils/mock/gherkinParse/features',
    );
    const EXPECTED = require('./mock/gherkinParse/expected.json');

    const functionalAreasFeaturesInfo = await getFeaturesInfo(functionalAreas);
    expect(functionalAreasFeaturesInfo).deep.equals(EXPECTED);
  });
});
