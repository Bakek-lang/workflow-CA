jest.mock("../../storage", () => ({
  save: jest.fn(),
}));

jest.mock("../headers", () => ({
  headers: jest.fn(() => ({})),
}));

global.fetch = jest.fn(() => {
  return Promise.resolve({
    ok: true,
    json: () => {
      return Promise.resolve({
        accessToken: "fake-token",
        name: "John Doe",
      });
    },
  });
});

import { login } from "./login";
import { save } from "../../storage/index.js";
import { apiPath } from "../constants.js";
import { headers } from "../headers.js";

describe("Login functionality", () => {
  beforeEach(function () {
    fetch.mockClear();
    save.mockClear();
    headers.mockClear();
  });

  it("should call fetch with the correct arguments", async () => {
    const email = "test@example.com";
    const password = "password";

    const result = await login(email, password);

    expect(fetch).toHaveBeenCalledWith(`${apiPath}/social/auth/login`, {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: headers("application/json"),
    });
  });

  it("should save token and profile on successful login", async () => {
    const email = "test@example.com";
    const password = "password";

    const result = await login(email, password);

    expect(save).toHaveBeenCalledWith("token", "fake-token");
    expect(save).toHaveBeenCalledWith("profile", { name: "John Doe" });
    expect(result).toEqual({ name: "John Doe" });
  });
});
