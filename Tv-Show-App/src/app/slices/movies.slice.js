import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REQUEST_STATUS } from "../api/constants";
import { moviesServices } from "../services/movies.services";

const initialState = {
  movies: [],
  movie: null,
  movieReviews: null,
  statusGetmovies: REQUEST_STATUS.idle,
  statusGetSelectedMovie: REQUEST_STATUS.idle,
  statusGetSelectedMovieReviews: REQUEST_STATUS.idle,
  error: null,
};

export const findAllByType = createAsyncThunk(
  "movies/findAllByType",
  async ({ type, page }, thunkAPI) => {
    try {
      return await moviesServices.findALlByType(type, page);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const findAllByContent = createAsyncThunk(
  "movies/findAllByContent",
  async ({ searchValue, page }, thunkAPI) => {
    try {
      return await moviesServices.findAllByContent(searchValue, page);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const findById = createAsyncThunk(
  "movies/findById",
  async (movieId, thunkAPI) => {
    try {
      console.log(movieId);
      return await moviesServices.findById(movieId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const fetchMovieReviews = createAsyncThunk(
  "movies/fetchmovieEpisodesBySeason",
  async (movieId, thunkAPI) => {
    try {
      return await moviesServices.fetchReviews(movieId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      // find All By Type
      .addCase(findAllByType.pending, (state) => {
        state.statusGetmovies = REQUEST_STATUS.loading;
      })
      .addCase(findAllByType.fulfilled, (state, action) => {
        state.statusGetmovies = REQUEST_STATUS.success;
        state.movies = action.payload;
      })
      .addCase(findAllByType.rejected, (state, action) => {
        state.statusGetmovies = REQUEST_STATUS.error;
        state.error = action.payload;
      })
      // find All By Content
      .addCase(findAllByContent.pending, (state) => {
        state.statusGetmovies = REQUEST_STATUS.loading;
      })
      .addCase(findAllByContent.fulfilled, (state, action) => {
        state.statusGetmovies = REQUEST_STATUS.success;
        state.movies = action.payload;
      })
      .addCase(findAllByContent.rejected, (state, action) => {
        state.statusGetmovies = REQUEST_STATUS.error;
        state.error = action.payload;
      })
      // find By Id
      .addCase(findById.pending, (state, action) => {
        state.statusGetSelectedMovie = REQUEST_STATUS.loading;
      })
      .addCase(findById.fulfilled, (state, action) => {
        state.statusGetSelectedMovie = REQUEST_STATUS.success;
        console.log(action);
        state.movie = action.payload;
      })
      .addCase(findById.rejected, (state, action) => {
        state.statusGetSelectedMovie = REQUEST_STATUS.error;
        state.error = action.payload;
      })
      // fetch movie  Reviews
      .addCase(fetchMovieReviews.pending, (state, action) => {
        state.statusGetMovieReviews = REQUEST_STATUS.loading;
      })
      .addCase(fetchMovieReviews.fulfilled, (state, action) => {
        state.statusGetMovieReviews = REQUEST_STATUS.success;
        state.movieReviews = action.payload;
      })
      .addCase(fetchMovieReviews.rejected, (state, action) => {
        state.statusGetMovieReviews = REQUEST_STATUS.error;
        state.error = action.payload;
      });
  },
});

export const { reset } = moviesSlice.actions;

export default moviesSlice.reducer;
