// FILE: app/layout.tsx
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI GODMODE ENGINE",
  description: "Plateforme IA avancée avec agents autonomes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          background: "#050816",
          color: "#f9fafb",
        }}
      >
        {children}
      </body>
    </html>
  );
}
