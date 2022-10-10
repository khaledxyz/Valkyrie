const disconnect = (socket) => {
    const user = onlineUsers.find(onlineUser => onlineUser.sockets.map(uSocket => uSocket === socket.id));
    if (!user) return;

    const socketIndex = user.sockets.indexOf(socket.id);
    if (socketIndex < 0) return;

    user.sockets.splice(socketIndex, 1);

    if (user.sockets.length <= 0) {
        const userIndex = onlineUsers.indexOf(user);
        onlineUsers.splice(socketIndex, 1)
    };
};

module.exports = disconnect;

function removeItemFromUser(users, userID, itemToDelete) {
    const foundUser = users.find(user => user.userID === userID);
    if (!foundUser) {
        return;
    }

    const itemToDeleteIndex = foundUser.items.indexOf(itemToDelete);
    if (itemToDeleteIndex < 0) {
        return;
    }

    foundUser.items.splice(itemToDeleteIndex, 1);
}
