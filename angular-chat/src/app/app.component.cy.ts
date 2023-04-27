import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { UserService } from "./user/user.service";
import { MessagesComponent } from "./messages/messages.component";
import { MockComponent, MockProvider } from "ng-mocks";
import { User } from "./user/user.interface";

const user: User = {
  name: "michael",
  id: "some-id"
};

const imports = [CommonModule, FormsModule, ReactiveFormsModule];
const providers = [MockProvider(UserService, { getUser: () => Promise.resolve(user) })];
const config = {
  providers,
  imports,
  declarations: [MockComponent(MessagesComponent)]
};

describe("App component", () => {
  it("mounts", () => {
    cy.mount(AppComponent, config);
  });

  it("should not display the message by default", () => {
    cy.mount(AppComponent, config);
    cy.get("app-messages").should("not.exist");
  });

  it("The input should be focused by default", () => {
    cy.mount(AppComponent, config);
    cy.get("input").should("be.focused");
  });

  it("should display the action button when a name is written", () => {
    cy.mount(AppComponent, config);
    cy.get(`button[type="submit"]`).should("not.exist");
    cy.get("input").type("mike");
    cy.get(`button[type="submit"]`).should("exist");
  });

  describe("When clicking on the action button, when the name is filled", () => {
    const name = "Mike";
    beforeEach(() => {
      cy.mount(AppComponent, config).then((wrapper) => {
        cy.spy((wrapper.component as any).userService, "getUser").as("getUser");
        return cy.wrap(wrapper).as("angular");
      });
      cy.get("input").type(name);
      cy.get(`button[type="submit"]`).click();
    });

    it("should send a request with the name ", () => {
      cy.get(`@getUser`).should("have.been.calledWith", name);
    });

    it("should not display the user form but the message instead", () => {
      cy.get(`app-messages`).should("exist");
      cy.get(`.userForm`).should("not.exist");
    });
  });
});
