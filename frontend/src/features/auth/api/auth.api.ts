import { axiosInstance } from "../../../shared/api/axios";
import { ROUTES } from "../../../shared/constants/routes.constants";
import type { AuthResponseDto } from "../dto/auth.response.dto";
import type { RegisterRequestDto } from "../dto/login.request.dto";
import type { LoginRequestDto } from "../dto/register.request.dto";

export const authApi = {
  //register api
  async register(payload: RegisterRequestDto): Promise<AuthResponseDto> {
    const response = await axiosInstance.post<AuthResponseDto>(
      ROUTES.AUTH.REGISTER,
      payload,
    );

    return response.data;
  },

  //login api
  async login(payload: LoginRequestDto): Promise<AuthResponseDto> {
    const response = await axiosInstance.post<AuthResponseDto>(
      ROUTES.AUTH.LOGIN,
      payload,
    );

    return response.data;
  },

  //logout api
  async logout(): Promise<void> {
    await axiosInstance.post(ROUTES.AUTH.LOGOUT);
  },
};
