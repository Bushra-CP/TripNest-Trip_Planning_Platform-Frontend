import axios from "axios";
import { axiosInstance } from "./axios";
import { getStore } from "./injectStore";
import {
  clearAuth,
  setAccessToken,
} from "@/features/traveler(user)/auth/redux/authSlice";
import { SERVER_ROUTES } from "../constants/routes.constants";

const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

/* -----------------------
   REQUEST INTERCEPTOR
-------------------------- */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getStore().getState().auth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error),
);

/* -----------------------
   RESPONSE INTERCEPTOR
-------------------------- */
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    //Account blocked by admin or account not verified
    if (error.response?.status === 403) {
      const requestUrl = error.config?.url;

      if (!requestUrl?.includes("/login")) {
        getStore().dispatch(clearAuth());

        window.location.href = SERVER_ROUTES.LOGIN;
      }

      return Promise.reject(error);
    }

    //Token expired
    if (error.response.status == 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        //Refresh access token

        const response = await refreshClient.post(SERVER_ROUTES.REFRESH_TOKEN);

        const newAccessToken = response.data.data.accessToken;

        console.log(`new token:${newAccessToken}`);

        // Update Redux
        getStore().dispatch(setAccessToken(newAccessToken));

        // Retry Original Request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (error) {
        // Refresh token also expired
        getStore().dispatch(clearAuth());

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
