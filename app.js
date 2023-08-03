const express = require("express");


const connect = require("./configuration/connection")
connect();


app = express();


const PORT = process.env.PORT 
app.listen(PORT, () => console.log(`app is runnning on port ${PORT}`));


