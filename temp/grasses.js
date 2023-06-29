const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
// const { server } = require('../app');

describe('Grass Routes', () => {
  // afterEach(() => {
  //   mongoose.connection.close();
  //   app.close();
  // });
  describe('GET /grass', () => {
    it('should return all grasses', async () => {
      const response = await request(app).get('/grasses');
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.status).toBe('success');
    });
  });
  describe('GET /grasses/:id', () => {
    it('should return on grass', async () => {
      const response = await request(app).get(
        '/grasses/649117b69b4e0bbe9c801f60'
      );
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.data.grass._id).toBe('649117b69b4e0bbe9c801f60');
    });
  });
  describe('GET /grasses/heatTolerant/:heatTolerant', () => {
    it('should return all grass that are heat tolerant', async () => {
      const response = await request(app).get('/grasses/heatTolerant/true');
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.status).toBe('success');
    });
  });
  describe('POST /grasses to add new grasses', () => {
    it.skip('should create new grass', async () => {
      const response = await request(app).post('/grasses').send({
        name: 'A new grass',
        heatTolerant: 'true',
        coldTolerant: 'true',
        droughtTolerant: 'true',
        shadeTolerant: 'true',
        growingSpeed: 'fast',
      });
      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
      expect(response.body.status).toBe('success');
      expect(response.body.data.grass.name).toBe('A new grass');
    });
  });
  describe('PUT /grasses/:id to update grass', () => {
    it.skip('should update a grass', async () => {
      const response = await request(app)
        .put('/grasses/649117b69b4e0bbe9c801f60')
        .send({
          name: 'UPDATED fine fescue',
          heatTolerant: 'true',
          coldTolerant: 'true',
          droughtTolerant: 'true',
          shadeTolerant: 'true',
          growingSpeed: 'slow',
        });
    });
  });
  describe('DELETE /grasses/:id', () => {
    it.skip('should delete one grass', async () => {
      const response = await request(app).delete(
        '/grasses/649117b69b4e0bbe9c801f65'
      );
      expect(response.status).toBe(204);
      expect(response.body).toBeDefined();
      expect(response.body.data).toBe(undefined);
    });
  });
});
