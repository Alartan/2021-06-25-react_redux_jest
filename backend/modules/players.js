import Player from "./player.js";

export default class Players {
  constructor() {
    this.players = {};
  }

  addPlayer = (name) => {
    this.players[name] = new Player(name);
  }

  getPlayer(name) {
    return {
      score: this.players[name].getScore(),
      travel: player.travel // change it for travel
    };
  }

  incrementScore(name) {
    this.players[name].incrementScore();
  }

  showTile(name, tile) {
    this.players[name].showTile(tile);
  }

  isWin(name) {
    return this.players[name].travel.reduce((sum, e) => {
      if (e === 'T') sum++;
      return sum;
    }, 0) === 3 ? true : false;
  }
}