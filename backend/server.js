const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/auth.routes');
const messageRoutes = require('./routes/message.routes');
const userRoutes = require('./routes/user.routes');
const connect = require('./db/connect');

const app = express()
dotenv.config()
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)


app.listen(port, async () => {
    await connect()
    console.log(`Server is running on port ${port}...`);
})