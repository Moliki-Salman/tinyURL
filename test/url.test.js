const shortid = require("shortid");
const validUrl = require("valid-url");
const urlModel = require("../models/url-model");
const userModel = require("../models/user-model");
const app = require("../app");
const jwt = require("jsonwebtoken");
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("url collections", async function () {
  it("should create a short URL with valid authentication", async function () {
    const user = { email: "yunus@gmail.com", password: "1234" };
    const token = jwt.sign(user, process.env.SECRET_KEY);
    const longUrl =
      "https://www.youtube.com/playlist?list=PL3IwAics3J0dc9Yav3MMqUlq6RmdC5-I_";

    chai
      .request(app)
      .post("/")
      .set("Authorization", `Bearer ${token}`)
      .send({ longUrl })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("shortUrl");
      });
  });
  
 it("should return an error if user authentication is invalid", async () => {
  const longUrl = "https://www.youtube.com/playlist?list=PL3IwAics3J0dc9Yav3MMqUlq6RmdC5-I_";

    chai
      .request(app)
      .post("/")
      .send({ longUrl })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("message", "Authentication failed");;
      });
  });



});
