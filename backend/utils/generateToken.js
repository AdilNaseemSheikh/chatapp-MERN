const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '90d'
    })

    res.cookie('jwt', token, {
        maxAge: 90 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'Strict',
        secure: process.env.NODE_ENV !== 'development'
    })
}

module.exports = generateTokenAndSetCookie