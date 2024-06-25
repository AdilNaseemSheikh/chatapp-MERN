const User = require("../models/user.model");

exports.getUsers = async (req, res, next) => {
    try {
        const id = req.user._id;
        const users = await User.find({ _id: { $ne: id } }).select('-password -__v')

        res.status(200).json({
            status: 'success',
            users
        })
    } catch (error) {
        console.log(`💣 -.-> `, error.message);
        res.status(500).json({ status: 'failed', message: 'Something went wrong' })
    }
}