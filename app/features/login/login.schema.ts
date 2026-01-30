import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email or phone is required")
    .refine(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
        /^[0-9]{6,15}$/.test(value),
      "Enter a valid email or phone number"
    ),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});
