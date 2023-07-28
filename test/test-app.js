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
  // test routes  to get all tiny urls 
  describe("GET url", () => {
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

// test routes  to create a tiny url
  describe("POST url", () => {
    it("It should create a new shortUrl",  () => {
      let url = {
        longUrl: "https://longurl.com"
      };
      
      chai.request(app)
      .post("/")
      .send(url)
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object")
        res.status.should.be.eql(200);
        res.should.have.property("urlCode")
        res.should.have.property("longUrl")
        res.should.have.property("shortUrl")
        res.should.have.property("user")
        res.should.have.property("_id")
        done();
      });
    });
  });

// test routes  to get a single tiny url
describe("GET/:code url", () => {
  it("it should GET a single url by the short url code created by redirect", async () => {
    let url = {
      shortUrl: "https://shorturl.com"
    };
    
    chai.request(app)
    .get("/" + url.urlcode)
    .send(url)
    .end((error, res) => {
      res.should.have.status(200);
      res.should.have.redirect(308)
      res.status.should.be.eql(200);
      done();
    })
  })
})

it("it should not GET a single url by the short url code created by redirect", () => {
  chai.request(app)
  .get("/")
  .end((error, res) => {
    res.should.have.status(308);
    done()
  })
})
  







});
