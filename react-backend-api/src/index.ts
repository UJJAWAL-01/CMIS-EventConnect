import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app';
import config from './config/default';
import { connectDB } from './db';

// Optional seed import (guarded)
let seedDatabase: (() => Promise<void>) | undefined;
try {
    // Dynamically require to avoid crashes if file missing
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    seedDatabase = require('./db/seeds/seed').seedDatabase;
} catch (_) {}

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: { origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] }
});

io.on('connection', socket => {
    console.log('Socket connected', socket.id);
    socket.on('disconnect', () => console.log('Socket disconnected', socket.id));
});

const start = async () => {
    await connectDB();
    if (seedDatabase) {
        try {
            await seedDatabase();
            console.log('Seeding complete');
        } catch (e) {
            console.error('Seeding failed', e);
        }
    }
    httpServer.listen(config.port, () => {
        console.log(`API listening on http://localhost:${config.port}`);
    });
};

start();