import { axiosInstance } from "../../../shared/api/axios";
import { ROUTES } from "../../../shared/constants/routes.constants";
import type { LoginRequestDto } from "../dto/login-request.dto";
import type { LoginResponseDto } from "../dto/login-response.dto";

export const authApi = {
  //login
  async login(payload: LoginRequestDto): Promise<LoginResponseDto> {
    const response = await axiosInstance.post<LoginResponseDto>(
      ROUTES.AUTH.LOGIN,
      payload,
    );

    return response.data;
  },

  //logout
  async logout(): Promise<void> {
    await axiosInstance.post(ROUTES.AUTH.LOGOUT);
  },
};
