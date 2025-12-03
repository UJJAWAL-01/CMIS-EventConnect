import request from 'supertest';
import app from '../../app';
import { User } from '../../models/User';
import { connectDB, disconnectDB } from '../../db/index';

describe('Authentication Integration Tests', () => {
    beforeAll(async () => {
        await connectDB();
    });

    afterAll(async () => {
        await disconnectDB();
    });

    beforeEach(async () => {
        await User.deleteMany({});
    });

    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'testpassword',
                role: 'student'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
        expect(response.body.user.username).toBe('testuser');
    });

    it('should login an existing user', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'testpassword',
                role: 'student'
            });

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'testpassword'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should not login with incorrect password', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'testpassword',
                role: 'student'
            });

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'wrongpassword'
            });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid credentials');
    });

    it('should not register a user with existing username', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'testpassword',
                role: 'student'
            });

        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'anotherpassword',
                role: 'student'
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Username already exists');
    });
});