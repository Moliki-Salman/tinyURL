const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app =  express();

const connectDB = require("./config/connection");
connectDB();

const userRoutes = require("./routes/userRoutes");
const urlRoutes = require("./routes/urlRoutes");
 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user", userRoutes);
app.use("/url", urlRoutes);

const PORT = 3000
app.listen(PORT, () => console.log(`app is runnning on port ${PORT}`));


