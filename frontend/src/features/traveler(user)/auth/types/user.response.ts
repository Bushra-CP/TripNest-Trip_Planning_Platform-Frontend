export type UserRole = "TRAVELER" | "ADMIN";

export interface UserResponse {
  fullName: string;
  email: string;
  isActive?: boolean;
  role: UserRole;
  profileImage:string;
}
