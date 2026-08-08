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
  CHANGE_PASSWORD: "/change-password",
  CHANGE_EMAIL: "/change-email",
  VERIFY_CHANGE_EMAIL_OTP: "/verify-change-email-otp",
  RESEND_CHANGE_EMAIL_OTP: "/resend-change-email-otp",
  ADMIN_USERS: "/admin/users",
  UPDATE_USER_STATUS: "/admin/user/:id",
  GET_USER: "/admin/user/:id",
} as const;
