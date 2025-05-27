// const express = require("express");
import express from "express";
// const bodyParser = require("body-parser");
import bodyParser from "body-parser";
const app = express();

// const connectToDB = require("./config/connect")
import { connectToDB } from "./config/connect.js";
connectToDB();

// const userRoutes = require("./routes/user-routes");
import userRoutes from "./routes/user-routes.js";
// const urlRoutes = require("./routes/url-routes");
import urlRoutes from "./routes/url-routes.js";

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", userRoutes);
app.use("/", urlRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`app is runnning on port ${PORT}`));
export default app;
