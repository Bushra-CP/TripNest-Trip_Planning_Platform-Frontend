import { axiosInstance } from "../../../../shared/api/axios";
import { ROUTES } from "../../../../shared/constants/routes.constants";
import type { RegisterResponse } from "../types/register-response";
import type { RegisterRequest } from "../types/register.request";
import type { ResendOtpRequest } from "../types/resend-otp-request";
import type { ResendOtpResponse } from "../types/resend-otp-response";
import type { VerifyRegistrationRequest } from "../types/verify-registration-request";
import type { VerifyRegistrationResponse } from "../types/verify-registration-response";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const registerApi = {
  //register
  async register(payload: RegisterRequest): Promise<RegisterResponse> {
    // console.log("Sending payload:", payload);

    const response = await axiosInstance.post<ApiResponse<RegisterResponse>>(
      ROUTES.AUTH.REGISTER,
      payload,
    );

    return response.data.data;
  },

  //verify registration
  async verifyRegistration(
    payload: VerifyRegistrationRequest,
  ): Promise<VerifyRegistrationResponse> {
    // console.log(payload);

    const response = await axiosInstance.post<VerifyRegistrationResponse>(
      ROUTES.AUTH.VERIFYREGISTRATION,
      payload,
    );

    return response.data;
  },

  //resend otp
  async resendOtp(payload: ResendOtpRequest): Promise<ResendOtpResponse> {
    const response = await axiosInstance.post<ResendOtpResponse>(
      ROUTES.AUTH.RESEND_OTP,
      payload,
    );

    return response.data;
  },
};
