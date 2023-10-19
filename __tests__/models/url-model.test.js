const Url = require('../../models/url-model');
const connectToDB = require("../../config/connect");
const { connections } = require("mongoose");

let mongod;

describe('url', () => { 
  describe('validations', () => {

    beforeAll(async () => {
      connections.map(async (a) => await a.dropDatabase())
      mongod = connectToDB()
    });

    afterAll(async () => {
      connections.map(async (a) => {
        await a.close()
        await a.dropDatabase()
      })
    });

    it("is invalid without any input from shorturl, longurl and urlcode", async () => {
      const url = new Url({});

      await expect(url.validate()).rejects.toThrow(
        "Url validation failed: shortUrl: Path `shortUrl` is required., longUrl: Path `longUrl` is required., urlCode: Path `urlCode` is required."  
      );
    });

    it("is valid when all inputs are provided", async () => {
      const url = new Url({
        longUrl: "https://www.youtube.com/",
        shortUrl: "https://uerk56",
        urlCode: "uerk56"
      });
      await url.save()

      await expect(url.validate()).resolves.not.toThrow();
    });
  });
});
