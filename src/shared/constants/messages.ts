export const ValidationMessages = {
  VALIDATION_FAILDED: "Validation failed",
  EMAIL_REQUIRED: "Email is required",
  ENTER_VALID_EMAIL: "Please enter a valid email address",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_CONSTRAINT_ERROR1: "Password must be at least 8 characters",
  PASSWORD_CONSTRAINT_ERROR2: "Password cannot exceed 50 characters",
  PASSWORD_CONSTRAINT_ERROR3:
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  FULL_NAME_ERROR1: "Full name should be atleast 4 characters",
  FULL_NAME_ERROR2: "Full name is too long",
  ENTER_VALID_PHONE: "Please enter a valid Indian mobile number",
  USERID_REQUIRED: "User ID is required",
  OTP_CONSTRAINT: "OTP must be exactly 6 digits",
  GOOGLE_CREDENTIAL_REQUIRED: "Google credential is required",
} as const;
