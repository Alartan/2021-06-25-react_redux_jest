import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

const initialState = {
  name: sessionStorage.getItem('name') || '',
  score: '',
  tiles: Array(25).fill(' '),
  moves: [],
  win: false,
  topScores:[],
};

export const addName = createAsyncThunk(
  'player/addName',
  async (name) => {
    const response = await client.post(
      'http://localhost:4001/name',
      name
      );
    return response;
  }
)

export const readState = createAsyncThunk(
  'player/readState',
  async (name) => {
    const response = await client.get(
      `http://localhost:4001/name/${name.name}`,
      );
    return response;
  }
)

export const showTiles = createAsyncThunk(
  'player/showTiles',
  async (arg) => {
    const response = await client.post(
      `http://localhost:4001/move/${arg.name}`,
      arg
      );
    return response;
  }
)

export const playerSlice = createSlice({
  name: 'player',
  initialState: initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload.name;
      sessionStorage.setItem('name', action.payload.name);
    },
    setScore: (state, action) => {
      state.score = action.payload.score;
    },
    addMove: (state, action) => {
      const index = action.payload.move;
      if (state.tiles[index] === ' ' && state.moves.length < 3) {
        state.tiles[index] = 'X';
        state.moves.push(index);
      } else {
        if (state.tiles[index] === 'X') {
          state.moves = state.moves.filter( e => e!==index );
          state.tiles[index] = ' ';
        }
      }
    },
    resetAll: (state, action) => {
      sessionStorage.removeItem('name');
      state = initialState;
    }
  },
  extraReducers: {
    [addName.fulfilled]: (state, action) => {
      state.score = action.payload.score;
      state.tiles = action.payload.travel;
      state.moves = [];
    },
    [readState.fulfilled]: (state, action) => {
      state.score = action.payload.score;
      state.tiles = action.payload.travel;
      state.moves = [];
    },
    [showTiles.fulfilled]: (state, action) => {
      if (action.payload.win === true) {
        state.win = true;
        state.topScores = action.payload.topScores;
      }
      state.score = action.payload.score;
      state.tiles = action.payload.travel;
      state.moves = [];
    }
  },
})

export const { setName, setScore, addMove, resetAll } = playerSlice.actions;

export default playerSlice.reducer