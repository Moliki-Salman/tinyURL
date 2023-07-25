const express = require("express");
const router = express.Router();

const urlController = require("../controller/urlController");
const  authenticateUser = require("../middleware/Authentication")
// const checkUserRole = require("../middleware/Authentication");



router
.post("/", authenticateUser, urlController.createTinyUrl)
.get("/:code", authenticateUser,  urlController.getTinyUrl)
.get("/", authenticateUser,  urlController.getAllTinyUrls)
.delete("/:code", authenticateUser, urlController.deleteTinyUrl)


module.exports = router;
