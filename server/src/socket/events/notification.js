const friendRequest = (request) => {
    receiver = onlineUsers.find(onlineUser => onlineUser.userID === request.receiver);
    if (!receiver) return;
    receiver.sockets.forEach(socket => io.to(socket).emit('friend_request_notification'));
};

const acceptFriendRequest = (username, friendID) => {
    friend = onlineUsers.find(onlineUser => onlineUser.userID === friendID);
    if (!friend) return;
    friend.sockets.forEach(socket => io.to(socket).emit('accept_friend_request_notification', username));
};

const notifications = { friendRequest, acceptFriendRequest };
module.exports = notifications;