// const express = require("express");
import express from "express";
const userRoutes = express.Router();

<<<<<<< HEAD
// const controller = require("../controllers/user-controller");
import { signup, login, deleteUser } from "../controllers/user-controller.js";
import { authenticateUser } from "../config/auth.js";
// const authenticateUser = require("../config/auth");

userRoutes
  .post("/user/signup", signup)
  .post("/user/login", login)
  .delete("/user/delete", authenticateUser, deleteUser);
=======
const userController = require("../controllers/user-controller");
const authenticateUser = require("../config/auth");

router
.post("/user/signup", userController.signup)
.post("/user/login", userController.login)
.delete("/user/delete",authenticateUser, userController.deleteUser)

module.exports = router;
>>>>>>> 3e3bacd1390ff48e411b23278b87395776680146

// module.exports = router;

export default userRoutes;
