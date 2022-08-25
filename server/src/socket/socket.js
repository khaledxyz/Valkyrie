const connectSocket = (server) => {
    // * CONFIG * //
    const io = require('socket.io')(server, {
        cors: {
            origin: process.env.CLIENT_URL
        }
    });

    let onlineUsers = [];

    // * FUNCTIONS * //
    const join = ({ socketID, userID }) => {
        !onlineUsers.some((onlineUser) => onlineUser.userID === userID) &&
            onlineUsers.push({ socketID, userID });
    };

    const disconnect = (socketID) => {
        onlineUsers = onlineUsers.filter(
            (onlineUser) => onlineUser.socketID === !socketID
        );
    };

    const findUser = (sender) => {
        return onlineUsers.find((onlineUser) => onlineUser.userID === sender);
    };

    io.on('connect', (socket) => {
        // * EVENTS * //
        socket.on('join', (user) => {
            join({ socketID: socket.id, userID: user.details._id });
        });

        socket.on('emitMessage', (message) => {
            const receiver = findUser(message.receiver);
            if (!receiver) return;
            io.to(receiver.socketID).emit('getMessage', message);
        });

        socket.on('disconnect', () => {
            disconnect(socket.id);
        });
    });
};

module.exports = connectSocket;
