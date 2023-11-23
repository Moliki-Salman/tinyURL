const UrlController = require("../../controllers/url-controller");
const UrlModel = require("../../models/url-model");
const shortid = require("shortid");
const validUrl = require("valid-url");

jest.mock("../../models/url-model");
jest.mock("shortid");
jest.mock("valid-url");

const longUrl = "https://www.geeksforgeeks.org/mongoose-findone-function/";

describe("create url", () => {
  describe("when a longUrl is invalid", () => {
    it("should return a status code 401", async () => {
      const invalidLongUrl = "http://not-a-Url";
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
});

/* describe create user{
test if longurl is not valid, should return status code 401;
test if longurl is valid, then create a tinyUrl with a 201 status code;
test  for 500 internal server error;

*/
