const shortid = require("shortid");
const validUrl = require("valid-url");
const UrlModel = require("../models/url-model");

const createTinyUrl = async (req, res) => {
  const { longUrl } = req.body;
  const urlCode = shortid.generate();
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await UrlModel.findOne({ longUrl });
      if (url) {
        res.status(200).json({ url, message: "ShortUrl created successfully" });
      } else {
        const shortUrl = "http://localhost:3000" + "/" + urlCode;
        // const userId = req.user.id;
        url = new UrlModel({
          longUrl,
          shortUrl,
          urlCode,
          // user: userId,//
          date: new Date(),
        });
        await url.save();
        res.status(201).json(url);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server error", error });
    }
  } else {
    res.status(401).json({ message: "long url is not valid" });
  }
};

const getTinyUrl = async (req, res) => {
  try {
    const url = await UrlModel.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(308, url.longUrl);
    } else {
      return res.status(404).json({ message: "No Url found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error", error });
  }
};

const getAllTinyUrls = async (req, res) => {
  try {
    const userId = req.user.id;
    const url = await UrlModel.find()
    return res.status(200).json({ AllURLS: url, userId });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Request failed", error });
  }
};

const deleteTinyUrl = async (req, res) => {
  try {
    const url = await UrlModel.deleteOne({ urlCode: req.params.code });
    return res.status(200).json({ message: "url deleted sucessfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Request failed", error });
  }
};

module.exports = { createTinyUrl, getTinyUrl, getAllTinyUrls, deleteTinyUrl };
