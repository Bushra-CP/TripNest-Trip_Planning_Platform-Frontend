import { axiosInstance } from "@/shared/api/axios";
import type { LoginRequest } from "../types/login-request";
import type { LoginResponse } from "../types/login-response";
import { ROUTES } from "@/shared/constants/routes.constants";
import type { GoogleAuthRequest } from "../types/google.request";

export const authApi = {
  ////////////login////////////
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>(
      ROUTES.AUTH.LOGIN,
      payload,
    );

    return response.data;
  },

  ////////////google auth////////////
  async googleAuth(payload: GoogleAuthRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post(ROUTES.AUTH.GOOGLE, payload);
    return response.data;
  },

  ////////////logout////////////
  async logout(): Promise<void> {
    await axiosInstance.post(ROUTES.AUTH.LOGOUT);
  },
};
