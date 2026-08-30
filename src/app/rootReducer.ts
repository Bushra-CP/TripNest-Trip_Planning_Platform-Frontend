import { combineReducers } from "@reduxjs/toolkit";
import registerReducer from "../features/traveler(user)/register/redux/register.slice";
import authReducer from "../features/traveler(user)/auth/redux/authSlice";
import storage from "redux-persist/es/storage";
import { persistReducer } from "redux-persist";
import forgotPasswordSlice from "../features/traveler(user)/forgot-password/redux/forgot-password.slice";
import otpSlice from "../features/traveler(user)/otp/redux/otp.slice";
import userSlice from "../features/admin/user-management/redux/users.slice";
import tripPlanningSlice from "../features/traveler(user)/trip-planning/redux/trip-planning.slice";
import chatSlice from '../features/traveler(user)/trip-planning/redux/chat/chat.slice';

const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["accessToken", "isLoading", "error"],
};

export const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  register: registerReducer,
  forgotPassword: forgotPasswordSlice,
  otp: otpSlice,
  user: userSlice,
  tripPlanning: tripPlanningSlice,
  chat:chatSlice,
});
