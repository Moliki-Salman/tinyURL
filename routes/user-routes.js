const express = require("express");
const router = express.Router();

const userController = require("../controllers/user-controller");
const authenticateUser = require("../config/auth");

router
.post("/user/signup", userController.signup)
.post("/user/login", userController.login)
.delete("/user/delete",authenticateUser, userController.deleteUser)

module.exports = router;


