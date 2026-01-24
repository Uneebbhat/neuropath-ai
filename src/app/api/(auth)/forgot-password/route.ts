import prisma from "@/lib/prisma"
import ForgotPasswordSchema from "@/schema/ForgotPasswordSchema.schema"
import { generateResetToken, getResetTokenExpiry } from "@/helper/generateResetToken"
import {
  sendEmail,
  generatePasswordResetEmailHTML,
  generatePasswordResetEmailText,
} from "@/helper/sendEmail"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate request body
    const validateData = ForgotPasswordSchema.safeParse(body)
    if (validateData.error) {
      return NextResponse.json(
        {
          error: validateData.error.issues[0].message,
          status: 400,
        },
        { status: 400 }
      )
    }

    const { email } = validateData.data

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    })

    // Always return success to prevent email enumeration attacks
    // But only send email if user exists
    if (user) {
      // Invalidate any existing unused password reset tokens
      await prisma.passwordReset.updateMany({
        where: {
          userId: user.id,
          used: false,
          expiresAt: {
            gt: new Date(),
          },
        },
        data: {
          used: true,
        },
      })

      // Generate new reset token
      const resetToken = generateResetToken()
      const expiresAt = getResetTokenExpiry(1) // 1 hour expiry

      // Save reset token to database
      await prisma.passwordReset.create({
        data: {
          userId: user.id,
          token: resetToken,
          expiresAt,
        },
      })

      // Generate reset URL
      const resetUrl = `http://localhost:3000/reset-password/${resetToken}`

      // Send password reset email
      const emailHTML = generatePasswordResetEmailHTML(resetUrl, user.name)
      const emailText = generatePasswordResetEmailText(resetUrl, user.name)

      const emailSent = await sendEmail({
        to: user.email,
        subject: "Reset Your Password - NeuroPath AI",
        html: emailHTML,
        text: emailText,
      })

      if (!emailSent) {
        console.error("Failed to send password reset email to:", user.email)
        // Don't return error to user to prevent information disclosure
      }
    }

    // Always return success message (security best practice)
    return NextResponse.json(
      {
        message:
          "If an account exists with this email, you will receive a password reset link shortly.",
        status: 200,
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error("Forgot password error:", error)
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "An error occurred while processing your request",
          status: 500,
        },
        { status: 500 }
      )
    } else {
      return NextResponse.json(
        {
          error: "An unexpected error occurred",
          status: 500,
        },
        { status: 500 }
      )
    }
  }
}

