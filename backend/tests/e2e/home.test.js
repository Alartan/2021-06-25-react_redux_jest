import request from 'supertest';
import app from '../../src/app';

describe('Test "home" route', () => {
  test('Tests if message is proper', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.response).toBe("I'm alive");
  });
});