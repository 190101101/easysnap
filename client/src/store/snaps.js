import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../boot/define';

const url = `${API}/snaps`;

export const getSnaps = createAsyncThunk('getSnaps', async () => {
  const { data } = await axios.get(url);
  return data;
});

export const createSnaps = createAsyncThunk('createSnaps', async (snap) => {
  const { data } = await axios.post(url, snap);
  return data;
});

const initialState = {
  snaps: [],
  loading: false,
};

export const snaps = createSlice({
  name: 'snaps',
  initialState,
  reducers: {
    addSnap: (state, action) => {
      state.snaps = [action.payload, ...state.snaps];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSnaps.pending, (state) => {
      state.snaps = [];
      state.loading = true;
    });
    builder.addCase(getSnaps.fulfilled, (state, action) => {
      state.snaps = action.payload;
      state.loading = false;
    });
    builder.addCase(getSnaps.rejected, (state) => {
      state.snaps = [];
      state.loading = true;
    });
    builder.addCase(createSnaps.pending, (state, action) => {
      state.snaps = [...state.snaps];
      state.loading = true;
    });
    builder.addCase(createSnaps.fulfilled, (state, action) => {
      state.snaps = [action.payload, ...state.snaps];
      state.loading = false;
    });
    builder.addCase(createSnaps.rejected, (state) => {
      state.snaps = [...state.snaps];
      state.loading = true;
    });
  },
});

export const { addSnap } = snaps.actions;
export default snaps.reducer;
