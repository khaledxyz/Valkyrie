const disconnect = (socket) => {
    const user = onlineUsers.find(onlineUser => onlineUser.sockets.find(uSocket => uSocket === socket.id));
    if (!user) return;

    const socketIndex = user.sockets.indexOf(socket.id);
    if (socketIndex < 0) return;

    user.sockets.splice(socketIndex, 1);

    if (user.sockets.length <= 0) {
        const userIndex = onlineUsers.indexOf(user);
        onlineUsers.splice(userIndex, 1)
    };
};

module.exports = disconnect;