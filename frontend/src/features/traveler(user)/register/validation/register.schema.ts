import z from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .min(4, "Full name should be atleast 4 characters")
    .max(50, "Full name is too long"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"),

  password: z
    .string()
    .min(1, "Password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),

  referenceId: z.string().trim().optional().or(z.literal("")),

  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Terms of Service and Privacy Policy",
  }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
