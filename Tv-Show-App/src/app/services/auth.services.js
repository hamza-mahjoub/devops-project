import { axiosPrivate, axiosPublic } from "../api/axiosConfig";
import { authAPI } from "../api/constants";

const login = async (data) => {
  const response = await axiosPublic.post(authAPI.LOGIN, data);
  return response.data;
};

const profile = async (data) => {
  const response = await axiosPrivate.get(authAPI.ME);
  return response.data;
};

export const authServices = {
  login,
  profile,
};
