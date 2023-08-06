const express = require("express");
const router = express.Router();

const controller = require("../controllers/user-controller");
const  authenticateUser = require("../config/auth");

router
.post("/signup", controller.signup)
.post("/login", controller.login)
.delete("/delete",authenticateUser, controller.deleteUser)

module.exports = router;