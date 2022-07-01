Feature: Sessions
  Scenario: Navigate with sessions
    Given I visit "http://qatools.ro"
    When I get cookie "session_id"

    And I set session "first" for url "http://qatools.ro"
    And I get cookie "session_id"

    And I set session "second" for url "http://qatools.ro"
    And I get cookie "session_id"

    And I use session "first" for url "http://qatools.ro"
    And I get cookie "session_id"

    And I use session "second" for url "http://qatools.ro"
    And I get cookie "session_id"

  Scenario: Navigate without sessions
    Given I visit "http://qatools.ro"
    When I get cookie "session_id"
