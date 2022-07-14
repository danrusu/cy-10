Feature: Calculator
  Scenario Outline: <operation>
    Given I visit "http://qatools.ro"
    When I click "Simple calculator with API"
    Then I should see "CALCULATE"
    When I "<operation>" <nr1> and <nr2>
    Then Result is "<result>"
    Examples:
        | nr1 | nr2 | operation      | result |
        | 11  | 22  | SUM            | 33     |
        | 25  | 5   | MULTIPLICATION | 125    |
        | 55  | 5   | DIVISION       | 11     |