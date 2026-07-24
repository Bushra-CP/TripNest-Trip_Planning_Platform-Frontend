import type { UserResponse } from "./user.response";

export interface LoginResponse {
  success: boolean;
  data: {
    user: UserResponse;
    accessToken: string;
    message?: string;
  };
}
