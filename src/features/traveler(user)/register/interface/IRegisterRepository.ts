import type { RegisterResponseDto } from "../dto/register-response.dto";
import type { RegisterRequestDto } from "../dto/register.request.dto";
import type { ResendOtpRequestDto } from "../dto/resend-otp-request.dto";
import type { ResendOtpResponseDto } from "../dto/resend-otp-response.dto";
import type { VerifyRegistrationRequestDto } from "../dto/verify-registration-request.dto";
import type { VerifyRegistrationResponseDto } from "../dto/verify-registration-response.dto";

export interface IRegisterRepository {
  register(payload: RegisterRequestDto): Promise<RegisterResponseDto>;

  verifyRegistration(
    payload: VerifyRegistrationRequestDto,
  ): Promise<VerifyRegistrationResponseDto>;

  resendOtp(payload: ResendOtpRequestDto): Promise<ResendOtpResponseDto>;
}
