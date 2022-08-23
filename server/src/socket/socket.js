const connectSocket = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: 'http://localhost:3000'
        }
    });

    let onlineUsers = [];

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

    io.on('connection', (socket) => {
        socket.on('join', (user) => {
            join({ socketID: socket.id, userID: user.details._id });
        });

        socket.on('emitMessage', (data) => {
            const receiver = findUser(data.receiver);
            if (!receiver) return;
            io.to(receiver.socketID).emit('getMessage', data);
        });

        socket.on('disconnect', () => {
            disconnect(socket.id);
        });
    });
};

module.exports = connectSocket;
