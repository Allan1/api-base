'use strict';

const request = require('supertest');

// jest.mock('../../app/photo_model');
const app = require('../server/server');

describe('GET /api/accounts', () => {
  afterEach(() => {
    // app.server.close();
  });

  test('should respond with a 401 for non authenticated request', () => {
    return request(app)
      .get('/api/accounts')
      // .expect('Content-Type', /html/)
      .expect(401);
      /* .then(response => {
        expect(response.text).toMatch(
          /<title>Express App Testing Demo<\/title>/
        );
      }); */
  });
});

describe('POST /api/accounts', () => {
  test('should respond with a 200 for valid params', () => {
    return request(app)
      .post('/api/accounts')
      .send({
        name: 'foo',
        email: 'foo@bar.com',
        password: '123',
      })
      .expect(200);
  });
});
