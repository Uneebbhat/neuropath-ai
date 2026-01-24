import UserDTO from "@/dto/userDTO.dto";
import generateToken from "@/helper/generateToken";
import { comparePassword } from "@/helper/passwordHashing";
import prisma from "@/lib/prisma";
import UserLoginSchema from "@/schema/UserLoginSchema.schema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const body = await req.json()

    const { email, password } = body

    const validateData = UserLoginSchema.safeParse(body)
    if (validateData.error) {
      return NextResponse.json({ error: validateData.error.issues[0].message, status: 400 }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!existingUser) {
      return NextResponse.json({ error: "User not found", status: 404 }, { status: 404 })
    }

    const isPasswordValid = await comparePassword(password, existingUser.password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials", status: 401 }, { status: 401 })
    }

    const userDTO = new UserDTO(existingUser)
    const token = generateToken(existingUser.id)

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // maxAge: 60 * 60 * 24 * 30,
      path: "/"
    })

    return NextResponse.json({ message: "Login successfully", data: userDTO, token, status: 200 }, { status: 200 })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: `Internal Server Error: ${error.message}`, status: 500 }, { status: 500 })
    } else {
      return NextResponse.json({ error: `An unexpected error occurred: ${error}`, status: 500 }, { status: 500 })
    }
  }
}