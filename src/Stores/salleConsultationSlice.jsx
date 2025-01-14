import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSalles, createSalle, updateSalle, deleteSalle } from '../services/SalleConsultationService';

export const getSalles = createAsyncThunk('salleConsultation/getSalles', async () => {
  const data = await fetchSalles();
  return data;
});

export const addSalle = createAsyncThunk('salleConsultation/addSalle', async (salle) => {
  await createSalle(salle);
  return salle;
});

export const editSalle = createAsyncThunk('salleConsultation/editSalle', async ({ id, salle }) => {
  await updateSalle(id, salle);
  return { id, salle };
});

export const removeSalle = createAsyncThunk('salleConsultation/removeSalle', async (id) => {
  await deleteSalle(id);
  return id;
});

const salleConsultationSlice = createSlice({
  name: 'salleConsultation',
  initialState: {
    salles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSalles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSalles.fulfilled, (state, action) => {
        state.loading = false;
        state.salles = action.payload;
      })
      .addCase(getSalles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addSalle.fulfilled, (state, action) => {
        state.salles.push(action.payload);
      })
      .addCase(editSalle.fulfilled, (state, action) => {
        const index = state.salles.findIndex((salle) => salle.id === action.payload.id);
        if (index !== -1) {
          state.salles[index] = action.payload.salle;
        }
      })
      .addCase(removeSalle.fulfilled, (state, action) => {
        state.salles = state.salles.filter((salle) => salle.id !== action.payload);
      });
  },
});

export default salleConsultationSlice.reducer;
