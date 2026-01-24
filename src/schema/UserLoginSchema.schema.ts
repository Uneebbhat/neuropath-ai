import { z } from "zod"

// Custom error messages
const ERROR_MESSAGES = {
  email: {
    required: "Email is required",
    invalid: "Please enter a valid email address",
  },
  password: {
    required: "Password is required",
    minLength: "Password must be at least 8 characters",
    maxLength: "Password must not exceed 128 characters",
  },
}

// User Signup Schema
export const UserLoginSchema = z
  .object({
    email: z
      .string({ message: ERROR_MESSAGES.email.required })
      .trim()
      .toLowerCase()
      .email({ message: ERROR_MESSAGES.email.invalid })
      .max(255, { message: "Email must not exceed 255 characters" }),

    password: z
      .string({ message: ERROR_MESSAGES.password.required })
      .min(8, { message: ERROR_MESSAGES.password.minLength })
      .max(128, { message: ERROR_MESSAGES.password.maxLength })
  })

export default UserLoginSchema