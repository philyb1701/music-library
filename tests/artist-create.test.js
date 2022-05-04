// tests/artists-create.js

const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');

describe('Create artists', () => {
  describe('/artist', () => {
    describe('POST', () => {
      it('creates a new artist in the database', async () => {
        const res = await request(app).post('/artist').send({
          name: 'Tame Impala',
          genre: 'rock',
        });

        expect(res.status).to.equal(201);
      });
    });
  });
});
