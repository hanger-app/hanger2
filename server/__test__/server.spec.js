const request = require('supertest');
const app = require('../server');
const { setupDatabase, teardownDatabase } = require('./setupTeardownDatabase.js');

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

describe('test CRUD functionality', () => {
  beforeAll(async () => {
    try {
      await setupDatabase();
      console.log('Connected to remote MongoDB instance');
    } catch (err) {
      throw new Error(`ERROR: server.spec.js: ${err}`);
    }
  });

  afterAll(async () => {
    try {
      await teardownDatabase();
    } catch (err) {
      throw new Error(`ERROR: server.spec.js: ${err}`);
    }
  });

  test('POST /api/users/fizz@buzz.io', async () => {
    await request(app)
      .post('/api/users/fizz@buzz.io')
      .send({ firstName: 'test_firstName', lastName: 'test_lastName', zipcode: 12345 })
      .expect('Content-Type', /application\/json/)
      .expect(200);
  });

  test('GET /api/users/fizz@buzz.io', async () => {
    await request(app)
      .get('/api/users/fizz@buzz.io')
      .expect('Content-Type', /application\/json/)
      .expect(200);
  });
});
