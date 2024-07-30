import { logout } from "./logout";
import { remove } from "../../storage";

jest.mock("../../storage", () => ({
  remove: jest.fn(),
}));

describe("Logout functionality", () => {
  beforeEach(function () {
    jest.clearAllMocks();
  });

  it("should clear the token from browser storage", () => {
    logout();

    expect(remove).toHaveBeenCalledWith("token");
  });
});
