import Player from '../modules/player';
import drawMap from '../modules/map/map';

describe('Test player module containing Player class', () => {
  test('constructor of Player', () => {
    const player = new Player('test');
    expect(player).toBeTruthy();
    expect(player.name).toBe('test');
    expect(player.score).toBe(0);
    expect(player.map).toHaveLength(25);
    expect(player.map.reduce((s, e) => {
      if (e === 'T') return s + 1;
      else return s;
    }, 0)).toBe(3);
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
    player.score = 7;
    player.incrementScore();
    expect(player.getScore()).toBe(8);
  })

  test('showTile function', () => {
    let spy = jest.spyOn(drawMap, 'default');
    spy.mockReturnValue();
    let player = new Player('test');
    tab.forEach((e, i) => {
      expect(player.travel.reduce((s, e) => {
        if (e === ' ') return s + 1;
        else return s;
      }, 0)).toBe(25-i);
      player.showTile(i);
      expect(player.travel[i]).toBe(e);
    });
  })
})