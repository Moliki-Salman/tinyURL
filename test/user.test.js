const userModel = require("../models/user-model");
const app = require("../app");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("signup a new user",  async () =>  {
  it("should create a new user ", function () {
    let user = {
      firstname: "Morayo",
      lastname: "Afolabi",
      email: "morayo@gmail.com",
      password: "1234",
    };
    bcrypt.hash(user.password, 10,  async (err, hashedPassword) =>   {
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
      expect(createdUser).to.be.a("object");
    });
  });

  it("should register a new user with jwt", async () =>  {
    let user = {
      firstname: "Kolade",
      lastname: "Bisiri",
      email: "kolade@gmail.com",
      password: "1234",
    };
    bcrypt.hash(user.password, 10, async (err, hashedPassword) =>  {
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
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("user");
          expect(res.body).to.have.property("message", "successful");
          expect(res.body).to.have.property("token");
          expect(token).to.a("string");
          expect(res.body.err).to.be.equal(null);
        });
    });
  
  });

  it("should not register an existing user", async () => {
    let user = {
      firstname: "Morayo",
      lastname: "Afolabi",
      email: "morayo@gmail.com",
      password: "1234",
    };
    await userModel.findOne({ email: user.email });
    chai
      .request(app)
      .post("/user/signup")
      .send(user)
      .end((err, res) => {
        expect(res.body).to.be.a("object");
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("message", "User already exist");
      });
  });

  it("should handle internal server error", async () => {
    let user = {
      firstname: "new",
      lastname: "new",
      email: "o@gmail.com",
      password: "1234",
    };
    bcrypt.hash(user.password, async (err, hashedPassword) => {
      await userModel.create({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: hashedPassword,
      });
      return err;
    });
    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);
    chai
      .request(app)
      .post("/user/signup")
      .send()
      .end((err, res) => {
        expect(res.body).to.be.a("object");
        expect(res).to.have.status(500);
        expect(res.body).to.have.property("message", "Internal Server error");
        expect(res.body).to.have.property("error");
      });
  });
});

describe("login a user", async function () {
  it("should check if user details does not exist in database", async () => {
    let user = {
      email: "userdoesnotexist@gmail.com",
      password: "1234",
    };
    await userModel.findOne({ email: user.email });
    chai
      .request(app)
      .post("/user/login")
      .send(user)
      .end((err, res) => {
        expect(res.body).to.be.a("object");
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("message", "User  does not exist");
      });
  });

  it("should login a user with the correct password", async () => {
    let existingUser = userModel.findOne({ email: "morayo@gmail.com" });
    let user = { email: "morayo@gmail.com", password: "1234" };
    await userModel.findOne({ email: user.email, password: "1234" });
    bcrypt.compare(
      user.password,
      existingUser,
      function (err, matchedpassword) {
        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);
        chai
          .request(app)
          .post("/user/login")
          .send(user)
          .end((err, res) => {
            expect(res.body).to.be.a("object");
            expect(res).to.have.status(201);
            expect(res.body).to.have.property("user");
            expect(res.body).to.have.property("message", "successful");
            expect(token).to.a("string");
          });
      }
    );
  });

  it("should not login a user with an incorrect password", async () => {
    let existingUser = userModel.findOne({ email: "morayo@gmail.com" });
    let user = { email: "morayo@gmail.com", password: "1432" };
    await userModel.findOne({ email: user.email });
    bcrypt.compare(
      user.password,
      existingUser,
      function (err, matchedpassword) {
        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);
        chai
          .request(app)
          .post("/user/login")
          .send(user)
          .end((err, res) => {
            expect(res.body).to.be.a("object");
            expect(res).to.have.status(400);
            expect(res.body).to.have.property("message", "Invalid credentials");
          });
      }
    );
  });
});

describe("delete a user",async () => {
  it("should throw error if user does not exist in database", async () => {
    let user = { email: "morayo@gma.com", password: "1234" };
    await userModel.findOne({ email: user.email });
    chai
      .request(app)
      .post("/user/delete")
      .send(user)
      .end((err, res) => {
        expect(res.body).to.be.a("object");
        expect(res).to.have.status(404);
      });
  });

  it("should authenticate and delete a user", async () => {
    let existingUser = { email: "test@gmail.com", password: "password" };
    let user = { email: "test@gmail.com", password: "password" };
    await userModel.findOne({ email: user.email });
    bcrypt.compare(
      user.password,
      existingUser,
      async (err, matchedpassword) => {
        let token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);
        chai
          .request(app)
          .delete("/user/delete")
          .set("authorization", `Bearer ${token}`)
          .send(user)
          .end(async (err, res) => {
            await userModel.deleteOne({ email: user.email });
            expect(res.body).to.be.a("object");
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("user");
            expect(res.body).to.have.property(
              "message", "User deleted successfully"
            );
          });
        }
      )
    });
});
