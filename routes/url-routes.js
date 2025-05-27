// const express = require("express");
import express from "express";
const urlRoutes = express.Router();

// const urlController = require("../controllers/url-controller");
import {
  createTinyUrl,
  getTinyUrl,
  getAllTinyUrls,
  deleteTinyUrl,
} from "../controllers/url-controller.js";
// const  authenticateUser = require("../config/auth");
import { authenticateUser } from "../config/auth.js";

urlRoutes
  .post("/", authenticateUser, createTinyUrl)
  .get("/:code", getTinyUrl)
  .get("/", authenticateUser, getAllTinyUrls)
  .delete("/:code", authenticateUser, deleteTinyUrl);

// module.exports = router;

export default urlRoutes;
