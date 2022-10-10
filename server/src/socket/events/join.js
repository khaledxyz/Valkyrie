const join = (socket, userID) => {
    const alreadyOnline = onlineUsers.some(onlineUser => onlineUser.userID === userID);
    if (alreadyOnline) { onlineUsers = onlineUsers.filter(onlineUser => onlineUser.socketID !== socket.id); };

    onlineUsers.push({
        userID,
        socketID: socket.id,
    });

    console.log('new')
};

module.exports = join;