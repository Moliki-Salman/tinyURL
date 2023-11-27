const UrlController = require("../../controllers/url-controller");
const UrlModel = require("../../models/url-model");
const shortid = require("shortid");
const validUrl = require("valid-url");

jest.mock("../../models/url-model");
jest.mock("shortid");
jest.mock("valid-url");

const longUrl = "https://www.geeksforgeeks.org/mongoose-findone-function/";
const invalidLongUrl = "http://not-a-Url";

describe("create url", () => {
  describe("when a longUrl is invalid", () => {
    it("should return a status code 401", async () => {
      validUrl.isUri = jest.fn().mockReturnValue(false);

      const req = {
        body: invalidLongUrl,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await UrlController.createTinyUrl(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "long url is not valid",
      });
    });
  });

  describe("when a URL exist in the database", () => {
    it("should return the existing URL and a status code 200", async () => {
      validUrl.isUri = jest.fn().mockReturnValue(true);
      UrlModel.findOne = jest.fn().mockResolvedValue(longUrl);

      const req = {
        body: longUrl,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await UrlController.createTinyUrl(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "ShortUrl created successfully",
        url: "https://www.geeksforgeeks.org/mongoose-findone-function/",
      });
    });
  });

  describe("when longurl is valid and does not exist in the database", () => {
    it("should create a tinyUrl with a 201 status code", async () => {
      validUrl.isUri = jest.fn().mockReturnValue(true);
      UrlModel.findOne = jest.fn().mockResolvedValue(null);
      shortid.generate.mockReturnValue("btxcr");
      UrlModel.prototype.save = jest.fn().mockResolvedValue(longUrl);

      const req = {
        body: longUrl,
        user: {
          id: "newUser99",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await UrlController.createTinyUrl(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled()
    });
  });
});

/* describe create user{
test if longurl is not valid, should return status code 401;
test if longurl is valid, then create a tinyUrl with a 201 status code;
test  for 500 internal server error;

*/
