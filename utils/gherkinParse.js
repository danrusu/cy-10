const parser = require('gherkin-parse');
const glob = require('glob');
const { readdir } = require('fs/promises');

async function getFrontEndFeaturesInfo() {
  return getFeaturesInfo(await getFrontEndFunctionalAreas());
}

async function getFrontEndFunctionalAreas() {
  return getFunctionalAreas('./src/features', functionalArea =>
    functionalArea.startsWith('FE_'),
  );
}

async function getFunctionalAreas(
  functionalAreasFolder,
  functionalAreasFilterFn = f => f,
) {
  return (await readdir(functionalAreasFolder))
    .filter(functionalAreasFilterFn)
    .map(functionalArea => `${functionalAreasFolder}/${functionalArea}`);
}

function tagsFilter(scenarioInfo, ...tags) {
  return tags.reduce(
    (filter, tag) => filter && scenarioInfo.tags.includes(tag),
    true,
  );
}

async function getFeaturesInfo(functionalAreas) {
  const getFeatureScenarioChildren = f =>
    f.feature.children.filter(child => child.type !== 'Background');

  const featuresInfoPromises = functionalAreas.map(async functionalArea => {
    const featureFiles = await getFeatureFiles(functionalArea);
    const features = featureFiles
      .map(gherkinToJson)
      .map(getFeatureScenarioChildren);
    return {
      functionalArea,
      features,
    };
  });
  const featuresInfo = await Promise.all(featuresInfoPromises);
  return featuresInfo.reduce((acc, { functionalArea, features }) => {
    acc[functionalArea] = features.map(featuresArray =>
      featuresArray.flatMap(getScenarioInfo),
    );
    return acc;
  }, {});
}

async function getFeatureFiles(functionalArea) {
  return getGlob(`${functionalArea}/**/*.feature`);
}

function gherkinToJson(featureFile) {
  try {
    return parser.convertFeatureFileToJSON(featureFile);
  } catch (error) {
    throw new Error(`${featureFile}: ${error.toString()})`);
  }
}

function getGlob(globPath) {
  return new Promise(resolve => glob(globPath, (_, result) => resolve(result)));
}

function getId(scenarioName) {
  return scenarioName.replace(/.*,\s*(TestCase-.*)/, '$1').trim();
}

function getRawScenarioInfo(scenario) {
  const id = getId(scenario.name);
  const { examples } = scenario;
  const type = scenario.name.includes('<TestCaseId>')
    ? 'DyamicScenarioOutline'
    : scenario.type;
  const tags = scenario.tags.map(getTagName);
  return { id, type, tags, examples };
}

// multiplies scenario information by examples
// returns [scenarioInfo]
function getScenarioInfo(scenario) {
  const rawScenarioInfo = getRawScenarioInfo(scenario);
  return spreadExamples(rawScenarioInfo);
}

const SPREAD_EXAMPLES = {
  Scenario: spreadSimpleScenario,
  ScenarioOutline: spreadScenarioOutline,
  DyamicScenarioOutline: spreadDynamicScenarioOutline,
};

function spreadExamples(scenario) {
  return SPREAD_EXAMPLES[scenario.type](scenario);
}

function spreadSimpleScenario(scenario) {
  const finalScenario = { ...scenario };
  delete finalScenario.examples;
  return finalScenario;
}

function spreadScenarioOutline(scenario) {
  return scenario.examples.reduce((acc, example, exampleIndex) => {
    const exampleTags = example.tags.map(getTagName);
    example.tableBody.forEach((_row, index) => {
      const info = {
        ...scenario,
        tags: [...scenario.tags, ...exampleTags],
        exampleIndex: `${exampleIndex}, ${index}`,
        examples: undefined,
      };
      delete info.examples;
      acc.push(info);
    });
    return acc;
  }, []);
}

function spreadDynamicScenarioOutline(scenario) {
  return scenario.examples.reduce((acc, example, exampleIndex) => {
    const exampleTags = example.tags.map(getTagName);
    const testCaseIdCellIndex = example.tableHeader.cells.findIndex(
      header => header.value === 'TestCaseId',
    );
    example.tableBody.forEach((row, index) => {
      const id = row.cells[testCaseIdCellIndex].value;
      const info = {
        ...scenario,
        id,
        tags: [...scenario.tags, ...exampleTags],
        exampleIndex: `${exampleIndex}, ${index}`,
      };

      delete info.examples;
      acc.push(info);
    });
    return acc;
  }, []);
}

function getTagName(tag) {
  return tag.name.slice(1).toLowerCase();
}

module.exports = {
  getFeaturesInfo,
  getFrontEndFeaturesInfo,
  getFunctionalAreas,
  getId,
  getScenarioInfo,
  tagsFilter,
};
