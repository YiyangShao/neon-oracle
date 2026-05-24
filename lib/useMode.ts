"use client";

import { useEffect, useState } from "react";

export type Mode = "mobile" | "desktop";

// Returns the current viewport mode. On the server / first paint we assume
// "mobile" (the smaller layout is also a valid degraded view on desktop —
// the brief flash on first hydration is acceptable for a ritual app).
//
// Default breakpoint chosen so a 11" iPad in portrait stays "mobile" but
// any landscape browser window switches to "desktop".
export function useMode(breakpoint = 900): Mode {
  const [mode, setMode] = useState<Mode>("mobile");
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const update = () => setMode(mq.matches ? "desktop" : "mobile");
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);
  return mode;
}

// Mode-aware sizing tokens. Centralized here so every screen pulls from one
// place and the desktop variant stays internally consistent.
export type SizeTokens = {
  // The big tarot card (deal / share).
  cardW: number;
  cardH: number;
  // Small card thumbnail (oracle phase context strip).
  miniW: number;
  miniH: number;
  // Gap between the three cards in the deal layout.
  cardGap: number;
  // Type scale.
  titleSerifBig: number;   // Entry title "三 张 牌 · 一 段 预 言" / Question "你想问什么?"
  titleSerifMid: number;   // Entry brandmark, secondary headings
  oracleBodyFs: number;    // Reveal text size
  oracleBodyMaxW: number;  // Max line measure for oracle text
  // Layout container.
  stagePadX: number;
  stagePadTop: number;
  // The central glowing circle on entry.
  entryCircle: number;
  // The big primary button (落定 / 翻开 / 留下这一张).
  buttonPadV: number;
  buttonPadH: number;
  buttonFs: number;
  // Share card max width on its host screen.
  shareCardMaxW: number;
};

export const SIZES: Record<Mode, SizeTokens> = {
  mobile: {
    cardW: 96,
    cardH: 152,
    miniW: 56,
    miniH: 88,
    cardGap: 16,
    titleSerifBig: 26,
    titleSerifMid: 22,
    oracleBodyFs: 17,
    oracleBodyMaxW: 360,
    stagePadX: 24,
    stagePadTop: 60,
    entryCircle: 90,
    buttonPadV: 14,
    buttonPadH: 44,
    buttonFs: 16,
    shareCardMaxW: 380,
  },
  desktop: {
    // Cards meaningfully larger — the deal phase finally has weight.
    cardW: 260,
    cardH: 410,
    miniW: 110,
    miniH: 174,
    cardGap: 64,
    titleSerifBig: 42,
    titleSerifMid: 34,
    oracleBodyFs: 22,
    oracleBodyMaxW: 720,
    stagePadX: 80,
    stagePadTop: 120,
    entryCircle: 140,
    buttonPadV: 18,
    buttonPadH: 64,
    buttonFs: 18,
    shareCardMaxW: 560,
  },
};
