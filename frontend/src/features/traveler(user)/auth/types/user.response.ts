export type UserRole = "TRAVELER" | "ADMIN";

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  isActive?: boolean;
  role: UserRole;
}
