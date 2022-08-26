import io from 'socket.io-client';
import { store } from '../app/store';
import { updater } from '../features/conversation/conversationSlice';

let socket;

export const connectSocket = async (user) => {
    socket = io(import.meta.env.VITE_API_URL);
    user = JSON.parse(user);

    socket.on('connect', () => {
        socket.emit('join', user);
    });

    socket.on('getMessage', (message) => {
        store.dispatch(updater(message));
    });
};

export const emitMessage = async (message) => {
    if (!message) return;
    socket.emit('emitMessage', message);
    console.log('emitted: ', message);
};
