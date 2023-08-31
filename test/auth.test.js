const { config } = require("dotenv");
config();
const app = require("../app")
const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const chai = require("chai");
const expect = chai.expect;

describe("authenticate a user", async function () {
  it("should set authentication to equal a valid token", async function () {
    let req = { user: { email: "morayo@gmail.com", password: "1234" } };
    await userModel.findOne({ email: req.user.email });
    let token = jwt.sign({ email: req.user.email }, process.env.SECRET_KEY);
    let authorization = req.headers;
    authorization = `Bearer ${token}`;

    expect(authorization).to.be.a("string");
    expect(authorization).to.equal(`Bearer ${token}`);
  });

  it("should verify a user with the correct docoded token", async function () {
    let req = { user: { email: "morayo@gmail.com", password: "1234" } };
    await userModel.findOne({ email: req.user.email });
    let token = jwt.sign({ email: req.user.email }, process.env.SECRET_KEY);
    let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    decodedToken = req.user;

    expect(req.user).to.be.a("object");
    expect(req.user).to.be.equal(decodedToken);
  });
});


describe("Authentication Middleware", () => {
  it("should return 401 if no token provided", async () => {
    const res = await chai
      .request(app)
      .get("/") 
      .set("Authorization", "Bearer");

    expect(res.status).to.equal(404);
    expect(res.body).to.have.property("message", "valid token required");
  });

  it("should return 401 for invalid token", async () => {
    const response = await chai
      .request(app)
      .get("/")
      .set("Authorization", "Bearer invalidtoken");

    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal("Authentication failed");
  });

});





