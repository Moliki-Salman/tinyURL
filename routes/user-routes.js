const express = require("express");
const router = express.Router();

const controller = require("../controllers/user-controller");
const authenticateUser = require("../config/auth");

router
.post("/user/signup", controller.signup)
.post("/user/login", controller.login)
.delete("/user/delete",authenticateUser, controller.deleteUser)

module.exports = router;


