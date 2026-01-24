import UserDTO from "@/dto/userDTO.dto";
import generateToken from "@/helper/generateToken";
import { hashPassword } from "@/helper/passwordHashing";
import prisma from "@/lib/prisma";
import UserSignupSchema from "@/schema/UserSignupSchema.schema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const body = await req.json()

    const { name, email, password } = body

    const validateData = UserSignupSchema.safeParse(body)
    if (validateData.error) {
      return NextResponse.json({ error: validateData.error.issues[0].message, status: 400 }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (existingUser) {
      return NextResponse.json({ error: "Email alreay in use", status: 400 }, { status: 400 })
    }

    const hashedPassword = await hashPassword(password)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })
    if (!newUser) {
      return NextResponse.json({ error: "Failed to create user", status: 500 }, { status: 500 })
    }

    const userDTO = new UserDTO(newUser)

    const token = generateToken(newUser.id)
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // maxAge: 60 * 60 * 24 * 30,
      path: "/"
    })

    return NextResponse.json({ message: "User created successfully", data: userDTO, token, status: 201 }, { status: 201 })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: `Internal Server Error: ${error.message}`, status: 500 }, { status: 500 })
    } else {
      return NextResponse.json({ error: `An unexpected error occurred: ${error}`, status: 500 }, { status: 500 })
    }
  }
}