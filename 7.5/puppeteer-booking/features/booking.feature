Feature: Booking tickets

  Scenario: Should book one seat
    Given user opened the hall of seance 1 on day 3
    When user selects 1 free seats
    And user clicks the book button
    Then user sees the ticket title "Вы выбрали билеты"

  Scenario: Should book two seats
    Given user opened the hall of seance 1 on day 3
    When user selects 2 free seats
    And user clicks the book button
    Then user sees 2 seats in the ticket

  Scenario: Should not book without selected seat
    Given user opened the hall of seance 1 on day 3
    Then the book button is disabled