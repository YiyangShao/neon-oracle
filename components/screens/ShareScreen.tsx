"use client";

import { useMemo, useState } from "react";
import { Starfield } from "@/components/primitives/Starfield";
import { CardFace } from "@/components/primitives/CardFace";
import type { DrawnCard } from "@/lib/tarot";
import type { Accent } from "@/lib/theme";
import type { SizeTokens } from "@/lib/useMode";

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
  tokens,
  shareUrl,
  viewer = false,
}: {
  cards: DrawnCard[];
  sections: string[];
  question: string;
  sessionId: string;
  onAgain: () => void;
  accent: Accent;
  tokens: SizeTokens;
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
      window.prompt("复制这条链接：", shareUrl);
    }
  };

  const desktopScale = tokens.cardW >= 200;
  // The mini cards inside the share card itself.
  const innerCardW = desktopScale ? 110 : 62;
  const innerCardH = desktopScale ? 174 : 98;
  const cardPadV = desktopScale ? 36 : 22;
  const cardPadH = desktopScale ? 32 : 18;
  const cardHeaderFs = desktopScale ? 10 : 8;
  const posLabelFs = desktopScale ? 10 : 8;
  const bodyFs = desktopScale ? 18 : 14;
  const footerFs = desktopScale ? 10 : 8;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: `${tokens.stagePadTop * 0.8}px ${tokens.stagePadX}px ${tokens.stagePadX}px`,
        animation: "oracle-fade-in 0.8s ease-out",
      }}
    >
      <Starfield density={0.6} opacity={0.4} />

      <div
        style={{
          flex: 1,
          width: "100%",
          maxWidth: tokens.shareCardMaxW,
          background: "linear-gradient(180deg, #15120e 0%, #0a0807 100%)",
          border: `1px solid ${accent.dim}`,
          borderRadius: desktopScale ? 12 : 8,
          padding: `${cardPadV}px ${cardPadH}px`,
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
            fontSize: cardHeaderFs,
            color: "var(--mute)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: desktopScale ? 20 : 12,
          }}
        >
          <div style={{ color: accent.fg }}>NEON · ORACLE</div>
          <div>S/{sessionId}</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: desktopScale ? 14 : 8,
            marginBottom: desktopScale ? 24 : 16,
          }}
        >
          {cards.map((c, i) => (
            <CardFace
              key={i}
              card={c}
              w={innerCardW}
              h={innerCardH}
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
            margin: `${desktopScale ? 8 : 4}px auto ${desktopScale ? 22 : 16}px`,
            width: "40%",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: desktopScale ? 18 : 12, flex: 1 }}>
          {excerpts.map((ex, i) => (
            <div key={i}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: posLabelFs,
                  color: accent.fg,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  opacity: 0.85,
                  marginBottom: desktopScale ? 6 : 4,
                }}
              >
                {POSITION_LABELS[i]}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: bodyFs,
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
              marginTop: desktopScale ? 18 : 12,
              paddingTop: desktopScale ? 14 : 10,
              borderTop: `1px solid ${accent.dim}`,
              fontFamily: "var(--font-serif)",
              fontSize: desktopScale ? 13 : 10,
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
            marginTop: desktopScale ? 20 : 14,
            paddingTop: desktopScale ? 16 : 12,
            borderTop: `1px solid ${accent.dim}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "var(--font-mono)",
            fontSize: footerFs,
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
          marginTop: desktopScale ? 28 : 18,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: desktopScale ? 40 : 28,
          minHeight: 40,
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
              fontSize: tokens.buttonFs - 4,
              letterSpacing: "0.36em",
              textIndent: "0.36em",
              padding: `${tokens.buttonPadV - 4}px ${tokens.buttonPadH - 20}px`,
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
                fontSize: desktopScale ? 12 : 10,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                padding: `${desktopScale ? 14 : 10}px ${desktopScale ? 32 : 22}px`,
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
                fontSize: desktopScale ? 11 : 9,
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
