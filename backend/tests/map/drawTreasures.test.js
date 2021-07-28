import { expect, test } from '@jest/globals';
import drawTreasures from "../../modules/map/drawTreasures";

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

describe("Test drawing tiles for treasures", () => {
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

  test('Treasures drawn aren\'t the same, but it may happen sometimes', () => {
    expect(
      [... drawTreasures(), ... drawTreasures(), ... drawTreasures()]
      ).not.toStrictEqual(
        [... drawTreasures(), ... drawTreasures(), ... drawTreasures()]
        );
  })
});