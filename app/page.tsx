"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/godmode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur serveur");
      setResult(data.result);
    } catch (err: any) {
      setResult("Erreur : " + (err.message || "Erreur interne du serveur"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-transparent to-purple-950/30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 flex flex-col min-h-screen">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
            AI GODMODE ENGINE
          </h1>
          <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto">
            Plateforme IA full-stack avec agents autonomes, raisonnement avancé, swarm, infinity engine, vision et voice.
          </p>
        </header>

        {/* Main Card */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Décris la tâche complexe que tu veux que l'IA exécute..."
              className="w-full h-40 bg-transparent border-none outline-none resize-none text-lg text-white placeholder:text-gray-500"
            />

            <div className="flex justify-end mt-4">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Godmode en cours..." : "Lancer GODMODE ENGINE"}
              </button>
            </div>
          </div>

          {/* Result Zone */}
          {(result || loading) && (
            <div className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h2 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
                Résultat
              </h2>
              <div className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                {loading ? (
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                    Les agents travaillent...
                  </div>
                ) : (
                  result
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-600">
          AI GODMODE ENGINE • Powered by advanced multi-agent systems
        </footer>
      </div>
    </div>
  );
}
