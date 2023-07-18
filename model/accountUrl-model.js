const mongoose = require("mongoose");
const Schema = mongoose.Schema
const objectId = Schema.Types.ObjectId


const orderUrlSchema = new Schema({
  orderId: {
    type: objectId, ref: "user"
  },
  urlId: {
    type: objectId, ref: "url"
  }
})

module.exports = mongoose.model("accountUrl", orderUrlSchema);