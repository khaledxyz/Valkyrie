const join = require('./events/join');
const disconnect = require('./events/disconnect');

const joinDm = require('./events/joinDm');
const sendMessage = require('./events/sendMessage');
const getOnlineFriends = require('./events/getOnlineFriends');

global.onlineUsers = [];

const connectSocket = (server) => {
    global.io = require('socket.io')(server, {
        cors: { origin: process.env.CLIENT_URL }
    });

    io.on('connect', (socket) => {
        socket.on('join', userID => join(socket, userID));
        socket.on('disconnect', () => disconnect(socket));

        socket.on('join_dm', (userID, friendID) => joinDm(socket, userID, friendID));
        socket.on('send_message', (message, roomID) => sendMessage(socket, message, roomID));

        socket.on('get_online_friends', userID => getOnlineFriends(socket, userID));
    });
};

module.exports = connectSocket;