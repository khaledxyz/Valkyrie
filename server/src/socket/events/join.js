const join = (socket, user) => {
    const alreadyOnline = onlineUsers.some(onlineUser => onlineUser.userID === user.details._id);
    if (alreadyOnline) return;

    onlineUsers.push({
        userID: user.details._id,
        socketID: socket.id,
        currentRoom: []
    });
};

module.exports = join