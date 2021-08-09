import request from 'supertest';
import app from '../../src/app';
import testUtils from '../testUtils';

describe.skip('Test adding and retrieving a player', () => {
  test('Tests if player is added', async () => {
    let res = await request(app).post('/name').
      send({ "name": testUtils.test1 });
    expect(res.statusCode).toBe(200);
    expect(res.body).
      toStrictEqual({
        score: 0,
        travel: testUtils.emptyTravel
      });
    res = await request(app).get(`/name${testUtils.test1}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).
      toStrictEqual({
        score: 0,
        travel: testUtils.emptyTravel
      });
  });
});