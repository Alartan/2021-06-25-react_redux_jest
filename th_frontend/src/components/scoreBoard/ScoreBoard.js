import React from 'react';
import { useSelector } from 'react-redux';

export function ScoreBoard() {
  const win = useSelector((state) => state.player.win);
  const topScores = useSelector((state) => state.player.topScores);

  if (win === true) {
    const topScoresList = topScores.map(
      (e,i) => <li key={i}>{i+1}. {e.name}: {e.score}</li>);
    return (
      <div>
        <h1>Top scores:</h1>
        <ul>
          {topScoresList}
        </ul>
      </div>
    );
  }

  return (
    <div>
    </div>
  );
}