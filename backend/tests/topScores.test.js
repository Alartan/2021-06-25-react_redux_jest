import TopScores from "../src/modules/topScores";
import testUtils from "./testUtils";

describe('Test topScores module to contain topScores', () => {
  test('New array of topScores is 10 fake scores', () => {
    let topScores = new TopScores();
    expect(topScores.getScores()).toStrictEqual([
      { name: '1', score: 100 },
      { name: '2', score: 100 },
      { name: '3', score: 100 },
      { name: '4', score: 100 },
      { name: '5', score: 100 },
      { name: '6', score: 100 },
      { name: '7', score: 100 },
      { name: '8', score: 100 },
      { name: '9', score: 100 },
      { name: '10', score: 100 }])
  });
  
  test('New array of topScores is 10 fake scores', () => {
    let topScores = new TopScores();
    topScores.addScore(testUtils.test1, 20);
    topScores.addScore(testUtils.test1, 22);
    topScores.addScore(testUtils.test1, 19);
    topScores.addScore(testUtils.test1, 109);
    expect(topScores.getScores()).toStrictEqual([
      { name: testUtils.test1, score: 19 },
      { name: testUtils.test1, score: 20 },
      { name: testUtils.test1, score: 22 },
      { name: '1', score: 100 },
      { name: '2', score: 100 },
      { name: '3', score: 100 },
      { name: '4', score: 100 },
      { name: '5', score: 100 },
      { name: '6', score: 100 },
      { name: '7', score: 100 }])
  });
});