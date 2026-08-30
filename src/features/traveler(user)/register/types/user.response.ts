export type UserRole = "TRAVELER" | "ADMIN";

export interface UserResponse {
  userId: string;
  fullName: string;
  email: string;
  isActive?: boolean;
  role: UserRole;
  profileImage: string;
}
