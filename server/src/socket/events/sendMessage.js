const sendMessage = (socket, message, roomID) => {
    const receiver = onlineUsers.find(onlineUser => onlineUser.userID === message.receiver);
    socket.to(roomID).emit('received_message', message);
    receiver.sockets.forEach(socket => {
        io.to(socket).emit('received_message_notification', message);
    });
};

module.exports = sendMessage;