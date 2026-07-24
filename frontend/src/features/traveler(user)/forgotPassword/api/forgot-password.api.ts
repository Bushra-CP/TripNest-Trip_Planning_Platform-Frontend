import { axiosInstance } from "@/shared/api/axios";
import type { ForgotPasswordRequest } from "../types/forgot-password.request";
import type { VerifyResetOtpRequest } from "../types/verify-reset-otp.request";
import type { ResetPasswordRequest } from "../types/reset-password.request";
import type { VerifyResetOtpResponse } from "../types/verify-reset-otp.response";

export const forgotPasswordApi = {
  ////////////Forgot Password////////////
  forgotPassword(payload: ForgotPasswordRequest) {
    return axiosInstance.post("/forgot-password", payload);
  },

  ////////////Verify Reset OTP////////////
  verifyResetOtp(payload: VerifyResetOtpRequest) {
    return axiosInstance.post<VerifyResetOtpResponse>(
      "/verify-reset-otp",
      payload,
    );
  },

  ////////////Resend Reset OTP////////////
  resendResetOtp(payload: ForgotPasswordRequest) {
    return axiosInstance.post("/resend-reset-otp", payload);
  },

  ////////////Reset Password////////////
  resetPassword(payload: ResetPasswordRequest) {
    return axiosInstance.post("/reset-password", payload);
  },
};
