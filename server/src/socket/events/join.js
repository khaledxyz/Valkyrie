const join = (socket, userID) => {
    const alreadyOnline = onlineUsers.find(onlineUser => onlineUser.userID === userID);

    if (alreadyOnline) {
        if (alreadyOnline.sockets.some(id => id === socket.id)) return;
        alreadyOnline.sockets = [...alreadyOnline.sockets, socket.id];
        return;
    };

    onlineUsers.push({
        userID,
        sockets: [socket.id],
    });
};

module.exports = join;