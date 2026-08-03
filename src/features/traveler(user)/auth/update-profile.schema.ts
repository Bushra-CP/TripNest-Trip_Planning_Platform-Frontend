import { z } from "zod";

export const updateTravelerProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters.")
    .max(50, "Full name cannot exceed 50 characters."),

  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number."),

  country: z.string().trim().optional(),

  state: z.string().trim().optional(),

  city: z.string().trim().optional(),

  bio: z
    .string()
    .trim()
    .max(300, "Bio cannot exceed 300 characters.")
    .optional()
    .or(z.literal("")),

  socialPresence: z
    .array(
      z.object({
        url: z.string().trim().url("Please enter a valid URL."),
      }),
    )
    .max(10, "Maximum 10 social links are allowed.")
    .optional(),
});
