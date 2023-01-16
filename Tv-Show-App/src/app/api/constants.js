export const BASE_URL = `http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/`;

export const REQUEST_STATUS = {
  idle: "idle",
  loading: "loading",
  success: "success",
  error: "error",
};

export const tvAPI = {
  FIND_ALL_BY_TYPE: "/shows/tv",
  FIND_ALL_BY_CONTENT: "/shows/tv/search",
  FIND_BY_ID: (tvId) => `/shows/tv/${tvId}`,
  FETCH_EPISODES_BY_SEASON: (tvId, seasonNumber) =>
    `/shows/tv/${tvId}/season/${seasonNumber}`,
}; 

export const movieAPI = {
  FIND_ALL_BY_TYPE: "/shows/movies",
  FIND_ALL_BY_CONTENT: "/shows/movies/search",
  FIND_BY_ID: (movieId) => `/shows/movies/${movieId}`,
  FETCH_MOVIE_REVIEWS: (movieId) => `/shows/movies/${movieId}/reviews`,
};

export const authAPI = {
  CHECK_SERVER: "/auth",
};
