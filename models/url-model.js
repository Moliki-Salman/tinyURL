// const mongoose = require("mongoose");
import mongoose from "mongoose";
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

<<<<<<< HEAD
export default mongoose.model("url", urlSchema);
=======
module.exports = mongoose.model("Url", urlSchema);
>>>>>>> 3e3bacd1390ff48e411b23278b87395776680146
