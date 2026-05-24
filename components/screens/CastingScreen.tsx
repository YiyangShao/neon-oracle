"use client";

import { useEffect } from "react";
import { Starfield } from "@/components/primitives/Starfield";
import type { Accent } from "@/lib/theme";

// 3. Casting — a brief, weighted transition. A point of light expands
// into the void; 2.2s total before deal.
export function CastingScreen({
  onDone,
  accent,
}: {
  onDone: () => void;
  accent: Accent;
}) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Starfield density={2} opacity={0.7} />

      <div
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: accent.fg,
          boxShadow: `0 0 40px 8px ${accent.glow}`,
          animation: "oracle-cast 2.2s ease-out forwards",
        }}
      />

      <div
        style={{
          marginTop: 48,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "var(--mute)",
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          opacity: 0.6,
        }}
      >
        shuffling
      </div>
    </div>
  );
}
