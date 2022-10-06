const joinRoom = async (socket) => {
    const roomID = '123';
    socket.join('123');
    socket.emit('JOIN_REQUEST_ACCEPTED', roomID);
};

module.exports = joinRoom;