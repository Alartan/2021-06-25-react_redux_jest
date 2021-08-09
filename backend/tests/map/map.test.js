import { expect, test } from '@jest/globals';
// neccesary for spyOn to work
import * as drawTreasures from "../../modules/map/drawTreasures";
import drawMap from '../../modules/map/map.js';
import testUtils from '../testUtils';

describe('Test drawMap if it is correct', () => {
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
    const spy = jest.spyOn(drawTreasures, 'default');
    spy.mockReturnValue(testUtils.testTreasures);
    expect(drawMap()).toStrictEqual(testUtils.testMap);
    drawTreasures.default.mockRestore();
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
});