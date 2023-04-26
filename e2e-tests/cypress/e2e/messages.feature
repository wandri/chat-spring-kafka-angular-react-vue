Feature: Message writing

  Scenario: I can write and read messages in the Angular chat
    When I login into the Angular chat with the name "Mark"
    When I send the message "Welcome, I'm Mark"
    Then The last message is "Welcome, I'm Mark"

  Scenario: I can write and read messages in the React chat
    When I login into the React chat with the name "Tom"
    When I send the message "Welcome, I'm Tom"
    Then The last message is "Welcome, I'm Tom"

  Scenario: I can write and read messages in the Vue chat
    When I login into the Vue chat with the name "Peter"
    When I send the message "Welcome, I'm Peter"
    Then The last message is "Welcome, I'm Peter"
