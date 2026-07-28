export type UserRole = "TRAVELER" | "ADMIN";

export interface UserResponse {
  id: string;
  fullName: string;
  email: string;
  isActive?: boolean;
  role: UserRole;
}
