const mongoose = require("mongoose");
let userModel = require("../models/user-model");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
chai.should();

chai.use(chaiHttp);
// USER TEST: empty the database before user's test is carried out
describe("user", () => {
  beforeEach(async () => {
    await userModel.deleteMany({});
  });
  // test routes to signup user
  // describe("POST user", () => {
  //   // it("it should create new account for user", async () => {
  //   //   let user = {
  //   //     user: {
  //   //       firstname: "user's firtstname",
  //   //       lastname: "user's lastname",
  //   //       email: "user's email",
  //   //       password: "user's password",
  //   //     },
  //   //   };

  //   //   chai
  //   //     .request(app)
  //   //     .post("/user/signup")
  //   //     .send(user)
  //   //     .end((error, res) => {
  //   //       res.should.have.status(201);
  //   //       res.body.user.should.be.a("object");
  //   //       res.status.should.be.eql(201);
  //   //       res.should.have.property("user");
  //   //       done();
  //   //     });
  //   // });
  // });

  // test routes to login user
  describe("POST user", () => {
    it("it should log in excisting user", async () => {
      let user = {
        user: {
          email: "user's email",
          password: "user's password",
        },
      };

      chai
        .request(app)
        .post("/user/login")
        .send(user)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.status.should.be.eql(200);
          res.should.have.property("user");
          done();
        });
    });
  });

  // test routes to delete user
  describe("DELETE user", () => {
    it("it should delete a user's account", async () => {
      let user = {
        id: "user's id",
      };

      chai
        .request(app)
        .delete("/user/delete")
        .send(user)
        .end((error, res) => {
          console.log(error)
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.status.should.be.eql(200);
        });
    });
  });
});
