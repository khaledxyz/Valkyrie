const joinDm = (socket, userID, friendID) => {
    friendID = friendID.replace(/\D/g, '');
    userID = userID.replace(/\D/g, '');

    const roomID = userID > friendID ? userID / friendID : friendID / userID;
    socket.join(roomID);
    socket.emit('joined_dm', roomID);
};

module.exports = joinDm;