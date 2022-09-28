const join = (onlineUsers, { socketID, userID }) => {
    !onlineUsers.some((onlineUser) => onlineUser.userID === userID) &&
        onlineUsers.push({ socketID, userID });
};

module.exports = join;