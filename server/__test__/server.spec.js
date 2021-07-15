const request = require('supertest');
const app = require('../server');

describe('loading express server', () => {
  test('GET /', async () => {
    await request(app)
      .get('/')
      .expect('Content-Type', /text\/html/)
      .expect(200);
  });

  test('GET non-existent route', async () => {
    await request(app).get('/fizz/buzz/bazz').expect(404);
  });
});
