import { Server } from 'socket.io';
import { createServer } from 'http';

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

const realtimeService = {
    init: () => {
        io.on('connection', (socket) => {
            console.log('A user connected:', socket.id);

            socket.on('disconnect', () => {
                console.log('User disconnected:', socket.id);
            });

            // Example of handling a custom event
            socket.on('sendMessage', (message) => {
                io.emit('receiveMessage', message);
            });
        });
    },
    getIo: () => {
        return io;
    },
};

export default realtimeService;