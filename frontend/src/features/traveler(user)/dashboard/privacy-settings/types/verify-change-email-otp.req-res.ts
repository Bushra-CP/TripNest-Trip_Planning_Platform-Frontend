export interface VerifyChangeEmailOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyChangeEmailOtpResponse {
  data: {
    email: string;
    message: string;
  };
}
