"use client";

import { useRouter } from "next/navigation";
import { INK } from "@/lib/theme";
import { useMode, SIZES } from "@/lib/useMode";
import { OracleShell } from "@/components/OracleShell";
import { ShareScreen } from "@/components/screens/ShareScreen";
import { expandCards, type SharePayload } from "@/lib/share";

// Renders a frozen share view from a decoded payload.
// "再来一次" navigates back to the home page to start a fresh reading.
export function ShareViewer({ payload }: { payload: SharePayload }) {
  const router = useRouter();
  const cards = expandCards(payload.c);
  const mode = useMode();
  const tokens = SIZES[mode];
  return (
    <OracleShell phaseLabel="fin." sessionId={payload.sid} mode={mode}>
      <ShareScreen
        cards={cards}
        sections={payload.s}
        question={payload.q}
        sessionId={payload.sid}
        onAgain={() => router.push("/")}
        accent={INK.accent}
        tokens={tokens}
        viewer
      />
    </OracleShell>
  );
}
