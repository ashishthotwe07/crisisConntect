import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        userData
      );
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        userData
      );

      const token = response.data.token; // Extract the token from the response
      localStorage.setItem("token", token);
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Login failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
    
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
     console.log(token);
      await axios.get("http://localhost:3000/api/auth/sign-out", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });
      localStorage.removeItem("token"); // Remove the token from localStorage after logout
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Logout failed"
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/update",
  async ({ userId, data }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/auth/update-user/${userId}`,
        data, // Data to be updated
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.user;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Update failed"
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "auth/delete",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/auth/${userId}`, // Assuming the API endpoint for deleting user data
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass the token in the Authorization header
          },
        }
      );
      localStorage.removeItem("token"); // Remove the token from localStorage after deleting the user
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Deletion failed"
      );
    }
  }
);

export const BecomeVolunteer = createAsyncThunk(
  "volunteer/create",
  async (role, thunkAPI) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await axios.post(
        "http://localhost:3000/api/volunteer/create",
        role,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.user;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Internal server error "
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        console.log(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);

        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        console.log(action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);

        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        console.log("User updated:", action.payload);
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Failed to update user:", action.payload);
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        console.log("User deleted");
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Failed to delete user:", action.payload);
      })
      .addCase(BecomeVolunteer.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        console.log("User updated:", action.payload);
      });
  },
});

export const authReducer = authSlice.reducer;

export const AuthSelector = (state) => state.authReducer;
