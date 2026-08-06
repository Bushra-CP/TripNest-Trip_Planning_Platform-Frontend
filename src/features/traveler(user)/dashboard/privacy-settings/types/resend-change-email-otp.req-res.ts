export interface ResendChangeEmailOtpRequest {
  email: string;
}

export interface ResendChangeEmailOtpResponse {
  data: {
    message: string;
  };
}
