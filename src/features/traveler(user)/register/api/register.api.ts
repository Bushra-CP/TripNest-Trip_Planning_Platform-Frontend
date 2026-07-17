import { axiosInstance } from "../../../../shared/api/axios";
import { ROUTES } from "../../../../shared/constants/routes.constants";
import type { RegisterResponseDto } from "../dto/register-response.dto";
import type { RegisterRequestDto } from "../dto/register.request.dto";
import type { ResendOtpRequestDto } from "../dto/resend-otp-request.dto";
import type { ResendOtpResponseDto } from "../dto/resend-otp-response.dto";
import type { VerifyRegistrationRequestDto } from "../dto/verify-registration-request.dto";
import type { VerifyRegistrationResponseDto } from "../dto/verify-registration-response.dto";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const registerApi = {
  //register
  async register(payload: RegisterRequestDto): Promise<RegisterResponseDto> {
    // console.log("Sending payload:", payload);

    const response = await axiosInstance.post<ApiResponse<RegisterResponseDto>>(
      ROUTES.AUTH.REGISTER,
      payload,
    );

    return response.data.data;
  },

  //verify registration
  async verifyRegistration(
    payload: VerifyRegistrationRequestDto,
  ): Promise<VerifyRegistrationResponseDto> {
    // console.log(payload);

    const response = await axiosInstance.post<VerifyRegistrationResponseDto>(
      ROUTES.AUTH.VERIFYREGISTRATION,
      payload,
    );

    return response.data;
  },

  //resend otp
  async resendOtp(payload: ResendOtpRequestDto): Promise<ResendOtpResponseDto> {
    const response = await axiosInstance.post<ResendOtpResponseDto>(
      ROUTES.AUTH.RESEND_OTP,
      payload,
    );

    return response.data;
  },
};
