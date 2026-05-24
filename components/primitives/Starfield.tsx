"use client";

import { useMemo } from "react";

// Fixed-seed scatter of "stars" — the only ambient texture in the design.
// Identical layout across renders so the void feels still, not shimmering.
export function Starfield({
  density = 1,
  opacity = 0.5,
}: {
  density?: number;
  opacity?: number;
}) {
  const stars = useMemo(() => {
    let s = 42;
    const rand = () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 0xffffffff;
    };
    const out: { x: string; y: string; sz: string; a: string }[] = [];
    const count = Math.floor(80 * density);
    for (let i = 0; i < count; i++) {
      out.push({
        x: (rand() * 100).toFixed(2),
        y: (rand() * 100).toFixed(2),
        sz: (rand() * 1.2 + 0.4).toFixed(2),
        a: (rand() * 0.5 + 0.1).toFixed(2),
      });
    }
    return out;
  }, [density]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity,
        overflow: "hidden",
      }}
    >
      {stars.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.sz}px`,
            height: `${s.sz}px`,
            background: "#f3ebd8",
            borderRadius: "50%",
            opacity: Number(s.a),
            boxShadow: `0 0 ${Number(s.sz) * 2}px rgba(243,235,216,${Number(s.a) * 0.6})`,
          }}
        />
      ))}
    </div>
  );
}
