import Player from "./player.js";

export default class Players {
  #players;

  constructor() {
    this.#players = {};
  }

  addPlayer = (name) => {
    this.#players[name] = new Player(name);
  }

  getPlayer(name) {
    const player = this.#players[name];
    if (player !== undefined)
      return {
        score: player.getScore(),
        travel: player.travel
      };
    return false;
  }

  incrementScore(name) {
    this.#players[name].incrementScore();
  }

  showTile(name, tile) {
    this.#players[name].showTile(tile);
  }

  removeWon(name) {
    if (this.#players[name].travel.reduce((sum, e) => {
      if (e === 'T') sum++;
      return sum;
    }, 0) === 3){
      delete this.#players[name];
      return true;
    } 
    return false;
  }
}