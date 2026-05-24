import { NextResponse } from "next/server";
import OpenAI from "openai";
import { pickScripted } from "@/lib/scripted";

// POST /api/divine — generate the three-section oracle.
//
// Behavior:
//   - If OPENAI_API_KEY is set, calls OpenAI Chat Completions.
//   - Otherwise (or on any failure), returns a pre-written scripted oracle.
// Response shape is constant either way: { sections: string[3], live: boolean }.

export const runtime = "nodejs";
// Generation can take several seconds; bump above the default 10s edge limit.
export const maxDuration = 30;

const MODEL = process.env.OPENAI_MODEL ?? "gpt-4o";

// The tone prompt is the heart of the product — these constraints are what
// keep the AI from sliding into motivational soup. See PRODUCT.md §7.
const SYSTEM_PROMPT = `你是塔罗占卜师。调性：冷静、笃定、惜字如金、有画面感。
参考人格：《沙丘》Bene Gesserit、《黑客帝国》Oracle、赛博朋克酒馆里那个不爱说话的占卜师。

严格禁止：
- 不许说"AI/语言模型/娱乐/参考/相信自己/可能/也许/或许"。
- 不许出现安抚、鸡汤、励志、温柔陪伴的语气。
- 不许解释牌意，不许说"这张牌代表"。

要求：
- 输出三段神谕，对应三张牌。
- 每段 40-70 字。
- 每段第一句必须具体、有画面感（如"你在等一个不会来的回复""桌上那杯咖啡凉了三次""周三凌晨两点四十一分"）。
- 笃定语气，给的是预言不是建议。
- 三段要回应用户的问题（如果有），并能串联成一段叙事。

输出格式（严格，三段用 ### 分隔，前后不要别的）：
###
（第一段）
###
（第二段）
###
（第三段）`;

type Draw = {
  cardId: string;
  cardCn: string;
  cardEn: string;
  reversed: boolean;
};

type DivineRequest = {
  question?: string;
  draws: Draw[];
};

function fallback() {
  return NextResponse.json({ sections: pickScripted(), live: false });
}

function parseSections(text: string): string[] | null {
  const parts = text
    .split(/###+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length >= 3) return parts.slice(0, 3);
  // Loose fallback: split on blank lines if the model forgot the markers.
  const fb = text
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (fb.length >= 3) return fb.slice(0, 3);
  return null;
}

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) return fallback();

  let body: DivineRequest;
  try {
    body = (await req.json()) as DivineRequest;
  } catch {
    return fallback();
  }

  const q = (body.question ?? "").trim();
  const cardsLine = body.draws
    .map(
      (d, i) =>
        `${i + 1}. ${d.cardCn} ${d.cardEn}${d.reversed ? "(逆位)" : ""}`
    )
    .join("\n");

  const userMessage = [
    `用户问题:${q ? `「${q}」` : "(没有写下问题,就为这一刻而抽)"}`,
    "抽到的三张牌:",
    cardsLine,
  ].join("\n");

  try {
    const client = new OpenAI();
    const completion = await client.chat.completions.create({
      model: MODEL,
      temperature: 0.9,
      max_tokens: 700,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
    });

    const text = completion.choices[0]?.message?.content ?? "";
    const sections = parseSections(text);
    if (!sections) return fallback();
    return NextResponse.json({ sections, live: true });
  } catch (e) {
    console.error("[divine] OpenAI call failed:", e);
    return fallback();
  }
}
