import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import Tile from './Tile';
import { addMove, showTiles } from '../playerSlice';

export function Map() {
  const travel = useSelector((state) => state.player.tiles);
  const name = useSelector((state) => state.player.name);
  const moves = useSelector((state) => state.player.moves);
  const win = useSelector((state) => state.player.win);
  const dispatch = useDispatch();

  const tileClick = (i) => {
    if(win) return;
    dispatch( addMove({move: i}) );
  }

  const checkTiles = (e) => {
    e.preventDefault();
    if(win) return;
    try {
      const result = dispatch(showTiles({
        name:name,
        moves:moves
      }));
      unwrapResult(result);
    } catch(err) {
      console.error('Failed to show tiles: ', err);
    }
  }

  const tiles = travel.map(
    (v, i) => 
      <Tile key={i} value={v} number={i} clickHandler={tileClick}/>
    );
  return (
    <div className="map">
      {tiles}
      <button onClick={checkTiles}>Check!</button>
    </div>
  );
}