import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REQUEST_STATUS } from "../api/constants";
import { authServices } from "../services/auth.services";

const initialState = {
  statusGetServer: REQUEST_STATUS.idle,

  error: null,
};

export const checkServer = createAsyncThunk(
  "auth/checkServer",
  async (args, thunkAPI) => {
    try {
      return await authServices.checkServer();
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkServer.pending, (state, action) => {
        state.statusGetServer = REQUEST_STATUS.loading;
      })
      .addCase(checkServer.fulfilled, (state, action) => {
        state.statusGetServer = REQUEST_STATUS.success;
      })
      .addCase(checkServer.rejected, (state, action) => {
        state.statusGetServer = REQUEST_STATUS.error;
        state.error = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
