/// <reference types="Cypress" />

describe("Logout Functionality", () => {
  const validCredentials = {
    email: "valid@stud.noroff.no",
    password: "validPassword",
  };

  beforeEach(() => {
    cy.visit("/");
    cy.wait(500);
  });

  it("should log out the user with the logout button", () => {
    cy.intercept(
      "POST",
      "https://nf-api.onrender.com/api/v1/social/auth/login",
      {
        statusCode: 200,
        body: {
          name: "valid",
          email: "valid@stud.noroff.no",
          banner: null,
          avatar: "",
          accessToken: "token123",
        },
      },
    ).as("login");
    cy.getByCy("login-button-modal").click();
    cy.wait(500);
    cy.getByCy("email-input").click();
    cy.getByCy("email-input").type(validCredentials.email);
    cy.getByCy("password-input").type(validCredentials.password);
    cy.getByCy("login-button").click();

    cy.wait("@login");
    cy.window().its("localStorage.token").should("exist");
    cy.getByCy("user-name-display").should("contain", "valid");

    cy.getByCy("logout-button").click();

    cy.window().its("localStorage.token").should("not.exist");
    cy.getByCy("user-name-display").should("not.exist");
  });
});
