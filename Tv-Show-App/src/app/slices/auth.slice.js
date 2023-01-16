import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REQUEST_STATUS } from "../api/constants";
import { authServices } from "../services/auth.services";

const initialState = {
  data: {
    user: null,
    token: null,
  },
  statusLogin: REQUEST_STATUS.idle,
  statusProfile: REQUEST_STATUS.idle,
  error: null,
};

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    return await authServices.login(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const getProfile = createAsyncThunk(
  "auth/profile",
  async (data, thunkAPI) => {
    try {
      return await authServices.profile();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {},
    logout: (state, action) => {
      state.data = {
        user: null,
        token: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.statusLogin = REQUEST_STATUS.loading;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data.token = action.payload.access_token;
        state.statusLogin = REQUEST_STATUS.success;
      })
      .addCase(login.rejected, (state, action) => {
        state.statusLogin = REQUEST_STATUS.error;
        state.error = action.payload;
      })
      .addCase(getProfile.pending, (state, action) => {
        state.statusProfile = REQUEST_STATUS.loading;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.data.user = action.payload;
        state.statusProfile = REQUEST_STATUS.success;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.statusProfile = REQUEST_STATUS.error;
        state.error = action.payload;
      });
  },
});

export const { reset, logout } = authSlice.actions;

export default authSlice.reducer;
