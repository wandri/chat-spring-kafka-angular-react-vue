import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('I send the message {string}', (message: string) => {
  cy.get('[data-cy="message-form"] input').type(message);
  cy.get('[data-cy="message-form"] button').click();
});

Then('The last message is {string}', (message: string) => {
  cy.get('[data-cy="message"]').last().should('contain.text', message);
});
