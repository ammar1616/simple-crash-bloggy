const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    content: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    timestamps: true
})

module.exports = postSchema