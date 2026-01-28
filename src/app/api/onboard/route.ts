import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { goal, level, learningPreference, constraints } = body;
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    let userId: string | undefined;
    jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
      (err, decoded) => {
        if (err) {
          // Handle invalid token error
          console.error("Token is invalid:", err);
        } else {
          // Access the user ID from the decoded payload
          userId = (decoded as jwt.JwtPayload)?.userId;
          console.log("User ID:", userId);
        }
      },
    );
    console.log(userId);

    // Validation
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    if (!goal || !level || !learningPreference || !constraints) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Create or update onboarding preference
    const onboardingPreference = await prisma.onboardingPreference.upsert({
      where: { userId },
      update: {
        goal,
        level,
        learningPreference,
        constraints,
      },
      create: {
        userId,
        goal,
        level,
        learningPreference,
        constraints,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Onboarding preferences saved successfully",
        data: onboardingPreference,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Internal Server Error: ${error.message}` },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 },
      );
    }
  }
}
