const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
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
    url: { type: Schema.Types.ObjectId, ref: "url" },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
