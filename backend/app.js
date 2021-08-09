import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import Players from './modules/players.js';
import TopScores from './modules/topScores.js';

const port = process.env.PORT || 4001;

const players = new Players();
const topScores = new TopScores();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ strict: false }));
app.use(cors())

app.get("/", (req, res) => {
  res.send({ response: "I'm alive" }).status(200);
});

app.get("/name/:name", (req, res) => {
  const name = req.params.name;
  res.send(players.getPlayer(name)).status(200);
})

app.post("/name", (req, res) => {
  const name = req.body.name;
  players.addPlayer(name);
  res.send(players.getPlayer(name)).status(200);
})

app.post("/move/:name", (req, res) => {
  const name = req.params.name;
  const moves = req.body.moves;

  moves.forEach(element => {
    players.showTile(name, element);
  });

  players.incrementScore(name);

  const player = players.getPlayer(name)

  if (players.removeWon(name)) {
    topScores.addScore(name, player.score);
    res.send({
      ...player,
      win: true,
      topScores: topScores.getScores()
    });
  }

  else res.send(player);
});

const server = createServer(app);

server.listen(port, () => console.log(`Listening on http://localhost:${port}`));

export default app;