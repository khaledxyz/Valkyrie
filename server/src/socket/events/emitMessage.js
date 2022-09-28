const emitMessage = (io, onlineUsers, message) => {
    const findUser = (sender) => {
        return onlineUsers.find((onlineUser) => onlineUser.userID === sender);
    };

    const receiver = findUser(message.receiver);
    if (!receiver) return;
    io.to(receiver.socketID).emit('getMessage', message);
};

module.exports = emitMessage;