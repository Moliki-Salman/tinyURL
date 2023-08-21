const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../app");
chai.use(chaiHttp);

//signup a user, create the user and authenticate the user
describe("signup a new user", async function () {
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
      firstname: "Kolade",
      lastname: "Bisiri",
      email: "kolade@gmail.com",
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
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("user");
          expect(res.body).to.have.property("message", "successful");
          expect(res.body).to.have.property("token");
          expect(token).to.a("string");
          expect(res.body.err).to.be.equal(null), expect(token).to.not.be.empty;
        });
    });
  });

  it("should not register an existing user", async function () {
    let user = {
      firstname: "rayo",
      lastname: "labi",
      email: "morayo@gmail.com",
      password: "1234",
    };
    await userModel.findOne({ email: "morayo@gmail.com" });
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

  it("should handle internal server error", async function () {
    let user = {
      firstname: "new",
      lastname: "new",
      email: "o@gmail.com",
      password: "1234",
    };
    bcrypt.hash(user.password, async function (err, hashedPassword) {
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
  it("should check if user already exist", async function () {
    const user = {
      email: "userdoesnotexist@gmail.com",
      password: "1234",
    };
    bcrypt.hash(user.password, 10, async function (err, hashedPassword) {
      if (err) {
        throw new Error("error", { cause: err });
      }
      await userModel.findOne({ email: "userdoesnotexist@gmail.com" });
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
  });

  it("should login in a user with the correct password", async function () {
    let existingUser = userModel.findOne({ email: "morayo@gmail.com", password: "1234"})
    let user = {
      email: "morayo@gmail.com",
      password: "1234",
    };
    await userModel.findOne({ email: "morayo@gmail.com"});
    bcrypt.compare(
      existingUser.Password,
      user.password,
      function (err, matchedpassword) {})
        const token = jwt.sign(
          { email: user.email },
          process.env.SECRET_KEY
        );
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
            expect(token).to.not.be.empty;
          });
      });

    it("should not login a user with an incorrect password", async function () {
      let existingUser = userModel.findOne({ email: "morayo@gmail.com", password: "1234"})
      let user = {
      email: "morayo@gmail.com",
      password: "1432",
    };
    await userModel.findOne({ email: "morayo@gmail.com"});
    bcrypt.compare(
      existingUser.Password,
      user.password,
      function (err, matchedpassword) {})
        const token = jwt.sign(
          { email: user.email },
          process.env.SECRET_KEY
        );
        chai
          .request(app)
          .post("/user/login")
          .send(user)
          .end((err, res) => {
            expect(res.body).to.be.a("object");
            expect(res).to.have.status(400);  
            expect(res.body).to.have.property("message", "Invalid credentials")
          });
    })
    // it("should throw err", async function () {
    //   let existingUser = userModel.findOne({ email: "morayo@gmail.com", password: "1234" })
      
    //   let user = {
    //   email: "morayo@gmail.com",
    //   password: "1432",
    // };
    // await userModel.find({email: "morayo@gmail.com"});
  
    // bcrypt.compare(
    //   existingUser.Password,
    //   user.password,
    //  )
    //   const token = jwt.sign(
    //       { email: user.email },
    //       process.env.SECRET_KEY
    //     );
    //     chai
    //       .request(server)
    //       .post("/user/")
    //       .send(user)
    //       .end((err, res) => {
    //         expect(res.body).to.be.a("object");
    //         expect(res).to.have.status(500);  
    //         // expect(res).to.have.property("message", "Invalid credentials")
    //         // expect(res.body).to.have.property("error");
    //       });
    // })
    
    
  });

describe("delete a user", async function (){
  /*
  
   */
  it
})
