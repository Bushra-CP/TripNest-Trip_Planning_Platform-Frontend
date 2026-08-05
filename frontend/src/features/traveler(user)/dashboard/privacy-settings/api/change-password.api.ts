import { axiosInstance } from "@/shared/api/axios";
import type {
  ChangePasswordRequest,
  ChangePasswordResponse,
} from "../types/change-password.req-res";
import { SERVER_ROUTES } from "@/shared/constants/routes.constants";

export const privacySettingsApi = {
  /////////////////////////////////////////////////////////////
  //CHANGE PASSWORD
  async changePassword(
    payload: ChangePasswordRequest,
  ): Promise<ChangePasswordResponse> {
    const response = await axiosInstance.patch<ChangePasswordResponse>(
      SERVER_ROUTES.CHANGE_PASSWORD,
      payload,
    );

    // console.log(response.data);

    return response.data;
  },
};
