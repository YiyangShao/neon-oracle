"use client";

import type { Accent } from "@/lib/theme";

// Monospace strip at the top of every screen — gives the
// "this is a machine / a special place" feel without any onboarding text.
export function TopChrome({
  phase,
  accent,
  sessionId,
}: {
  phase: string;
  accent: Accent;
  sessionId: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        padding: "14px 18px",
        display: "flex",
        justifyContent: "space-between",
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        letterSpacing: "0.2em",
        color: "var(--mute)",
        textTransform: "uppercase",
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      <div>NEON · ORACLE</div>
      <div style={{ color: accent.fg, opacity: 0.85 }}>{phase}</div>
      <div>S/{sessionId}</div>
    </div>
  );
}
