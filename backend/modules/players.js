import Player from "./player.js";

export default class players {
  #players;

  constructor() {
    this.#players = {};
  }

  addPlayer = (name) => {
    this.#players[name] = new Player(name);
  }

  getPlayer(name) {
    const player = this.#players[name];
    try {
      if (player)
      return {
        score: player.getScore(),
        travel: player.travel // change it for travel
      };
      throw new Error(`No player with name ${name}`);
    } catch (e) {
      console.error('players', e.message);
      throw e;
    }
  }

  incrementScore(name) {
    this.#players[name].incrementScore();
  }

  showTile(name, tile) {
    this.#players[name].showTile(tile);
  }

  isWin(name) {
    return this.#players[name].travel.reduce((sum, e) => {
      if (e === 'T') sum++;
      return sum;
    }, 0) === 3 ? true : false;
  }
}