const guildModel = require("../models/guildModel");

const join = require('./events/join');
const emitMessage = require('./events/emitMessage');
const disconnect = require('./events/disconnect');

const emitGuildMessage = require('./events/emitGuildMessage');

const connectSocket = async (server) => {
    const io = require('socket.io')(server, {
        cors: { origin: process.env.CLIENT_URL }
    });

    let onlineUsers = [];
    let namespaces = await guildModel.find();

    io.on('connect', (socket) => {
        // * EVENTS * //
        socket.on('join', user => join(onlineUsers, { socketID: socket.id, userID: user.details._id }));
        socket.on('emitMessage', message => emitMessage(io, onlineUsers, message));
        socket.on('disconnect', () => disconnect(onlineUsers, socket.id));
    });

    namespaces.forEach((namespace) => {
        io.of(namespace._id).on('connection', (nsSocket) => {
            nsSocket.on('joinRoom', roomID => nsSocket.join(roomID));
            nsSocket.on('emitGuildMessage', message => emitGuildMessage(io, namespace, nsSocket, message));
        });
    });
};

module.exports = connectSocket;
