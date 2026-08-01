import { axiosInstance } from "@/shared/api/axios";
import type { UpdateProfilePictureRequestDto } from "../dto/UpdateProfilePictureRequestDto";
import type { UpdateProfilePictureResponseDto } from "../dto/UpdateProfilePictureResponseDto";
import { SERVER_ROUTES } from "@/shared/constants/routes.constants";

export const profileApi = {
  ////////////Update profile image////////////
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
};
