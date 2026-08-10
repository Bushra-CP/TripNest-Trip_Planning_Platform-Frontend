export const APP_ROUTES = {
  //TRAVELER RELATED
  HOME_PAGE: "/",
  LOGIN: "/login",
  LOGOUT: "/logout",
  REGISTER: "/register",
  OTP_VERIFICATION: "/otp-verification",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  PROFILE: "/profile",
  SETTINGS: "/settings",
  CHANGE_PASSWORD: "/change-password",
  CHANGE_EMAIL: "/change-email",

  //ADMIN RELATED
  ADMIN_LOGIN: "/admin/login",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_USER_MANAGEMENT: "/admin/users",

  //ERROR PAGES
  UNAUTHERISED_PAGE: "/403",
  NOT_FOUND_PAGE: "*",
} as const;

export const SERVER_ROUTES = {
  //TRAVELER RELATED
  LOGIN: "/login",
  LOGOUT: "/logout",
  REGISTER: "/register",
  VERIFY_REGISTRATION: "/verify-registration",
  RESEND_OTP: "/resend-otp",
  REFRESH_TOKEN: "/refresh-token",
  GOOGLE: "/google",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_RESET_OTP: "/verify-reset-otp",
  RESEND_RESET_OTP: "/resend-reset-otp",
  RESET_PASSWORD: "/reset-password",
  UPDATE_PROFILE_IMAGE: "/update-profile-image",
  GET_PROFILE: "/get-profile",
  UPDATE_PROFILE: "/update-profile",
  CHANGE_PASSWORD: "/change-password",
  CHANGE_EMAIL: "/change-email",
  VERIFY_CHANGE_EMAIL_OTP: "/verify-change-email-otp",
  RESEND_CHANGE_EMAIL_OTP: "/resend-change-email-otp",

  //ADMIN RELATED
  ADMIN_USERS: "/admin/users",
  UPDATE_USER_STATUS: "/admin/user/:id",
  GET_USER: "/admin/user/:id",
} as const;
