"use client";

import type { ReactNode } from "react";
import { INK, cssVars } from "@/lib/theme";
import { TopChrome } from "@/components/primitives/TopChrome";

// The visual container shared by both the live OracleApp and the
// shared-link viewer: background gradient, film grain, top chrome.
export function OracleShell({
  phaseLabel,
  sessionId,
  children,
}: {
  phaseLabel: string;
  sessionId: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        ...cssVars,
        position: "fixed",
        inset: 0,
        background: INK.bgGrad,
        color: INK.bone,
        fontFamily: "var(--font-serif)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 0.95 0 0 0 0 0.85 0 0 0 0.4 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.05,
          mixBlendMode: "screen",
          zIndex: 1,
        }}
      />
      <TopChrome phase={phaseLabel} accent={INK.accent} sessionId={sessionId} />
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>{children}</div>
    </div>
  );
}
