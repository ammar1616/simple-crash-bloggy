const express = require("express")
require("dotenv").config()
const app = express()

const { connection } = require("./configurations/database")

app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/post"))

app.get("/", (req, res) => {
    res.json({ message: "Welcome babe!" })
})

connection().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is Running on ${process.env.PORT}`);
    })
})