import express from 'express';
import cors from 'cors';
import Players from './modules/players.js';
import TopScores from './modules/topScores.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ strict: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send({ response: "I'm alive" }).status(200);
});

const players = new Players();
const topScores = new TopScores();

app.post("/name", (req, res) => {
  const name = req.body.name;
  players.addPlayer(name);
  res.send(players.getPlayer(name)).status(200);
});

app.get("/name/:name", (req, res) => {
  try {
    const response = players.getPlayer(req.params.name);
    if (response) res.status(200).send(response);
  } catch (ex) {
    res.status(404).send({});
  }
});

app.post("/move/:name", (req, res) => {
  const name = req.params.name;
  const moves = req.body.moves;
  try {
    moves.forEach(element => {
      players.showTile(name, element);
    });
  
    players.incrementScore(name);
  
    const player = players.getPlayer(name);
  
    if(player) {
      if (players.removeWon(name)) {
        topScores.addScore(name, player.score);
        res.send({
          ...player,
          win: true,
          topScores: topScores.getScores()
        });
      }
      res.send(player);
    }

  } catch (ex) {
    res.status(404).send({});
  }
});

export default app;