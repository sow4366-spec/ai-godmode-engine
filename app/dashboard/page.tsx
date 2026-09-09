// FILE: app/dashboard/page.tsx
"use client";

import { useState } from "react";

type Engine = "reasoning" | "swarm" | "infinity" | "vision" | "voice";

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [mode, setMode] = useState<Engine>("reasoning");
  const [loading, setLoading] = useState(false);

  async function run() {
    if (!prompt.trim()) return;

    setLoading(true);
    setOutput(null);

    try {
      const res = await fetch(`/api/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur serveur");
      }

      setOutput(data.result);
    } catch (e: any) {
      setOutput(`Erreur : ${e.message || "Impossible d'exécuter le moteur"}`);
    } finally {
      setLoading(false);
    }
  }

  const engines: { id: Engine; label: string }[] = [
    { id: "reasoning", label: "Reasoning" },
    { id: "swarm", label: "Swarm" },
    { id: "infinity", label: "Infinity" },
    { id: "vision", label: "Vision" },
    { id: "voice", label: "Voice" },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
      }}
    >
      <h1 style={{ fontSize: "2rem" }}>Dashboard IA Engines</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
        {engines.map((engine) => (
          <button
            key={engine.id}
            onClick={() => setMode(engine.id)}
            style={{
              padding: "9px 18px",
              borderRadius: 999,
              border: "none",
              background: mode === engine.id ? "#22c55e" : "#1f2937",
              color: "#f9fafb",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            {engine.label}
          </button>
        ))}
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Prompt pour le moteur sélectionné..."
        style={{
          width: "100%",
          maxWidth: 700,
          minHeight: 140,
          padding: 14,
          borderRadius: 10,
          border: "1px solid #374151",
          background: "#020617",
          color: "#f9fafb",
          fontSize: 15,
        }}
      />

      <button
        onClick={run}
        disabled={loading || !prompt.trim()}
        style={{
          padding: "12px 28px",
          borderRadius: 999,
          border: "none",
          background: loading ? "#4b5563" : "#22c55e",
          color: "#020617",
          fontWeight: 600,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Exécution..." : "Lancer le moteur"}
      </button>

      {output && (
        <section
          style={{
            marginTop: 16,
            maxWidth: 800,
            width: "100%",
            padding: 20,
            borderRadius: 14,
            background: "#020617",
            border: "1px solid #1f2937",
            whiteSpace: "pre-wrap",
            lineHeight: 1.6,
          }}
        >
          <h2 style={{ marginTop: 0 }}>Résultat</h2>
          <div>{output}</div>
        </section>
      )}
    </main>
  );
}
