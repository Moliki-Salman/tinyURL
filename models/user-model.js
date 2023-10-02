const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: function() { return this.userId != null; },
    },
    lastname: {
      type: String,
      required: function() { return this.userId != null; },
    },
    email: {
      type: String,
      required: function() { return this.userId != null; },
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function() { return this.userId != null; },
    },
     date: {
    type: String,
    default: Date.now,
  },
  });

module.exports = mongoose.model("User", userSchema);
