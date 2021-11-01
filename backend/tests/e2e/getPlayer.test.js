import request from 'supertest';
import app from '../../src/app';
import testUtils from '../testUtils';
import async from 'async';

describe('Test adding and retrieving a player', () => {
  test('Tests if added player is getable', async () => {
    await async.series([
      async () => {
        let res = await request(app).post('/name').
          send({ "name": testUtils.test1 });
        expect(res.statusCode).toBe(200);
        expect(res.body).
          toStrictEqual({
            score: 0,
            travel: testUtils.emptyTravel
          });
      },
      async () => {
        let res = await request(app).get(`/name/${testUtils.test1}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).
          toStrictEqual({
            score: 0,
            travel: testUtils.emptyTravel
          });
      }
    ])
  });
  test('Tests if not added player gives 404', async () => {
    await async.series([
      async () => {
        let res = await request(app).post('/name').
          send({ "name": testUtils.test1 });
        expect(res.status).toBe(200);
        expect(res.body).
          toStrictEqual({
            score: 0,
            travel: testUtils.emptyTravel
          });
      },
      async () => {
        let res = await request(app).get(`/name/${testUtils.test2}`);
        expect(res.status).toBe(404);
      }
    ])
  });
});