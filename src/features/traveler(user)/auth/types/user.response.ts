export type UserRole = "TRAVELER" | "ADMIN";

export type UserStatus = "Active" | "Blocked";

export interface UserResponse {
  fullName: string;
  email: string;
  isActive?: boolean;
  role: UserRole;
  profileImage: string;
}
