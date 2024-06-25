const express = require('express');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth.routes');
// const messageRoutes = require('./routes/message.routes');
const connect = require('./db/connect');

const app = express()
dotenv.config()
const port = process.env.PORT;

app.use(express.json())

app.use('/api/auth', authRoutes)
// app.use('/api/messages', messageRoutes)


app.listen(port, async () => {
    await connect()
    console.log(`Server is running on port ${port}...`);
})