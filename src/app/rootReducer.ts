import { combineReducers } from "@reduxjs/toolkit";
import registerReducer from "../features/traveler(user)/register/redux/registerSlice";
import authReducer from "../features/traveler(user)/auth/redux/authSlice";
import storage from "redux-persist/es/storage";
import { persistReducer } from "redux-persist";
import forgotPasswordSlice from "../features/traveler(user)/forgotPassword/redux/forgot-password.slice";
import otpSlice from "../features/traveler(user)/otp/redux/otpSlice";

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
});
