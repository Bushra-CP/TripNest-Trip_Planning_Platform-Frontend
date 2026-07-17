export type UserRole = "TRAVELER" | "ADMIN";

export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  isActive?: boolean;
  role: UserRole;
}
