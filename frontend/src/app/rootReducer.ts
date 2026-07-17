import { combineReducers } from "@reduxjs/toolkit";
import registerReducer from "../features/traveler(user)/register/redux/registerSlice";
import authReducer from "../features/auth/redux/authSlice";
import storage from "redux-persist/es/storage";
import { persistReducer } from "redux-persist";

const registerPersistConfig = {
  key: "register",
  storage,
  blacklist: ["accessToken", "isLoading", "error"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["accessToken", "isLoading", "error"],
};

export const rootReducer = combineReducers({
  register: persistReducer(registerPersistConfig, registerReducer),
  auth: persistReducer(authPersistConfig, authReducer),
});
