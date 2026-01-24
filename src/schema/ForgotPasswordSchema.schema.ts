import { z } from "zod"

// Custom error messages
const ERROR_MESSAGES = {
  email: {
    required: "Email is required",
    invalid: "Please enter a valid email address",
  },
}

// Forgot Password Schema
export const ForgotPasswordSchema = z.object({
  email: z
    .string({ message: ERROR_MESSAGES.email.required })
    .trim()
    .toLowerCase()
    .email({ message: ERROR_MESSAGES.email.invalid })
    .max(255, { message: "Email must not exceed 255 characters" }),
})

// Type inference
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>

export default ForgotPasswordSchema

