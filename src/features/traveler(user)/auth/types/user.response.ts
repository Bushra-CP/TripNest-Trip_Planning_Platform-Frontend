export type UserRole = "TRAVELER" | "ADMIN";

export type UserStatus = "Active" | "Blocked";

export interface UserResponse {
  userId:string;
  fullName: string;
  email: string;
  isActive?: boolean;
  role: UserRole;
  profileImage: string;
}
