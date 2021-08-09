import { expect, test } from '@jest/globals';
import proximitySquare from "../../src/modules/map/proximitySquare";

describe("Test calcuating proximity for map with treasures", () => {
  test('Calculates proximity square between coordinates using Pytagoras theorem', () => {
    expect(proximitySquare(0, 1)).toBe(1);
    expect(proximitySquare(23, 24)).toBe(1);
    expect(proximitySquare(1, 13)).toBe(8);
    expect(proximitySquare(1, 6)).toBe(1);
    expect(proximitySquare(1, 7)).toBe(2);
    expect(proximitySquare(1, 11)).toBe(4);
    expect(proximitySquare(1, 12)).toBe(5);
  });
});