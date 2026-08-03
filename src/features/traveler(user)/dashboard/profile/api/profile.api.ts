import { axiosInstance } from "@/shared/api/axios";
import type { UpdateProfilePictureRequestDto } from "../dto/UpdateProfilePictureRequestDto";
import type { UpdateProfilePictureResponseDto } from "../dto/UpdateProfilePictureResponseDto";
import { SERVER_ROUTES } from "@/shared/constants/routes.constants";
import type { TravelerProfileResponseDto } from "../dto/TravelerProfileResponseDto";
import type {
  UpdateTravelerProfileRequestDto,
  UpdateTravelerProfileResponseDto,
} from "../dto/UpdateTravelerProfileRequestDto";

export const profileApi = {
  /////////////////////////////////////////////////////////////
  //UPDATE PROFILE IMAGE
  async updateProfileImage(
    payload: UpdateProfilePictureRequestDto,
  ): Promise<UpdateProfilePictureResponseDto> {
    const formData = new FormData();

    if (payload.profileImage) {
      formData.append("profileImage", payload.profileImage);
    }

    const response = await axiosInstance.patch<UpdateProfilePictureResponseDto>(
      SERVER_ROUTES.UPDATE_PROFILE_IMAGE,
      formData,
    );

    // console.log(response.data);

    return response.data;
  },

  /////////////////////////////////////////////////////////////
  //GET USER PROFILE TO SHOW ON PROFILE PAGE
  async getProfile(): Promise<TravelerProfileResponseDto> {
    const response = await axiosInstance.get<TravelerProfileResponseDto>(
      SERVER_ROUTES.GET_PROFILE,
    );

    // console.log(response.data.data);

    return response.data;
  },

  /////////////////////////////////////////////////////////////
  //UPDATE PROFILE
  async updateProfile(
    payload: UpdateTravelerProfileRequestDto,
  ): Promise<UpdateTravelerProfileResponseDto> {
    const response =
      await axiosInstance.patch<UpdateTravelerProfileResponseDto>(
        SERVER_ROUTES.UPDATE_PROFILE,
        payload,
      );

    return response.data;
  },
};
