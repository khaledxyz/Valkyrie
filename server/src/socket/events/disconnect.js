const disconnect = (onlineUsers, socketID) => {
    onlineUsers = onlineUsers.filter(
        (onlineUser) => onlineUser.socketID === !socketID
    );
};

module.exports = disconnect;