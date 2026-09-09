// FILE: app/api/godmode/route.ts
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

    const result = await godmodeEngine(prompt);

    // Sauvegarde en base
    await prisma.session.create({
      data: {
        title: prompt.slice(0, 80) + (prompt.length > 80 ? "..." : ""),
        prompt,
        response: result,
        engine: "godmode",
      },
    });

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Godmode error:", error);
    return NextResponse.json(
      { error: error.message || "Erreur interne" },
      { status: 500 }
    );
  }
}
