import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../services/UserService';

// Async Thunks for User-related API calls
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await UserService.register(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await UserService.getUserById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user");
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserService.getAllUsers();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await UserService.updateUser(id, userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update user");
    }
  }
);


export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await UserService.deleteUser(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete user");
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null, // Single user (for get, update, delete)
    users: [], // List of users (for getAllUsers)
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null; // Clear error manually
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    };

    builder
      // Register User
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload); // Add the new user to the users list
      })
      .addCase(registerUser.rejected, handleRejected)

      // Get User by ID
      .addCase(getUser.pending, handlePending)
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Store the fetched user
      })
      .addCase(getUser.rejected, handleRejected)

      // Get All Users
      .addCase(getAllUsers.pending, handlePending)
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; // Store the list of users
      })
      .addCase(getAllUsers.rejected, handleRejected)

      // Update User
      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        // Update the user in the users list
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        // If the updated user is the current user, update it
        if (state.user && state.user.id === updatedUser.id) {
          state.user = updatedUser;
        }
      })
      .addCase(updateUser.rejected, handleRejected)

      // Delete User
      .addCase(deleteUser.pending, handlePending)
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted user from the users list
        state.users = state.users.filter((user) => user.id !== action.payload.id);
        // If the deleted user is the current user, clear it
        if (state.user && state.user.id === action.payload.id) {
          state.user = null;
        }
      })
      .addCase(deleteUser.rejected, handleRejected);
  },
});

export const { clearError } = userSlice.actions;

export default userSlice.reducer;