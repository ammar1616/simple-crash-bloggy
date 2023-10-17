const router = require("express").Router()

const authController = require("../controllers/auth")
const authValidation = require("../validations/auth")

router.post("/login", authValidation.loginValidation, authController.login)

router.post("/register", authValidation.registerValidation, authController.register)

module.exports = router