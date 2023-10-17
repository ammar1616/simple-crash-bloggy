const mongoose = require("mongoose")

exports.connection = () => {
    return mongoose.connect(process.env.CONNECTION)
}