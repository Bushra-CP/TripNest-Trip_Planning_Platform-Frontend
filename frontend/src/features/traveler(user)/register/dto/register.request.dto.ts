export interface RegisterRequestDto {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  referenceId?: string;
}