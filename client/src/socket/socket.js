import io from 'socket.io-client';
import { store } from '../app/store';
import { updateMessagesHistory } from '../features/conversations/conversationsSlice';

let socket;

export const connectSocket = async (user) => {
    socket = io(import.meta.env.API_URL);

    socket.on('connect', () => {
        socket.emit('join', user);
    });

    socket.on('getMessage', (data) => {
        store.dispatch(updateMessagesHistory());
    });
};

export const emitMessage = async (message, sender) => {
    socket.emit('emitMessage', { ...message, sender: sender._id });
};
