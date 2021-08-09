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

function testWin() {
  return [10, 14, 19];
}

function emptyTravel() {
  return Array(25).fill(' ');
}

function testName(index) {
  return `test${index}`;
}

const testUtils = {
  testMap: testMap(),
  testTreasures: testTreasures(),
  testWin: testWin(),
  emptyTravel: emptyTravel(),
  test1: testName(1),
  test2: testName(2)
};

export default testUtils;