const sendMessage = (socket, room, message) => {
    socket.to(room).emit('SEND_MESSAGE', message);
};

module.exports = sendMessage;