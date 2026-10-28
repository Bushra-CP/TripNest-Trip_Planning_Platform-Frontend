import { axiosInstance } from "@/shared/api/axios";
import type { LoginRequest } from "../types/login-request";
import type { LoginResponse } from "../types/login-response";
import type { GoogleAuthRequest } from "../types/google.request";
import { SERVER_ROUTES } from "@/shared/constants/routes.constants";

export const authApi = {
  ////////////login////////////
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>(
      SERVER_ROUTES.LOGIN,
      payload,
    );

    return response.data;
  },

  ////////////google auth////////////
  async googleAuth(payload: GoogleAuthRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post(SERVER_ROUTES.GOOGLE, payload);
    return response.data;
  },

  ////////////logout////////////
async logout(): Promise<void> {
  console.log("7. calling logout API");

  await axiosInstance.post(SERVER_ROUTES.LOGOUT);

  console.log("8. logout API response received");
},
};
