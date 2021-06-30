export default class Players {
  constructor() {
    this.players = {};
  }

  addPlayer = (name) => {
    this.players[name] = {
      score: 0,
      map: this.drawMap(),
      travel: Array(25).fill(' '),
    };
  }

  getPlayer(name) {
    const player = this.players[name]
    return {
      score: this.getScore(name),
      travel: player.travel // change it for travel
    };
  }

  proximitySquare(treasure, tile) {
    const treasure_x = treasure%5;
    const treasure_y = Math.floor(treasure/5);
    const tile_x = tile%5;
    const tile_y = Math.floor(tile/5);
    return (treasure_x-tile_x)**2 + (treasure_y-tile_y)**2;
  }

  drawMap() {
    let treasures = Array.from([1,1,1],
      () => Math.floor(Math.random()*25%25)
      );
    while(treasures[1] === treasures[2])
      treasures[2] = Math.floor(Math.random()*25%25);
    while(treasures[1] === treasures[3]
      || treasures[2] === treasures[3])
      treasures[3] = Math.floor(Math.random()*25%25);

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

  showTile(name, tile) {
    this.players[name].travel[tile] = this.players[name].map[tile];
  }

  incrementScore(name) {
    this.players[name].score++;
  }

  getScore(name) {
    return this.players[name].score;
  }

  isWin(name) {
    return this.players[name].travel.reduce((sum, e) => {
      if(e==='T') sum++;
      return sum;
    }, 0) === 3 ? true : false;
  }
}