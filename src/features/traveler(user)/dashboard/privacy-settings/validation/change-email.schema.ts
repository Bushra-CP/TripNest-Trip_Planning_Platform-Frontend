import { z } from "zod";

export const changeEmailSchema = z
  .object({
    currentEmail: z.string().trim().email("Current email is required"),

    newEmail: z.string().trim().email("Please enter a valid email address"),

    confirmEmail: z.string().trim().email("Please enter a valid email address"),

    currentPassword: z.string().trim().min(1, "Current password is required"),
  })

  .refine((data) => data.currentEmail !== data.newEmail, {
    path: ["newEmail"],
    message: "Current email and new email should not be same",
  })

  .refine((data) => data.newEmail === data.confirmEmail, {
    path: ["confirmEmail"],
    message: "Email addresses do not match",
  });

export type ChangeEmailFormData = z.infer<typeof changeEmailSchema>;
