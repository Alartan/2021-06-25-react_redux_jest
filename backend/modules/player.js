import * as Map from './map.js';

export default class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.map = Map.drawMap();
    this.travel = Array(25).fill(' ');
  }

  getScore() {
    return this.score;
  }

  incrementScore() {
    this.score++;
  }

  showTile(tile) {
    this.travel[tile] = this.map[tile];
  }
}