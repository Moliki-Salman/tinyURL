const express = require("express");
const router = express.Router();

const urlController = require("../controller/urlController")



router
.post("/", urlController.createTinyUrl)
.get("/:code", urlController.getTinyUrl)
.get("/", urlController.getAllTinyUrl)
.delete("/:code", urlController.deleteTinyUrl)


module.exports = router;