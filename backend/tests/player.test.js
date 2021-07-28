import Player from '../modules/player';
import * as drawMap from '../modules/map/map';

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
    let player = new Player('test');
    expect(player.getScore()).toBe(0);
    player.incrementScore();
    expect(player.getScore()).toBe(1);
    [...Array(8)].forEach(() => player.incrementScore());
    expect(player.getScore()).toBe(9);
  })

  test('showTile function', () => {
    let spy = jest.spyOn(drawMap, 'default');
    spy.mockReturnValue(
      [3, 2, 1, 2, 3,
        5, 4, 2, 4, 5,
        'T', 5, 3, 5, 'T',
        5, 4, 3, 5, 'T',
        3, 2, 2, 4, 5]);
    let player = new Player('test');
    
    [3, 2, 1, 2, 3,
      5, 4, 2, 4, 5,
      'T', 5, 3, 5, 'T',
      5, 4, 3, 5, 'T',
      3, 2, 2, 4, 5].forEach((e, i) => {
      expect(player.travel.reduce((s, e) => {
        if (e === ' ') return s + 1;
        else return s;
      }, 0)).toBe(25 - i);
      player.showTile(i);
      expect(player.travel[i]).toBe(e);
    });
  })
})

test('Test showTile if it\'s mapping from map to travel', () => {
  let player = new Player('test');
  player.map
})