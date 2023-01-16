import axios from "axios";
import { BASE_URL } from "./constants";
import { store } from "../slices/store";

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

axiosPrivate.interceptors.request.use(
  async (req) => {
    const auth = store?.getState()?.auth;
    console.log(store?.getState()?.auth?.data?.token);
    if (auth?.data?.token) {
      if (req?.headers) {
        req.headers["Authorization"] = `Bearer ${
          store?.getState()?.auth?.data?.token
        }`;
      }
    }
    return req;
  },
  async (error) => {
    return Promise.reject(error);
  }
);
