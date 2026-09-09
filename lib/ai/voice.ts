// FILE: lib/ai/voice.ts
import { callAI } from "./callAI";

export async function voiceEngine(prompt: string) {
  const system = `Tu es VOICE ENGINE.
Tu produis des réponses optimisées pour la voix :
- Phrases courtes et naturelles
- Ton conversationnel
- Structure claire et fluide
- Facile à lire à voix haute

Réponds en français.`;

  return await callAI({ system, user: prompt });
}
