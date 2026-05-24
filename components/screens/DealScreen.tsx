"use client";

import { useEffect, useMemo, useState } from "react";
import { Starfield } from "@/components/primitives/Starfield";
import { CardBack } from "@/components/primitives/CardBack";
import { CardFace } from "@/components/primitives/CardFace";
import { FlipCard } from "@/components/primitives/FlipCard";
import type { DrawnCard } from "@/lib/tarot";
import type { Accent } from "@/lib/theme";

type Stage = "dealing" | "ready" | "flipping" | "done";

// 4 + 5. Deal & Flip — three cards slide in, await user, then flip with weight.
export function DealScreen({
  cards,
  onFlipped,
  accent,
  layout = "row",
  flipSpeed = 1,
}: {
  cards: DrawnCard[];
  onFlipped: () => void;
  accent: Accent;
  layout?: "row" | "fan" | "cross";
  flipSpeed?: number;
}) {
  const [stage, setStage] = useState<Stage>("dealing");
  const [flipped, setFlipped] = useState([false, false, false]);

  useEffect(() => {
    const t = setTimeout(() => setStage("ready"), 1300);
    return () => clearTimeout(t);
  }, []);

  const cw = 96;
  const ch = 152;

  const positions = useMemo(() => {
    if (layout === "fan") {
      return [
        { x: -110, y: 10, rot: -12 },
        { x: 0, y: -6, rot: 0 },
        { x: 110, y: 10, rot: 12 },
      ];
    }
    if (layout === "cross") {
      return [
        { x: 0, y: -ch * 0.55, rot: 0 },
        { x: 0, y: 0, rot: 90 },
        { x: 0, y: ch * 0.55, rot: 0 },
      ];
    }
    return [
      { x: -(cw + 16), y: 0, rot: 0 },
      { x: 0, y: 0, rot: 0 },
      { x: cw + 16, y: 0, rot: 0 },
    ];
  }, [layout, ch, cw]);

  const startFlip = () => {
    if (stage !== "ready") return;
    setStage("flipping");
    [0, 1, 2].forEach((i) => {
      setTimeout(() => {
        setFlipped((f) => {
          const n = [...f];
          n[i] = true;
          return n;
        });
      }, i * (420 / flipSpeed));
    });
    setTimeout(() => {
      setStage("done");
      onFlipped();
    }, 2400 / flipSpeed);
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        animation: "oracle-fade-in 0.7s ease-out",
      }}
    >
      <Starfield density={0.6} opacity={0.4} />

      <div
        style={{
          marginTop: 56,
          textAlign: "center",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: accent.fg,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
        }}
      >
        past · present · what comes
      </div>

      <div
        style={{
          flex: 1,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {cards.map((card, i) => {
          const pos = positions[i];
          const dealing = stage === "dealing";
          const dealOffset = dealing ? -260 : pos.y;
          const dealOpacity = dealing ? 0 : 1;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                marginLeft: -cw / 2,
                marginTop: -ch / 2,
                transform: `translate(${pos.x}px, ${dealOffset}px) rotate(${pos.rot}deg)`,
                opacity: dealOpacity,
                transition: `transform 700ms cubic-bezier(0.2, 0.9, 0.3, 1) ${i * 180}ms, opacity 500ms ease-out ${i * 180}ms`,
              }}
            >
              <FlipCard
                flipped={flipped[i]}
                w={cw}
                h={ch}
                back={<CardBack w={cw} h={ch} accent={accent} />}
                front={
                  <CardFace
                    card={card}
                    w={cw}
                    h={ch}
                    reversed={card.reversed}
                    accent={accent}
                  />
                }
              />
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "center", paddingBottom: 36, minHeight: 80 }}>
        {stage === "ready" && (
          <button
            onClick={startFlip}
            style={{
              background: "transparent",
              color: "var(--bone)",
              border: `1px solid ${accent.fg}`,
              padding: "14px 44px",
              fontFamily: "var(--font-serif)",
              fontSize: 16,
              letterSpacing: "0.4em",
              cursor: "pointer",
              textIndent: "0.4em",
              animation: "oracle-fade-in 0.6s ease-out",
              boxShadow: `0 0 24px ${accent.glow}`,
            }}
          >
            翻 开
          </button>
        )}
        {stage === "flipping" && (
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--mute)",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              marginTop: 12,
            }}
          >
            revealing
          </div>
        )}
      </div>
    </div>
  );
}
