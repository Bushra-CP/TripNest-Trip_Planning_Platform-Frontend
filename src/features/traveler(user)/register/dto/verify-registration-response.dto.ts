import type { UserResponseDto } from "./user.response.dto";

export interface VerifyRegistrationResponseDto {
  user: UserResponseDto;
  accessToken: string;
  message: string;
}
