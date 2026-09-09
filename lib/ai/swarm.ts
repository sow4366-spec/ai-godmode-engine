// FILE: lib/ai/swarm.ts
import { callAI } from "./callAI";

export async function swarmEngine(prompt: string) {
  const system = `Tu es SWARM ENGINE.
Tu simules une coordination de plusieurs agents spécialisés :
- Agent Analyste
- Agent Planificateur
- Agent Exécuteur
- Agent Critique

Processus :
1. Chaque agent traite une partie du problème
2. Tu fusionnes leurs contributions
3. Tu produis une solution optimale et cohérente

Réponds en français de façon structurée.`;

  return await callAI({ system, user: prompt });
}
