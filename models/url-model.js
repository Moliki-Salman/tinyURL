// const mongoose = require("mongoose");
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const urlModelSchema = new Schema({
  urlCode: {
    type: String,
    required: true,
  },
  longUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "user" },
  date: {
    type: String,
    default: Date.now,
  },
});

export default mongoose.model("Url", urlModelSchema);
