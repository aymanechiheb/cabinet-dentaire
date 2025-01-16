import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AppointmentService from "../services/AppointmentService";

// Async actions
export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async () => {
    const response = await AppointmentService.fetchAppointments();
    return response;
  }
);

export const createAppointment = createAsyncThunk(
  "appointments/createAppointment",
  async (appointmentData) => {
    const response = await AppointmentService.createAppointment(appointmentData);
    return response;
  }
);

export const updateAppointment = createAsyncThunk(
  "appointments/updateAppointment",
  async ({ appointmentId, appointmentData }) => {
    const response = await AppointmentService.updateAppointment(
      appointmentId,
      appointmentData
    );
    return response;
  }
);

export const deleteAppointment = createAsyncThunk(
  "appointments/deleteAppointment",
  async (appointmentId) => {
    await AppointmentService.deleteAppointment(appointmentId);
    return appointmentId;
  }
);

// Initial state
const initialState = {
  appointments: [],
  appointment: null,
  loading: false,
  error: null,
};

// Slice
const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all appointments
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create appointment
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update appointment
      .addCase(updateAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.appointments.findIndex(
          (appointment) => appointment.id === action.payload.id
        );
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete appointment
      .addCase(deleteAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = state.appointments.filter(
          (appointment) => appointment.id !== action.payload
        );
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the reducer
export default appointmentSlice.reducer;
