import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPatients, createPatient, updatePatient, deletePatient } from '../services/PatientService';

export const fetchPatients = createAsyncThunk('patients/fetchPatients', async (_, { rejectWithValue }) => {
  try {
    const data = await getPatients();
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to fetch patients');
  }
});

export const addPatient = createAsyncThunk('patients/addPatient', async (patient, { rejectWithValue }) => {
  try {
    const data = await createPatient(patient);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to add patient');
  }
});

// Thunk pour mettre à jour un patient
export const editPatient = createAsyncThunk('patients/editPatient', async ({ id, patient }, { rejectWithValue }) => {
  try {
    const data = await updatePatient(id, patient);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to update patient');
  }
});

// Thunk pour supprimer un patient
export const removePatient = createAsyncThunk('patients/removePatient', async (id, { rejectWithValue }) => {
  try {
    await deletePatient(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to delete patient');
  }
});

const patientSlice = createSlice({
  name: 'patients',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Patients
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Patient
      .addCase(addPatient.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      // Edit Patient
      .addCase(editPatient.fulfilled, (state, action) => {
        const index = state.list.findIndex((patient) => patient.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      // Remove Patient
      .addCase(removePatient.fulfilled, (state, action) => {
        state.list = state.list.filter((patient) => patient.id !== action.payload);
      });
  },
});

export default patientSlice.reducer;
