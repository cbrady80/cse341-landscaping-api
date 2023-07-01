const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
// const { server } = require('../app');

describe('users routes', () => {
    describe('GET /users', () => {
        it('should return all users', async () => {
            const response = await request(app).get('/users');
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body.status).toBe('success');
        });
    });
    describe('GET /users/:id', () => {
        it('should return a user by ID', async () => {
            const response = await request(app).get(
                '/users/649f062be95bb3ac566f39c2'
            );
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body.data.user._id).toBe('649f062be95bb3ac566f39c2');
        });
    });
    describe('PUT /users/:id to update a user', () => [
        it.skip('should update a user', async () => {
            const response = await request(app)
            .put('/users/649f062be95bb3ac566f39c2')
            .send({
                name: 'New User 7',
                email: 'user7@user.com',
                password: 'password',
                passwordConfirm: 'password',
            });
        }),
    ]);
    describe('DELETE /users/:id', () => {
        it.skip('should delete one user', async () => {
            const response = await request(app).delete(
                '/users/649f062be95bb3ac566f39c2'
            );
            expect(response.status).toBe(204);
            expect(response.body).toBeDefined();
            expect(response.body.data).toBe(undefined);
        });
    });
    describe('POST /users/signup to add new user', () => {
        it.skip('should create a new user', async () => {
            const response = (await request(app).post('/users')).send({
            name: 'New User',
            email: 'newuser@user.com',
            password: 'password',
            passwordConfirm: ' password',   
            });
            expect(response.status).toBe(201);
            expect(response.body).toBeDefined();
            expect(response.body.status).toBe('success');
            expect(response.body.data.user.name).toBe('New user');
        });
    });
});