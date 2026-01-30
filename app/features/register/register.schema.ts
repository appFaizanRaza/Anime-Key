import { z } from "zod";
import { EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX } from "@/app/constants/regex";
import { VALIDATION_MESSAGES } from "@/app/messages/validation.message";

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, VALIDATION_MESSAGES.REQUIRED.EMAIL)
      .regex(EMAIL_REGEX, VALIDATION_MESSAGES.INVALID.EMAIL),
    
    phone: z
      .string()
      .min(1, VALIDATION_MESSAGES.REQUIRED.PHONE)
      .regex(PHONE_REGEX, VALIDATION_MESSAGES.INVALID.PHONE),
    
    firstName: z
      .string()
      .min(2, VALIDATION_MESSAGES.FIRST.FIRSTNAME),

    lastName: z
      .string()
      .min(2, VALIDATION_MESSAGES.LAST.LASTNAME),

    password: z
      .string()
      .min(1, VALIDATION_MESSAGES.REQUIRED.PASSWORD)
      .regex(
        PASSWORD_REGEX,
        VALIDATION_MESSAGES.PASSWORD.PATTERN
      ),

    confirmPassword: z 
    .string()
    .min(1, VALIDATION_MESSAGES.REQUIRED.PASSWORD),

    dob: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: VALIDATION_MESSAGES.PASSWORD.MATCH,
    path: ["confirmPassword"],
  });
