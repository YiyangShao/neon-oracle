"use client";

import { useEffect, useState } from "react";
import { Starfield } from "@/components/primitives/Starfield";
import type { Accent } from "@/lib/theme";

// 1. Entry — a quiet void. Whole surface taps to begin.
export function EntryScreen({
  onEnter,
  accent,
}: {
  onEnter: () => void;
  accent: Accent;
}) {
  const [hint, setHint] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHint(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      onClick={onEnter}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <Starfield density={1.2} />

      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 14,
          letterSpacing: "0.5em",
          color: "var(--bone)",
          opacity: 0.6,
          textAlign: "center",
          marginBottom: 18,
        }}
      >
        NEON ORACLE
      </div>

      <div
        style={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          border: `1px solid ${accent.fg}`,
          boxShadow: `0 0 28px ${accent.glow}, inset 0 0 18px ${accent.glow}`,
          position: "relative",
          animation: "oracle-breath 4.5s ease-in-out infinite",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 22,
            borderRadius: "50%",
            border: `1px solid ${accent.dim}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-serif)",
            fontSize: 28,
            color: accent.fg,
            textShadow: `0 0 14px ${accent.glow}`,
          }}
        >
          ✶
        </div>
      </div>

      <div
        style={{
          marginTop: 56,
          fontFamily: "var(--font-serif)",
          fontSize: 22,
          color: "var(--bone)",
          letterSpacing: "0.32em",
          textAlign: "center",
        }}
      >
        三 张 牌 · 一 段 预 言
      </div>

      <div
        style={{
          marginTop: 90,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.3em",
          color: "var(--mute)",
          textTransform: "uppercase",
          opacity: hint ? 1 : 0,
          transition: "opacity 1.2s",
          animation: hint ? "oracle-pulse 2.4s ease-in-out infinite" : "none",
        }}
      >
        tap to begin
      </div>
    </div>
  );
}
