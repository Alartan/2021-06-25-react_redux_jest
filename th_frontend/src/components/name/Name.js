import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { setName, addName, readState } from '../playerSlice';

export function Name() {
  const name = useSelector((state) => state.player.name);
  const score = useSelector((state) => state.player.score);
  const dispatch = useDispatch();
  const [_name, set_name] = useState(name);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const result = dispatch(addName({name:_name}));
      unwrapResult(result);
    } catch(err) {
      console.error('Failed to add the name: ', err);
    }
    dispatch(setName({name:_name}));
  }

  if (name === '') {
    return (
      <form onSubmit={handleSubmit} >
        <p>Enter name:</p>
        <input type="text" value={_name} onChange={(e) => set_name(e.target.value)} />
        <input type='submit' value='Set name' />
      </form>
    );
  }

  if (score === '') {
    try {
      const result = dispatch(readState({name: _name}));
      unwrapResult(result);
    } catch(err) {
      console.error('Failed to load player: ', err);
    }
  }

  return (
    <div>
      <h1>Hello {_name}, your score is: {score}</h1>
    </div>
  );
}