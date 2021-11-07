import request from "supertest";
import app from "../../src/app";
import testUtils from "../testUtils";
import async from "async";

import * as drawMap from "../../src/modules/map/drawMap";

describe("Test moving player on tiles", () => {
  test("Add player and move him - check: travel, score", async () => {
    const spy = jest.spyOn(drawMap, 'default');
    spy.mockReturnValue(testUtils.testMap);
    await async.series([
      async () => {
        const res = await request(app)
          .post("/name")
          .send({ name: testUtils.test1 });
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual({
          score: 0,
          travel: testUtils.emptyTravel,
        });
      },
      async (moves = [0, 1, 2]) => {
        const res = await request(app)
          .post(`/move/${testUtils.test1}`)
          .send({ moves: moves });
        let travel = [...testUtils.emptyTravel];
        expect(res.statusCode).toBe(200);
        moves.forEach((element) => {
          travel[element] = testUtils.testMap[element];
        });
        expect(res.body).toStrictEqual({
          score: 1,
          travel: travel,
        });
      }
    ]);
    spy.mockRestore();
  });

  test("Too many moves - error", async () => {
    const res = await request(app)
      .post(`/move/${testUtils.test1}`)
      .send({ moves: [0, 1, 2, 4] });
    expect(res.statusCode).toBe(404);
    expect(res.body).toStrictEqual({Error:'Wrong number of moves'});
  });

  test("0 moves - error", async () => {
    const res = await request(app)
      .post(`/move/${testUtils.test1}`)
      .send({ moves: [] });
    expect(res.statusCode).toBe(404);
    expect(res.body).toStrictEqual({Error:'Wrong number of moves'});
  });

  test("Add player and move him twice - check: travel, score", async () => {
    const spy = jest.spyOn(drawMap, 'default');
    spy.mockReturnValue(testUtils.testMap);
    await async.series([
      async () => {
        const res = await request(app)
          .post("/name")
          .send({ name: testUtils.test1 });
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual({
          score: 0,
          travel: testUtils.emptyTravel,
        });
      },
      async (moves = [0, 1, 2]) => {
        const res = await request(app)
          .post(`/move/${testUtils.test1}`)
          .send({ moves: moves });
        let travel = [...testUtils.emptyTravel];
        expect(res.statusCode).toBe(200);
        moves.forEach((element) => {
          travel[element] = testUtils.testMap[element];
        });
        expect(res.body).toStrictEqual({
          score: 1,
          travel: travel,
        });
      },
      async (moves = [4, 5, 6]) => {
        const res = await request(app)
          .post(`/move/${testUtils.test1}`)
          .send({ moves: moves });
        let travel = [];
        expect(res.statusCode).toBe(200);
        moves.forEach((element) => {
          travel.push = testUtils.testMap[element];
        });
        expect(res.body.travel). toEqual(expect.arrayContaining(travel));
        expect(res.body.score).toStrictEqual(2);
      }
    ]);
    spy.mockRestore();
  });

  test("Add player and win the game", async () => {
    const spy = jest.spyOn(drawMap, 'default');
    spy.mockReturnValue(testUtils.testMap);
    await async.series([
      async () => {
        const res = await request(app)
          .post("/name")
          .send({ name: testUtils.test1 });
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual({
          score: 0,
          travel: testUtils.emptyTravel,
        });
      },
      async (moves = [10, 14, 19]) => {
        const res = await request(app)
          .post(`/move/${testUtils.test1}`)
          .send({ moves: moves });
        let travel = [...testUtils.emptyTravel];
        expect(res.statusCode).toBe(200);
        moves.forEach((element) => {
          travel[element] = testUtils.testMap[element];
        });
        expect(res.body).toStrictEqual({
          score: 1,
          travel: travel,
          win: true,
          topScores: [
            { name: testUtils.test1, score: 1 },
            { name: '1', score: 100 },
            { name: '2', score: 100 },
            { name: '3', score: 100 },
            { name: '4', score: 100 },
            { name: '5', score: 100 },
            { name: '6', score: 100 },
            { name: '7', score: 100 },
            { name: '8', score: 100 },
            { name: '9', score: 100 }]
        });
      }
    ]);
    spy.mockRestore();
  });
});
