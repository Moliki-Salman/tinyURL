const userModel = require("../models/user-model")

beforeEach( async function() {
   await userModel.deleteMany({})
})
// after( async function() {
//    await userModel.deleteMany({})
// })