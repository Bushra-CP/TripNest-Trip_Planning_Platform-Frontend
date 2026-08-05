import { createAsyncThunk } from "@reduxjs/toolkit";
import { profileApi } from "../api/profile.api";
import type { UpdateProfilePictureRequest } from "../types/update-profilePicture.request";
import type { UpdateTravelerProfileRequest } from "../types/update-traveler-profile.request";

/////////////////////////////////////////////////////////////
//UPDATE PROFILE IMAGE
export const UpdateProfilePictureThunk = createAsyncThunk(
  "traveler/updateProfile",

  async (payload: UpdateProfilePictureRequest, { rejectWithValue }) => {
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

  async (payload: UpdateTravelerProfileRequest, { rejectWithValue }) => {
    try {
      const res = await profileApi.updateProfile(payload);
      // console.log(res.data.message);

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
