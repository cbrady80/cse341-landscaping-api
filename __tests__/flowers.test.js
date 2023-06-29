const request = require('supertest');
const app = require('../app');

describe('Flower Routes', () => {
  describe('GET /flowers', () => {
    test('it should return all flowers', async () => {
      const res = await request(app).get('/flowers');
      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
      expect(res.body.status).toBe('success');
    });
  });
  describe('GET /flowers/:id', () => {
    test('it should return one flower', async () => {
      const res = await request(app).get(
        '/flowers/649116ea9b4e0bbe9c801f57'
      );
      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.flowers._id).toBe('649116ea9b4e0bbe9c801f57');
    });
  });
  describe('GET /flowers/sunlight/:sunlight', () => {
    test('it should return all part shade flowers', async () => {
      const res = await request(app).get('/flowers/sunlight/part%20shade');//Looked on api-doc to see how the space was rendered in the URL; hence the %20
      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
      expect(res.body.status).toBe('success');
    });
  });
  describe('GET /flowers/color/:colors', () => {
    test('it should return all red flowers', async () => {
      const res = await request(app).get('/flowers/color/red');
      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
      expect(res.body.status).toBe('success');
    });
  });
  describe('POST /flowers to add new flower', () => {
    test.skip('it should create a new flower', async () => {
      const res = await request(app)
        .post('/flowers')
        .send({
          name: 'A Test Flower',
          growingZones: '5-8',
          sunlight: ['part shade'],
          colors: ['red', 'pink', 'yellow', 'purple'],
          waterRequirement: 'low',
        });
      expect(res.status).toBe(201);
      expect(res.body).toBeDefined();
      expect(res.body.status).toBe('success');
      expect(res.body.data.flowers.name).toBe('A Test Flower');
    });
  });
  describe('PUT /flowers/:id to update flowers', () => {
    test.skip('it should update a flower', async () => {
      const res = await request(app)
        .put('/flowers/649a58d...5')
        .send({
          name: 'UPDATED Test Flower',
          growingZones: '5-8',
          sunlight: ['shade'],
          colors: ['red', 'white'],
          waterRequirement: 'low',
        });
      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
      expect(res.body.status).toBe('success');
      expect(res.body.data.flowers.name).toBe(
        'UPDATED Test Flower'
      );
    });
  });
  describe('DELETE /flowers/:id', () => {
    test.skip('it should delete one flower', async () => {
      const res = await request(app).delete(
        '/flowers/649a...ace5'
      );
      expect(res.status).toBe(204);
      expect(res.body).toBeDefined();
      expect(res.body.data).toBe(undefined);
    });
  });
});
