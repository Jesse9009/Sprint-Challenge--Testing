const request = require('supertest');

const server = require('./server');
const db = require('./db');

describe('the route handlers', () => {
  describe('GET /games', () => {
    test('responds with a 200 status', async () => {
      const response = await request(server).get('/games');
      expect(response.status).toBe(200);
    });
    test('responds with json', async () => {
      const response = await request(server).get('/games');
      expect(response.type).toMatch(/json/i);
    });
    test('always responds with an array, even if there are no games', async () => {
      db.data = [];
      const response = await request(server).get('/games');
      const rows = await expect(response.body).toEqual([]);
    });
  });
  describe('POST /games', () => {
    afterEach(() => {
      db.data = [
        {
          title: 'Pacman',
          genre: 'Arcade',
          releaseYear: 1980
        }
      ];
    });
    test('responds with a 201 status', async () => {
      const body = {
        title: 'Red Dead Redemption 2',
        genre: 'Open World Action-adventure',
        releaseYear: 2018
      };
      const response = await request(server)
        .post('/games')
        .send(body);
      expect(response.status).toBe(201);
    });
    test('responds with a 422 status if request is missing data', async () => {
      const body = {
        title: 'Red Dead Redemption 2',
        genre: '',
        releaseYear: 2018
      };
      const response = await request(server)
        .post('/games')
        .send(body);
      expect(response.status).toBe(422);
    });
    test('responds with a 409 status if a duplicate game is entered', async () => {
      const body = {
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980
      };
      const response = await request(server)
        .post('/games')
        .send(body);
      expect(response.status).toBe(409);
    });
  });
});
