// FILE: app/page.tsx
"use client";

import { useState } from "react";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRun() {
    if (!prompt.trim()) return;

    setLoading(true);
    setAnswer(null);

    try {
      const res = await fetch("/api/godmode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur serveur");
      }

      setAnswer(data.result);
    } catch (e: any) {
      setAnswer(`Erreur : ${e.message || "Impossible d'exécuter le moteur"}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
        gap: "24px",
      }}
    >
      <h1 style={{ fontSize: "2.2rem", marginBottom: 0 }}>
        AI GODMODE ENGINE
      </h1>
      <p
        style={{
          maxWidth: 620,
          textAlign: "center",
          opacity: 0.8,
          lineHeight: 1.5,
        }}
      >
        Plateforme IA full-stack avec agents autonomes, raisonnement avancé,
        swarm, infinity engine, vision et voice.
      </p>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Décris la tâche complexe que tu veux que l'IA exécute..."
        style={{
          width: "100%",
          maxWidth: 650,
          minHeight: 140,
          padding: 14,
          borderRadius: 10,
          border: "1px solid #374151",
          background: "#020617",
          color: "#f9fafb",
          fontSize: 15,
          resize: "vertical",
        }}
      />

      <button
        onClick={handleRun}
        disabled={loading || !prompt.trim()}
        style={{
          padding: "12px 28px",
          borderRadius: 999,
          border: "none",
          background: loading ? "#4b5563" : "#22c55e",
          color: "#020617",
          fontWeight: 600,
          fontSize: 15,
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background 0.2s",
        }}
      >
        {loading ? "Exécution en cours..." : "Lancer GODMODE ENGINE"}
      </button>

      {answer && (
        <section
          style={{
            marginTop: 20,
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
          <h2 style={{ marginTop: 0, marginBottom: 12 }}>Résultat</h2>
          <div>{answer}</div>
        </section>
      )}
    </main>
  );
}
