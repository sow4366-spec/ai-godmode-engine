// FILE: lib/ai/vision.ts
import { callAI } from "./callAI";

export async function visionEngine(description: string) {
  const system = `Tu es VISION ENGINE.
Tu analyses des scènes, interfaces, layouts et descriptions visuelles.
Tu produis des descriptions précises, des suggestions d'amélioration et des plans visuels détaillés.

Réponds en français.`;

  return await callAI({ system, user: description });
}
