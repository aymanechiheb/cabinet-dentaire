import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import machineService from "../services/machineService";

// Async actions
export const fetchMachines = createAsyncThunk("machines/fetchMachines", async (_, thunkAPI) => {
  try {
    return await machineService.fetchAllMachines();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const fetchMachine = createAsyncThunk("machines/fetchMachine", async (id, thunkAPI) => {
  try {
    return await machineService.fetchMachineById(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const addMachine = createAsyncThunk("machines/addMachine", async (machineData, thunkAPI) => {
  try {
    return await machineService.createMachine(machineData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateMachine = createAsyncThunk(
  "machines/updateMachine",
  async ({ id, machineData }, thunkAPI) => {
    try {
      const response = await updateMachine(id, machineData);
      return response; // Return the updated machine data
    } catch (error) {
      console.error("Error in updateMachine thunk:", error); // Log the error
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteMachine = createAsyncThunk("machines/deleteMachine", async (id, thunkAPI) => {
  try {
    return await machineService.deleteMachine(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Slice definition
const machineSlice = createSlice({
  name: "machines",
  initialState: {
    machines: [],
    machine: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all machines
      .addCase(fetchMachines.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMachines.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.machines = action.payload;
      })
      .addCase(fetchMachines.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Fetch single machine
      .addCase(fetchMachine.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMachine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.machine = action.payload;
      })
      .addCase(fetchMachine.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Add a machine
      .addCase(addMachine.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMachine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.machines.push(action.payload);
      })
      .addCase(addMachine.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Update a machine
      .addCase(updateMachine.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMachine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.machines = state.machines.map((machine) =>
          machine.id === action.payload.id ? action.payload : machine
        );
      })
      .addCase(updateMachine.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Delete a machine
      .addCase(deleteMachine.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMachine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.machines = state.machines.filter((machine) => machine.id !== action.payload);
      })
      .addCase(deleteMachine.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { resetState } = machineSlice.actions;

export default machineSlice.reducer;
