import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UpdateProfilePictureRequestDto } from "../dto/UpdateProfilePictureRequestDto";
import { profileApi } from "../api/profile.api";

export const UpdateProfilePictureThunk = createAsyncThunk(
  "traveler/updateProfile",

  async (payload: UpdateProfilePictureRequestDto, { rejectWithValue }) => {
    try {
      const res = await profileApi.updateProfileImage(payload);

      // console.log(res.data.profileImage);

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
