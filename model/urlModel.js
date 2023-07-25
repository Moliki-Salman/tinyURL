const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("url", urlSchema);
