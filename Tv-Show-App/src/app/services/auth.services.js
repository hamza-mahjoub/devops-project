import { axiosPublic } from "../api/axiosConfig";
import { authAPI } from "../api/constants";

const checkServer = async (movieId) => {
  const response = await axiosPublic.get(authAPI.CHECK_SERVER);
  return response.data;
};

export const authServices = {
  checkServer,
};
