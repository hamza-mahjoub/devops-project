import { axiosPrivate } from "../api/axiosConfig";
import { tvAPI } from "../api/constants";

const findALlByType = async (type, page) => {
  const response = await axiosPrivate.get(
    `${tvAPI.FIND_ALL_BY_TYPE}?type=${type}&page=${page}`
  );
  return response.data;
};

const findAllByContent = async (searchValue, page) => {
  const response = await axiosPrivate.post(tvAPI.FIND_ALL_BY_CONTENT, {
    searchValue,
    page,
  });
  return response.data;
};

const findById = async (tvId) => {
  const response = await axiosPrivate.get(tvAPI.FIND_BY_ID(tvId));
  return response.data;
};

const fetchTvShowEpisodesBySeason = async (tvId, seasonNumber) => {
  const response = await axiosPrivate.get(
    tvAPI.FETCH_EPISODES_BY_SEASON(tvId, seasonNumber)
  );
  return response.data;
};

export const tvShowsServices = {
  findALlByType,
  findAllByContent,
  findById,
  fetchTvShowEpisodesBySeason,
};
