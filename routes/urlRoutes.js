const express = require("express");
const router = express.Router();

const urlController = require("../controller/urlController")
const checkAuth = require("../middleware/Authentication")


router
.post("/", checkAuth, urlController.createTinyUrl)
.get("/:code",checkAuth,urlController.getTinyUrl)
.get("/", checkAuth, urlController.getAllTinyUrl)
.delete("/:code", checkAuth, urlController.deleteTinyUrl)


module.exports = router;