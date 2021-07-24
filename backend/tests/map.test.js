import { expect, test } from '@jest/globals';
import * as Map from '../modules/map.js';

test('Calculates proximity square between coordinates using Pytagoras theorem', () => {
  expect(Map.proximitySquare(0, 1)).toBe(1);
  expect(Map.proximitySquare(23,24)).toBe(1);
  expect(Map.proximitySquare(1,13)).toBe(8);
  expect(Map.proximitySquare(1,6)).toBe(1);
  expect(Map.proximitySquare(1,7)).toBe(2);
  expect(Map.proximitySquare(1,11)).toBe(4);
  expect(Map.proximitySquare(1,12)).toBe(5);
});

expect.extend({
  toBeDifferent(received) {
    const [t1, t2, t3] = [...received];
    if (t1===t2 || t1===t3 || t2===t3)
      return {
        message: () => `expected ${received}, to be of different values`,
        pass: false
      };
    return {
      message: () => '',
      pass: true};
  },
  toBeInMapRange(received) {
    const result = received.filter(e => e>=0 && e<25).length === received.length;
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
test('Returns possible 3 coordinates of treasures: range 0-24, every different', () => {
  expect(Map.drawTreasures()).toHaveLength(3);
  expect([1, 1, 3]).not.toBeDifferent()
  expect([-1, 27, 90]).not.toBeInMapRange();
  for (let i=0; i< 100; i++) {
    expect(Map.drawTreasures()).toBeDifferent();
    expect(Map.drawTreasures()).toBeInMapRange();
  }
});

expect(()=>''.to)