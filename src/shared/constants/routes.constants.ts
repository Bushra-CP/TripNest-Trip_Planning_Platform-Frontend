export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
    LOGOUT: "/logout",
    REGISTER: "/register",
    VERIFYREGISTRATION: "/verify-registration",
    RESEND_OTP: "/resend-otp",
    REFRESH_TOKEN: "/refresh-token",
    GOOGLE: "/google",
  },
} as const;

export const SERVER_ROUTES = {
  LOGIN: "/login",
  LOGOUT: "/logout",
  REGISTER: "/register",
  VERIFYREGISTRATION: "/verify-registration",
  RESEND_OTP: "/resend-otp",
  REFRESH_TOKEN: "/refresh",
  GOOGLE: "/google",
  UPDATE_PROFILE_IMAGE: "/update-profile-image",
  GET_PROFILE: "/get-profile",
  UPDATE_PROFILE: "/update-profile",
} as const;
