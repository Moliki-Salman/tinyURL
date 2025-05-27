// const mongoose = require("mongoose");
import mongoose from "mongoose";
import { config } from "dotenv";
config();
export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Server is connected to MongoDB");
  } catch (error) {
    console.log("MongoDB connection failed:", error.message);
  }
};

// module.exports = connectToDB;
