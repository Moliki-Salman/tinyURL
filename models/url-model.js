const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  urlCode:  {
    type: String,
    required: function() { return this.userId != null; }
  },
  longUrl:  {
    type: String, 
    required: function() { return this.userId != null; }
  },
  shortUrl:  {
    type: String, 
    required: function() { return this.userId != null; }
  },
  user: { type: Schema.Types.ObjectId, ref: "user" },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("Url", urlSchema);
