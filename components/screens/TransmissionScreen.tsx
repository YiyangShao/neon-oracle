"use client";

import { Starfield } from "@/components/primitives/Starfield";
import type { Accent } from "@/lib/theme";

// Bridge view: cards flipped, oracle text not yet returned from /api/divine.
// With scripted fallback this rarely shows; with a slow live call it earns its keep.
export function TransmissionScreen({ accent }: { accent: Accent }) {
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
      <Starfield density={0.5} opacity={0.4} />
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: `1px solid ${accent.fg}`,
          borderTopColor: "transparent",
          animation: "oracle-spin 1.4s linear infinite",
          boxShadow: `0 0 20px ${accent.glow}`,
        }}
      />
      <div
        style={{
          marginTop: 28,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "var(--mute)",
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          opacity: 0.7,
        }}
      >
        transmission incoming
      </div>
    </div>
  );
}
