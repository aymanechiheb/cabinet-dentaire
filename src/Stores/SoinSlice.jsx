// src/redux/soinSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SoinService } from '../services/SoinService';

// Async actions using the service
export const fetchSoins = createAsyncThunk('soins/fetchSoins', async () => {
  return await SoinService.getSoins();
});

export const addSoin = createAsyncThunk('soins/addSoin', async (soin) => {
  return await SoinService.createSoin(soin);
});

export const updateSoin = createAsyncThunk('soins/updateSoin', async ({ id, soin }) => {
  return await SoinService.updateSoin(id, soin);
});

export const deleteSoin = createAsyncThunk('soins/deleteSoin', async (id) => {
  return await SoinService.deleteSoin(id);
});

// Redux slice
const soinSlice = createSlice({
  name: 'soins',
  initialState: {
    soins: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSoins.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSoins.fulfilled, (state, action) => {
        state.loading = false;
        state.soins = action.payload;
      })
      .addCase(fetchSoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addSoin.fulfilled, (state, action) => {
        state.soins.push(action.payload);
      })
      .addCase(updateSoin.fulfilled, (state, action) => {
        const index = state.soins.findIndex((soin) => soin.id === action.payload.id);
        if (index !== -1) {
          state.soins[index] = action.payload;
        }
      })
      .addCase(deleteSoin.fulfilled, (state, action) => {
        state.soins = state.soins.filter((soin) => soin.id !== action.payload);
      });
  },
});

export default soinSlice.reducer;
