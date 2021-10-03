/// <reference types="cypress" />

context("Buttons", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/example/buttons");
  });

  it("Click basic button", () => {
    cy.contains("Basic Button").click();
  });

  it("Click download button", () => {
    cy.contains("Download").click();
  });
});
