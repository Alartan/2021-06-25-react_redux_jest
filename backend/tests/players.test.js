import Players from '../modules/players';
import * as drawMap from '../modules/map/map';
import testUtils from './testUtils';

test('New players', () => {
  let players = new Players;
  expect(() => { players.getPlayer(testUtils.test1); }).toThrow(`No player with name ${testUtils.test1}`);
});

test('New players added', () => {
  let players = new Players;
  players.addPlayer(testUtils.test1);
  expect(players.getPlayer(testUtils.test1)).
    toStrictEqual({
      "score": 0,
      "travel": testUtils.emptyTravel
    });
});

test('New players increment score', () => {
  let players = new Players;
  players.addPlayer(testUtils.test1);
  players.addPlayer(testUtils.test2);
  players.incrementScore(testUtils.test1);
  expect(players.getPlayer(testUtils.test1)).
    toStrictEqual({
      "score": 1,
      "travel": testUtils.emptyTravel
    });
  expect(players.getPlayer(testUtils.test2)).
    toStrictEqual({
      "score": 0,
      "travel": testUtils.emptyTravel
    });
  [...Array(8)].forEach(() => players.incrementScore(testUtils.test1));
  expect(players.getPlayer(testUtils.test1)).
    toStrictEqual({
      "score": 9,
      "travel": testUtils.emptyTravel
    });
});

test('New players show tiles', () => {
  let mockMap = jest.spyOn(drawMap, 'default');
  mockMap.mockReturnValue(testUtils.testMap);
  let players = new Players;
  players.addPlayer(testUtils.test1);
  mockMap.mockRestore();
  players.addPlayer(testUtils.test2);
  expect(players.getPlayer(testUtils.test1)).
    toStrictEqual({
      "score": 0,
      "travel": testUtils.emptyTravel
    });
  [...Array(25).keys()].forEach((i) => players.showTile(testUtils.test1, i));
  expect(players.getPlayer(testUtils.test1)).
    toStrictEqual({
      "score": 0,
      "travel": testUtils.testMap
    });
  players.showTile(testUtils.test2, 9);
  expect(players.getPlayer(testUtils.test2).travel[9]).not.toBe(' ');
});

test('New players show tiles', () => {
  let mockMap = jest.spyOn(drawMap, 'default');
  mockMap.mockReturnValue(testUtils.testMap);
  let players = new Players;
  players.addPlayer(testUtils.test1);
  mockMap.mockRestore();
  players.addPlayer(testUtils.test2);
  expect(players.getPlayer(testUtils.test1)).
    toStrictEqual({
      "score": 0,
      "travel": testUtils.emptyTravel
    });
  [...Array(25).keys()].forEach((i) => players.showTile(testUtils.test1, i));
  expect(players.getPlayer(testUtils.test1)).
    toStrictEqual({
      "score": 0,
      "travel": testUtils.testMap
    });
  players.showTile(testUtils.test2, 9);
  expect(players.getPlayer(testUtils.test2).travel[9]).not.toBe(' ');
});

test('Check win of a player', () => {
  let mockMap = jest.spyOn(drawMap, 'default');
  mockMap.mockReturnValue(testUtils.testMap);
  let players = new Players;
  players.addPlayer(testUtils.test1);
  mockMap.mockRestore();
  [1, 2, 3].forEach((e) => {players.showTile(testUtils.test1, e);})
  expect(players.isWin(testUtils.test1)).not.toBeTruthy();
  testUtils.testWin.forEach((e) => {players.showTile(testUtils.test1, e);})
  expect(players.isWin(testUtils.test1)).toBeTruthy();
});