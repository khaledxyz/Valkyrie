// * SERVER
const join = require('./events/join');
const joinRoom = require('./events/joinRoom');
const disconnect = require('./events/disconnect');

const sendMessage = require('./events/sendMessage');

global.onlineUsers = [];
global.userRooms = [];

const connectSocket = async (server) => {
    const io = require('socket.io')(server, {
        cors: { origin: process.env.CLIENT_URL }
    });

    io.on('connect', (socket) => {
        socket.on('USER_ONLINE', user => join(socket, user));
        socket.on('SEND_ROOM_JOIN_REQUEST', (sender, receiver) => joinRoom(socket, sender, receiver, io));
        socket.on('disconnect', () => disconnect(socket));
        socket.on('SEND_MESSAGE', (room, message) => sendMessage(socket, room, message))
    });
};

module.exports = connectSocket;
