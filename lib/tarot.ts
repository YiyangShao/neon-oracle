// 22 Major Arcana (public domain, centuries old).
// Each card carries a Roman numeral, Chinese + English name, and a
// single-glyph stand-in used while real illustrations are absent.

export type TarotCard = {
  n: string;
  cn: string;
  en: string;
  glyph: string;
};

export type DrawnCard = TarotCard & { reversed: boolean };

export const TAROT: TarotCard[] = [
  { n: "O",     cn: "愚者",     en: "The Fool",           glyph: "◌" },
  { n: "I",     cn: "魔术师",   en: "The Magician",       glyph: "✦" },
  { n: "II",    cn: "女祭司",   en: "The High Priestess", glyph: "☽" },
  { n: "III",   cn: "皇后",     en: "The Empress",        glyph: "✿" },
  { n: "IV",    cn: "皇帝",     en: "The Emperor",        glyph: "◈" },
  { n: "V",     cn: "教皇",     en: "The Hierophant",     glyph: "⌘" },
  { n: "VI",    cn: "恋人",     en: "The Lovers",         glyph: "◍" },
  { n: "VII",   cn: "战车",     en: "The Chariot",        glyph: "⊹" },
  { n: "VIII",  cn: "力量",     en: "Strength",           glyph: "∞" },
  { n: "IX",    cn: "隐者",     en: "The Hermit",         glyph: "✧" },
  { n: "X",     cn: "命运之轮", en: "Wheel of Fortune",   glyph: "◯" },
  { n: "XI",    cn: "正义",     en: "Justice",            glyph: "⚖" },
  { n: "XII",   cn: "倒吊人",   en: "The Hanged Man",     glyph: "⌖" },
  { n: "XIII",  cn: "死神",     en: "Death",              glyph: "☩" },
  { n: "XIV",   cn: "节制",     en: "Temperance",         glyph: "◇" },
  { n: "XV",    cn: "恶魔",     en: "The Devil",          glyph: "▲" },
  { n: "XVI",   cn: "高塔",     en: "The Tower",          glyph: "⌬" },
  { n: "XVII",  cn: "星",       en: "The Star",           glyph: "✶" },
  { n: "XVIII", cn: "月",       en: "The Moon",           glyph: "☾" },
  { n: "XIX",   cn: "太阳",     en: "The Sun",            glyph: "☼" },
  { n: "XX",    cn: "审判",     en: "Judgement",          glyph: "⌇" },
  { n: "XXI",   cn: "世界",     en: "The World",          glyph: "◉" },
];

// Pick 3 distinct cards, each independently 35% chance reversed.
// Seeded LCG when a seed is provided (useful for share links later).
export function drawThree(seed?: number): DrawnCard[] {
  const idxs = [...Array(TAROT.length).keys()];
  let s = seed ?? Math.floor(Math.random() * 1e9);
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
  for (let i = idxs.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
  }
  return idxs.slice(0, 3).map((i) => ({
    ...TAROT[i],
    reversed: rand() < 0.35,
  }));
}
