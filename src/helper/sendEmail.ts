/**
 * Email service helper using Nodemailer
 * Supports SMTP configuration for sending emails
 */

import nodemailer from "nodemailer"
import type { Transporter } from "nodemailer"

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

/**
 * Creates and configures the email transporter
 * @returns Configured nodemailer transporter
 */
const createTransporter = (): Transporter => {
  // Check if all required environment variables are set
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = process.env.SMTP_PORT
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    throw new Error(
      "Missing SMTP configuration. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in your environment variables."
    )
  }

  return nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: parseInt(process.env.NODEMAILER_PORT as string),
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
    // Optional: Add these for better debugging
    logger: process.env.NODE_ENV === "development",
    debug: process.env.NODE_ENV === "development",
  })
}

/**
 * Sends an email using Nodemailer
 * @param options Email options including recipient, subject, and content
 * @returns Promise<boolean> - true if email sent successfully, false otherwise
 */
export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    const transporter = createTransporter()
    const emailFrom = process.env.EMAIL_FROM || process.env.SMTP_USER

    if (!emailFrom) {
      throw new Error("EMAIL_FROM or SMTP_USER must be set in environment variables")
    }

    // Send email
    const info = await transporter.sendMail({
      from: emailFrom,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    })

    console.log("✅ Email sent successfully!")
    console.log("Message ID:", info.messageId)
    console.log("To:", options.to)
    console.log("Subject:", options.subject)

    // Preview URL for testing with Ethereal (if applicable)
    if (process.env.NODE_ENV === "development" && info.messageId) {
      const previewUrl = nodemailer.getTestMessageUrl(info)
      if (previewUrl) {
        console.log("📧 Preview URL:", previewUrl)
      }
    }

    return true
  } catch (error) {
    console.error("❌ Failed to send email:", error)

    // In development, show the email content in console as fallback
    if (process.env.NODE_ENV === "development") {
      console.log("========================================")
      console.log("📧 EMAIL FALLBACK (Development Mode)")
      console.log("========================================")
      console.log("To:", options.to)
      console.log("Subject:", options.subject)
      console.log("Content:")
      console.log(options.text || options.html)
      console.log("========================================")
    }

    return false
  }
}

/**
 * Generates HTML content for password reset email
 * @param resetUrl The password reset URL
 * @param userName User's name
 * @returns HTML string for email
 */
export const generatePasswordResetEmailHTML = (
  resetUrl: string,
  userName: string
): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f4f4f4; padding: 20px; border-radius: 10px;">
          <h1 style="color: #333; text-align: center;">Password Reset Request</h1>
          
          <div style="background-color: white; padding: 20px; border-radius: 5px; margin-top: 20px;">
            <p>Hi ${userName},</p>
            
            <p>We received a request to reset your password. Click the button below to create a new password:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                Reset Password
              </a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <p style="background-color: #f4f4f4; padding: 10px; border-radius: 5px; word-break: break-all;">
              ${resetUrl}
            </p>
            
            <p style="color: #666; font-size: 14px; margin-top: 20px;">
              <strong>Important:</strong> This link will expire in 1 hour for security reasons.
            </p>
            
            <p style="color: #666; font-size: 14px;">
              If you didn't request a password reset, please ignore this email or contact support if you have concerns.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>© ${new Date().getFullYear()} NeuroPath AI. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

/**
 * Generates plain text content for password reset email
 * @param resetUrl The password reset URL
 * @param userName User's name
 * @returns Plain text string for email
 */
export const generatePasswordResetEmailText = (
  resetUrl: string,
  userName: string
): string => {
  return `
Hi ${userName},

We received a request to reset your password.

To reset your password, please visit the following link:
${resetUrl}

This link will expire in 1 hour for security reasons.

If you didn't request a password reset, please ignore this email or contact support if you have concerns.

© ${new Date().getFullYear()} NeuroPath AI. All rights reserved.
  `.trim()
}

