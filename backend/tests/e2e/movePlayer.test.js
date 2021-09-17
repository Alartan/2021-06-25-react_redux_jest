import request from "supertest";
import app from "../../src/app";
import testUtils from "../testUtils";
import async from "async";

import * as drawMap from "../../src/modules/map/drawMap";

const move = async (moves) => {
  const res = await request(app)
    .post(`/move${testUtils.test1}`)
    .send({ moves: moves });
  let travel = testUtils.emptyTravel;
  expect(res.statusCode).toBe(200);
  moves.forEach((element) => {
    travel[element] = testUtils.testMap[element];
  });
  expect(res.body).toStrictEqual({
    score: 1,
    travel: travel,
  });
};

describe.skip("Test moving player on tiles", () => {
  test("Add player and move him - check: travel, score", () => {
    async.series([
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
      move([0, 1, 2]),
    ]);
  });
});
