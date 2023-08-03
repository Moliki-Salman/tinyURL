const express = require("express");
const router = express.Router();

const urlController = require("../controllers/url-controller");
const  authenticateUser = require("../config/auth");

router
.post("/", authenticateUser, urlController.createTinyUrl)
.get("/:code", authenticateUser,  urlController.getTinyUrl)
.get("/", authenticateUser,  urlController.getAllTinyUrls)
.delete("/:code", authenticateUser, urlController.deleteTinyUrl)

module.exports = router
