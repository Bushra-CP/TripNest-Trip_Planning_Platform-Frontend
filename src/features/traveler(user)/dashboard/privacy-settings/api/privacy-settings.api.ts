import { axiosInstance } from "@/shared/api/axios";
import type {
  ChangePasswordRequest,
  ChangePasswordResponse,
} from "../types/change-password.req-res";
import { SERVER_ROUTES } from "@/shared/constants/routes.constants";
import type {
  ChangeEmailRequest,
  ChangeEmailResponse,
} from "../types/change-email.req-res";
import type {
  VerifyChangeEmailOtpRequest,
  VerifyChangeEmailOtpResponse,
} from "../types/verify-change-email-otp.req-res";
import type {
  ResendChangeEmailOtpRequest,
  ResendChangeEmailOtpResponse,
} from "../types/resend-change-email-otp.req-res";

export const privacySettingsApi = {
  /////////////////////////////////////////////////////////////
  //CHANGE PASSWORD
  async changePassword(
    payload: ChangePasswordRequest,
  ): Promise<ChangePasswordResponse> {
    const response = await axiosInstance.patch<ChangePasswordResponse>(
      SERVER_ROUTES.CHANGE_PASSWORD,
      payload,
    );

    // console.log(response.data);

    return response.data;
  },

  /////////////////////////////////////////////////////////////
  //CHANGE Email
  async changeEmail(payload: ChangeEmailRequest): Promise<ChangeEmailResponse> {
    const response = await axiosInstance.post<ChangeEmailResponse>(
      SERVER_ROUTES.CHANGE_EMAIL,
      payload,
    );

    // console.log(response.data);

    return response.data;
  },

  /////////////////////////////////////////////////////////////
  //VERIFY CHANGE EMAIL OTP
  async verifyChangeEmailOtp(
    payload: VerifyChangeEmailOtpRequest,
  ): Promise<VerifyChangeEmailOtpResponse> {
    const response = await axiosInstance.post<VerifyChangeEmailOtpResponse>(
      SERVER_ROUTES.VERIFY_CHANGE_EMAIL_OTP,
      payload,
    );

    // console.log(response.data);

    return response.data;
  },

  /////////////////////////////////////////////////////////////
  //RESEND CHANGE EMAIL OTP
  async resendChangeEmailOtp(
    payload: ResendChangeEmailOtpRequest,
  ): Promise<ResendChangeEmailOtpResponse> {
    const response = await axiosInstance.post<ResendChangeEmailOtpResponse>(
      SERVER_ROUTES.RESEND_CHANGE_EMAIL_OTP,
      payload,
    );

    // console.log(response.data);

    return response.data;
  },
};
