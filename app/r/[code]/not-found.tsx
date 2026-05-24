import Link from "next/link";
import { OracleShell } from "@/components/OracleShell";

// Per SPEC §8: lost/expired share links get a quiet, on-brand "散入数据洪流" message.
export default function NotFound() {
  return (
    <OracleShell phaseLabel="lost" sessionId="——————">
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 36,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 18,
            color: "var(--bone)",
            letterSpacing: "0.2em",
            lineHeight: 1.8,
            marginBottom: 26,
            opacity: 0.85,
          }}
        >
          这份神谕已散入数据洪流。
        </div>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--accent-fg)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            textDecoration: "none",
            border: "1px solid var(--accent-fg)",
            padding: "10px 22px",
            boxShadow: "0 0 18px var(--accent-glow)",
          }}
        >
          为 我 抽 一 张 ↻
        </Link>
      </div>
    </OracleShell>
  );
}
