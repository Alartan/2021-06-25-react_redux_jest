export  function proximitySquare(treasure, tile) {
  const treasure_x = treasure%5;
  const treasure_y = Math.floor(treasure/5);
  const tile_x = tile%5;
  const tile_y = Math.floor(tile/5);
  return (treasure_x-tile_x)**2 + (treasure_y-tile_y)**2;
}

export  function drawTreasures() {
  let treasures = Array.from([1,1,1],
    () => Math.floor(Math.random()*25%25)
    );
  while(treasures[0] === treasures[1])
    treasures[1] = Math.floor(Math.random()*25%25);
  while(treasures[0] === treasures[2]
    || treasures[1] === treasures[2])
    treasures[2] = Math.floor(Math.random()*25%25);
  return treasures;
}

export  function drawMap() {
  const treasures = this.drawTraseures();

  let map = Array(25).fill(1).map(
    (x, i, self) => 
      Math.min(...treasures.map((x) => this.proximitySquare(x, i)))
    );
  let proximitiesSquare = (map.filter(
    (x, idx, tab) => tab.indexOf(x) === idx)
    ).sort(
      (a,b)=>a-b // numbers are sorted alphabetically
      );
  map = map.map((value) => proximitiesSquare.length - proximitiesSquare.indexOf(value));
  treasures.forEach((x) => {map[x] = 'T';})
  return map;
}