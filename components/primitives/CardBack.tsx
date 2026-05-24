"use client";

import type { Accent } from "@/lib/theme";

// Card back — concentric mark + diagonal stripes + corner brackets.
// `dim` is used for thumbnail contexts where the glow would compete.
export function CardBack({
  w = 180,
  h = 280,
  accent,
  dim = false,
}: {
  w?: number;
  h?: number;
  accent: Accent;
  dim?: boolean;
}) {
  const ratio = w / 180;
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: 6 * ratio,
        background: "linear-gradient(180deg, #161310 0%, #0c0a08 100%)",
        border: `1px solid ${accent.dim}`,
        boxShadow: dim
          ? "0 6px 16px rgba(0,0,0,0.6)"
          : `0 16px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(243,235,216,0.03), 0 0 18px ${accent.glow}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: `${68 * ratio}px`,
            height: `${68 * ratio}px`,
            borderRadius: "50%",
            border: `1px solid ${accent.fg}`,
            opacity: 0.5,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: `${8 * ratio}px`,
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
              fontSize: 20 * ratio,
              color: accent.fg,
              opacity: 0.95,
              textShadow: `0 0 8px ${accent.glow}`,
            }}
          >
            ✶
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `repeating-linear-gradient(45deg, transparent 0 ${10 * ratio}px, ${accent.dim} ${10 * ratio}px ${10.5 * ratio}px)`,
          opacity: 0.55,
          pointerEvents: "none",
        }}
      />

      {(["tl", "tr", "bl", "br"] as const).map((c) => (
        <div
          key={c}
          style={{
            position: "absolute",
            top: c.startsWith("t") ? 8 * ratio : "auto",
            bottom: c.startsWith("b") ? 8 * ratio : "auto",
            left: c.endsWith("l") ? 8 * ratio : "auto",
            right: c.endsWith("r") ? 8 * ratio : "auto",
            width: 10 * ratio,
            height: 10 * ratio,
            borderTop: c.startsWith("t") ? `1px solid ${accent.fg}` : "none",
            borderBottom: c.startsWith("b") ? `1px solid ${accent.fg}` : "none",
            borderLeft: c.endsWith("l") ? `1px solid ${accent.fg}` : "none",
            borderRight: c.endsWith("r") ? `1px solid ${accent.fg}` : "none",
            opacity: 0.55,
          }}
        />
      ))}
    </div>
  );
}
