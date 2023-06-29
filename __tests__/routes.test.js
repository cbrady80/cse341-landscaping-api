const request = require('supertest');
const app = require('../app');

describe('Routes', () => {
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
  describe('GET /grasses', () => {
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
