import io from 'socket.io-client';
import store from '../app/store';
import {updateMessages} from '../features/conversations/conversationsSlice';
let socket;

export const connectSocket = async (user) => {
    socket = io(`https://valkyrieapp-server.herokuapp.com`);

    socket.on('connect', () => {
        socket.emit('join', user);
    });

    socket.on('getMessage', (data) => {
        store.dispatch(updateMessages(data));
    });
};

export const emitMessage = async (message, sender) => {
    socket.emit('emitMessage', { ...message, sender: sender._id });
};
