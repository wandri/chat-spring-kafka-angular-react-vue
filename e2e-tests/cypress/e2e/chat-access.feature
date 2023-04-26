Feature: Access to the chat

  Scenario: I can login to the Angular chat and see the chat
    When I login into the Angular chat with the name "Mark"
    Then I see the chat

  Scenario: I can login to the React chat and see the chat
    When I login into the React chat with the name "Tom"
    Then I see the chat

  Scenario: I can login to the Vue chat and see the chat
    When I login into the Vue chat with the name "Peter"
    Then I see the chat
