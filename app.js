const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app =  express();

const connect = require("./configuration/connection");
connect();

const routes = require("./routes/routesUser")

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user", routes);



const PORT = process.env.PORT 
app.listen(PORT, () => console.log(`app is runnning on port ${PORT}`));


