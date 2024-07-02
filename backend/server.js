const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
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
// const __dirname = path.resolve()

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

app.use(express.static(path.join(__dirname, '/frontend/dist')))

app.get('*', (req, res) => {
    res.send(path.join(__dirname, '/frontend', 'dist', 'index.html'))
})


server.listen(port, async () => {
    await connect()
    console.log(`Server is running on port ${port}...`);
})


process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION. Shutting down...');
    console.log('💣', err, '💣');
    server.close(() => {
        // give server some time to finishe its ongoing request and then exit the application
        // exit the application
        process.exit(1);
    });
});

// heroku every 24 hrs shut down our application by sending SIGTERM signal
// we listen to this signal and quit server gracefully(wait for all pending requests to finish)
process.on('SIGTERM', (err) => {
    console.log('👋 SIGTERM RECEIVED. Shutting down...');

    server.close(() => {
        console.log('Process Terminated.');
    });
});
