import { AppComponent } from "./app.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { UserService } from "./user/user.service";
import { MessagesComponent } from "./messages/messages.component";
import { MockComponent } from "ng-mocks";

const imports = [CommonModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule];
const providers = [UserService];
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

  it("should display the action button when a name is written", () => {
    cy.mount(AppComponent, config);
    cy.get(`button[type="submit"]`).should("not.exist");
    cy.get("input").type("mike");
    cy.get(`button[type="submit"]`).should("exist");
  });

  it("should send a request with the name when clicking on the action button", () => {
    const name = "Mike";
    const user = {
      user: "michael",
      id: "some-id"
    };
    cy.mount(AppComponent, config).then((wrapper) => {
      cy.stub(wrapper.component.userService, "getUser", () => Promise.resolve(user)).as("getUser");
      return cy.wrap(wrapper).as("angular");
    });
    cy.get("input").type(name);
    cy.get(`button[type="submit"]`).click();
    cy.get(`@getUser`).should("have.been.calledWith", name);
    cy.get(`app-messages`).should("exist");
  });
});
