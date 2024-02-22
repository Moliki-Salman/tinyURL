const authenticateUser = require("../../config/auth");
const jwt = require("jsonwebtoken");

jest.mock("jsonwebtoken");
const userId = "user99";

describe("authenticateUser", () => {
  describe("valid token", () => {
    it("should call next()", async () => {
      jwt.verify.mockReturnValue(userId);
      const req = {
        headers: {
          authorization: "Bearer fakeValidToken",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();
      await authenticateUser(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(req.user).toEqual(userId);
    });
  });

  describe("invalid token", () => {
    it("should return status code 401", async () => {
      jwt.verify.mockImplementation(() => {
        throw new Error("fakeInValidToken");
      });
      const req = {
        headers: {
          authorization: "Bearer fakeInValidToken",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();
      await authenticateUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Authentication failed",
      });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("when no token is provided", () => {
    it("should return a status code 404", async () => {
      const req = {
        headers: {
          authorization: "",
        },
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();
      await authenticateUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "valid token required",
      });
    });
  });
});
