const UserController = require("../../controllers/user-controller");
const UserModel = require("../../models/user-model");

jest.mock("../../models/user-model");

const validUser = {
  firstname: "Sarah",
  lastname: "Morgan",
  email: "sarah.m@gmail.com",
  password: "password0923",
};

describe("signup", () => {
  describe("when a user already exist", () => {
    it("should return a 400 status response", async () => {
      UserModel.findOne = jest.fn().mockResolvedValue({ validUser });

      const req = { body: validUser };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await UserController.signup(req, res);

      expect(UserModel.findOne).toHaveBeenCalledWith({
        email: "sarah.m@gmail.com",
      });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "User already exist" });
    });
  });

  describe("when finding a user fails", () => {
    it("should return 500 status", async () => {
      UserModel.findOne = jest.fn().mockRejectedValue(null);

      const req = { body: validUser };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await UserController.signup(req, res);

      expect(UserModel.findOne).toHaveBeenCalledWith({
        email: "sarah.m@gmail.com",
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server error",
        error: "null",
      });
    });
  });
});
