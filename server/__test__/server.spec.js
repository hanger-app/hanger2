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

  xtest('POST /api/users', async () => {
    await request(app)
      .post('/api/users')
      .send({ firstName: 'test_firstName', lastName: 'test_lastName', email: 'fizz@buzz.io', zipcode: 12345 })
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.firstName).toEqual('test_firstName');
        expect(res.body.lastName).toEqual('test_lastName');
        expect(res.body.email).toEqual('fizz@buzz.io');
        expect(res.body.zipcode).toEqual(12345);
      });
  });

  xtest('GET /api/users/fizz@buzz.io', async () => {
    await request(app)
      .get('/api/users/fizz@buzz.io')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.firstName).toEqual('test_firstName');
        expect(res.body.lastName).toEqual('test_lastName');
        expect(res.body.email).toEqual('fizz@buzz.io');
        expect(res.body.zipcode).toEqual(12345);
      });
  });
});
