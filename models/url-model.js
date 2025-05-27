// const mongoose = require("mongoose");
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  user: { type: Schema.Types.ObjectId, ref: "user" },
  date: {
    type: String,
    default: Date.now,
  },
});

export default mongoose.model("url", urlSchema);
