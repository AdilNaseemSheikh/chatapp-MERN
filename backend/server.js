const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/auth.routes');
const messageRoutes = require('./routes/message.routes');
const userRoutes = require('./routes/user.routes');
const connect = require('./db/connect');
const { app, server } = require('./socket/socket')

const cors = require("cors");
const morgan = require("morgan");

const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
dotenv.config()
const port = process.env.PORT;

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)


server.listen(port, async () => {
    await connect()
    console.log(`Server is running on port ${port}...`);
})
