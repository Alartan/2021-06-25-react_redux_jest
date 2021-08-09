export default class TopScores {
  #scores

  constructor() {
    this.#scores = [
      {name: '1', score: 100},
      {name: '2', score: 100},
      {name: '3', score: 100},
      {name: '4', score: 100},
      {name: '5', score: 100},
      {name: '6', score: 100},
      {name: '7', score: 100},
      {name: '8', score: 100},
      {name: '9', score: 100},
      {name: '10', score: 100}];
  }

  getScores() {
    return this.#scores;
  }

  addScore(name, score) {
    this.#scores.push({
      name:name, score
    });
    this.#scores.sort((a,b)=> (a.score-b.score));
    this.#scores.pop();
  }
}