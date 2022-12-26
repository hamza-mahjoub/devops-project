import { configureStore } from "@reduxjs/toolkit";
import tvShowsReducer from "./tvShows.slice";
import moviesReducer from "./movies.slice";
import authReducer from "./auth.slice";
export const store = configureStore({
  reducer: {
    tvShows: tvShowsReducer,
    movies: moviesReducer,
    auth: authReducer,
  },
});
