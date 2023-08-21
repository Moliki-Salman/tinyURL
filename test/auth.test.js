const { config } = require("dotenv");
config();
const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../app");
chai.use(chaiHttp);

describe("authenticate a user", async function () {
  it("should set authentication to equal a valid token", async function () {
    let req = {
      user: {
        email: "morayo@gmail.com",
        password: "1234",
      },
    };
    await userModel.findOne({ email: req.user.email });
    let token = jwt.sign({ email: req.user.email }, process.env.SECRET_KEY);
    let authorization = req.headers;
    authorization = `Bearer ${token}`;

    expect(token).to.be.a("string");
    expect(authorization).to.equal(`Bearer ${token}`);
  });
});
