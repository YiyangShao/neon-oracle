// Share link encoding: the entire reading is packed into the URL path.
// No server storage, no expiry — the link IS the reading.
//
// Trade-off vs a KV store: ~500-char URLs instead of short codes.
// All modern messaging apps handle this; for a single-page ritual it's a win.

import { TAROT, type DrawnCard, type TarotCard } from "./tarot";

export type SharePayload = {
  // Question (may be empty if user skipped).
  q: string;
  // Compact card form: [{ id: roman numeral, r: 0|1 }] in past/present/future order.
  c: Array<{ id: string; r: 0 | 1 }>;
  // The three oracle sections.
  s: [string, string, string];
  // Session id (decorative).
  sid: string;
  // Timestamp ms.
  ts: number;
};

const TAROT_BY_ID: Record<string, TarotCard> = Object.fromEntries(
  TAROT.map((c) => [c.n, c])
);

// Base64url that works in both Node 16+ and the browser.
// We use btoa/atob (now available everywhere) instead of Node's Buffer
// because Next.js polyfills Buffer in the browser bundle but that polyfill
// doesn't support the "base64url" encoding string.
function toBase64Url(s: string): string {
  const b64 = btoa(unescape(encodeURIComponent(s)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(s: string): string {
  let b64 = s.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) b64 += "=";
  return decodeURIComponent(escape(atob(b64)));
}

export function encodeReading(p: SharePayload): string {
  return toBase64Url(JSON.stringify(p));
}

// Returns null on any malformed input — callers should render a "lost" view.
export function decodeReading(code: string): SharePayload | null {
  try {
    const json = fromBase64Url(code);
    const obj = JSON.parse(json) as unknown;
    if (!isPayload(obj)) return null;
    // Sanity-check that all card ids resolve.
    if (obj.c.some((x) => !TAROT_BY_ID[x.id])) return null;
    if (obj.s.length !== 3) return null;
    return obj;
  } catch {
    return null;
  }
}

// Type guard for incoming JSON.
function isPayload(o: unknown): o is SharePayload {
  if (!o || typeof o !== "object") return false;
  const x = o as Record<string, unknown>;
  return (
    typeof x.q === "string" &&
    Array.isArray(x.c) &&
    x.c.length === 3 &&
    x.c.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as { id?: unknown }).id === "string" &&
        ((item as { r?: unknown }).r === 0 || (item as { r?: unknown }).r === 1)
    ) &&
    Array.isArray(x.s) &&
    x.s.length === 3 &&
    x.s.every((seg) => typeof seg === "string") &&
    typeof x.sid === "string" &&
    typeof x.ts === "number"
  );
}

// Expand the compact card form back into DrawnCard records.
export function expandCards(c: SharePayload["c"]): DrawnCard[] {
  return c.map((x) => ({ ...TAROT_BY_ID[x.id], reversed: x.r === 1 }));
}

// Compact form constructor — used when entering the share phase.
export function compactCards(cards: DrawnCard[]): SharePayload["c"] {
  return cards.map((c) => ({ id: c.n, r: c.reversed ? 1 : 0 })) as SharePayload["c"];
}
