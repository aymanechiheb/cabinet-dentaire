import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProduitConsomableService from "../services/ProduitConsomableService";

// Async Thunks
export const fetchProduitsConsomables = createAsyncThunk(
  "produitsConsommables/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await ProduitConsomableService.getAll();
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchProduitConsomableById = createAsyncThunk(
  "produitsConsommables/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      return await ProduitConsomableService.getById(id);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchProduitConsomablesByAppointmentId = createAsyncThunk(
  "produitsConsommables/fetchByAppointmentId",
  async (appointmentId, { rejectWithValue }) => {
    try {
      return await ProduitConsomableService.getByAppointmentId(appointmentId);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createProduitConsomable = createAsyncThunk(
  "produitsConsommables/create",
  async (produitConsomable, { rejectWithValue }) => {
    try {
      return await ProduitConsomableService.create(produitConsomable);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProduitConsomable = createAsyncThunk(
  "produitsConsommables/update",
  async ({ id, produitConsomable }, { rejectWithValue }) => {
    try {
      return await ProduitConsomableService.update(id, produitConsomable);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteProduitConsomable = createAsyncThunk(
  "produitsConsommables/delete",
  async (id, { rejectWithValue }) => {
    try {
      await ProduitConsomableService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const produitConsomableSlice = createSlice({
  name: "produitsConsommables",
  initialState: {
    produitConsommables: [],
    produitConsomable: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchProduitsConsomables.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduitsConsomables.fulfilled, (state, action) => {
        state.loading = false;
        state.produitConsommables = action.payload;
      })
      .addCase(fetchProduitsConsomables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch by ID
      .addCase(fetchProduitConsomableById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduitConsomableById.fulfilled, (state, action) => {
        state.loading = false;
        state.produitConsomable = action.payload;
      })
      .addCase(fetchProduitConsomableById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by AppointmentId
      .addCase(fetchProduitConsomablesByAppointmentId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduitConsomablesByAppointmentId.fulfilled, (state, action) => {
        state.loading = false;
        state.produitConsommables = action.payload;
      })
      .addCase(fetchProduitConsomablesByAppointmentId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createProduitConsomable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduitConsomable.fulfilled, (state, action) => {
        state.loading = false;
        state.produitConsommables.push(action.payload);
      })
      .addCase(createProduitConsomable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateProduitConsomable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduitConsomable.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.produitConsommables.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.produitConsommables[index] = action.payload;
      })
      .addCase(updateProduitConsomable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteProduitConsomable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduitConsomable.fulfilled, (state, action) => {
        state.loading = false;
        state.produitConsommables = state.produitConsommables.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProduitConsomable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default produitConsomableSlice.reducer;
