const shortid = require("shortid");
const validUrl = require("valid-url");
const urlModel = require("../models/url-model");
const userModel = require("../models/user-model");
const app = require("../app");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("url collections", async function () {
  /*it should generate a short url */
  it("should ", async function () {
    let existingUser = { email: "yunus@gmail.com", password: "1234" };
    let user = { email: "yunus@gmail.com", password: "1234" };
    await userModel.findOne({ email: user.email });

    bcrypt.compare(
      user.password,
      existingUser,
      async function (err, matchedpassword) {
        let token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);
        chai
          .request(app)
          .post("/user/login")
          .set("authorization", `Bearer ${token}`)
          .send(user)
          .end(async (err, res) => {
            expect(res.body).to.be.a("object");
            expect(res).to.have.status(200);
          });

        let longUrl = "https://github.com/Moliki-Salman/tinyURL/tree/testing";
        let urlCode = shortid.generate();
        if (validUrl.isUri(longUrl)) {
          let url = await urlModel.findOne({ longUrl });
          try {
            const shortUrl = "http://localhost:3000" + "/" + urlCode;
            const userId = user.id;
            url = new urlModel({
              longUrl,
              shortUrl,
              urlCode,
              user: userId,
              date: new Date(),
            });
            await url.save();
          } catch (error) {}
        } else
          chai
            .request(app)
            .post("/")
            .send(url)
            .set("authorization", `Bearer ${token}`)
            .send(url)
            .end(async (err, res) => {
              expect(res.body).to.be.a("object");
              expect(res).to.have.status(200);
              expect(res).to.have.property(urlCode);
              expect(res).to.have.property(shortUrl);
              expect(res).to.have.property(longUrl);
              expect(res).to.have.property(date);
            });
      }
    );
  });




  
});

