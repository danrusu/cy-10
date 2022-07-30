Feature: Dummy11 feature for testing Gherkin parsing

  Background:
    Given I have a background

  @regression @gb @es
  Scenario: Simple scenario TestCase-T0111
    When Demo

  @regression @sanity
  Scenario Outline: Scenario outline TestCase-T0112
    When Demo
    @gb
    Examples:
      | Data |
      | 1    |
      | 2    |
    @es
    Examples:
      | Data |
      | 3    |
      | 4    |

  @regression @sanity
  Scenario Outline: Dynamic scenario outline <TestCaseId>
    When Demo
    @gb
    Examples:
      | Data | TestCaseId     |
      | 5    | TestCase-T0113 |
    @es
    Examples:
      | Data | TestCaseId     |
      | 6    | TestCase-T0114 |
