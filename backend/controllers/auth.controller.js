const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const generateTokenAndSetCookie = require("../utils/generateToken");

exports.signup = async (req, res, next) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) return res.status(400).json({
            status: 'failed',
            message: 'Password do not match'
        })
        const user = await User.findOne({ username })
        if (user) return res.status(400).json({
            status: 'failed',
            message: 'username already exists.'
        })

        const profilePic = `https://avatar.iran.liara.run/public/${gender === 'male' ? 'boy' : 'girl'}?username=${username}`;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            fullName, gender, username, password: hashedPassword, profilePic
        })
        generateTokenAndSetCookie(newUser._id, res)
        res.status(201).json({
            status: 'success',
            user: newUser
        })

    } catch (error) {
        console.log(`💣 --> `, error.message);
        res.status(500).json({ status: 'failed', message: 'Something went wrong' })
    }
}

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if (!user || !isPasswordCorrect) return res.status(401).json({
            status: 'failed',
            message: 'Invalid username or password'
        })

        generateTokenAndSetCookie(user._id, res)
        res.status(200).json({
            status: 'success',
            user
        })
    } catch (error) {
        console.log(`💣 --> `, error);
        res.status(500).json({ status: 'failed', message: 'Something went wrong' })
    }
}

exports.logout = async (req, res, next) => {
    try {
        res.cookie('jwt', "", {
            maxAge: 0
        })

        res.status(200).json({ status: 'success' })
    } catch (error) {
        console.log(`💣 --> `, error.message);
        res.status(500).json({ status: 'failed', message: 'Something went wrong' })
    }
}