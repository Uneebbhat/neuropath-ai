import crypto from "crypto"

/**
 * Generates a secure random token for password reset
 * @returns A secure random token string
 */
export const generateResetToken = (): string => {
  // Generate a 32-byte random token and convert to hex string
  return crypto.randomBytes(32).toString("hex")
}

/**
 * Calculates the expiration time for reset token
 * @param hours Number of hours until expiration (default: 1)
 * @returns Date object representing expiration time
 */
export const getResetTokenExpiry = (hours: number = 1): Date => {
  const expiry = new Date()
  expiry.setHours(expiry.getHours() + hours)
  return expiry
}

