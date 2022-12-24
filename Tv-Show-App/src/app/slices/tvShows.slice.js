import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REQUEST_STATUS } from "../api/constants";
import { tvShowsServices } from "../services/tvShows.services";

const initialState = {
  tvShows: {},
  tvShow: {},
  season: {},
  statusGetTvShows: REQUEST_STATUS.idle,
  statusGetSelectedTvShow: REQUEST_STATUS.idle,
  statusGetSelectedTvShowEpisodesBySeason: REQUEST_STATUS.idle,
  error: null,
};

export const findAllByType = createAsyncThunk(
  "tvShows/findAllByType",
  async ({ type, page }, thunkAPI) => {
    try {
      return await tvShowsServices.findALlByType(type, page);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const findAllByContent = createAsyncThunk(
  "tvShows/findAllByContent",
  async ({ searchValue, page }, thunkAPI) => {
    try {
      return await tvShowsServices.findAllByContent(searchValue, page);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const findById = createAsyncThunk(
  "tvShows/findById",
  async (tvId, thunkAPI) => {
    try {
      return await tvShowsServices.findById(tvId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const fetchTvShowEpisodesBySeason = createAsyncThunk(
  "tvShows/fetchTvShowEpisodesBySeason",
  async ({ tvId, seasonNumber }, thunkAPI) => {
    try {
      return await tvShowsServices.fetchTvShowEpisodesBySeason(
        tvId,
        seasonNumber
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const tvShowsSlice = createSlice({
  name: "tvShows",
  initialState,
  reducers: {
    reset: (state) => ({ ...initialState }),
  },
  extraReducers: (builder) => {
    builder
      // find All By Type
      .addCase(findAllByType.pending, (state) => {
        state.statusGetTvShows = REQUEST_STATUS.loading;
      })
      .addCase(findAllByType.fulfilled, (state, action) => {
        state.statusGetTvShows = REQUEST_STATUS.success;
        state.tvShows = action.payload;
      })
      .addCase(findAllByType.rejected, (state, action) => {
        state.statusGetTvShows = REQUEST_STATUS.error;
        state.error = action.payload;
      })
      // find All By Content
      .addCase(findAllByContent.pending, (state) => {
        state.statusGetTvShows = REQUEST_STATUS.loading;
      })
      .addCase(findAllByContent.fulfilled, (state, action) => {
        state.statusGetTvShows = REQUEST_STATUS.success;
        state.tvShows = action.payload;
      })
      .addCase(findAllByContent.rejected, (state, action) => {
        state.statusGetTvShows = REQUEST_STATUS.error;
        state.error = action.payload;
      })
      // find By Id
      .addCase(findById.pending, (state, action) => {
        state.statusGetSelectedTvShow = REQUEST_STATUS.loading;
      })
      .addCase(findById.fulfilled, (state, action) => {
        state.statusGetSelectedTvShow = REQUEST_STATUS.success;
        console.log(action.payload);
        state.tvShow = action.payload;
        state.season = {};
      })
      .addCase(findById.rejected, (state, action) => {
        state.statusGetSelectedTvShow = REQUEST_STATUS.error;
        state.error = action.payload;
      })
      // fetch Tv Show Episodes By Season
      .addCase(fetchTvShowEpisodesBySeason.pending, (state, action) => {
        state.statusGetSelectedTvShowEpisodesBySeason = REQUEST_STATUS.loading;
      })
      .addCase(fetchTvShowEpisodesBySeason.fulfilled, (state, action) => {
        state.statusGetSelectedTvShowEpisodesBySeason = REQUEST_STATUS.success;
        console.log("season", action.payload);
        state.season = action.payload;
      })
      .addCase(fetchTvShowEpisodesBySeason.rejected, (state, action) => {
        state.statusGetSelectedTvShowEpisodesBySeason = REQUEST_STATUS.error;
        state.error = action.payload;
      });
  },
});

export const { reset } = tvShowsSlice.actions;

export default tvShowsSlice.reducer;
