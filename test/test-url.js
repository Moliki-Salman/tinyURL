const mongoose = require("mongoose");
let urlModel = require("../model/urlModel");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
chai.should();

chai.use(chaiHttp);
// URL TEST: empty the database before url test is carried out
describe("url", () => {
  beforeEach(async () => {
    await urlModel.deleteMany({});
  });
  
  // test routes  to get all tiny urls
  describe("GET url", () => {
    it("it should GET all the urls that belongs to a user", async () => {
      chai
        .request(app)
        .get("/")
        .end((error, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          res.body.data.length.should.be.eql(0);
          res.should.have.property("_id");
          res.should.have.property("longUrl");
          res.should.have.property("shortUrl");
          res.should.have.property("user");
          res.should.have.property("urlCode");
          done();
        });
    });
  });

  // test routes  to create a tiny url
  describe("POST url", () => {
    it("It should create a new shortUrl", async () => {
      let url = {
        longUrl: "https://longurl.com",
      };

      chai
        .request(app)
        .post("/")
        .send(url)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.status.should.be.eql(200);
          res.should.have.property("urlCode");
          res.should.have.property("longUrl");
          res.should.have.property("shortUrl");
          res.should.have.property("user");
          res.should.have.property("_id");
          done();
        });
    });
  });

  // test routes  to get a single tiny url
  describe("GET/:code url", () => {
    it("it should GET a short url by  redirect  the long url to the short url", async () => {
      let url = {
        shortUrl: "https://shorturl.com",
      };

      chai
        .request(app)
        .get("/" + url.urlcode)
        .send(url)
        .end((error, res) => {
          res.should.have.status(200);
          res.should.have.redirect(308);
          res.status.should.be.eql(200);
          done();
        });
    });
  });
  it("it should throw error if it is unable to GET the short url and unable to redirect", () => {
    chai
      .request(app)
      .get("/")
      .end((error, res) => {
        res.should.have.status(308);
        done();
      });
  });

  describe("DELETE/:code, url", () => {
    it("it should delete a url by  the short url code created", async () => {
      let url = {
        shortUrl: "https://shorturl.com",
      };

      chai
        .request(app)
        .delete("/ + url.urlcode")
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.status.should.be.eql(200);
          done();
        });
    });
  });
});
