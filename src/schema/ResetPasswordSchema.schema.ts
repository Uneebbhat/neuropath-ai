import { z } from "zod"

// Custom error messages
const ERROR_MESSAGES = {
  token: {
    required: "Reset token is required",
    invalid: "Invalid reset token format",
  },
  password: {
    required: "Password is required",
    minLength: "Password must be at least 8 characters",
    maxLength: "Password must not exceed 128 characters",
  },
  confirmPassword: {
    required: "Please confirm your password",
    match: "Passwords do not match",
  },
}

// Reset Password Schema
export const ResetPasswordSchema = z
  .object({
    token: z
      .string({ message: ERROR_MESSAGES.token.required })
      .trim()
      .min(1, { message: ERROR_MESSAGES.token.required }),

    password: z
      .string({ message: ERROR_MESSAGES.password.required })
      .min(8, { message: ERROR_MESSAGES.password.minLength })
      .max(128, { message: ERROR_MESSAGES.password.maxLength }),

    confirmPassword: z
      .string({ message: ERROR_MESSAGES.confirmPassword.required })
      .min(1, { message: ERROR_MESSAGES.confirmPassword.required }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ERROR_MESSAGES.confirmPassword.match,
    path: ["confirmPassword"],
  })

// Type inference
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>

export default ResetPasswordSchema

