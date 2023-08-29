const urlModel = require("../models/url-model");
const userModel = require("../models/user-model");
const app = require("../app");
const jwt = require("jsonwebtoken");
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("create tiny URL", async function () {
  it("should create a tiny URL with valid authentication", async function () {
    const user = { email: "newUser1@gmail.com", password: "1234" };
    const token = jwt.sign(user, process.env.SECRET_KEY);
    const longUrl =
      "https://ielts.idp.com/prepare/article-general-training-reading-free-practice-questions";

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
    const longUrl =
      "https://www.youtube.com/playlist?list=PL3IwAics3J0dc9Yav3MMqUlq6RmdC5-I_";

    chai
      .request(app)
      .post("/")
      .send({ longUrl })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message", "Authentication failed");
      });
  });

  it("should return an error is a long URL is invalid", async function () {
    const user = { email: "newUser2", password: "1234" };
    const token = jwt.sign(user, process.env.SECRET_KEY);
    const longUrl = "invalidurl";
    const res = await chai
      .request(app)
      .post("/")
      .set("Authorization", `Bearer ${token}`)
      .send({ longUrl });
    expect(res).to.have.status(401);
    expect(res.body).to.equal("long url is not valid");
  });

  it("should handle internal server error", async function () {
    const user = { email: "newUser2", password: "1234" };
    const token = jwt.sign(user, process.env.SECRET_KEY);
    const longUrl = "https://www.npmjs.com/package/bcrypt";

    // Temporarily overwrite the findOne function to simulate an error
    const originalFindOne = urlModel.findOne;
    urlModel.findOne = async () => {
      throw new Error("Database error");
    };

    const res = await chai
      .request(app)
      .post("/")
      .set("Authorization", `Bearer ${token}`)
      .send({ longUrl });

    // Restore the original findOne function
    urlModel.findOne = originalFindOne;

    expect(res).to.have.status(500);
    expect(res.body).to.equal("Internal Server error");
  });
});

describe("get tiny URL", async function () {
  it("should redirect a short URL to a long URL with valid authentication", async function () {
    const user = { email: "newUser3@gmail.com", password: "1234" };
    const token = jwt.sign(user, process.env.SECRET_KEY);
    const longUrl = "https://quillbot.com/"
    chai
      .request(app)
      .post("/")
      .set("Authorization", `Bearer ${token}`)
      .send({ longUrl })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("shortUrl");
      });
 
    const urlCode = "0OJG4lLPD9"
    const res = await chai
      .request(app)
      .get(`/${urlCode}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res).to.redirectTo(longUrl);
  });

  it("should handle URL that is not found in DB with valid authentication", async function () {
    const user = { email: "newUser3@gmail.com", password: "1234" };
    const token = jwt.sign(user, process.env.SECRET_KEY);
    const urlCode = "invalid";

    const res = await chai
      .request(app)
      .get(`/${urlCode}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res).to.have.status(404);
    expect(res.body).to.have.property("message", "No Url found");
  });

});

describe("Get All URL's and Delete URL", async function () {
  it("should get All URL's with valid authentication", async function () {
    const user = { email: "newUser3@gmail.com", password: "1234" };
    const token = jwt.sign(user, process.env.SECRET_KEY);
    url = await urlModel.find();

     chai
      .request(app)
      .get("/")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("AllURLS");
        expect(res).to.be.a("object")
      })
  });


  it("should delete a URL with valid authentication", async function () {
    const user = { email: "newUser3@gmail.com", password: "1234" };
    const token = jwt.sign(user, process.env.SECRET_KEY);
    const longUrl = "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409"

    chai
      .request(app)
      .post("/")
      .set("Authorization", `Bearer ${token}`)
      .send({ longUrl })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("shortUrl");
      });

    const urlCode = "fLpzvmGO8b"
    url = await urlModel.deleteOne({urlCode });

    chai
      .request(app)
      .delete(`/${urlCode}`)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message", "url deleted sucessfully");
      })
  });
});
