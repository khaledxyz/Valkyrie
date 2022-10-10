const sendGuildMessage = (socket, message) => {
    socket.to(message.channel).emit('received_message', message);
};

module.exports = sendGuildMessage;