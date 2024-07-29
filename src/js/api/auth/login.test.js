import { login } from "./login";
import { save } from "../../storage/index.js";
import { apiPath } from "../constants.js";
import { headers } from "../headers.js";

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

describe("Login functionality", () => {
  beforeEach(function () {
    jest.clearAllMocks();
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
    expect(save).toHaveBeenCalledWith("token", "fake-token");
    expect(save).toHaveBeenCalledWith("profile", { name: "John Doe" });
    expect(result).toEqual({ name: "John Doe" });
  });
});
