"use client";

import { useEffect, useState } from "react";
import { Starfield } from "@/components/primitives/Starfield";
import type { Accent } from "@/lib/theme";
import type { SizeTokens } from "@/lib/useMode";

// 1. Entry — a quiet void. Whole surface taps to begin.
export function EntryScreen({
  onEnter,
  accent,
  tokens,
}: {
  onEnter: () => void;
  accent: Accent;
  tokens: SizeTokens;
}) {
  const [hint, setHint] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHint(true), 1400);
    return () => clearTimeout(t);
  }, []);

  const circle = tokens.entryCircle;
  const brandFs = tokens.titleSerifMid > 28 ? 18 : 14;
  const tagline = tokens.titleSerifBig + 6; // a touch above big body
  const hintFs = tokens.buttonFs - 6;

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
          fontSize: brandFs,
          letterSpacing: "0.5em",
          color: "var(--bone)",
          opacity: 0.6,
          textAlign: "center",
          marginBottom: 24,
        }}
      >
        NEON ORACLE
      </div>

      <div
        style={{
          width: circle,
          height: circle,
          borderRadius: "50%",
          border: `1px solid ${accent.fg}`,
          boxShadow: `0 0 ${circle * 0.32}px ${accent.glow}, inset 0 0 ${circle * 0.2}px ${accent.glow}`,
          position: "relative",
          animation: "oracle-breath 4.5s ease-in-out infinite",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: circle * 0.25,
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
            fontSize: circle * 0.31,
            color: accent.fg,
            textShadow: `0 0 ${circle * 0.16}px ${accent.glow}`,
          }}
        >
          ✶
        </div>
      </div>

      <div
        style={{
          marginTop: 72,
          fontFamily: "var(--font-serif)",
          fontSize: tagline,
          color: "var(--bone)",
          letterSpacing: "0.32em",
          textAlign: "center",
        }}
      >
        三 张 牌 · 一 段 预 言
      </div>

      <div
        style={{
          marginTop: 110,
          fontFamily: "var(--font-mono)",
          fontSize: hintFs,
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
