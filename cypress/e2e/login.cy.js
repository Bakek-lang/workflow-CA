/// <reference types="Cypress" />

describe("Login Functionality", () => {
  const validCredentials = {
    email: "valid@stud.noroff.no",
    password: "validPassword",
  };

  const invalidCredentials = {
    email: "invalid@stud.no",
    password: "invalid",
  };

  beforeEach(() => {
    cy.visit("/");
    cy.wait(500);
  });

  it("should log in with the login form with valid credentials", () => {
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
  });

  it("should not submit the login form with invalid credentials and is shown a message.", () => {
    cy.intercept(
      "POST",
      "https://nf-api.onrender.com/api/v1/social/auth/login",
      {
        statusCode: 401,
        body: {
          message: "Invalid credentials",
        },
      },
    );
    cy.getByCy("login-button-modal").click();
    cy.wait(500);
    cy.getByCy("email-input").click();
    cy.getByCy("email-input").type(invalidCredentials.email);
    cy.getByCy("password-input").type(invalidCredentials.password);
    cy.getByCy("login-button").click();

    cy.getByCy("user-name-display").should("not.exist");
    cy.window().its("localStorage.token").should("not.exist");
  });
});
