export type UserRole = 'traveler' | 'admin';

export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isActive?:boolean;
  role: UserRole;
}