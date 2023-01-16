import { axiosPrivate } from "../api/axiosConfig";
import { movieAPI } from "../api/constants";

const findALlByType = async (type, page) => {
  const response = await axiosPrivate.get(
    `${movieAPI.FIND_ALL_BY_TYPE}?type=${type}&page=${page}`
  );
  return response.data;
};

const findAllByContent = async (searchValue, page) => {
  const response = await axiosPrivate.post(movieAPI.FIND_ALL_BY_CONTENT, {
    searchValue,
    page,
  });
  return response.data;
};

const findById = async (movieId) => {
  const response = await axiosPrivate.get(movieAPI.FIND_BY_ID(movieId));
  return response.data;
};

const fetchReviews = async (movieId) => {
  const response = await axiosPrivate.get(movieAPI.FETCH_MOVIE_REVIEWS(movieId));
  return response.data;
};

export const moviesServices = {
  findALlByType,
  findAllByContent,
  findById,
  fetchReviews,
};
