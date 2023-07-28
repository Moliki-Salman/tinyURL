const mongoose = require("mongoose");
let urlModel = require("../model/urlModel");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
chai.should();

chai.use(chaiHttp);
// empty the database before test is carried out
describe("url", () => {
  beforeEach(async () => {
    await urlModel.deleteMany({});
  });
  // test routes  to get all urls 
  describe("/GET url", () => {
    it("it should GET all the urls that belongs to a user", () => {
      chai
        .request(app)
        .get("/")
        .end((error, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });

  describe("POST url", () => {
    it("It should create a new shortUrl", () => {
      let url = {
        longUrl: "https://longurl.com"
      };
      chai.request(app)
      .post("/")
      .send(url)
      .end((error, res) => {
        res.should.have(200);
        res.body.should.be.a("object")
        res.status.should.be.eql(200);
        done();
      });
    });
  });







});
