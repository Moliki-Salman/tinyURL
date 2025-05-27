// const express = require("express");
import express from "express";
const userRoutes = express.Router();

// const controller = require("../controllers/user-controller");
import { signup, login, deleteUser } from "../controllers/user-controller.js";
import { authenticateUser } from "../config/auth.js";
// const authenticateUser = require("../config/auth");

userRoutes
  .post("/user/signup", signup)
  .post("/user/login", login)
  .delete("/user/delete", authenticateUser, deleteUser);

// module.exports = router;

export default userRoutes;
