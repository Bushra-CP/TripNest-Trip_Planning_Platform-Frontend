import { axiosInstance } from "@/shared/api/axios";
import type { ForgotPasswordRequest } from "../types/forgot-password.request";
import type { VerifyResetOtpRequest } from "../types/verify-reset-otp.request";
import type { ResetPasswordRequest } from "../types/reset-password.request";

export const forgotPasswordApi = {
  ////////////Forgot Password////////////
  async forgotPassword(payload: ForgotPasswordRequest) {
    const response = await axiosInstance.post("/forgot-password", payload);

    console.log(response.data);

    return response.data;
  },

  ////////////Verify Reset OTP////////////
  async verifyResetOtp(payload: VerifyResetOtpRequest) {
    const response = await axiosInstance.post("/verify-reset-otp", payload);

    console.log(response.data.data.resetToken);

    return response.data.data;
  },

  ////////////Resend Reset OTP////////////
  async resendResetOtp(payload: ForgotPasswordRequest) {
    const response = await axiosInstance.post("/resend-reset-otp", payload);

    console.log(response.data);

    return response.data;
  },

  ////////////Reset Password////////////
  async resetPassword(payload: ResetPasswordRequest) {
    const response = await axiosInstance.post("/reset-password", payload);

    console.log(response.data);

    return response.data;
  },
};
