import type { UserResponseDto } from "./user.response.dto";

export interface LoginResponseDto {
  user: UserResponseDto;
  accessToken: string;
  message: string;
}
