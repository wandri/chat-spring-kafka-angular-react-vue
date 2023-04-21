import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then("I see the chat", ()=> {
  cy.get('[data-cy="message-component"]').should('exist');
});
