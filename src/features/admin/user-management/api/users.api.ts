import { axiosInstance } from "@/shared/api/axios";
import { SERVER_ROUTES } from "@/shared/constants/routes.constants";
import type {
  GetUsersQuery,
  GetUsersResponse,
  UpdateUserStatusResponse,
  UserDetailsResponse,
} from "../types/user.types";

export const usersApi = {
  /////////////////////////////////////////////////////////////
  //GET USERS
  async getUsers(params: GetUsersQuery): Promise<GetUsersResponse> {
    const response = await axiosInstance.get<GetUsersResponse>(
      SERVER_ROUTES.ADMIN_USERS,

      { params },
    );

    // console.log(response.data);

    return response.data;
  },

  async updateUserStatus(
    userId: string,
    isActive: boolean,
  ): Promise<UpdateUserStatusResponse> {
    const response = await axiosInstance.patch<UpdateUserStatusResponse>(
      SERVER_ROUTES.UPDATE_USER_STATUS.replace(":id", userId),
      {
        isActive,
      },
    );

    return response.data;
  },

  async getUserDetails(userId: string): Promise<UserDetailsResponse> {
    const response = await axiosInstance.get<UserDetailsResponse>(
      SERVER_ROUTES.GET_USER.replace(":id", userId),
    );

    return response.data;
  },
};
