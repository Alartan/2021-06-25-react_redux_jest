import Player from '../src/modules/player';
import * as drawMap from '../src/modules/map/drawMap';
import testUtils from './testUtils';

describe('Test player module containing Player class', () => {
  test('constructor of Player', () => {
    const player = new Player('test');
    expect(player).toBeTruthy();
    expect(player.name).toBe('test');
    expect(player.getScore()).toBe(0);
    expect(player.travel).toHaveLength(25);
    expect(player.travel.reduce((s, e) => {
      if (e === ' ') return s + 1;
      else return s;
    }, 0)).toBe(25);
  });

  test('getScore and incrementScore functions', () => {
    const player = new Player('test');
    expect(player.getScore()).toBe(0);
    player.incrementScore();
    expect(player.getScore()).toBe(1);
    [...Array(8)].forEach(() => player.incrementScore());
    expect(player.getScore()).toBe(9);
  })

  test('showTile function', () => {
    const spy = jest.spyOn(drawMap, 'default');
    spy.mockReturnValue(testUtils.testMap);
    const player = new Player('test');
    testUtils.testMap.forEach((e, i) => {
      expect(player.travel.reduce((s, e) => {
        if (e === ' ') return s + 1;
        else return s;
      }, 0)).toBe(25 - i);
      player.showTile(i);
      expect(player.travel[i]).toBe(e);
    });
    spy.mockRestore();
  });
});
