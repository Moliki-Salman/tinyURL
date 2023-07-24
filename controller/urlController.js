const config = require("config");
const shortid = require("shortid");
const validUrl = require("valid-url");
const urlModel = require("../model/urlModel");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "ABCDEFG";

const createTinyUrl = async (req, res) => {
   console.log({ user: req.user })
  const { longUrl, user } = req.body;
  const rootUrl = config.get("rootUrl");
  if (!validUrl.isUri(rootUrl)) {
    return res.status(401).json("Root URL not valid");
  }
  // create url code
  const urlCode = shortid.generate();

  // check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await urlModel.findOne({ longUrl, user });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = rootUrl + "/" + urlCode;
        url = new urlModel({
          longUrl,
          shortUrl,
          urlCode,
          user,
          date: new Date(),
        });
        await url.save();
        res.json(url);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("Internal Server error");
    }
  } else {
    res.status(401).json("long url not valid");
  }
};

const getTinyUrl = async (req, res) => {
   console.log({ user: req.user })
  try {
    const url = await urlModel.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(308, url.longUrl);
    } else {
      return res.status(404).json({ message: "No Url found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const getAllTinyUrl = async (req, res) => {
  console.log({ user: req.user})
  try {
    const url = await urlModel.find();
    return res.status(200).json({ AllUrls: url });
  } catch (error) {
    res.status(500).json("Request failed");
  }
};

const deleteTinyUrl = async (req, res) => {
  // console.log({ user: req.user })
  try {
    const url = await urlModel.deleteOne(req.params.id);
    return res.status(201).json("sucessfully deleted URL");
  } catch (error) {
    res.status(500).json("Request failed");
  }
};

const getAllUserTinyUrls  = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await userModel.findById(userId)
     if (!user) {
      return res.status(404).json({ message: 'User not found', error: error.message});
    }
    const urls = await userModel.find({ user: userId })
    .populate('user');
    const shortUrls = urls.map(url => url.shortUrl);
    res.status(200).json({ user: user.email, shortUrls })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

module.exports = { createTinyUrl, getTinyUrl, getAllTinyUrl, deleteTinyUrl, getAllUserTinyUrls };
