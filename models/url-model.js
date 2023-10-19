const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  urlCode:  {
    type: String,
    required: true,
  },
  longUrl:  {
    type: String, 
    required: true,
  },
  shortUrl:  {
    type: String, 
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "user" },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("Url", urlSchema);
