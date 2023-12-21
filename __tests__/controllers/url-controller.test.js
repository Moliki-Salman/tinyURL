const UrlController = require("../../controllers/url-controller");
const UrlModel = require("../../models/url-model");
const shortid = require("shortid");
const validUrl = require("valid-url");

jest.mock("../../models/url-model");
jest.mock("shortid");
jest.mock("valid-url");

const longUrl = "https://www.geeksforgeeks.org/mongoose-findone-function/";
const invalidLongUrl = "http://not-a-Url";
const shortUrl = "https://uerk56";
let url = [
  { longUrl: "https://www.geeksforgeeks.org/mongoose-findone-function/", urlCode:
"uerk56", shortUrl: "https://uerk56" },

]

describe("create Tinyurl", () => {
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
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("when a longUrl is invalid and does not exist in the database", () => {
    it("should return  500 status code", async () => {
      validUrl.isUri = jest.fn().mockResolvedValue(invalidLongUrl);
      UrlModel.findOne = jest.fn().mockRejectedValue();

      const req = {
        body: invalidLongUrl,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await UrlController.createTinyUrl(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server error",
      });
    });
  });
});

describe("get Tinyurl", () => {
  describe("when a url code exist in database", () => {
    it("should redirect with status code 308 ", async () => {
      UrlModel.findOne = jest.fn().mockResolvedValue({ longUrl });
      const req = {
        params: {
          code: "dertk",
        },
      };
      const res = {
        redirect: jest.fn().mockReturnThis(),
      };
      await UrlController.getTinyUrl(req, res);

      expect(res.redirect).toHaveBeenCalledWith(
        308,
        "https://www.geeksforgeeks.org/mongoose-findone-function/"
      );
    });
  });

  describe("when a url does not exist in the database", () => {
    it("should return a status code 404", async () => {
      UrlModel.findOne = jest.fn().mockResolvedValue(false);

      const req = {
        params: {
          code: "dertk",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await UrlController.getTinyUrl(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "No Url found" });
    });
  });

  describe("when there is an error while quering the database", () => {
    it("should return a status code 500", async () => {
      UrlModel.findOne = jest.fn().mockRejectedValue();

      const req = {
        params: {
          code: "dertk",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await UrlController.getTinyUrl(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server error",
      });
    });
  });
});

describe("get All Tinyurl", () => {
  describe("to get all the list of tiny urls created by a user", () => {
    it("should  list all created tiny url and return a 200 status code", async () => {
      UrlModel.find = jest.fn().mockResolvedValue({ url });

      const req = {
        user:{
          id: "user99",
          }
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      await UrlController.getAllTinyUrls(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        userId: "user99",
        AllURLS: url
      });
    });

});
})
