export const BASE_URL = `https://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/`;

export const REQUEST_STATUS = {
  idle: "idle",
  loading: "loading",
  success: "success",
  error: "error",
};

export const tvAPI = {
  FIND_ALL_BY_TYPE: "/tv",
  FIND_ALL_BY_CONTENT: "/tv/search",
  FIND_BY_ID: (tvId) => `/tv/${tvId}`,
  FETCH_EPISODES_BY_SEASON: (tvId, seasonNumber) =>
    `/tv/${tvId}/season/${seasonNumber}`,
};

export const movieAPI = {
  FIND_ALL_BY_TYPE: "/movies",
  FIND_ALL_BY_CONTENT: "/movies/search",
  FIND_BY_ID: (movieId) => `/movies/${movieId}`,
  FETCH_MOVIE_REVIEWS: (movieId) => `/movies/${movieId}/reviews`,
};

export const authAPI = {
  CHECK_SERVER: "/",
};
