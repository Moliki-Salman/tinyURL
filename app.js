const express = require("express");
const bodyParser = require("body-parser");
const app =  express();

const connectToDB = require("./config/connect")
connectToDB()

const userRoutes = require("./routes/user-routes");
const urlRoutes = require("./routes/url-routes");
 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user", userRoutes);
app.use("/", urlRoutes);
const PORT= 3000
app.listen(PORT, () => console.log(`app is runnning on port ${PORT}`));

module.exports = app;
