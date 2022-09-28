const emitGuildMessage = (io, namespace, nsSocket, message) => {
    const [, roomID] = nsSocket.rooms;
    io.of(namespace._id).to(roomID).emit('emitGuildMessage', message)
};

module.exports = emitGuildMessage;