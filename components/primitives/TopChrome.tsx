"use client";

import type { Accent } from "@/lib/theme";
import type { Mode } from "@/lib/useMode";

// Monospace strip at the top of every screen — gives the
// "this is a machine / a special place" feel without any onboarding text.
export function TopChrome({
  phase,
  accent,
  sessionId,
  mode = "mobile",
}: {
  phase: string;
  accent: Accent;
  sessionId: string;
  mode?: Mode;
}) {
  const fs = mode === "desktop" ? 11 : 9;
  const padV = mode === "desktop" ? 22 : 14;
  const padH = mode === "desktop" ? 32 : 18;
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        padding: `${padV}px ${padH}px`,
        display: "flex",
        justifyContent: "space-between",
        fontFamily: "var(--font-mono)",
        fontSize: fs,
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
