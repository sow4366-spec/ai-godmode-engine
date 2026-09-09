// FILE: app/api/infinity/route.ts
import { NextRequest, NextResponse } from "next/server";
import { infinityEngine } from "@/lib/ai/infinity";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Prompt requis" }, { status: 400 });
    }

    const result = await infinityEngine(prompt.trim());

    await prisma.session.create({
      data: {
        title: prompt.slice(0, 80),
        prompt,
        response: result,
        engine: "infinity",
      },
    });

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Erreur" },
      { status: 500 }
    );
  }
}
