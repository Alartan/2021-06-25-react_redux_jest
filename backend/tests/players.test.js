import Players from '../modules/players';
import testUtils from './testUtils';

test('New players', () => {
  let players = new Players;
  expect(() => { players.getPlayer('test'); }).toThrow(`No player with name test`);
});

test('New players added', () => {
  let players = new Players;
  players.addPlayer("test1");
  expect(players.getPlayer("test1")).
    toStrictEqual({
      "score": 0,
      "travel": testUtils.emptyTravel
    });
});

test('New players increment score', () => {
  let players = new Players;
  players.addPlayer("test1");
  players.addPlayer("test2");
  players.incrementScore("test1");
  expect(players.getPlayer("test1")).
    toStrictEqual({
      "score": 1,
      "travel": testUtils.emptyTravel
    });
    expect(players.getPlayer("test2")).
      toStrictEqual({
        "score": 0,
        "travel": testUtils.emptyTravel
      });
    [...Array(8)].forEach(() => players.incrementScore("test1"));
    expect(players.getPlayer("test1")).
      toStrictEqual({
        "score": 9,
        "travel": testUtils.emptyTravel
      });
});