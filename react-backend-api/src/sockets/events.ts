// Simplified socket events; full realtime service not implemented yet
import { Server } from 'socket.io';
export const attachSocketHandlers = (io: Server) => {
    io.on('connection', socket => {
        console.log('Socket connected', socket.id);
        socket.on('joinRoom', room => socket.join(room));
        socket.on('sendMessage', ({ room, message }) => io.to(room).emit('receiveMessage', message));
    });
};