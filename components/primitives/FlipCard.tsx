"use client";

import type { ReactNode } from "react";

// 3D flip wrapper. Front and back occupy the same slot; the parent
// flips by toggling `flipped`. `delayMs` staggers a row of cards.
export function FlipCard({
  flipped,
  front,
  back,
  w,
  h,
  delayMs = 0,
}: {
  flipped: boolean;
  front: ReactNode;
  back: ReactNode;
  w: number;
  h: number;
  delayMs?: number;
}) {
  return (
    <div style={{ width: w, height: h, perspective: 1400 }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transition: `transform 900ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
          }}
        >
          {back}
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {front}
        </div>
      </div>
    </div>
  );
}
