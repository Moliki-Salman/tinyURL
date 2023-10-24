const UserController = require("../../controllers/user-controller");
const UserModel = require("../../models/user-model")

jest.mock("../../models/user-model");

describe("signup", () => {
  it("should return a 400 status response if a user already exist", async () => {
    UserModel.findOne = jest.fn().mockResolvedValue({});
    
    const req = {
      body: {
       firstname: "Sarah",
       lastname: "Morgan",
       email: "sarah.m@gmail.com",
       password: "password0923"
      },
    };
 

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

// the error says userController is not a function
    await UserController(req, res); 

    expect(UserModel.findOne).toHaveBeenCalledWith({ email: "sarah.m@gmail.com" });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith("user already exists")
  });

})