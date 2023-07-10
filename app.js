const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app =  express();

const routesAccoutAuth = require("./routes/routes.User");

const connect = require("./configuration/connection");
connect();

app.use(express());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user", routesAccoutAuth);



const PORT = process.env.PORT 
app.listen(PORT, () => console.log(`app is runnning on port ${PORT}`));


