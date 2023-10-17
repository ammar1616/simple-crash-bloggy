const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/user")
require('dotenv').config();

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "sorry you have to register first" })
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Authentication Failed" })
        }
        const token = jwt.sign({
            _id: user._id,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN })

        res.status(200).json({
            message: "Authentication Successful",
            token,
            user: {
                _id: user._id,
                username:user.username,
                email: user.email,
                gender:user.gender,
                role: user.role
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error." })
    }
}

exports.register = async (req, res) => {
    try {
        const { username, email, password, role, gender } = req.body
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "Sorry this email already Registered" })
        }
        const hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        const userr = new User({ username, email, password: hash, gender, role })
        await userr.save()
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error." })
    }
}