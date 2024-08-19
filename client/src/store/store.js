import { configureStore } from '@reduxjs/toolkit';
import users from './users';
import snaps from './snaps';

export const store = configureStore({
  reducer: {
    users: users,
    snaps: snaps,
  },
});
