import { authApi } from "../api/auth.api";
import type { AuthResponseDto } from "../dto/auth.response.dto";
import type { RegisterRequestDto } from "../dto/login.request.dto";
import type { LoginRequestDto } from "../dto/register.request.dto";

class AuthRepository {
  //register
  async register(payload: RegisterRequestDto): Promise<AuthResponseDto> {
    return authApi.register(payload);
  }

  //login
  async login(payload: LoginRequestDto): Promise<AuthResponseDto> {
    return authApi.login(payload);
  }

  //logout
  async logout(): Promise<void> {
    await authApi.logout();
  }
}

export const authRepository = new AuthRepository();
