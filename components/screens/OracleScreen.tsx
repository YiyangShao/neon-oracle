"use client";

import { useEffect, useRef, useState } from "react";
import { Starfield } from "@/components/primitives/Starfield";
import { CardFace } from "@/components/primitives/CardFace";
import type { DrawnCard } from "@/lib/tarot";
import type { Accent } from "@/lib/theme";

const POSITION_LABELS = ["I · 过 去", "II · 此 刻", "III · 将 至"];

// 6. Oracle — char-by-char reveal with punctuation-aware pacing.
// Tapping the text reveals everything at once.
export function OracleScreen({
  cards,
  sections,
  question,
  onContinue,
  accent,
  revealSpeed = 1,
  live,
}: {
  cards: DrawnCard[];
  sections: string[];
  question: string;
  onContinue: () => void;
  accent: Accent;
  revealSpeed?: number;
  live: boolean;
}) {
  const [revealed, setRevealed] = useState<number[]>([0, 0, 0]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [done, setDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Per-char scheduler. Punctuation gets a longer pause — breath rhythm.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const cur = activeIdx;
    if (cur >= sections.length) {
      setDone(true);
      return;
    }
    const text = sections[cur];
    if (revealed[cur] < text.length) {
      const ch = text[revealed[cur]];
      let delay = 55 / revealSpeed;
      if ("。.！!？?".includes(ch)) delay = 480 / revealSpeed;
      else if ("，,；;：:—".includes(ch)) delay = 220 / revealSpeed;
      else if (" \n".includes(ch)) delay = 80 / revealSpeed;
      timer = setTimeout(() => {
        setRevealed((r) => {
          const n = [...r];
          n[cur] = n[cur] + 1;
          return n;
        });
      }, delay);
    } else {
      timer = setTimeout(() => setActiveIdx((i) => i + 1), 750 / revealSpeed);
    }
    return () => clearTimeout(timer);
  }, [revealed, activeIdx, sections, revealSpeed]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [revealed, activeIdx]);

  const skip = () => {
    setRevealed(sections.map((s) => s.length));
    setActiveIdx(sections.length);
    setDone(true);
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        padding: "60px 24px 24px",
      }}
    >
      <Starfield density={0.4} opacity={0.3} />

      {/* Mini cards row — context */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          marginBottom: 18,
        }}
      >
        {cards.map((c, i) => (
          <div
            key={i}
            style={{
              opacity: i <= activeIdx ? 1 : 0.4,
              transition: "opacity 0.5s",
            }}
          >
            <CardFace
              card={c}
              w={56}
              h={88}
              reversed={c.reversed}
              accent={accent}
            />
          </div>
        ))}
      </div>

      {question && (
        <div
          style={{
            textAlign: "center",
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: "var(--mute)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 4,
            opacity: 0.7,
          }}
        >
          asked
        </div>
      )}
      {question && (
        <div
          style={{
            textAlign: "center",
            fontFamily: "var(--font-serif)",
            fontSize: 13,
            color: "var(--bone)",
            opacity: 0.6,
            fontStyle: "italic",
            marginBottom: 18,
            padding: "0 24px",
          }}
        >
          「{question}」
        </div>
      )}

      {/* Oracle text */}
      <div
        ref={scrollRef}
        onClick={skip}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "8px 4px",
          cursor: done ? "default" : "pointer",
        }}
      >
        {sections.map((s, i) => {
          const visible = revealed[i];
          if (visible === 0 && i > activeIdx) return null;
          return (
            <div
              key={i}
              style={{
                marginBottom: 22,
                opacity: i <= activeIdx ? 1 : 0,
                animation: i <= activeIdx ? "oracle-fade-in 0.7s ease-out" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  color: accent.fg,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                  opacity: 0.85,
                }}
              >
                {POSITION_LABELS[i]} · {cards[i].cn}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 17,
                  lineHeight: 1.85,
                  color: "var(--bone)",
                  letterSpacing: "0.04em",
                }}
              >
                {s.slice(0, visible)}
                {i === activeIdx && visible < s.length && (
                  <span
                    style={{
                      display: "inline-block",
                      width: "0.6em",
                      height: "1em",
                      background: accent.fg,
                      marginLeft: 2,
                      verticalAlign: "text-bottom",
                      animation: "oracle-caret 1s steps(2) infinite",
                      boxShadow: `0 0 8px ${accent.glow}`,
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom control */}
      <div style={{ textAlign: "center", paddingTop: 16, minHeight: 60 }}>
        {done ? (
          <button
            onClick={onContinue}
            style={{
              background: accent.fg,
              color: "#0c0a08",
              border: "none",
              padding: "12px 36px",
              fontFamily: "var(--font-serif)",
              fontSize: 14,
              letterSpacing: "0.36em",
              cursor: "pointer",
              textIndent: "0.36em",
              animation: "oracle-fade-in 0.6s ease-out",
              boxShadow: `0 0 24px ${accent.glow}`,
            }}
          >
            留 下 这 一 张
          </button>
        ) : (
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              color: "var(--mute)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              opacity: 0.5,
            }}
          >
            tap to reveal at once · {activeIdx + 1} / {sections.length}
          </div>
        )}
      </div>

      {!live && (
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            fontFamily: "var(--font-mono)",
            fontSize: 7,
            color: "var(--mute)",
            letterSpacing: "0.2em",
            opacity: 0.4,
            textTransform: "uppercase",
          }}
        >
          scripted
        </div>
      )}
    </div>
  );
}
