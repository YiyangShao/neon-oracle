"use client";

import type { DrawnCard } from "@/lib/tarot";
import type { Accent } from "@/lib/theme";

// Card face — striped placeholder + monospace illustration tag.
// Real illustrations slot in by replacing the inner stripe panel.
export function CardFace({
  card,
  w = 180,
  h = 280,
  reversed = false,
  accent,
}: {
  card: DrawnCard;
  w?: number;
  h?: number;
  reversed?: boolean;
  accent: Accent;
}) {
  const ratio = w / 180;
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: 6 * ratio,
        background: "linear-gradient(180deg, #1a1815 0%, #100e0c 100%)",
        border: `1px solid ${accent.dim}`,
        boxShadow: `0 16px 40px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(243,235,216,0.04), 0 0 24px ${accent.glow}`,
        display: "flex",
        flexDirection: "column",
        padding: 10 * ratio,
        position: "relative",
        overflow: "hidden",
        transform: reversed ? "rotate(180deg)" : "none",
        transition: "transform 0.4s",
        fontFamily: "var(--font-serif)",
        color: "var(--bone)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9 * ratio,
          letterSpacing: "0.18em",
          color: accent.fg,
          opacity: 0.85,
          textAlign: "center",
          lineHeight: 1,
        }}
      >
        {card.n}
      </div>

      <div
        style={{
          height: 1,
          background: accent.dim,
          margin: `${5 * ratio}px ${20 * ratio}px ${10 * ratio}px`,
        }}
      />

      <div
        style={{
          flex: 1,
          background: `repeating-linear-gradient(135deg, transparent 0 ${4 * ratio}px, ${accent.dim} ${4 * ratio}px ${4.5 * ratio}px)`,
          border: `1px dashed ${accent.dim}`,
          borderRadius: 3 * ratio,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 8 * ratio,
        }}
      >
        <div
          style={{
            fontSize: 36 * ratio,
            color: accent.fg,
            opacity: 0.9,
            textShadow: `0 0 12px ${accent.glow}`,
            lineHeight: 1,
          }}
        >
          {card.glyph}
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 7 * ratio,
            color: "var(--bone)",
            opacity: 0.35,
            letterSpacing: "0.1em",
          }}
        >
          {`<illustration:${card.en.toLowerCase().replace(/\s+/g, "_")}>`}
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: 9 * ratio,
          fontSize: 13 * ratio,
          letterSpacing: "0.2em",
          color: "var(--bone)",
        }}
      >
        {card.cn}
      </div>
      <div
        style={{
          textAlign: "center",
          fontFamily: "var(--font-mono)",
          fontSize: 7 * ratio,
          letterSpacing: "0.18em",
          color: "var(--mute)",
          marginTop: 2 * ratio,
          textTransform: "uppercase",
        }}
      >
        {card.en}
      </div>
    </div>
  );
}
