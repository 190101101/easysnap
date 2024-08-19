import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../boot/define';

const url = `${API}/users`;

export const getUsersCount = createAsyncThunk('getUsersCount', async () => {
  const { data } = await axios.get(url + 'count');
  return data;
});

export const createUser = createAsyncThunk('createUser', async (params) => {
  const { data } = await axios.post(url, params);
  return data;
});

const initialState = {
  user: null,
  users: 0,
  loadingUser: false,
};

export const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    addUser: (state, action) => {
      state.users = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersCount.pending, (state) => {
      state.users = 0;
      state.loading = true;
    });
    builder.addCase(getUsersCount.fulfilled, (state, action) => {
      state.users += action.payload;
      state.loading = false;
    });
    builder.addCase(getUsersCount.rejected, (state) => {
      state.users = 0;
      state.loading = true;
    });
    builder.addCase(createUser.pending, (state) => {
      state.user = null;
      state.loading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(createUser.rejected, (state) => {
      state.user = null;
      state.loading = true;
    });
  },
});

export const { logout, setUser, addUser } = users.actions;
export default users.reducer;
