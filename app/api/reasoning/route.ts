// FILE: app/api/reasoning/route.ts
import { NextRequest, NextResponse } from "next/server";
import { reasoningEngine } from "@/lib/ai/reasoning";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Prompt requis" }, { status: 400 });
    }

    const result = await reasoningEngine(prompt.trim());

    await prisma.session.create({
      data: {
        title: prompt.slice(0, 80),
        prompt,
        response: result,
        engine: "reasoning",
      },
    });

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Erreur dans /api/reasoning:", error);
    return NextResponse.json(
      { error: error.message || "Erreur interne" },
      { status: 500 }
    );
  }
}
