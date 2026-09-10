import { NextRequest, NextResponse } from "next/server";
import { godmodeEngine } from "@/lib/ai/godmode";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body.prompt?.trim();

    if (!prompt) {
      return NextResponse.json(
        { error: "Le prompt est requis" },
        { status: 400 }
      );
    }

    const answer = await godmodeEngine(prompt);

    const session = await prisma.session.create({
      data: {
        title: prompt.slice(0, 80),
        prompt,
        response: answer,
        engine: "godmode"
      }
    });

    return NextResponse.json({ session, answer });
  } catch (error) {
    console.error("Erreur dans /api/godmode:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

