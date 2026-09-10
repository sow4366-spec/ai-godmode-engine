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
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a12 100%)",
      color: "white",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      padding: "40px 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "50px", maxWidth: "700px" }}>
        <h1 style={{
          fontSize: "42px",
          fontWeight: "700",
          background: "linear-gradient(90deg, #ffffff, #a5b4fc, #c4b5fd)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "16px"
        }}>
          AI GODMODE ENGINE
        </h1>
        <p style={{ color: "#9ca3af", fontSize: "18px", lineHeight: "1.6" }}>
          Plateforme IA full-stack avec agents autonomes, raisonnement avancé, swarm, infinity engine, vision et voice.
        </p>
      </div>

      {/* Card principale */}
      <div style={{
        width: "100%",
        maxWidth: "700px",
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "20px",
        padding: "28px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
      }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Décris la tâche complexe que tu veux que l'IA exécute..."
          style={{
            width: "100%",
            height: "160px",
            background: "transparent",
            border: "none",
            outline: "none",
            color: "white",
            fontSize: "17px",
            resize: "none",
            lineHeight: "1.6"
          }}
        />

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              padding: "14px 32px",
              borderRadius: "14px",
              border: "none",
              background: loading ? "#374151" : "linear-gradient(90deg, #10b981, #14b8a6)",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)",
              transition: "all 0.2s"
            }}
          >
            {loading ? "Godmode en cours..." : "Lancer GODMODE ENGINE"}
          </button>
        </div>
      </div>

      {/* Zone Résultat */}
      {(result || loading) && (
        <div style={{
          width: "100%",
          maxWidth: "700px",
          marginTop: "30px",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          padding: "28px"
        }}>
          <h2 style={{
            fontSize: "13px",
            color: "#9ca3af",
            textTransform: "uppercase",
            letterSpacing: "
