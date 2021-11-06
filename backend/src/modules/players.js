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
    throw new Error(`No player named ${name}`);
  }

  incrementScore(name) {
    const player = this.#players[name];
    if (player !== undefined)
      this.#players[name].incrementScore();
    else
      throw new Error(`No player named ${name}`);
  }

  showTile(name, tile) {
    const player = this.#players[name];
    if (player !== undefined)
      this.#players[name].showTile(tile);
    else
      throw new Error(`No player named ${name}`);
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