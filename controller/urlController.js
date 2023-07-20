const config = require("config");
const shortid = require("shortid");
const validUrl = require("valid-url");
const urlModel = require("../model/urlModel");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "ABCDEFG";

const createTinyUrl = async (req, res) => {
   console.log({ user: req.user })
  const { longUrl } = req.body;
  const rootUrl = config.get("rootUrl");
  if (!validUrl.isUri(rootUrl)) {
    return res.status(401).json("Root URL not valid");
  }
  // create url code
  const urlCode = shortid.generate();

  // check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await urlModel.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = rootUrl + "/" + urlCode;

        url = new urlModel({
          longUrl,
          shortUrl,
          urlCode,
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
  // const { authorization } = req.headers;
  // const token = authorization.split(" ")[1];
  // const decodedToken = jwt.verify(token, SECRET_KEY);
  // req.user = decodedToken;
  // console.log({ user: req.user });
  console.log({ user: req.user})
  try {
    const url = await urlModel.find();
    return res.status(200).json({ AllURLs: url });
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

module.exports = { createTinyUrl, getTinyUrl, getAllTinyUrl, deleteTinyUrl };
