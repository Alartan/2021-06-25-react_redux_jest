import { expect, test } from '@jest/globals';
import drawTreasures from "../modules/map/drawTreasures";
import drawMap from '../modules/map/map.js';
import proximitySquare from "../modules/map/proximitySquare";

test('Calculates proximity square between coordinates using Pytagoras theorem', () => {
  expect(proximitySquare(0, 1)).toBe(1);
  expect(proximitySquare(23, 24)).toBe(1);
  expect(proximitySquare(1, 13)).toBe(8);
  expect(proximitySquare(1, 6)).toBe(1);
  expect(proximitySquare(1, 7)).toBe(2);
  expect(proximitySquare(1, 11)).toBe(4);
  expect(proximitySquare(1, 12)).toBe(5);
});

expect.extend({
  toBeDifferent(received) {
    const [t1, t2, t3] = [...received];
    if (t1 === t2 || t1 === t3 || t2 === t3)
      return {
        message: () => `expected ${received}, to be of different values`,
        pass: false
      };
    return {
      message: () => '',
      pass: true
    };
  },
  toBeInMapRange(received) {
    const result = received.filter(e => e >= 0 && e < 25).length === received.length;
    if (result) return {
      message: () => '',
      pass: true,
    };
    return {
      message: () => `expected ${received} to fit a map of 25 tiles`,
      pass: false,
    };
  }
});
test('Jest mathers for treasures should not work with certain arrays', () => {
  expect([1, 1, 3]).not.toBeDifferent()
  expect([-1, 27, 90]).not.toBeInMapRange();
});
test('Returns possible 3 coordinates of treasures: range 0-24, every different', () => {
  expect(drawTreasures()).toHaveLength(3);
  for (let i = 0; i < 100; i++) {
    expect(drawTreasures()).toBeDifferent();
    expect(drawTreasures()).toBeInMapRange();
  }
});

test('Drawn map has 25 tiles', () => {
  expect(drawMap()).toHaveLength(25);
});

test('Drawn map has 3 treasures represented as "T"', () => {
  expect(drawMap().filter(x => x === 'T').length).toBe(3);
});

expect.extend({
  isMap(received) {
    const distinctTiles = received.filter(
      (e, idx, tab) => tab.indexOf(e) === idx
    ).sort((a, b) => a - b);
    if (distinctTiles.indexOf("T") === -1)
      return {
        message: () => `Tiles values: ${distinctTiles}, no Treasure`,
        pass: false,
      };
    for (let i = 1; i <= Math.max(distinctTiles) + 1; i++) {
      if (distinctTiles.indexOf(i) != i - 1)
        return {
          message: () => `Tiles values: ${distinctTiles}, missing ${i}.`,
          pass: true,
        };
    }
    return { message: () => '', pass: true, };
  },
});
test('Drawn map is filled with sequence of numbers and "T"', () => {
  expect(drawMap()).isMap();
});

test('Draw map from given treasures', () => {
  const spy = jest.spyOn(drawTreasures, 'drawTreasures');
  spy.mockReturnValue([10, 14, 19]);
  console.log(drawMap());
  expect(drawMap()).toStrictEqual(
    [3, 2, 1, 2, 3,
      5, 4, 2, 4, 5,
      'T', 5, 3, 5, 'T',
      5, 4, 3, 5, 'T',
      3, 2, 2, 4, 1]);
  drawTreasuresModule.drawTreasures.mockRestore();
});

expect.extend({
  hasHighestValuesAroundTreasures(received) {
    const max = Math.max(...received.filter(x => !isNaN(x)));
    for (let i = 0; i < 25; i++) {
      if (received[i] === 'T') {
        if (
          i - 5 >= 0 && received[i - 5] != max && received[i - 5] != 'T' ||
          i + 5 < 24 && received[i + 5] != max && received[i + 5] != 'T' ||
          i % 5 != 0 && received[i - 1] != max && received[i - 1] != 'T' ||
          i % 5 != 4 && received[i + 1] != max && received[i + 1] != 'T')
          return {
            message: () => `There is something else than max value or another treasure
            in direct neighbourhood of a treasure: \n
            ${received} \n
            max: ${max}
            i: ${i}`,
            pass: false,
          };
      }
    }
    return { message: () => '', pass: true };
  }
});
test('Highest proximities in the direct neighbourhood of a treasure',
  () => {
    expect(drawMap()).hasHighestValuesAroundTreasures();
  });
