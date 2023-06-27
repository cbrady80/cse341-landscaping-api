const request = require('supertest');
const app = require('../app');

describe('Tree Routes', () => {
  describe('GET /trees', () => {
    it('should return all trees', async () => {
      const response = await request(app).get('/trees');
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.status).toBe('success');
    });
  });
  describe('GET /trees/:id', () => {
    it('should return one tree', async () => {
      const response = await request(app).get(
        '/trees/64910ab39b4e0bbe9c801f55'
      );
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.data.tree._id).toBe('64910ab39b4e0bbe9c801f55');
    });
  });
  describe('GET /trees/leafType/:leafType', () => {
    it('should return all coniferous trees', async () => {
      const response = await request(app).get('/trees/leafType/coniferous');
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.status).toBe('success');
    });
  });
  describe('POST /trees to add new tree', () => {
    it.skip('should create new tree', async () => {
      const response = await request(app)
        .post('/trees')
        .send({
          common_name: 'A New Tree',
          scientific_name: ['Abies alba'],
          other_name: ['Common Silver Fir'],
          cycle: 'Perennial',
          watering: 'Frequent',
          sunlight: ['full sun'],
          leafType: 'coniferous',
          imageURL:
            'https://perenual.com/storage/species_image/1_abies_alba/og/1536px-Abies_alba_SkalitC3A9.jpg',
        });
      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
      expect(response.body.status).toBe('success');
      expect(response.body.data.tree.common_name).toBe('A New Tree');
    });
  });
  describe('PUT /trees/:id to update tree', () => {
    it.skip('should update a tree', async () => {
      const response = await request(app)
        .put('/trees/64910ab39b4e0bbe9c801f55')
        .send({
          common_name: 'UPDATED Johin Japanese Maple',
          scientific_name: ["Acer 'Johin'"],
          other_name: ['Red Full Moon Maple'],
          cycle: 'Perennial',
          watering: 'Frequent',
          sunlight: ['full sun'],
          leafType: 'deciduous',
          imageURL:
            'https://perenual.com/storage/species_image/10_acer_johin/og/pexels-photo-2183508.jpg',
        });
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.status).toBe('success');
      expect(response.body.data.tree.common_name).toBe(
        'UPDATED Johin Japanese Maple'
      );
    });
  });
  describe('DELETE /trees/:id', () => {
    it.skip('should delete one tree', async () => {
      const response = await request(app).delete(
        '/trees/6499bf44875d29951c818ff8'
      );
      expect(response.status).toBe(204);
      expect(response.body).toBeDefined();
      expect(response.body.data).toBe(undefined);
    });
  });
});
