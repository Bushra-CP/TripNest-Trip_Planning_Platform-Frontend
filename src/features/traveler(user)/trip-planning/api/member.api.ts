import { axiosInstance } from "@/shared/api/axios";
import { SERVER_ROUTES } from "@/shared/constants/routes.constants";

import type {
  CreateMemberRequest,
  DeleteMemberRequest,
  JoinGroupApiResponse,
  TripMemberApiResponse,
  TripMembersApiResponse,
  UpdateMemberRequest,
} from "../types/member.types";

export const memberApi = {
  // JOIN GROUP
  async joinGroup(data: CreateMemberRequest): Promise<JoinGroupApiResponse> {
    const response = await axiosInstance.post<JoinGroupApiResponse>(
      SERVER_ROUTES.MEMBERS,
      data,
    );

    return response.data;
  },

  // UPDATE OWN ROLE
  async updateMember(
    data: UpdateMemberRequest,
  ): Promise<TripMemberApiResponse> {
    const response = await axiosInstance.patch<TripMemberApiResponse>(
      SERVER_ROUTES.MEMBERS,
      data,
    );

    return response.data;
  },

  // LEAVE GROUP
  async deleteMember(
    data: DeleteMemberRequest,
  ): Promise<{ success: boolean; message: string }> {
    const response = await axiosInstance.delete(SERVER_ROUTES.MEMBERS, {
      data,
    });

    return response.data;
  },

  // GET ALL MEMBERS
  async getTripMembers(threadId: string): Promise<TripMembersApiResponse> {
    const response = await axiosInstance.get<TripMembersApiResponse>(
      SERVER_ROUTES.GET_TRIP_MEMBERS.replace(":threadId", threadId),
    );

    return response.data;
  },
};
