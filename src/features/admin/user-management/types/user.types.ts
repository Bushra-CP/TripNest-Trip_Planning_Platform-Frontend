export type UserStatus = "Active" | "Blocked";

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  profileImage: string | null;
  status: UserStatus;
  createdAt: string;
}

export interface GetUsersQuery {
  page: number;
  limit: number;
  search?: string;
  status?: UserStatus;
}

export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface GetUsersResponse {
  success: boolean;

  message: string;

  data: {
    data: User[];

    pagination: Pagination;
  };
}

export interface UpdateUserStatusResponse {
  success: boolean;

  message: string;

  data: {
    userId: string;

    isActive: boolean;
  };
}

export interface UserDetails {
  id: string;

  fullName: string;

  email: string;

  phoneNumber?: string;

  profileImage?: string;

  status: UserStatus;

  createdAt: string;

  country: string;

  state: string;

  city: string;

  bio?: string;

  socialPresence: {
    url: string;
  }[];

  referenceId?: string;

  rewardPoints: number;
}

export interface UserDetailsResponse {
  data: UserDetails;
}
