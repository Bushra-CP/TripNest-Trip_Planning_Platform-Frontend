import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/redux/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["accessToken", "isLoading", "error"],
};

export const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});
