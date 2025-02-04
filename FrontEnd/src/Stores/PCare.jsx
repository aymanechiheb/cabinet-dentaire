import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PCareService from "../services/PCareService";

// 🎯 Utilitaire pour gérer les états de chargement et d'erreur
const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.error.message;
};

// 🔹 Fetch all PCares
export const fetchPCares = createAsyncThunk(
  "pcare/fetchPCares",
  async (_, { rejectWithValue }) => {
    try {
      return await PCareService.fetchPCares();
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🔹 Fetch PCare by ID
export const fetchPCareById = createAsyncThunk(
  "pcare/fetchPCareById",
  async (pcareId, { rejectWithValue }) => {
    try {
      return await PCareService.fetchPCareById(pcareId);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🔹 Fetch PCare by Facture ID
export const fetchPCareByFacture = createAsyncThunk(
  "pcare/fetchPCareByFacture",
  async (factureId, { rejectWithValue }) => {
    try {
      return await PCareService.fetchPCareByFacture(factureId);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🔹 Create PCare
export const createPCare = createAsyncThunk(
  "pcare/createPCare",
  async (pcareData, { rejectWithValue }) => {
    try {
      return await PCareService.createPCare(pcareData);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🔹 Update PCare
export const updatePCare = createAsyncThunk(
  "pcare/updatePCare",
  async ({ pcareId, pcareData }, { rejectWithValue }) => {
    try {
      return await PCareService.updatePCare(pcareId, pcareData);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🔹 Delete PCare
export const deletePCare = createAsyncThunk(
  "pcare/deletePCare",
  async (pcareId, { rejectWithValue }) => {
    try {
      await PCareService.deletePCare(pcareId);
      return pcareId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🔹 Fetch PCare by Appointment ID
export const fetchPCareByAppointment = createAsyncThunk(
  "pcare/fetchPCareByAppointment",
  async (appointmentId, { rejectWithValue }) => {
    try {
      const response = await PCareService.fetchPCareByAppointment(appointmentId); // Fetch from service
      return response; // Return the response data (this will be stored in the state)
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Handle error
    }
  }
);
// 🔸 Initial state
const initialState = {
  pcares: new Map(), // Utilisation d'un Map pour une meilleure gestion des objets
  loading: false,
  error: null,
};

// 🔥 Redux Slice
const pcareSlice = createSlice({
  name: "pcare",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all PCares
      .addCase(fetchPCares.pending, handlePending)
      .addCase(fetchPCares.fulfilled, (state, action) => {
        state.loading = false;
        state.pcares = new Map(action.payload.map((pcare) => [pcare.id, pcare]));
      })
      .addCase(fetchPCares.rejected, handleRejected)

      // Fetch PCare by ID
      .addCase(fetchPCareById.pending, handlePending)
      .addCase(fetchPCareById.fulfilled, (state, action) => {
        state.loading = false;
        state.pcares.set(action.payload.id, action.payload);
      })
      .addCase(fetchPCareById.rejected, handleRejected)

      // Fetch PCare by Facture ID
      .addCase(fetchPCareByFacture.pending, handlePending)
      .addCase(fetchPCareByFacture.fulfilled, (state, action) => {
        state.loading = false;
        state.pcares.set(action.payload.id, action.payload);
      })
      .addCase(fetchPCareByFacture.rejected, handleRejected)

      // Create PCare
      .addCase(createPCare.pending, handlePending)
      .addCase(createPCare.fulfilled, (state, action) => {
        
        state.loading = false;
        state.pcares.set(action.payload.id, action.payload);
      })
      .addCase(createPCare.rejected, handleRejected)

      // Update PCare
      .addCase(updatePCare.pending, handlePending)
      .addCase(updatePCare.fulfilled, (state, action) => {
        state.loading = false;
        state.pcares.set(action.payload.id, action.payload);
      })
      .addCase(updatePCare.rejected, handleRejected)

      // Delete PCare
      .addCase(deletePCare.pending, handlePending)
      .addCase(deletePCare.fulfilled, (state, action) => {
        state.loading = false;
        state.pcares.delete(action.payload);
      })
      .addCase(deletePCare.rejected, handleRejected)

      // Fetch PCare by Appointment ID
      .addCase(fetchPCareByAppointment.pending, handlePending)
      .addCase(fetchPCareByAppointment.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming action.payload is an array of pcare objects, you can store them in the Map
        action.payload.forEach((pcare) => {
          state.pcares.set(pcare.id, pcare);  // Use set to add pcare to the Map
        });
      })
      
      .addCase(fetchPCareByAppointment.rejected, handleRejected);
  },
});

export const { resetError } = pcareSlice.actions;
export default pcareSlice.reducer;
