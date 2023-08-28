const shortid = require("shortid");
const validUrl = require("valid-url");
const urlModel = require("../models/url-model");

const createTinyUrl = async (req, res) => {
  const { longUrl } = req.body;
  const urlCode = shortid.generate();
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await urlModel.findOne({ longUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = "http://localhost:3000" + "/" + urlCode;
        const userId = req.user.id;
        url = new urlModel({
          longUrl,
          shortUrl,
          urlCode,
          user: userId,
          date: new Date(),
        });
        await url.save();
        res.json(url);
      }
    } catch (error) {
      res.status(500).json("Internal Server error");
    }
  } else {
    res.status(401).json("long url not valid");
  }
};

const getTinyUrl = async (req, res) => {
  try {
    const url = await urlModel.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(308, url.longUrl);
    } else {
      return res.status(404).json({ message: "No Url found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error", error: error.message });
  }
};

const getAllTinyUrls = async (req, res) => {
  try {
    const userId = req.user.id;
    const url = await urlModel.find({ user: userId }).populate("user", "email");
    return res.status(200).json({userId, AllULLS: url, });
  } catch (error) {
    res.status(500).json({ message: "Request failed", error: error.message });
  }
};

const deleteTinyUrl = async (req, res) => {
  try {
    const url = await urlModel.deleteOne({ urlCode: req.params.code });
    return res.status(200).json({ message: "url deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Request failed", error });
  }
};

module.exports = { createTinyUrl, getTinyUrl, getAllTinyUrls, deleteTinyUrl };
