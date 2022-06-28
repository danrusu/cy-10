Feature: Calculator
  Scenario: Navigate to Calculator
    Given I visit "http://qatools.ro"
    When I click "Simple calculator with API"
    Then I should see "CALCULATE"