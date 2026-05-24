"use client";

import { useEffect, useRef, useState } from "react";
import { Starfield } from "@/components/primitives/Starfield";
import type { Accent } from "@/lib/theme";

// 2. Question — write or skip. Centered, no labels, no chrome.
export function QuestionScreen({
  onCommit,
  accent,
}: {
  onCommit: (q: string) => void;
  accent: Accent;
}) {
  const [value, setValue] = useState("");
  const taRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const t = setTimeout(() => taRef.current?.focus(), 320);
    return () => clearTimeout(t);
  }, []);

  const commit = (q: string) => onCommit(q.trim());

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        padding: "72px 28px 36px",
        animation: "oracle-fade-in 0.9s ease-out",
      }}
    >
      <Starfield density={0.5} opacity={0.3} />

      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.3em",
          color: accent.fg,
          textTransform: "uppercase",
          textAlign: "center",
          marginBottom: 18,
        }}
      >
        — 把心事写下 —
      </div>

      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 26,
          color: "var(--bone)",
          letterSpacing: "0.05em",
          lineHeight: 1.5,
          textAlign: "center",
          marginBottom: 36,
        }}
      >
        你想问什么？
      </div>

      <div
        style={{
          flex: 1,
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <textarea
          ref={taRef}
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, 80))}
          placeholder="一句话。写完整就行。"
          rows={4}
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--bone)",
            fontFamily: "var(--font-serif)",
            fontSize: 18,
            lineHeight: 1.7,
            letterSpacing: "0.02em",
            textAlign: "center",
            resize: "none",
            width: "100%",
            padding: "8px 0",
            caretColor: accent.fg,
          }}
        />
        <div
          style={{
            height: 1,
            background: accent.dim,
            opacity: 0.6,
            width: "60%",
            margin: "0 auto",
          }}
        />
        <div
          style={{
            marginTop: 10,
            textAlign: "center",
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: "var(--mute)",
            letterSpacing: "0.2em",
          }}
        >
          {value.length} / 80
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
          marginTop: 24,
        }}
      >
        <button
          onClick={() => commit(value)}
          style={{
            background: value.trim() ? accent.fg : "transparent",
            color: value.trim() ? "#0c0a08" : "var(--mute)",
            border: `1px solid ${value.trim() ? accent.fg : accent.dim}`,
            padding: "14px 56px",
            fontFamily: "var(--font-serif)",
            fontSize: 16,
            letterSpacing: "0.4em",
            cursor: "pointer",
            transition: "all 0.25s",
            textIndent: "0.4em",
            boxShadow: value.trim() ? `0 0 30px ${accent.glow}` : "none",
          }}
        >
          落 定
        </button>
        <button
          onClick={() => commit("")}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--mute)",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.25em",
            cursor: "pointer",
            textTransform: "uppercase",
            padding: "8px 12px",
          }}
        >
          不写也可以 / skip
        </button>
      </div>
    </div>
  );
}
