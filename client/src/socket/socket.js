import io from 'socket.io-client';
import { store } from '../app/store';
import { updater } from '../features/conversation/conversationSlice';

let socket;
let nsSocket;

export const connectSocket = async (user, guilds) => {
    socket = io(import.meta.env.VITE_API_URL);
    user = JSON.parse(user);

    socket.on('connect', () => {
        socket.emit('join', user);
    });

    socket.on('getMessage', (message) => {
        store.dispatch(updater(message));
    });

    guilds.forEach((guild) => {
        if (!guild) return;
        nsSocket = io(`${import.meta.env.VITE_API_URL}/${guild._id}`);
    });
};

export const emitMessage = async (message) => {
    if (!message) return;
    socket.emit('emitMessage', message);
};

export const joinRoom = async (roomID) => {
    if (!roomID) return;
    nsSocket.emit('joinRoom', roomID);
};

export const emitGuildMessage = async (message) => {
    if (!message) return;
    nsSocket.emit('emitGuildMessage', message);

    nsSocket.on('emitGuildMessage', (message) => { });
};
