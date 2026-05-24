"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { drawThree, type DrawnCard } from "@/lib/tarot";
import { INK } from "@/lib/theme";
import { compactCards, encodeReading } from "@/lib/share";
import { useMode, SIZES } from "@/lib/useMode";
import { OracleShell } from "@/components/OracleShell";
import { EntryScreen } from "@/components/screens/EntryScreen";
import { QuestionScreen } from "@/components/screens/QuestionScreen";
import { CastingScreen } from "@/components/screens/CastingScreen";
import { DealScreen } from "@/components/screens/DealScreen";
import { OracleScreen } from "@/components/screens/OracleScreen";
import { TransmissionScreen } from "@/components/screens/TransmissionScreen";
import { ShareScreen } from "@/components/screens/ShareScreen";

type Phase = "entry" | "question" | "casting" | "deal" | "oracle" | "share";

type OracleResult = { sections: string[]; live: boolean };

const PHASE_LABEL: Record<Phase, string> = {
  entry: "standby",
  question: "inquiry",
  casting: "shuffling",
  deal: "reveal",
  oracle: "transmission",
  share: "fin.",
};

function makeSessionId() {
  const c = "0123456789ABCDEF";
  let s = "";
  for (let i = 0; i < 6; i++) s += c[Math.floor(Math.random() * c.length)];
  return s;
}

export function OracleApp() {
  const [phase, setPhase] = useState<Phase>("entry");
  const [question, setQuestion] = useState("");
  const [cards, setCards] = useState<DrawnCard[]>([]);
  const [oracle, setOracle] = useState<OracleResult | null>(null);
  const [sessionId, setSessionId] = useState("");
  useEffect(() => {
    setSessionId(makeSessionId());
  }, []);

  const mode = useMode();
  const tokens = SIZES[mode];
  const accent = INK.accent;

  const handleQuestion = useCallback(async (q: string) => {
    setQuestion(q);
    const drawn = drawThree();
    setCards(drawn);
    setPhase("casting");

    setOracle(null);
    try {
      const res = await fetch("/api/divine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q,
          draws: drawn.map((c) => ({
            cardId: c.n,
            cardEn: c.en,
            cardCn: c.cn,
            reversed: c.reversed,
          })),
        }),
      });
      const data: OracleResult = await res.json();
      setOracle(data);
    } catch {
      setOracle({
        sections: [
          "信号在城市的边缘断了一瞬。",
          "再试一次。",
          "答案没有走远。",
        ],
        live: false,
      });
    }
  }, []);

  const handleCastingDone = useCallback(() => setPhase("deal"), []);
  const handleFlipped = useCallback(() => setPhase("oracle"), []);
  const handleAgain = useCallback(() => {
    setPhase("entry");
    setQuestion("");
    setCards([]);
    setOracle(null);
  }, []);

  const shareUrl = useMemo(() => {
    if (phase !== "share" || !oracle || !sessionId) return undefined;
    if (typeof window === "undefined") return undefined;
    const code = encodeReading({
      q: question,
      c: compactCards(cards),
      s: oracle.sections as [string, string, string],
      sid: sessionId,
      ts: Date.now(),
    });
    return `${window.location.origin}/r/${code}`;
  }, [phase, oracle, sessionId, question, cards]);

  return (
    <OracleShell phaseLabel={PHASE_LABEL[phase]} sessionId={sessionId} mode={mode}>
      {phase === "entry" && (
        <EntryScreen onEnter={() => setPhase("question")} accent={accent} tokens={tokens} />
      )}
      {phase === "question" && (
        <QuestionScreen onCommit={handleQuestion} accent={accent} tokens={tokens} />
      )}
      {phase === "casting" && (
        <CastingScreen onDone={handleCastingDone} accent={accent} />
      )}
      {phase === "deal" && (
        <DealScreen cards={cards} onFlipped={handleFlipped} accent={accent} tokens={tokens} />
      )}
      {phase === "oracle" &&
        (oracle ? (
          <OracleScreen
            cards={cards}
            sections={oracle.sections}
            question={question}
            live={oracle.live}
            accent={accent}
            tokens={tokens}
            onContinue={() => setPhase("share")}
          />
        ) : (
          <TransmissionScreen accent={accent} />
        ))}
      {phase === "share" && oracle && (
        <ShareScreen
          cards={cards}
          sections={oracle.sections}
          question={question}
          sessionId={sessionId}
          onAgain={handleAgain}
          accent={accent}
          tokens={tokens}
          shareUrl={shareUrl}
        />
      )}
    </OracleShell>
  );
}
