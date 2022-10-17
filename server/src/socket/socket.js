const join = require('./events/join');
const disconnect = require('./events/disconnect');

const getOnlineFriends = require('./events/getOnlineFriends');

const joinDm = require('./events/joinDm');
const sendMessage = require('./events/sendMessage');

const joinChannel = require('./events/joinChannel');
const sendGuildMessage = require('./events/sendGuildMessage');
const notifications = require('./events/notification');

global.onlineUsers = [];

const connectSocket = (server) => {
    global.io = require('socket.io')(server, {
        cors: { origin: process.env.CLIENT_URL }
    });

    io.on('connect', (socket) => {
        socket.on('join', userID => join(socket, userID));
        socket.on('disconnect', () => disconnect(socket));

        socket.on('get_online_friends', userID => getOnlineFriends(socket, userID));

        socket.on('join_dm', (userID, friendID) => joinDm(socket, userID, friendID));
        socket.on('send_message', (message, roomID) => sendMessage(socket, message, roomID));

        socket.on('join_channel', channelID => joinChannel(socket, channelID));
        socket.on('send_guild_message', message => sendGuildMessage(socket, message));

        socket.on('friend_request_notification', request => notifications.friendRequest(request));
        socket.on('accept_friend_request_notification', (username, friendID) => notifications.acceptFriendRequest(username, friendID));
    });
};

module.exports = connectSocket;