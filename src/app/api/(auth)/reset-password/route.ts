import prisma from "@/lib/prisma"
import ResetPasswordSchema from "@/schema/ResetPasswordSchema.schema"
import { hashPassword } from "@/helper/passwordHashing"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate request body
    const validateData = ResetPasswordSchema.safeParse(body)
    if (validateData.error) {
      return NextResponse.json(
        {
          error: validateData.error.issues[0].message,
          status: 400,
        },
        { status: 400 }
      )
    }

    const { token, password } = validateData.data

    // Find the password reset token
    const passwordReset = await prisma.passwordReset.findUnique({
      where: { token },
      include: { user: true },
    })

    // Validate token exists
    if (!passwordReset) {
      return NextResponse.json(
        {
          error: "Invalid or expired reset token",
          status: 400,
        },
        { status: 400 }
      )
    }

    // Check if token is already used
    if (passwordReset.used) {
      return NextResponse.json(
        {
          error: "This reset token has already been used",
          status: 400,
        },
        { status: 400 }
      )
    }

    // Check if token is expired
    if (new Date() > passwordReset.expiresAt) {
      return NextResponse.json(
        {
          error: "Reset token has expired. Please request a new one.",
          status: 400,
        },
        { status: 400 }
      )
    }

    // Hash the new password
    const hashedPassword = await hashPassword(password)

    // Update user password and mark token as used in a transaction
    await prisma.$transaction([
      prisma.user.update({
        where: { id: passwordReset.userId },
        data: { password: hashedPassword },
      }),
      prisma.passwordReset.update({
        where: { id: passwordReset.id },
        data: { used: true },
      }),
      // Invalidate all other unused tokens for this user
      prisma.passwordReset.updateMany({
        where: {
          userId: passwordReset.userId,
          used: false,
          id: {
            not: passwordReset.id,
          },
        },
        data: { used: true },
      }),
    ])

    return NextResponse.json(
      {
        message: "Password has been reset successfully. You can now log in with your new password.",
        status: 200,
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error("Reset password error:", error)
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "An error occurred while resetting your password",
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

