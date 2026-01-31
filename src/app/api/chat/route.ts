import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import prisma from "@/lib/prisma";

function buildSystemPrompt(preference: {
  goal: string;
  level: string;
  learningPreference: string;
  constraints: string;
}) {
  return `You are NeuroPath AI, an adaptive learning engine for students.

Learner Goal: ${preference.goal}
Skill Level: ${preference.level}
Learning Preference: ${preference.learningPreference}
Constraints: ${preference.constraints}

Teaching Rules:
- Adapt explanations to the learner's level
- Match the preferred learning style
- Be structured and educational
- Avoid unnecessary complexity
- Encourage understanding
- End with a learning-oriented follow-up`;
}

export async function POST(req: Request) {
  try {
    const { prompt, userId } = await req.json();

    // Validate inputs
    if (!prompt || typeof prompt !== "string") {
      return new Response(
        JSON.stringify({ error: "prompt is required and must be a string" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Check if Google API key is configured
    const apiKey =
      process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "GOOGLE_GENERATIVE_AI_API_KEY is not configured",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    // Fetch user preferences
    const userPreferences = await prisma.onboardingPreference.findUnique({
      where: { userId },
    });

    if (!userPreferences) {
      return new Response(
        JSON.stringify({ error: "User preferences not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    // Stream the response using AI SDK with conversation history
    const result = streamText({
      model: google("gemini-2.5-flash"),
      prompt: prompt,
      system: buildSystemPrompt({
        goal: userPreferences.goal,
        level: userPreferences.level,
        learningPreference: userPreferences.learningPreference,
        constraints: userPreferences.constraints,
      }),
      temperature: 0.7,
    });

    // Return the streaming response in the format expected by useChat
    return result.toUIMessageStreamResponse();
  } catch (error: unknown) {
    console.error("Chat API Error:", error);

    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ error: `Internal Server Error: ${error.message}` }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ error: "An unknown error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
