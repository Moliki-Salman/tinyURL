const UserController = require("../../controllers/user-controller");
const UserModel = require("../../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("../../models/user-model");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

const validUser = {
  firstname: "Sarah",
  lastname: "Morgan",
  email: "sarah.m@gmail.com",
  password: "password0923",
};

describe("signup", () => {
  describe("when a user already exist", () => {
    it("should return a 400 status response", async () => {
      UserModel.findOne = jest.fn().mockResolvedValue(validUser);

      const req = { body: validUser };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await UserController.signup(req, res);

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

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server error",
        error: null,
      });
    });
  });

  describe("when no user is found", () => {
    it("should create a user and return a 201 status code", async () => {
      UserModel.findOne = jest.fn().mockResolvedValue(null);
      UserModel.create = jest.fn().mockResolvedValue(validUser);

      const req = { body: validUser };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      bcrypt.hash.mockResolvedValue("fakeHashedPassword");
      jwt.sign.mockReturnValue("fakeToken");

      await UserController.signup(req, res);

      expect(jwt.sign).toHaveBeenCalledWith(
        { email: "sarah.m@gmail.com" },
        process.env.SECRET_KEY
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "successful",
        user: {
          email: "sarah.m@gmail.com",
          firstname: "Sarah",
          lastname: "Morgan",
          token: "fakeToken",
        },
      });
    });
  });
});

describe("login", () => {
  describe("when user password are invalid", () => {
    it("should return a status response 400", async () => {
      const mockedUser = {
        email: "sarah.m@gmail.com",
        password: "invalidpassword",
      };
      const req = { body: mockedUser };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      UserModel.findOne = jest.fn().mockResolvedValue(mockedUser);
      bcrypt.compare.mockResolvedValue(false);

      await UserController.login(req, res);

      expect(bcrypt.compare).toHaveBeenCalledWith(
        "invalidpassword",
        "invalidpassword"
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
    });
  });
  /*

  when a user has an invalid username and password 
  when logining a user fails. 
  create a user 

   */
});
