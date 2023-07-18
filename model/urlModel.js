const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  urlCode: {
    type: String
  },
  longUrl: {
    type: String
  },
  shortUrl: {
    type: String,
  },
  
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("url", urlSchema);
