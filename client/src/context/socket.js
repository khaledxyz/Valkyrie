// * CLIENT
import { createContext } from "react";
import io from "socket.io-client";

export const socket = io(import.meta.env.VITE_API_URL);
export const SocketContext = createContext();

export const emitPrivateMessage = (room, message) => {
    socket.emit('SEND_MESSAGE', room, message);
};