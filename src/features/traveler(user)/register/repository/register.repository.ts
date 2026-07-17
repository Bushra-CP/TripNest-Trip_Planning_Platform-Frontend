import { registerApi } from "../api/register.api";
import type { RegisterResponseDto } from "../dto/register-response.dto";
import type { RegisterRequestDto } from "../dto/register.request.dto";
import type { ResendOtpRequestDto } from "../dto/resend-otp-request.dto";
import type { ResendOtpResponseDto } from "../dto/resend-otp-response.dto";
import type { VerifyRegistrationRequestDto } from "../dto/verify-registration-request.dto";
import type { VerifyRegistrationResponseDto } from "../dto/verify-registration-response.dto";
import type { IRegisterRepository } from "../interface/IRegisterRepository";

class RegisterRepository implements IRegisterRepository {
  //register
  async register(payload: RegisterRequestDto): Promise<RegisterResponseDto> {
    return registerApi.register(payload);
  }

  //verify registration
  async verifyRegistration(
    payload: VerifyRegistrationRequestDto,
  ): Promise<VerifyRegistrationResponseDto> {
    return registerApi.verifyRegistration(payload);
  }

  //resend otp
  async resendOtp(payload: ResendOtpRequestDto): Promise<ResendOtpResponseDto> {
    return registerApi.resendOtp(payload);
  }
}

export const registerRepository = new RegisterRepository();
