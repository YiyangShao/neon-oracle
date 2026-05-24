"use client";

import { useMemo, useState } from "react";
import { Starfield } from "@/components/primitives/Starfield";
import { CardFace } from "@/components/primitives/CardFace";
import type { DrawnCard } from "@/lib/tarot";
import type { Accent } from "@/lib/theme";

const POSITION_LABELS = ["I · 过 去", "II · 此 刻", "III · 将 至"];

// 7. Share — the screenshottable card. Designed to survive thumbnail compression.
// Excerpts each section to its first sentence so the card has air.
//
// Two modes:
//  - live (default): user just finished a reading. Shows "copy link" + "again".
//  - viewer: user opened someone else's reading via /r/<code>. Single CTA → "/".
export function ShareScreen({
  cards,
  sections,
  question,
  sessionId,
  onAgain,
  accent,
  shareUrl,
  viewer = false,
}: {
  cards: DrawnCard[];
  sections: string[];
  question: string;
  sessionId: string;
  onAgain: () => void;
  accent: Accent;
  shareUrl?: string;
  viewer?: boolean;
}) {
  const firstSentence = (s: string) => {
    const m = s.match(/^[^。.!?！？]+[。.!?！？]?/);
    return m ? m[0] : s;
  };
  const excerpts = sections.map(firstSentence);
  const stamp = useMemo(() => {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} · ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }, []);

  const [copied, setCopied] = useState(false);
  const copy = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Some browsers reject clipboard in non-secure contexts — fall back to selection.
      window.prompt("复制这条链接：", shareUrl);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        padding: "48px 20px 20px",
        animation: "oracle-fade-in 0.8s ease-out",
      }}
    >
      <Starfield density={0.6} opacity={0.4} />

      <div
        style={{
          flex: 1,
          background: "linear-gradient(180deg, #15120e 0%, #0a0807 100%)",
          border: `1px solid ${accent.dim}`,
          borderRadius: 8,
          padding: "22px 18px 18px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          boxShadow: `0 30px 80px rgba(0,0,0,0.7), 0 0 36px ${accent.glow}, inset 0 0 0 1px rgba(243,235,216,0.02)`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "var(--font-mono)",
            fontSize: 8,
            color: "var(--mute)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          <div style={{ color: accent.fg }}>NEON · ORACLE</div>
          <div>S/{sessionId}</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginBottom: 16,
          }}
        >
          {cards.map((c, i) => (
            <CardFace
              key={i}
              card={c}
              w={62}
              h={98}
              reversed={c.reversed}
              accent={accent}
            />
          ))}
        </div>

        <div
          style={{
            height: 1,
            background: accent.dim,
            opacity: 0.7,
            margin: "4px auto 16px",
            width: "40%",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
          {excerpts.map((ex, i) => (
            <div key={i}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 8,
                  color: accent.fg,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  opacity: 0.85,
                  marginBottom: 4,
                }}
              >
                {POSITION_LABELS[i]}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "var(--bone)",
                  letterSpacing: "0.03em",
                }}
              >
                {ex}
              </div>
            </div>
          ))}
        </div>

        {question && (
          <div
            style={{
              marginTop: 12,
              paddingTop: 10,
              borderTop: `1px solid ${accent.dim}`,
              fontFamily: "var(--font-serif)",
              fontSize: 10,
              color: "var(--mute)",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            「{question}」
          </div>
        )}

        <div
          style={{
            marginTop: 14,
            paddingTop: 12,
            borderTop: `1px solid ${accent.dim}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "var(--font-mono)",
            fontSize: 8,
            color: "var(--mute)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          <div>{stamp}</div>
          <div style={{ color: accent.fg, opacity: 0.85 }}>oracle.cn</div>
        </div>
      </div>

      <div
        style={{
          marginTop: 18,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 28,
          minHeight: 36,
        }}
      >
        {viewer ? (
          <button
            onClick={onAgain}
            style={{
              background: "transparent",
              border: `1px solid ${accent.fg}`,
              color: "var(--bone)",
              fontFamily: "var(--font-serif)",
              fontSize: 13,
              letterSpacing: "0.36em",
              textIndent: "0.36em",
              padding: "10px 26px",
              cursor: "pointer",
              boxShadow: `0 0 20px ${accent.glow}`,
            }}
          >
            为 我 抽 一 张
          </button>
        ) : (
          <>
            <button
              onClick={copy}
              disabled={!shareUrl}
              style={{
                background: copied ? accent.fg : "transparent",
                border: `1px solid ${accent.fg}`,
                color: copied ? "#0c0a08" : accent.fg,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                padding: "10px 22px",
                cursor: shareUrl ? "pointer" : "default",
                transition: "all 0.2s",
                boxShadow: copied ? `0 0 24px ${accent.glow}` : "none",
              }}
            >
              {copied ? "已复制" : "复制分享链接"}
            </button>
            <button
              onClick={onAgain}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--mute)",
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.3em",
                cursor: "pointer",
                textTransform: "uppercase",
                padding: "8px 4px",
              }}
            >
              ↻ 再来一次
            </button>
          </>
        )}
      </div>
    </div>
  );
}
