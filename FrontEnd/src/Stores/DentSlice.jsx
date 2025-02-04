import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import DentService from '../services/DentService';

// Async Thunks for API calls
export const getAllDents = createAsyncThunk('dents/getAllDents', async () => {
  const response = await DentService.getAllDents();
  return response;
});

export const createDent = createAsyncThunk('dents/createDent', async (dent) => {
  const response = await DentService.createDent(dent);
  return response;
});

export const updateDent = createAsyncThunk('dents/updateDent', async ({ id, dent }) => {
  const response = await DentService.updateDent(id, dent);
  return response;
});

export const deleteDent = createAsyncThunk('dents/deleteDent', async (id) => {
  await DentService.deleteDent(id);
  return id;  // We return the ID to know which dent was deleted
});

// Slice for Dent state management
const dentSlice = createSlice({
  name: 'dents',
  initialState: {
    dents: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all dents
    builder.addCase(getAllDents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllDents.fulfilled, (state, action) => {
      state.loading = false;
      state.dents = action.payload;
    });
    builder.addCase(getAllDents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Create a new dent
    builder.addCase(createDent.fulfilled, (state, action) => {
      state.dents.push(action.payload);
    });

    // Update a dent
    builder.addCase(updateDent.fulfilled, (state, action) => {
      const index = state.dents.findIndex((dent) => dent.id === action.payload.id);
      if (index !== -1) {
        state.dents[index] = action.payload;
      }
    });

    // Delete a dent
    builder.addCase(deleteDent.fulfilled, (state, action) => {
      state.dents = state.dents.filter((dent) => dent.id !== action.payload);
    });
  }
});

export default dentSlice.reducer;
