import { ValidationMessages } from "@/shared/constants/messages";
import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, ValidationMessages.EMAIL_REQUIRED)
    .email(ValidationMessages.ENTER_VALID_EMAIL),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
