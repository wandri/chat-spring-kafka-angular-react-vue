import { When } from '@badeball/cypress-cucumber-preprocessor';
import { System, systemUrl } from './system';

When(/^I login into the (Angular|React|Vue) chat with the name "([^"]*)"$/, (system: System, name: string) => {
  cy.log(system);
  let url: string = systemUrl[system];
  cy.visit(url);

  cy.get('[data-cy="application-component"]').should('exist').contains('Welcome to the chat');
  cy.get('[data-cy="user-form"] input').type(name);
  cy.get('button[type="submit"]').click();
});
