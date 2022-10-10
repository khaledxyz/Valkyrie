const disconnect = (socket) => {
    onlineUsers = onlineUsers.filter(onlineUser => onlineUser.socketID !== socket.id);
};

module.exports = disconnect;
