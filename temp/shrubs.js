const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
// const { server } = require('../app');

describe('Shrub Routes', () => {
  // afterEach(() => {
  //   mongoose.connection.close();
  //   app.close();
  // });
  describe('GET /shrubs', () => {
    it('should return all shrubs', async () => {
      const response = await request(app).get('/shrubs');
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.status).toBe('success');
    });
  });
  describe('GET /shrubs/:id', () => {
    it('should return one shrub', async () => {
      const response = await request(app).get(
        '/shrubs/649117c59b4e0bbe9c801f67'
      );
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.data.shrub._id).toBe('649117c59b4e0bbe9c801f67');
    });
  });
  describe('GET /shrubs/sunlight/:sunlight', () => {
    it('should return all part shade shrubs', async () => {
      const response = await request(app).get('/shrubs/sunlight/part%20shade');
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.status).toBe('success');
    });
  });
  describe('POST /shrubs/addShrub to add new shrub', () => {
    it.skip('should create new shrub', async () => {
      const response = await request(app)
        .post('/shrubs/addShrub')
        .send({
          name: 'A Test Shrub',
          growingZones: '5-8',
          sunlight: ['part shade'],
          height: '9',
          waterRequirement: 'low',
        });
      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
      expect(response.body.status).toBe('success');
      expect(response.body.data.shrub.name).toBe('A Test Shrub');
    });
  });
  describe('PUT /shrubs/update/:id to update shrub', () => {
    it.skip('should update a shrub', async () => {
      const response = await request(app)
        .put('/shrubs/update/649a58d85fd44d22590eace5')
        .send({
          name: 'Updated Bogus Shrub',
          growingZones: '5-8',
          sunlight: ['shade'],
          height: '9',
          waterRequirement: 'low',
        });
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.status).toBe('success');
      expect(response.body.data.shrub.name).toBe('Updated Bogus Shrub');
    });
  });
  describe('DELETE /shrubs/delete/:id', () => {
    it.skip('should delete one shrub', async () => {
      const response = await request(app).delete(
        '/shrubs/649a58d85fd44d22590eace5'
      );
      expect(response.status).toBe(204);
      expect(response.body).toBeDefined();
      expect(response.body.data).toBe(undefined);
    });
  });
});
