const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const protectRoutes = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) return res.status(401).json({
            status: 'fail',
            message: 'You are not logged in. Please login and try again.'
        });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) return res.status(401).json({
            status: 'fail',
            message: 'Invalid token. Please login and try again.'
        });

        const user = await User.findById(decoded.userId).select('-password')

        if (!user) return res.status(404).json({
            status: 'fail',
            message: 'User not found.'
        });
        req.user = user
        next()
    } catch (error) {
        console.log(`💣 --> `, error.message);
        res.status(500).json({ status: 'failed', message: 'Something went wrong' })
    }
}

module.exports = protectRoutes