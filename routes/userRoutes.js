const express = require("express");
const router = express.Router();

const controller = require("../controller/userController");
const  authenticateUser = require("../middleware/Authentication")

router
.post("/signup", controller.signup)
.post("/login", controller.login)

module.exports = router;
