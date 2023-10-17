const mongoose = require("mongoose")

const postSchema = require("../schemas/post")

const postModel = mongoose.model("post",postSchema)
module.exports = postModel