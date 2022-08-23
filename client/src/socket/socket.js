import io from 'socket.io-client';

let socket;

export const connectSocket = async (user) => {
    socket = io(`https://valkyrieapp-server.herokuapp.com`);

    socket.on('connect', () => {
        socket.emit('join', user);
    });

    socket.on('getMessage', (data) => {
        console.log(data);
    });
};

export const emitMessage = async (message, sender) => {
    socket.emit('emitMessage', { ...message, sender: sender._id });
};
