import { configureStore } from '@reduxjs/toolkit';
import playerReducer from '../components/playerSlice';

export default configureStore({
  reducer: {
    player: playerReducer,
  },
});