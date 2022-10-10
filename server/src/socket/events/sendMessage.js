const sendMessage = (socket, message, roomID) => {
    const receiver = onlineUsers.find(onlineUser => onlineUser.userID === message.receiver);
    socket.to(roomID).emit('received_message', message);
    io.to(receiver.socketID).emit('received_message_notification', message);
};

module.exports = sendMessage;