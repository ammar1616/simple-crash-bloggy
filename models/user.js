const mongoose = require("mongoose")

const userSchema = require("../schemas/user")
const userModel = mongoose.model("user", userSchema)
module.exports = userModel