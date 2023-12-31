const mongoose = require("mongoose");
const {config} = require("dotenv");
config();
const connectToDataBase = async () => {
    try {
        mongoose.connect(process.env.MONGO_DB_LOCAL_HOST);
        console.log("Server is connected to MongoDB");
    } catch (error) {
        console.log(error)  
    };
}; 

module.exports = connectToDataBase