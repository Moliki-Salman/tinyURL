const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../app");
chai.use(chaiHttp);

//signup a user, create the user and authenticate the user
describe("signup up a  new user", async function () {
  it("should create a new user ", function () {
    let user = {
      firstname: "Morayo",
      lastname: "Afolabi",
      email: "morayo@gmail.com",
      password: "1234",
    };

    bcrypt.hash(user.password, 10, async function (err, hashedPassword) {
      if (err) {
        throw new Error("error", { cause: err });
      }
      let createdUser = await userModel.create({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: hashedPassword,
      });
      expect(createdUser).to.exist;
      expect(createdUser.firstname).to.equal(user.firstname);
      expect(createdUser.lastname).to.equal(user.lastname);
      expect(createdUser.email).to.equal(user.email);
      expect(createdUser.password).to.equal(hashedPassword);
    });
  });

  it("should register a new user with jwt", async function () {
    let user = {
      firstname: "Morayo",
      lastname: "Afolabi",
      email: "morayo@gmail.com",
      password: "1234",
    };

    bcrypt.hash(user.password, 10, async function (err, hashedPassword) {
      if (err) {
        throw new Error("error", { cause: err });
      }
      await userModel.create({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: hashedPassword,
      });
      const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);

      chai
        .request(app)
        .post("/user/signup")
        .send(user)
        .end((err, res) => {
          expect(res.body).to.be.a("object");
          expect(res.status).to.be.equal(201);
          expect(res.body).to.have.property("message", "successful");
          expect(res.body).to.have.property("token");
          expect(res.body.err).to.be.equal(null), expect(token).to.a("string");
          expect(token).to.not.be.empty;
        });
    });
  });

  it("should not register an existing user", async function () {
    const user = {
      firstname: "Morayo",
      lastname: "Afolabi",
      email: "morayo@gmail.com",
      password: "1234",
    };
    await userModel.findOne({ email: "kapo@gmail.com" });
    chai
      .request(app)
      .post("/user/signup")
      .send(user)
      .end((err, res) => {
        expect(res.body).to.be.a("object");
        expect(res.status).to.be.equal(400);
        expect(res.body).to.have.property("message", "User already exist");
      });
  });

  it("should handle internal server error", async function () {
    let user = {
      firstname: "Morayo",
      lastname: "Afolabi",
      email: "morayo@gmail.com",
      password: "1234",
    };

    userModel.findOne = () => {
      throw new Error("Database error");
    };
    chai
    .request(app)
    .post("/user/signup")
    .send(user)
    .end((err, res) => {
      expect(res).to.have.status(500);
      expect(res.body).to.have.property("message", "Internal Server error");
      expect(res.body).to.have.property('error')
    });
  });
});
