"use client";

import type { DrawnCard } from "@/lib/tarot";
import type { Accent } from "@/lib/theme";

// Card face — the canonical Rider-Waite-Smith 1909 art fills the entire face.
// The image already carries the Roman numeral (top) and English name (bottom),
// so we don't repeat those inside the frame. Surrounding context strips
// (DealScreen caption, OracleScreen position label) handle the Chinese name.
//
// Outer frame keeps the gold border + shadow + glow that anchor the card
// in the deep-ink theme.
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
  const radius = 6 * ratio;
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: radius,
        background: "#0c0a08",
        border: `1px solid ${accent.dim}`,
        boxShadow: `0 16px 40px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(243,235,216,0.04), 0 0 24px ${accent.glow}`,
        position: "relative",
        overflow: "hidden",
        transform: reversed ? "rotate(180deg)" : "none",
        transition: "transform 0.4s",
      }}
    >
      {/* Plain <img>: simpler than next/image for our inline-style world,
          and the image is already pre-sized to a sane resolution.
          object-fit: contain so the full RWS art is always visible — the
          card aspect matches the dominant 1.73 ratio, so any minor
          letterboxing on differently-proportioned scans disappears into
          the ink background. */}
      <img
        src={card.imageSrc}
        alt={`${card.cn} · ${card.en}`}
        draggable={false}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          // The RWS scans are warm-cream paper; ease them toward the ink
          // background without losing recognizability.
          filter: "brightness(0.92) contrast(1.05) saturate(0.92)",
        }}
      />
      {/* Subtle inner vignette to tie the bright RWS art to the dark frame. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          boxShadow: `inset 0 0 ${28 * ratio}px rgba(12,10,8,0.55)`,
        }}
      />
    </div>
  );
}
