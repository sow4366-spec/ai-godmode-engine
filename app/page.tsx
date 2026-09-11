"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendPrompt() {
    if (!prompt.trim()) return;
    setLoading(true);

    const res = await fetch("/api/godmode", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResponse(data.answer || "Erreur serveur");
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">
        
        {/* HEADER */}
        <h1 className="text-center text-5xl font-extrabold mb-10 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
          AI GODMODE ENGINE
        </h1>

        {/* CARD */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
          
          {/* INPUT */}
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Pose ta question à l’IA…"
            className="w-full h-40 p-4 rounded-xl bg-black/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
          />

          {/* BUTTON */}
          <button
            onClick={sendPrompt}
            disabled={loading}
            className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all font-bold text-lg shadow-lg disabled:opacity-50"
          >
            {loading ? "Analyse en cours…" : "Envoyer"}
          </button>
        </div>

        {/* RESPONSE */}
        {response && (
          <div className="mt-10 p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-xl animate-fadeIn">
            <h2 className="text-2xl font-bold mb-4 text-purple-300">Réponse :</h2>
            <p className="text-lg leading-relaxed">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
