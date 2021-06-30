import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import Players from './players.js';

const port = process.env.PORT || 4001;

let players = new Players();
var topScores = [
  {name: '1', score: 100},
  {name: '2', score: 100},
  {name: '3', score: 100},
  {name: '4', score: 100},
  {name: '5', score: 100},
  {name: '6', score: 100},
  {name: '7', score: 100},
  {name: '8', score: 100},
  {name: '9', score: 100},
  {name: '10', score: 100}]

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

  if (players.isWin(name)) {
    topScores.push({
      name:name, score: players.getScore(name)
    });
    topScores.sort((a,b)=> (a.score-b.score));
    topScores.pop();
    res.send({
      ...players.getPlayer(name),
      win: true,
      topScores: topScores
    });
  }

  else res.send(players.getPlayer(name));
});

const server = createServer(app);

server.listen(port, () => console.log(`Listening on http://localhost:${port}`));