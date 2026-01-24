import { z } from "zod"

// Custom error messages
const ERROR_MESSAGES = {
  name: {
    required: "Name is required",
    minLength: "Name must be at least 2 characters",
    maxLength: "Name must not exceed 50 characters",
    invalid: "Name can only contain letters, spaces, hyphens, and apostrophes",
  },
  email: {
    required: "Email is required",
    invalid: "Please enter a valid email address",
  },
  password: {
    required: "Password is required",
    minLength: "Password must be at least 8 characters",
    maxLength: "Password must not exceed 128 characters",
    strength:
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)",
  },
}

// User Signup Schema
export const UserSignupSchema = z
  .object({
    name: z
      .string({ message: ERROR_MESSAGES.name.required })
      .trim()
      .min(2, { message: ERROR_MESSAGES.name.minLength })
      .max(50, { message: ERROR_MESSAGES.name.maxLength }),

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

export default UserSignupSchema