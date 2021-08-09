import Players from '../modules/players';
import * as drawMap from '../modules/map/drawMap';
import testUtils from './testUtils';

describe('Test Players module containing players data', () => {
  test('New players', () => {
    const players = new Players;
    expect(() => { players.getPlayer(testUtils.test1); }).toThrow(`No player with name ${testUtils.test1}`);
  });

  test('New players added', () => {
    const players = new Players;
    players.addPlayer(testUtils.test1);
    expect(players.getPlayer(testUtils.test1)).
      toStrictEqual({
        "score": 0,
        "travel": testUtils.emptyTravel
      });
  });

  test('New players increment score', () => {
    const players = new Players;
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
    const mockMap = jest.spyOn(drawMap, 'default');
    mockMap.mockReturnValue(testUtils.testMap);
    const players = new Players;
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
    const mockMap = jest.spyOn(drawMap, 'default');
    mockMap.mockReturnValue(testUtils.testMap);
    const players = new Players;
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
    const mockMap = jest.spyOn(drawMap, 'default');
    mockMap.mockReturnValue(testUtils.testMap);
    const players = new Players;
    players.addPlayer(testUtils.test1);
    mockMap.mockRestore();

    [1, 2, 3].forEach((e) => { players.showTile(testUtils.test1, e); })
    expect(players.removeWon(testUtils.test1)).not.toBeTruthy();
    expect(() => { players.getPlayer(testUtils.test1); }).
      not.toThrow(`No player with name ${testUtils.test1}`);

    testUtils.testWin.forEach((e) => { players.showTile(testUtils.test1, e); })
    expect(players.removeWon(testUtils.test1)).toBeTruthy();
    expect(() => { players.getPlayer(testUtils.test1); }).
      toThrow(`No player with name ${testUtils.test1}`);
  })
});