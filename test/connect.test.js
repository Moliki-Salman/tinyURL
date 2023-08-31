const chai = require("chai");
const expect = chai.expect;
const mongoose = require("mongoose");
const { config } = require("dotenv");
const connectToDataBase = require("../config/connect");

config();

describe("Database Connection", function () {
  it("should connect to the database", async function () {
    await connectToDataBase();
    expect(mongoose.connection.readyState).to.equal(1);
  });

  it("should log an error if database connection fails", async () => {
    const fakeError = new Error("Connection failed");
    const connectStub = (mongoose.connect = () => {
      throw fakeError;
    });

    let capturedLog;
    console.log = (message) => {
      capturedLog = message;
    };

    try {
      await connectToDataBase();
      expect(connectStub.calledOnce).to.be.true;
      expect(capturedLog).to.equal(fakeError.message);
    } catch (error) {
      // Handle the error if needed
    }
  });
});
