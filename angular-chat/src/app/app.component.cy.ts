import { AppComponent } from "./app.component";

describe("App component", () => {
  it("mounts", () => {
    cy.mount(AppComponent);
  });
});
