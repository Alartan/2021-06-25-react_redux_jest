function testMap() {
  return [3, 2, 1, 2, 3,
  5, 4, 2, 4, 5,
  'T', 5, 3, 5, 'T',
  5, 4, 3, 5, 'T',
  3, 2, 2, 4, 5];
}

function testTreasures() {
  return [10, 14, 19];
}

const testUtils = {
  testMap: testMap(),
  testTreasures: testTreasures()
};

export default testUtils;