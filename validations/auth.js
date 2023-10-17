const Joi = require("joi")

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    gender: Joi.string().valid('male', 'female').required(),
    role: Joi.string().valid('user', 'admin').required(),
});

exports.registerValidation = (req, res, next) => {
    const { error, value } = registerSchema.validate(registerSchema)
    if (error) {
        return res.status(401).json({ error: error.details[0].message })
    }
    req.validatedData = value
    next()
}

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

exports.loginValidation = (req, res, next) => {
    const { error, value } = loginSchema.validate(loginSchema)
    if (error) {
        return res.status(401).json({ error: error.details[0].message })
    }
    req.validatedData = value
    next()
}