// const mongoose = require("mongoose");
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

export default mongoose.model("User", UserModelSchema);
