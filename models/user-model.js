// const mongoose = require("mongoose");
import mongoose from "mongoose";
const Schema = mongoose.Schema;

<<<<<<< HEAD
const UserSchema = new Schema({
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

export default mongoose.model("user", UserSchema);
=======
const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
     date: {
    type: String,
    default: Date.now,
  },
  });

module.exports = mongoose.model("User", userSchema);
>>>>>>> 3e3bacd1390ff48e411b23278b87395776680146
