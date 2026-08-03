import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UpdateProfilePictureRequestDto } from "../dto/UpdateProfilePictureRequestDto";
import { profileApi } from "../api/profile.api";
import type { UpdateTravelerProfileRequestDto } from "../dto/UpdateTravelerProfileRequestDto";

/////////////////////////////////////////////////////////////
//UPDATE PROFILE IMAGE
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

/////////////////////////////////////////////////////////////
//GET USER PROFILE TO SHOW ON PROFILE PAGE
export const GetTravelerProfileThunk = createAsyncThunk(
  "profile/get",

  async (_, { rejectWithValue }) => {
    try {
      const res = await profileApi.getProfile();
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

/////////////////////////////////////////////////////////////
//UPDATE PROFILE
export const UpdateTravelerProfileThunk = createAsyncThunk(
  "profile/update",

  async (payload: UpdateTravelerProfileRequestDto, { rejectWithValue }) => {
    try {
      const res = await profileApi.updateProfile(payload);
      // console.log(res.data.message);

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
