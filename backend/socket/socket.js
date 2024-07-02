const { Server } = require('socket.io')
const http = require('http')
const express = require('express');

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION. Shutting down...');
    console.log('💣', err, '💣');

    process.exit(1);
});

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

const userSocketMap = {} // {userId: socketId}

exports.getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}

io.on('connection', (socket) => {
    console.log(socket.id, ' user connected');

    // userId is available as it was passed while making connection
    const userId = socket.handshake.query.userId

    if (userId !== 'undefined') {
        userSocketMap[userId] = socket.id
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap)) // emit it used to send event to all the connected users

    socket.on('disconnect', () => {
        delete userSocketMap[userId]
        console.log(socket.id, ' user disconnected');
        io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })
})

exports.app = app;
exports.io = io;
exports.server = server;
