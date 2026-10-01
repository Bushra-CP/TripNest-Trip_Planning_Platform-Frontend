import { combineReducers } from "@reduxjs/toolkit";
import registerReducer from "../features/traveler(user)/register/redux/register.slice";
import authReducer from "../features/traveler(user)/auth/redux/authSlice";
import storage from "redux-persist/es/storage";
import { persistReducer } from "redux-persist";
import forgotPasswordSlice from "../features/traveler(user)/forgot-password/redux/forgot-password.slice";
import otpSlice from "../features/traveler(user)/otp/redux/otp.slice";
import userSlice from "../features/admin/user-management/redux/users.slice";
import chatSlice from "../features/traveler(user)/trip-planning/redux/chat/chat.slice";
import aiPlanningSlice from "../features/traveler(user)/trip-planning/redux/ai-planning/ai-planning.slice";
import knowledgeDocumentSlice from "../features/admin/ai-knowledge-docs-management/redux/knowledge-document.slice";
import tripTalesSlice from "../features/traveler(user)/tripTales/redux/trip-tales.slice";
import myTripsSlice from "../features/traveler(user)/dashboard/my-trips/redux/my-trips.slice";
import vehicleSlice from "../features/traveler(user)/trip-planning/redux/vehicle/vehicle.slice";
import tripPlanningSlice from "../features/traveler(user)/trip-planning/redux/trip-planning/trip-planning.slice";
import memberSlice from "../features/traveler(user)/trip-planning/redux/member/member.slice";

const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["accessToken", "isLoading", "error"],
};

const aiPlanningPersistConfig = {
  key: "aiPlanning",
  storage,
  whitelist: ["threadId"],
};

export const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  register: registerReducer,
  forgotPassword: forgotPasswordSlice,
  otp: otpSlice,
  user: userSlice,
  tripPlanning: tripPlanningSlice,
  chat: chatSlice,
  aiPlanning: persistReducer(aiPlanningPersistConfig, aiPlanningSlice),
  knowledgeDocuments: knowledgeDocumentSlice,
  tripTales: tripTalesSlice,
  myTrips: myTripsSlice,
  vehicle: vehicleSlice,
  member: memberSlice,
});
