import axios from "axios";
import { BASE_URL } from "./constants";

// // set up axios - simple json-server prototype config
// export const api = axios.create({
//   baseURL: "https://localhost/3000",
//   params: { api_key: "3e45ba0775b5963b546459cfff1ec593" },
//   withCredentials: false,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// });

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

// axiosPrivate.interceptors.request.use(
//   async (req) => {
//     const auth = store?.getState()?.auth;
//     if (auth?.tokens?.refresh_token) {
//       if (isExpired(auth.tokens.refresh_token.expiration_time)) {
//         store.dispatch(logout());
//       }
//     }
//     if (auth?.tokens?.access_token) {
//       if (isExpired(auth.tokens.access_token.expiration_time)) {
//         await store.dispatch(refreshToken());
//         if (req?.headers) {
//           req.headers["Authorization"] = `Bearer ${
//             store?.getState()?.auth?.tokens.access_token.token
//           }`;
//         }
//       } else {
//         req.headers["Authorization"] = `Bearer ${
//           store?.getState()?.auth?.tokens?.access_token.token
//         }`;
//       }
//     }
//     return req;
//   },
//   async (error) => {
//     return Promise.reject(error);
//   }
// );
