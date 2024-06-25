const mongoose = require('mongoose')

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('DB Connected');
    } catch (error) {
        console.log('DB connection failed');
    }
}

module.exports = connect;