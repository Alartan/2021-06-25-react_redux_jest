import drawTreasures from './drawTreasures.js';
import proximitySquare from './proximitySquare.js';

export default function drawMap() {
  const treasures = drawTreasures();

  let map = Array(25).fill(1).map(
    (x, i, self) =>
      Math.min(...treasures.map((x) => proximitySquare(x, i)))
  );
  let proximitiesSquare = (map.filter(
    (x, idx, tab) => tab.indexOf(x) === idx)
  ).sort(
    (a, b) => a - b // numbers are sorted alphabetically
  );
  map = map.map((value) => proximitiesSquare.length - proximitiesSquare.indexOf(value));
  treasures.forEach((x) => { map[x] = 'T'; })
  return map;
}