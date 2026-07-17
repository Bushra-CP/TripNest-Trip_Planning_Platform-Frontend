import { authApi } from "../api/auth.api";
import type { LoginRequestDto } from "../dto/login-request.dto";
import type { LoginResponseDto } from "../dto/login-response.dto";

class AuthRepository {
  //login
  async login(payload: LoginRequestDto): Promise<LoginResponseDto> {
    return authApi.login(payload);
  }

  //logout
  async logout(): Promise<void> {
    await authApi.logout();
  }
}

export const authRepository = new AuthRepository();
