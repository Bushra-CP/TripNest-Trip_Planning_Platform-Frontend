export interface ChangeEmailRequest {
  currentEmail: string;
  newEmail: string;
  currentPassword: string;
}

export interface ChangeEmailResponse {
  data: {
    message: string;
    userId: string;
    email: string;
  };
}
