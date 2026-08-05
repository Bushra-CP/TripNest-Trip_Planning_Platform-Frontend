import { axiosInstance } from "@/shared/api/axios";
import { SERVER_ROUTES } from "@/shared/constants/routes.constants";
import type { UpdateProfilePictureRequest } from "../types/update-profilePicture.request";
import type { UpdateProfilePictureResponse } from "../types/update-profilePicture.response";
import type { TravelerProfileResponse } from "../types/traveler-profile.response";
import type {
  UpdateTravelerProfileRequest,
  UpdateTravelerProfileResponse,
} from "../types/update-traveler-profile.request";

export const profileApi = {
  /////////////////////////////////////////////////////////////
  //UPDATE PROFILE IMAGE
  async updateProfileImage(
    payload: UpdateProfilePictureRequest,
  ): Promise<UpdateProfilePictureResponse> {
    const formData = new FormData();

    if (payload.profileImage) {
      formData.append("profileImage", payload.profileImage);
    }

    const response = await axiosInstance.patch<UpdateProfilePictureResponse>(
      SERVER_ROUTES.UPDATE_PROFILE_IMAGE,
      formData,
    );

    // console.log(response.data);

    return response.data;
  },

  /////////////////////////////////////////////////////////////
  //GET USER PROFILE TO SHOW ON PROFILE PAGE
  async getProfile(): Promise<TravelerProfileResponse> {
    const response = await axiosInstance.get<TravelerProfileResponse>(
      SERVER_ROUTES.GET_PROFILE,
    );

    // console.log(response.data.data);

    return response.data;
  },

  /////////////////////////////////////////////////////////////
  //UPDATE PROFILE
  async updateProfile(
    payload: UpdateTravelerProfileRequest,
  ): Promise<UpdateTravelerProfileResponse> {
    const response = await axiosInstance.patch<UpdateTravelerProfileResponse>(
      SERVER_ROUTES.UPDATE_PROFILE,
      payload,
    );

    return response.data;
  },
};
