import type { UserResponse } from "./user.response";

export interface VerifyRegistrationResponse {
  success: boolean;
  data: {
    user: UserResponse;
    accessToken: string;
    message?: string;
  };
}
